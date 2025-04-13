<?php 
namespace VanguardLTE\Games\President45
{
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;

    class Server
    {
        public $gameState;
        public $debug = false;

        function getConvertedLine($line)
        {
            $res = [];
            for($r = 0; $r < 5; $r++)
                for($c = 0; $c < 3; $c++)
                {
                    if($line[$r][$c] == 1)
                    {
                        $res[] = $c * 5 + $r;
                    }
                }
            $res = implode('|', $res);
            return $res;
        }

        function getBlockedPositions($block)
        {
            $res = [];
            for($r = 0; $r < 5; $r++)
                for($c = 0; $c < 5; $c++)
                    if($block['reel'.($r+1)][$c] == 1)
                        $res[] = $c * 5 + $r;
            $res = implode('|', $res);
            return $res;
        }

        function generateWagerId()
        {
            $id = date("ymdHms").round(microtime(true) * 1000) % 1000;
            return $id;
        }

        public function get($request, $game)
        {
            try
            {
                DB::beginTransaction();
                $userId = Auth::id();
                if( $userId == null ) 
                {
                    $response = '{"responseEvent":"error","responseType":"","serverResponse":"invalid login"}';
                    exit( $response );
                }
                $slotSettings = new SlotSettings($game, $userId);
                if( !$slotSettings->is_active() ) 
                {
                    $response = '{"responseEvent":"error","responseType":"","serverResponse":"Game is disabled"}';
                    exit( $response );
                }
                $data = $request->all();
                $cmd = '';
                if(isset($data['cmd']))
                    $cmd = $data['cmd'];
                else
                    $cmd = $data['gameData']['method'];

                switch($cmd)
                {
                    case 'LoginGame':
                        $response = [
                            "resultid" => "1",
                            "msg" => "login lineserver succeed!",
                            "Obj" => [
                                "account" => $slotSettings->user->username,
                                "id" => 0,
                                "nickname" => $slotSettings->user->username,
                                "score" => $this->getCreditNumber($slotSettings->GetBalance()),
                                "wins" => 0,
                                "nGamblingWinPool" => 0
                            ]
                        ];
                        return $response;
                        break;
                    case 'lottery':
                        $lines = 20;
                        $coinValue = $data['nBetList'][0] / 100;

                        $allbet = $coinValue * $lines;
                        $postData['slotEvent'] = 'bet';
                        
                        if( $postData['slotEvent'] == 'bet' ) 
                        {                          
                            $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
                            $slotSettings->UpdateJackpots($allbet);
                            $slotSettings->SetBet($allbet);
                            $slotSettings->SetGameData($slotSettings->slotId . 'GameWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'AllBet', $allbet);
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'GambleUp', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'LastEvent', 'bet');
                        }                                              
                        $response = $this->doSpin($slotSettings, $data, $postData);                        
                        break;                 
                }                
                
                $slotSettings->SaveGameData();
                $slotSettings->SaveGameDataStatic();
                DB::commit();    
                return $response;
            }
            catch( \Exception $e ) 
            {
                if( isset($slotSettings) ) 
                {
                    $slotSettings->InternalErrorSilent($e);
                }
                else
                {
                    $strLog = '';
                    $strLog .= "\n";
                    $strLog .= ('{"responseEvent":"error","responseType":"' . $e . '","serverResponse":"InternalError","request":' . json_encode($_REQUEST) . ',"requestRaw":' . file_get_contents('php://input') . '}');
                    $strLog .= "\n";
                    $strLog .= ' ############################################### ';
                    $strLog .= "\n";
                    $slg = '';
                    if( file_exists(storage_path('logs/') . 'GameInternal.log') ) 
                    {
                        $slg = file_get_contents(storage_path('logs/') . 'GameInternal.log');
                    }
                    file_put_contents(storage_path('logs/') . 'GameInternal.log', $slg . $strLog);
                }
            }
        }

        function doSpin($slotSettings, $data, $postData)
        {
            $lines = 20;
            $coinValue = $data['nBetList'][0] / 100;
            $allbet = $coinValue * $lines;

            $linesId = $slotSettings->GetPaylines($lines);
            $betLine = $coinValue;

            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
            
            $spinAcquired = false;
            $gameWin = $slotSettings->GetGameData($slotSettings->slotId . 'GameWin');            

            if($this->debug && $postData['slotEvent'] != 'freespin')
            {
                $winType = 'bonus';
            }

            $minReels = [];
            $minLineWins = [];
            $minTotalWin = -1;
            $minFreespinsWon = 0;
            $minScatterCount = 0;
            $minBonusCount = 0;            

            $totalWin = 0;
            $freespinsWon = 0;
            $lineWins = [];
            $reels = [];
            
            $scatter = 10;
            $scatterCount = 0;
            $bonusCount = 0;
            $wild = [8];
            $trumph = 9;
            $paytable = $slotSettings->Paytable;
            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $freespinsWon = 0;
                $scatterCount = 0;
                $bonusCount = 0;
                $scatterPos = [];
                $lineWins = [];
                $cWins = array_fill(0, $lines, 0);
                
                $reels = $slotSettings->GetReelStrips($winType, $lines);   
                // $reels['reel1'] = [9, 1, 0];
                // $reels['reel2'] = [0, 7, 5];
                // $reels['reel3'] = [8, 9, 3];
                // $reels['reel4'] = [9, 7, 8];
                // $reels['reel5'] = [3, 6, 6];
                $bonusMpl = 1;
                
                for( $k = 0; $k < $lines; $k++ ) 
                {
                    $mpl = 1;
                    $winline = [];
                    for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                    {
                        $csym = $slotSettings->SymbolGame[$j];
                        if( !isset($paytable[$csym]) ) 
                        {
                        }
                        else
                        {
                            $s = [];
                            $p0 = $linesId[$k][0];
                            $p1 = $linesId[$k][1];
                            $p2 = $linesId[$k][2];
                            $p3 = $linesId[$k][3];
                            $p4 = $linesId[$k][4];

                            $s[0] = $reels['reel1'][$p0];
                            $s[1] = $reels['reel2'][$p1];
                            $s[2] = $reels['reel3'][$p2];
                            $s[3] = $reels['reel4'][$p3];
                            $s[4] = $reels['reel5'][$p4];

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild))) 
                            {   
                                $wildCnt = 0;                            
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][2];
                                $tmpWin = $paytable[$csym][2] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 2, $mpl, $tmpWin, $coin, [$s[0], $s[1], 0, 0, 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }
                                                                                
                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) ) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][3];
                                $tmpWin = $paytable[$csym][3] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 3, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], 0, 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild))  && ($s[3] == $csym || in_array($s[3], $wild)) ) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($s[3] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][4];
                                $tmpWin = $paytable[$csym][4] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 4, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], $s[3], 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild))) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($s[3] == $wild[0])   $wildCnt++;
                                if($s[4] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][5];
                                $tmpWin = $paytable[$csym][5] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 5, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], $s[3], $s[4]], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }                            
                        }
                    }

                    if( $cWins[$k] > 0 && !empty($winline))
                    {
                        array_push($lineWins, $winline);
                        $totalWin += $cWins[$k];
                    }
                }

                //calculate bonus symbol count
                for($r = 1; $r <= 5; $r++)
                {
                    $isScatterPresent = false;
                    for($c = 0; $c < 3; $c++)
                    {
                        if($reels['reel'.$r][$c] == $scatter)
                        {
                            $scatterCount++;
                            $scatterPos[] = $c;
                            $isScatterPresent = true;
                            break;
                        }                            
                    }
                    if(!$isScatterPresent)
                    {
                        $scatterPos[] = -1;
                    }
                }

                if($winType != 'bonus' && $scatterCount > 2)
                    continue;

                $scattersWin = 0;
                if($scatterCount > 2)
                {
                    $freespinsWon = 10;
                    if($scatterCount == 4)
                        $freespinsWon = 50;
                    else if($scatterCount == 5)
                        $freespinsWon = 100;
                    $coin = $paytable[$scatter][$scatterCount] * $lines;
                    $scattersWin = $coin * $betLine;
                    $winline = [0, $scatter, $scatterCount, $lines, $scattersWin, $coin, array_fill(0, $scatterCount, $scatter), $scatterPos];
                    // $lineWins[] = $winline;
                }

                $totalWin += $scattersWin;

                if($minTotalWin == -1 && $freespinsWon == 0 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minFreespinsWon = $freespinsWon;
                    $minReels = $reels;
                    $minScatterCount = $scatterCount;
                    $minBonusCount = $bonusCount;
                }

                if($this->debug)
                {
                    $spinAcquired = true;
                    break;
                }

                if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none') || ($winType == 'bonus' && $freespinsWon > 0)))
                {
                    $spinAcquired = true;
                    if($totalWin < 0.4 * $spinWinLimit && $winType != 'bonus')
                        $spinAcquired = false;
                    if($spinAcquired)
                        break;                                        
                }                                          
                else if( $winType == 'none' && $totalWin == $gameWin ) 
                {
                    $spinAcquired = true;
                    break;
                }
            }

            if(!$spinAcquired || ($winType != 'bonus' && $scatterCount > 2))
            {                
                $reels = $minReels;
                $lineWins = $minLineWins;
                $totalWin = $minTotalWin;
                $freespinsWon = $minFreespinsWon;
                $scatterCount = $minScatterCount;
                $bonusCount = $minBonusCount;
            }

            $winlineCnt = count($lineWins);

            $coins = 0;

            $nWinLines = [];
            $nWinLinesDetail = [];
            $nWinDetail = [];
            $nWinCards = array_fill(0, 15, false);

            $rightWinPos = -1;
            if($winlineCnt > 0)
            {
                foreach($lineWins as $lineWin)
                {
                    $nWinLines[] = $lineWin[0];                    
                    $nWinDetail[] = $this->getCreditNumber($lineWin[4]);
                    $winlineDetail = [];
                    if($rightWinPos < $lineWin[2])
                        $rightWinPos = $lineWin[2];
                    for($r = 0; $r < $lineWin[2]; $r++)
                    {
                        $c = $lineWin[7][$r];
                        $pos = $c * 5 + $r;
                        $winlineDetail[] = $pos;
                        $nWinCards[$pos] = true;
                    }
                    $nWinLinesDetail[] = $winlineDetail;
                }
            }

            //check x freespin
            $miniFreespinsWon = 0;
            for($r = 1; $r <= 5; $r++)
            {
                if(in_array($trumph, $reels['reel'.$r]))
                {
                    if($r <= $rightWinPos + 1)
                        $miniFreespinsWon++;
                }
            }

            if($totalWin > 0)
            {
                $slotSettings->SetWin($totalWin);
                $slotSettings->SetBalance($totalWin);
            }

            $linearReels = [];
            for($c = 0; $c < 3; $c++)
                for($r = 1; $r <= 5; $r++)
                {
                    $linearReels[] = $reels['reel'.$r][$c];
                }

            $response = [
                'ResultCode' => 1,
                'ResultData' => [
                    'userscore' => $this->getCreditNumber($slotSettings->GetBalance()),
                    'winscore' => $this->getCreditNumber($totalWin),
                    'viewarray' => [
                        'code' => 2,
                        'nHandCards' => $linearReels,
                        'nWinLines' => $nWinLines,
                        'nWinLinesDetail' => $nWinLinesDetail,
                        'nWinDetail' => $nWinDetail,
                        'nBet' => $this->getCreditNumber($allbet),
                        'win' => $this->getCreditNumber($totalWin),
                        'nWinCards' => $nWinCards,
                        'nStackCards' => 0,
                        'nChangeCards' => [],
                        'fMultiple' => 1,
                        'nBetTime' => time(),
                        'getFreeTime' => [
                            'bFlag' => false,
                            'freeType' => 0,
                            'nFreeTime' => 0,
                            'win' => 0
                        ],
                        'is_free' => false,
                        'user_score' => $this->getCreditNumber($slotSettings->GetBalance())
                    ],
                    'winfreeCount' => 0,
                    'freeCount' => 0,
                    'freeTotal' => 0,
                    'freeMultiple' => 1,
                    'score_pool' => 0
                ],
                'nGamblingWinPool' => $slotSettings->jpgs[0]->balance * 100
            ];
            
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', $coins);

            $slotSettings->SaveLogReport(json_encode($response), $allbet, $totalWin, $postData['slotEvent']);
            if($freespinsWon > 0)
            {
                //trigger freespin
                $coin = $paytable[$scatter][$scatterCount] * $lines;
                $scattersWin = $coin * $betLine;
                if($freespinsWon == 1)
                    $response['ResultData']['viewarray']['getFreeTime']['freeType'] = 1;
                $response['ResultData']['viewarray']['getFreeTime']['bFlag'] = true;
                $response['ResultData']['viewarray']['getFreeTime']['nFreeTime'] = $freespinsWon;
                $response['ResultData']['viewarray']['getFreeTime']['win'] = $this->getCreditNumber($scattersWin);
                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $freespinsWon);
                $frees = [];
                while($slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') > 0)
                {
                    $frees[] = $this->doFreeSpin($slotSettings, $data, $postData);
                }
                $response['ResultData']['viewarray']['frees'] = $frees;
                // $response['ResultData']['viewarray']['user_score'] = $this->getCreditNumber($slotSettings->GetBalance());
                $response['ResultData']['userscore'] = $this->getCreditNumber($slotSettings->GetBalance());
            }

            if($miniFreespinsWon > 0)
            {
                //trigger freespin
                $response['ResultData']['viewarray']['getFreeTime']['freeType'] = 1;
                $response['ResultData']['viewarray']['getFreeTime']['bFlag'] = true;
                $response['ResultData']['viewarray']['getFreeTime']['nFreeTime'] = $miniFreespinsWon;
                $response['ResultData']['viewarray']['getFreeTime']['win'] = 0;
                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $miniFreespinsWon);
                $frees = [];
                while($slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') > 0)
                {
                    $frees[] = $this->doFreeSpin($slotSettings, $data, $postData);
                }
                $response['ResultData']['viewarray']['frees'] = $frees;
                // $response['ResultData']['viewarray']['user_score'] = $this->getCreditNumber($slotSettings->GetBalance());
                $response['ResultData']['userscore'] = $this->getCreditNumber($slotSettings->GetBalance());
            }
            
            $response = json_encode($response);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastResponse', $response);            
            return $response;
        }

        function doFreeSpin($slotSettings, $data, $postData)
        {
            $postData['slotEvent'] = 'freespin';
            $lines = 15;
            $coinValue = $data['nBetList'][0] / 100;

            $allbet = $coinValue * $lines;

            $linesId = $slotSettings->GetPaylines($lines);
            $betLine = $coinValue;

            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];

            if($this->debug)
            {
                $winType = 'win';
                $spinWinLimit = 10;
            }

            $spinAcquired = false;
            $gameWin = $slotSettings->GetGameData($slotSettings->slotId . 'GameWin');
            
            $minReels = [];
            $minLineWins = [];
            $minTotalWin = -1;
            $minFreespinsWon = 0;
            $minScatterCount = 0;

            $totalWin = 0;
            $freespinsWon = 0;
            $lineWins = [];
            $reels = [];
            
            $scatterCount = 0;
            $wild = [8];
            $paytable = $slotSettings->Paytable;
            $bonusMpl = 1;

            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $freespinsWon = 0;
                $scatterCount = 0;
                $lineWins = [];
                $cWins = array_fill(0, $lines, 0);
                
                $reels = $slotSettings->GetReelStrips($winType, $lines, $postData['slotEvent']);                
                
                for( $k = 0; $k < $lines; $k++ ) 
                {
                    $mpl = 1;
                    $winline = [];
                    for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                    {
                        $csym = $slotSettings->SymbolGame[$j];
                        if( !isset($paytable[$csym]) ) 
                        {
                        }
                        else
                        {
                            $s = [];
                            $p0 = $linesId[$k][0];
                            $p1 = $linesId[$k][1];
                            $p2 = $linesId[$k][2];
                            $p3 = $linesId[$k][3];
                            $p4 = $linesId[$k][4];

                            $s[0] = $reels['reel1'][$p0];
                            $s[1] = $reels['reel2'][$p1];
                            $s[2] = $reels['reel3'][$p2];
                            $s[3] = $reels['reel4'][$p3];
                            $s[4] = $reels['reel5'][$p4];

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild))) 
                            {   
                                $wildCnt = 0;                            
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][2];
                                $tmpWin = $paytable[$csym][2] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 2, $mpl, $tmpWin, $coin, [$s[0], $s[1], 0, 0, 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }
                                                                                
                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) ) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][3];
                                $tmpWin = $paytable[$csym][3] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 3, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], 0, 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild))  && ($s[3] == $csym || in_array($s[3], $wild)) ) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($s[3] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][4];
                                $tmpWin = $paytable[$csym][4] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 4, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], $s[3], 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild))) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($s[3] == $wild[0])   $wildCnt++;
                                if($s[4] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][5];
                                $tmpWin = $paytable[$csym][5] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 5, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], $s[3], $s[4]], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }                            
                        }
                    }

                    if( $cWins[$k] > 0 && !empty($winline))
                    {
                        array_push($lineWins, $winline);
                        $totalWin += $cWins[$k];
                    }
                }

                if($winType != 'bonus' && $scatterCount > 2)
                    continue;

                if($minTotalWin == -1 && $scatterCount < 3 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minFreespinsWon = $freespinsWon;
                    $minReels = $reels;
                    $minScatterCount = $scatterCount;
                }

                if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none') || ($winType == 'bonus' && $freespinsWon > 0)))
                {
                    $spinAcquired = true;
                    if($totalWin < 0.4 * $spinWinLimit && $winType != 'bonus')
                        $spinAcquired = false;
                    if($spinAcquired)
                        break;                                        
                }                                          
                else if( $winType == 'none' && $totalWin == $gameWin ) 
                {
                    $spinAcquired = true;
                    break;
                }
            }

            if(!$spinAcquired || ($winType != 'bonus' && $scatterCount > 2))
            {                
                $reels = $minReels;
                $lineWins = $minLineWins;
                $totalWin = $minTotalWin;
                $freespinsWon = $minFreespinsWon;
                $scatterCount = $minScatterCount;
            }

            $winlineCnt = count($lineWins);

            $nWinLines = [];
            $nWinLinesDetail = [];
            $nWinDetail = [];
            $nWinCards = array_fill(0, 15, false);

            if($winlineCnt > 0)
            {
                foreach($lineWins as $lineWin)
                {
                    $nWinLines[] = $lineWin[0];                    
                    $nWinDetail[] = $this->getCreditNumber($lineWin[4] / $bonusMpl);
                    $winlineDetail = [];
                    for($r = 0; $r < $lineWin[2]; $r++)
                    {
                        $c = $lineWin[7][$r];
                        $pos = $c * 5 + $r;
                        $winlineDetail[] = $pos;
                        $nWinCards[$pos] = true;
                    }
                    $nWinLinesDetail[] = $winlineDetail;
                }
            }
            if($totalWin > 0)
            {
                $slotSettings->SetWin($totalWin);
                $slotSettings->SetBalance($totalWin);
            }

            $linearReels = [];
            for($c = 0; $c < 3; $c++)
                for($r = 1; $r <= 5; $r++)
                {
                    $linearReels[] = $reels['reel'.$r][$c];
                }

            $response = [
                'code' => 2,
                'nHandCards' => $linearReels,
                'nWinLines' => $nWinLines,
                'nWinLinesDetail' => $nWinLinesDetail,
                'nWinDetail' => $nWinDetail,
                'nBet' => $this->getCreditNumber($allbet),
                'win' => $this->getCreditNumber($totalWin / $bonusMpl),
                'nWinCards' => $nWinCards,
                'nStackCards' => 0,
                'nChangeCards' => [],
                'fMultiple' => $bonusMpl,
                'nBetTime' => time(),
                'getFreeTime' => [
                    'bFlag' => false,
                    'freeType' => 0,
                    'nFreeTime' => 0,
                    'win' => 0
                ],
            ];

            //calculate diamond
            $xCount = 0;
            for($r = 0; $r < 5; $r++)
                for($c = 0; $c < 3; $c++)
                    if($reels['reel'.($r+1)][$c] == 9)
                        $xCount++;
            if($xCount > 0)
            {
                $response['getFreeTime']['freeType'] = 1;
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + 1);
            }                
            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1);            
            
            $json_response = json_encode($response);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastResponse', $json_response);
            $slotSettings->SaveLogReport($json_response, 0, $totalWin, $postData['slotEvent']);
            return $response;
        }

        function getCreditNumber($value)
        {
            return intval(number_format($value * 100, 0, '.', '')); 
        }
    }
}



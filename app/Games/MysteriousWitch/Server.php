<?php 
namespace VanguardLTE\Games\MysteriousWitch
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
                for($c = 0; $c < 4; $c++)
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
                                "nGamblingWinPool" => $this->getCreditNumber($slotSettings->jpgs[0]->balance)
                            ]
                        ];
                        return $response;
                        break;
                    case 'lottery':
                        $allbet = $data['nBetList'][0] / 100;
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
                    case 'pushGamblingWinPool':
                        $response = [
                            'ResultCode' => 1,
                            'nGamblingWinPool' => $this->getCreditNumber($slotSettings->jpgs[0]->balance)
                        ];
                        return $response;
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
            $lines = 50;
            $betIndex = $data['bet'];
            $allbet = $data['nBetList'][0] / 100;
            $betLine = ($betIndex + 1) / 100;

            $linesId = $slotSettings->GetPaylines($lines);
            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
            
            $spinAcquired = false;

            if($this->debug && $postData['slotEvent'] != 'freespin')
            {
                $winType = 'bonus';
            }

            $minReels = [];
            $minLineWins = [];
            $minTotalWin = -1;
            $minFreespinsWon = 0;
            $minScatterCount = 0;
            $minHoldnWin = 0;
            $minEmeraldCnt = 0;

            $totalWin = 0;
            $freespinsWon = 0;
            $lineWins = [];
            $reels = [];
            
            $scatter = 25;
            $scatterCount = 0;
            $bonusCount = 0;
            $wild = [24];
            $paytable = $slotSettings->Paytable;
            $holdnWin = 0;
            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $emeraldCnt = 0;
                $freespinsWon = 0;
                $scatterCount = 0;
                $bonusCount = 0;
                $scatterPos = [];
                $lineWins = [];
                $cWins = array_fill(0, $lines, 0);
                
                $reels = $slotSettings->GetReelStrips($winType, $lines);                
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
                                $mpl = 1;
                                
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
                                $mpl = 1;
                                
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
                                $mpl = 1;
                                
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
                                $mpl = 1;
                                
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
                    for($c = 0; $c < 4; $c++)
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

                //check freespin
                $scattersWin = 0;
                if($scatterCount > 2)
                {
                    $freespinsWon = 5;                    
                    $scattersWin = 0;
                    // $winline = [0, $scatter, $scatterCount, $lines, $scattersWin, $coin, array_fill(0, $scatterCount, $scatter), $scatterPos];
                    // $lineWins[] = $winline;
                }
                $totalWin += $scattersWin;

                //check holdn                
                $holdnWin = 0;
                for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < 4; $c++)
                    {
                        if($this->isHoldnSymbol($reels['reel'.($r+1)][$c]))
                        {
                            $emeraldCnt++;
                            $val = $reels['reel'.($r+1)][$c];
                            $holdnWin += $slotSettings->emeraldPays[$val] * $allbet;
                        }
                    }

                if($emeraldCnt < 4)
                    $holdnWin = 0;

                if($emeraldCnt >= 4 && $winType != 'bonus')
                    continue;
                if($emeraldCnt >= 4 && $scatterCount > 2)
                    continue;

                $totalWin += $holdnWin;
                if($minTotalWin == -1 && $scatterCount < 3 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minFreespinsWon = $freespinsWon;
                    $minReels = $reels;
                    $minScatterCount = $scatterCount;
                    $minBonusCount = $bonusCount;
                    $minEmeraldCnt = $emeraldCnt;
                    $minHoldnWin = $holdnWin;
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
                else if( $winType == 'none' && $totalWin == 0 ) 
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
                $emeraldCnt = $minEmeraldCnt;
                $holdnWin = $minHoldnWin;
            }

            $winlineCnt = count($lineWins);

            $coins = 0;

            $nWinLines = [];
            $nWinLinesDetail = [];
            $nWinDetail = [];
            $nWinCards = array_fill(0, 20, false);

            if($winlineCnt > 0)
            {
                foreach($lineWins as $lineWin)
                {
                    $nWinLines[] = $lineWin[0];                    
                    $nWinDetail[] = $this->getCreditNumber($lineWin[4]);
                    $winlineDetail = [];
                    for($r = 0; $r < $lineWin[2]; $r++)
                    {
                        $c = $lineWin[7][$r];
                        $pos = (3 - $c) * 5 + $r;
                        $winlineDetail[] = $pos;
                        $nWinCards[$pos] = true;
                    }
                    $nWinLinesDetail[] = $winlineDetail;
                }
            }
            if($totalWin > 0)
            {
                $slotSettings->SetWin($totalWin);
                if($holdnWin > 0) //holdnwin is calculated at the last
                    $totalWin -= $holdnWin; 
                $slotSettings->SetBalance($totalWin);
            }

            $linearReels = [];
            for($c = 3; $c >= 0; $c--)
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
                        'getFirelink' => [
                            'bFalg' => false,
                            'win' => 0
                        ],
                        'is_free' => false,
                        'user_score' => $this->getCreditNumber($slotSettings->GetBalance())
                    ],
                    'winfreeCount' => 0,
                    'freeCount' => 0,
                    'freeTotal' => 0,
                    'freeMultiple' => 1,
                    'score_pool' => 0,                    
                ],
                'nGamblingWinPool' => $this->getCreditNumber($slotSettings->jpgs[0]->balance)
            ];
            
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', $coins);

            $slotSettings->SaveLogReport(json_encode($response), $allbet, $totalWin, $postData['slotEvent']);
            if($freespinsWon > 0)
            {
                //trigger freespin                
                $response['ResultData']['viewarray']['getFreeTime']['bFlag'] = true;
                $response['ResultData']['viewarray']['getFreeTime']['nFreeTime'] = $freespinsWon;
                $response['ResultData']['viewarray']['getFreeTime']['win'] = $this->getCreditNumber($scattersWin);
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeMultiplier', 2);
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeDiamond', 0);
                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $freespinsWon);
                $frees = [];
                for($i = 0; $i < $freespinsWon; $i++)
                    $frees[] = $this->doFreeSpin($slotSettings, $data, $postData);
                $response['ResultData']['viewarray']['frees'] = $frees;
                $response['ResultData']['userscore'] = $this->getCreditNumber($slotSettings->GetBalance());
            }            
            
            if($emeraldCnt >= 4)
            {
                //trigger holdn                
                $link = [
                    'startIdx' => [],
                    'turns' => [],
                    'win' => 0,
                    'nBet' => $this->getCreditNumber($allbet),
                    'fireballNum' => 0,
                    'jackpot' => $this->getCreditNumber($slotSettings->jpgs[0]->balance)
                ];

                for($r = 0; $r < 5; $r++)
                {
                    for($c = 0; $c < 4; $c++)
                    {
                        if($this->isHoldnSymbol($reels['reel'.($r+1)][$c]))
                        {
                            $pos = (3 - $c) * 5 + $r;
                            $link['startIdx'][$pos] = $reels['reel'.($r+1)][$c] - 1;
                        }
                    }
                }
                //insert empty reels
                for($r = 0; $r < 5; $r++)
                {
                    for($c = 0; $c < 4; $c++)
                        $reels['reel'.($r+1)][] = -1;
                }
                $slotSettings->SetGameData($slotSettings->slotId . 'LastReels', $reels);
                
                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentHoldn', 0);
                $slotSettings->SetGameData($slotSettings->slotId . 'TotalHoldn', 3);

                while($slotSettings->GetGameData($slotSettings->slotId . 'TotalHoldn') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentHoldn') > 0)
                {
                    $this->doHoldnSpin($slotSettings, $data, $postData, $link);
                }
                $response['ResultData']['viewarray']['getFirelink']['firelink'] = $link;
                $response['ResultData']['viewarray']['getFirelink']['bFlag'] = true;
                $response['ResultData']['viewarray']['getFirelink']['win'] = $link['win'];
                $response['ResultData']['userscore'] = $this->getCreditNumber($slotSettings->GetBalance());
            }
            $response = json_encode($response);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastResponse', $response);        
            return $response;
        }

        function doHoldnSpin($slotSettings, $data, $postData, &$linkData)
        {
            $postData['slotEvent'] = 'holdn';
            $allbet = $data['nBetList'][0] / 100;

            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];

            if($this->debug)
            {
                $winType = 'win';
                $spinWinLimit = 10;
            }

            $spinAcquired = false;
            
            $minReels = [];
            $minTotalWin = -1;
            $minNewHoldnCnt = 0;
            $minNewHoldn = [];

            $totalWin = 0;
            $reels = [];
            
            $scatterCount = 0;

            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $scatterCount = 0;
                $lineWins = [];
                
                $reels = $slotSettings->GetReelStripsHoldn($winType);                
                $lastReels = $slotSettings->GetGameData($slotSettings->slotId . 'LastReels');

                $newHoldnCnt = 0;
                $newHoldn = [];
                //receover emeralds from last reels
                for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < 4; $c++)
                    {
                        if($this->isHoldnSymbol($reels['reel'.($r+1)][$c]) && !$this->isHoldnSymbol($lastReels['reel'.($r+1)][$c]))
                        {
                            $pos = (7 - $c) * 5 + $r;
                            $val = $reels['reel'.($r+1)][$c];
                            $newHoldn[$pos] = [$val];
                            $newHoldnCnt++;                            
                        }
                        if($this->isHoldnSymbol($lastReels['reel'.($r+1)][$c]))
                        {
                            $reels['reel'.($r+1)][$c] = $lastReels['reel'.($r+1)][$c];
                        }
                    }

                    for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < 8; $c++)
                    {                      
                        if($this->isHoldnSymbol($reels['reel'.($r+1)][$c]))
                        {
                            if(!$this->isHoldnSymbol($lastReels['reel'.($r+1)][$c]))
                            {
                                $val = $reels['reel'.($r+1)][$c];                            
                                $totalWin += $allbet * $slotSettings->emeraldPays[$val];                                
                            }
                        }
                    }
                
                if($winType != 'bonus' && $scatterCount > 2)
                    continue;

                if($minTotalWin == -1 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minReels = $reels;
                    $minNewHoldnCnt = $newHoldnCnt;
                    $minNewHoldn = $newHoldn;
                }

                if($totalWin <= $spinWinLimit)
                {
                    $spinAcquired = true;
                    break;                                        
                }                                          
                else if( $winType == 'none' && $totalWin == 0 ) 
                {
                    $spinAcquired = true;
                    break;
                }
            }

            if(!$spinAcquired)
            {                
                $reels = $minReels;
                $lineWins = $minLineWins;
                $totalWin = $minTotalWin;
                $newHoldnCnt = $minNewHoldnCnt;
                $newHoldn = $minNewHoldn;
            }
           

            $slotSettings->SetGameData($slotSettings->slotId . 'LastReels', $reels);
            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentHoldn', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentHoldn') + 1);
            
            if($totalWin > 0)
            {
                $slotSettings->SetWin($totalWin);                
                $slotSettings->SetGameData($slotSettings->slotId . 'TotalHoldn', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentHoldn') + 3);
            }

            $linkData['turns'][] = $newHoldn;
            if ($slotSettings->GetGameData($slotSettings->slotId . 'TotalHoldn') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentHoldn') == 0)
            {
                $emeraldCnt = 0;
                for($r = 0; $r < 5; $r++)
                for($c = 0; $c < 4; $c++)
                {                      
                    if($this->isHoldnSymbol($reels['reel'.($r+1)][$c]))
                    {
                        $emeraldCnt++;
                    }
                }
                
                $activeLine = 3;
                if($emeraldCnt >= 8)                    
                    $activeLine = 4;
                if($emeraldCnt >= 12)
                    $activeLine = 5;
                if($emeraldCnt >= 16)
                    $activeLine = 6;
                if($emeraldCnt >= 20)
                    $activeLine = 7;

                $win = 0;
                for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < 4; $c++)
                    {
                        if($this->isHoldnSymbol($reels['reel'.($r+1)][$c]))
                        {
                            $val = $reels['reel'.($r+1)][$c];
                            if($r <= $activeLine)
                                $win += $allbet * $slotSettings->emeraldPays[$val];                            
                        }
                    }
                $slotSettings->SetBalance($win);
                $linkData['win'] = $this->getCreditNumber($win);
                $linkData['fireballNum'] = $emeraldCnt;
                $slotSettings->SaveLogReport(json_encode($linkData), 0, $win, $postData['slotEvent']);             
            }            
        }

        function doFreeSpin($slotSettings, $data, $postData)
        {
            $postData['slotEvent'] = 'freespin';
            $lines = 50;
            $betIndex = $data['bet'];
            $allbet = $data['nBetList'][0] / 100;
            $betLine = ($betIndex + 1) / 100;

            $linesId = $slotSettings->GetPaylines($lines);
            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];

            if($this->debug)
            {
                $winType = 'win';
                $spinWinLimit = 10;
            }

            $freespinLeft = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
            if($freespinLeft > 0)
                $spinWinLimit /= $freespinLeft;

            $spinAcquired = false;
            $gameWin = $slotSettings->GetGameData($slotSettings->slotId . 'GameWin');
            
            $minReels = [];
            $minLineWins = [];
            $minTotalWin = -1;
            $minFreespinsWon = 0;
            $minScatterCount = 0;
            $minBonusSym = [];

            $totalWin = 0;
            $freespinsWon = 0;
            $lineWins = [];
            $reels = [];
            
            $scatterCount = 0;
            $wild = [24];
            $paytable = $slotSettings->Paytable;
            $bonusMpl = 1;

            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $freespinsWon = 0;
                $scatterCount = 0;
                $lineWins = [];
                $cWins = array_fill(0, $lines, 0);
                $wild = [24];
                $bonusSym = -1;    
                $reels = $slotSettings->GetReelStrips($winType, $lines, $postData['slotEvent']);
                
                if(rand(0, 100) < 90)
                {
                    $bonusSym = $reels['reel'.rand(1,3)][rand(0, 3)];
                    $wild[] = $bonusSym;
                }

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
                                $mpl = 1;
                                
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
                                $mpl = 1;
                                
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
                                $mpl = 1;
                               
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
                                $mpl = 1;
                                
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

                if($minTotalWin == -1 && $scatterCount < 4 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minFreespinsWon = $freespinsWon;
                    $minReels = $reels;
                    $minScatterCount = $scatterCount;
                    $minBonusSym = $bonusSym;
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
                $bonusSym = $minBonusSym;
            }       

            $winlineCnt = count($lineWins);

            $nWinLines = [];
            $nWinLinesDetail = [];
            $nWinDetail = [];
            $nWinCards = array_fill(0, 20, false);

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
                        $pos = (3 - $c) * 5 + $r;
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
            for($c = 3; $c >= 0; $c--)
                for($r = 1; $r <= 5; $r++)
                {
                    $linearReels[] = $reels['reel'.$r][$c];
                }

            $nChangeCards = [];
            if($bonusSym != -1)
            {
                $nChangeCards = ['cards' => [$bonusSym-1]];
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
                'nChangeCards' => $nChangeCards,
                'fMultiple' => $bonusMpl,
                'nBetTime' => time(),
                'getFreeTime' => [
                    'bFlag' => false,
                    'freeType' => 0,
                    'nFreeTime' => 0,
                    'win' => 0
                ],               
                'getFirelink' => [
                    'bFalg' => false,
                    'win' => 0
                ]
            ];

            //calculate diamond
            $diamond = 0;
            for($r = 0; $r < 5; $r++)
                for($c = 0; $c < 4; $c++)
                    if($reels['reel'.($r+1)][$c] == $wild[0])
                        $diamond++;

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

        function isHoldnSymbol($value)
        {
            if($value >= 11 && $value <= 20)
                return true;
            else
                return false;
        }
    }
}



<?php 
namespace VanguardLTE\Games\TripleSevens
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
                        $lines = 8;
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
            $lines = 8;
            $coinValue = $data['nBetList'][0] / 100;
            $allbet = $coinValue * $lines;
            $linesId = $slotSettings->GetPaylines($lines);
            $betLine = $coinValue;

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

            $totalWin = 0;
            $lineWins = [];
            $reels = [];
            
            $scatterCount = 0;
            $paytable = $slotSettings->Paytable;
            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $scatterCount = 0;
                $lineWins = [];
                $cWins = array_fill(0, $lines, 0);
                
                $reels = $slotSettings->GetReelStrips($winType, $lines);
                
                $sevens = [10,11,12];
                $bars = [6,7,8];
                for( $k = 0; $k < $lines; $k++ ) 
                {
                    $winline = [];
                    $payline = $linesId[$k];
                    for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                    {
                        $csym = $slotSettings->SymbolGame[$j];
                        if(isset($paytable[$csym]))
                        {                            
                            $cnt = 0;
                            for($r = 0; $r < 9; $r++)
                            {
                                if($payline[$r] == 1 && $reels[$r] != $csym)
                                    break;
                                if($payline[$r] == 1 && $reels[$r] == $csym)
                                    $cnt++;
                            }
                            if($cnt > 0)
                            {
                                $tmpWin = $paytable[$csym][$cnt] * $betLine;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;
                                    $winline = [$k, $csym, $cnt, $tmpWin, $payline];
                                }
                            }                            
                        }
                    }

                    //check any sevens
                    $cnt = 0;
                    for($r = 0; $r < 9; $r++)
                    {
                        if($payline[$r] == 1 && !in_array($reels[$r], $sevens))
                            break;
                        if($payline[$r] == 1 && in_array($reels[$r], $sevens))
                            $cnt++;
                    }
                    if($cnt == 3)
                    {
                        $tmpWin = $paytable[14][$cnt] * $betLine;
                        if( $cWins[$k] < $tmpWin )
                        {
                            $cWins[$k] = $tmpWin;
                            $winline = [$k, $csym, $cnt, $tmpWin, $payline];
                        }
                    }

                    //check any bars
                    $cnt = 0;
                    for($r = 0; $r < 9; $r++)
                    {
                        if($payline[$r] == 1 && !in_array($reels[$r], $bars))
                            break;
                        if($payline[$r] == 1 && in_array($reels[$r], $bars))
                            $cnt++;
                    }
                    if($cnt == 3)
                    {
                        $tmpWin = $paytable[15][$cnt] * $betLine;
                        if( $cWins[$k] < $tmpWin )
                        {
                            $cWins[$k] = $tmpWin;
                            $winline = [$k, $csym, $cnt, $tmpWin, $payline];
                        }
                    }

                    if( $cWins[$k] > 0 && !empty($winline))
                    {
                        array_push($lineWins, $winline);
                        $totalWin += $cWins[$k];
                    }
                }
                
                if($minTotalWin == -1 && $scatterCount < 3 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minReels = $reels;
                }

                if($this->debug)
                {
                    $spinAcquired = true;
                    break;
                }                    

                if($totalWin <= $spinWinLimit)
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

            if(!$spinAcquired)
            {                
                $reels = $minReels;
                $lineWins = $minLineWins;
                $totalWin = $minTotalWin;
            }

            $winlineCnt = count($lineWins);

            $coins = 0;

            $nWinLines = [];
            $nWinLinesDetail = [];
            $nWinDetail = [];
            $nWinCards = array_fill(0, 15, false);

            if($winlineCnt > 0)
            {
                foreach($lineWins as $lineWin)
                {
                    $nWinLines[] = $lineWin[0];                    
                    $nWinDetail[] = $this->getCreditNumber($lineWin[3]);
                    $winlineDetail = [];
                    $cnt = 0;
                    $payline = $lineWin[4];
                    for($r = 0; $r < 9; $r++)
                    {
                        if($payline[$r] == 1 && $cnt < $lineWin[2])
                        {
                            $winlineDetail[] = $r;
                            $nWinCards[$r] = true;
                        }
                    }
                    $nWinLinesDetail[] = $winlineDetail;
                }
            }
            if($totalWin > 0)
            {
                $slotSettings->SetWin($totalWin);
                $slotSettings->SetBalance($totalWin);
            }

            $response = [
                'ResultCode' => 1,
                'ResultData' => [
                    'userscore' => $this->getCreditNumber($slotSettings->GetBalance()),
                    'winscore' => $this->getCreditNumber($totalWin),
                    'viewarray' => [
                        'code' => 2,
                        'nHandCards' => $reels,
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
                ]
            ];
            
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', $coins);

            $slotSettings->SaveLogReport(json_encode($response), $allbet, $totalWin, $postData['slotEvent']);
            $response = json_encode($response);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastResponse', $response);        
            return $response;
        }
        
        function getCreditNumber($value)
        {
            return intval(number_format($value * 100, 0, '.', '')); 
        }
    }
}



<?php 
namespace VanguardLTE\Games\FortuneCashNG
{

set_time_limit(5);
    class Server
    {
        public function get($request, $game)
        {
            function get_($request, $game)
            {
                \DB::transaction(function() use ($request, $game)
                {
                    try
                    {
                        $debug = false;
                        $userId = \Auth::id();
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
                        $postData = json_decode(trim(file_get_contents('php://input')), true);
                        $result_tmp = [];
                        if( isset($postData['gameData']) ) 
                        {
                            $postData = $postData['gameData'];
                            $reqId = $postData['cmd'];
                            if( !isset($postData['cmd']) ) 
                            {
                                $response = '{"responseEvent":"error","responseType":"","serverResponse":"incorrect action"}';
                                exit( $response );
                            }
                        }
                        else
                        {
                            $reqId = $postData['action'];
                        }
                        if( $reqId == 'SpinRequest' ) 
                        {
                            if( $postData['data']['coin'] <= 0 || $postData['data']['bet'] <= 0 ) 
                            {
                                $response = '{"responseEvent":"error","responseType":"","serverResponse":"invalid bet state"}';
                                exit( $response );
                            }
                            if( $slotSettings->GetBalance() < ($postData['data']['coin'] * $postData['data']['bet'] * 20) && $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= 0 ) 
                            {
                                $response = '{"responseEvent":"error","responseType":"","serverResponse":"invalid balance"}';
                                exit( $response );
                            }
                        }
                        switch( $reqId ) 
                        {
                            case 'InitRequest':
                                $result_tmp[0] = '{"action":"InitResponce","result":true,"sesId":"a40e5dc15a83a70f288e421fbcfc6de8","data":{"id":16183084}}';
                                exit( $result_tmp[0] );
                                break;
                            case 'EventsRequest':
                                $result_tmp[0] = '{"action":"EventsResponce","result":true,"sesId":"a40e5dc15a83a70f288e421fbcfc6de8","data":[]}';
                                exit( $result_tmp[0] );
                                break;
                            case 'APIVersionRequest':
                                $result_tmp[] = '{"action":"APIVersionResponse","result":true,"sesId":false,"data":{"router":"v3.12","transportConfig":{"reconnectTimeout":500000000000}}}';
                                break;
                            case 'PickBonusItemRequest':
                                $isMoneyBag = $slotSettings->GetGameData($slotSettings->slotId . 'MoneyBagActive');
                                $index = $postData['data']['index'] - 1;
                                $allbet = $slotSettings->GetGameData($slotSettings->slotId . 'AllBet');
                                $winTypeTmp = $slotSettings->GetSpinSettings('freespin', $allbet, 1);
                                $spinWinLimit = $winTypeTmp[1];
                                if($isMoneyBag)
                                {                                    
                                    $minWin = -1;
                                    $minMultipliers = []; 
                                    $multipliers = [];
                                    $spinAcquired = false;
                                    $reels = $slotSettings->GetGameData($slotSettings->slotId . 'LastReels');
                                    for($i = 0; $i < 500; $i++)
                                    {
                                        $multipliers = [];
                                        $multipliers[] = rand(3, 20);
                                        $multipliers[] = rand(21, 35);
                                        $multipliers[] = rand(36, 50);
                                        shuffle($multipliers);
                                        
                                        $mul = $multipliers[$index];
                                        $win = $mul * $allbet;
                                        if($minWin == -1 || $win < $minWin)
                                        {
                                            $minWin = $win;
                                            $minMultipliers = $multipliers;
                                        }
                                        if($win < $spinWinLimit)
                                        {
                                            $spinAcquired = true;                                            
                                        }
                                    }

                                    if(!$spinAcquired)
                                    {
                                        $win = $minWin;
                                        $multipliers = $minMultipliers;
                                    }

                                    $slotSettings->SetBalance($win);
                                    $slotSettings->SetBank('bonus', -1 * $win, 'bonus');
                                    $slotSettings->SetWin($win);
                                    $slotSettings->SaveLogReport('NULL', 0, $win, 'BG');
                                    $slotSettings->SetGameData($slotSettings->slotId . 'MoneyBagActive', 0);

                                    $res = [
                                        'action'=>'PickBonusItemResponse',
                                        'data' => [
                                            'bonusItem' => [
                                                'index' => $index + 1,
                                                'picked' => 'true',
                                                'type' => 'BonusItem',
                                                'value' => $win
                                            ],
                                            'canGamble' => 'false',
                                            'gameParameters' => [
                                                'initialSymbols' => [
                                                    [$reels['reel1'][0], $reels['reel2'][0], $reels['reel3'][0], $reels['reel4'][0], $reels['reel5'][0]],
                                                    [$reels['reel1'][1], $reels['reel2'][1], $reels['reel3'][1], $reels['reel4'][1], $reels['reel5'][1]],
                                                    [$reels['reel1'][2], $reels['reel2'][2], $reels['reel3'][2], $reels['reel4'][2], $reels['reel5'][2]],
                                                ]
                                            ],
                                            'items' => [
                                                    [
                                                        'index' => 1,
                                                        'picked' => $index == 0 ? 'true' : 'false',
                                                        'type' => 'BonusItem',
                                                        'value' => number_format($multipliers[0] * $allbet, 2)
                                                    ],
                                                    [
                                                        'index' => 2,
                                                        'picked' => $index == 1 ? 'true' : 'false',
                                                        'type' => 'BonusItem',
                                                        'value' => number_format($multipliers[1] * $allbet, 2)
                                                    ],
                                                    [
                                                        'index' => 3,
                                                        'picked' => $index == 2 ? 'true' : 'false',
                                                        'type' => 'BonusItem',
                                                        'value' => number_format($multipliers[2] * $allbet, 2)
                                                    ]
                                                ],
                                            'lastPick' => 'true',
                                            'params' => '',
                                            'state' => 'Ready'
                                        ],
                                        'result' => 'true',
                                        'sesId' => 0
                                    ];

                                    // $lastFreespinRemain = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                    // if($lastFreespinRemain > 0) //check if last spin was bonus free spin
                                    // {                                            
                                    //     $bonusLine = '{"type":"Bonus","bonusName":"FreeSpins","params":{"freeSpins": "'.$lastFreespinRemain.'"},"amount":"0.00","wonSymbols":""}';
                                    //     array_push($lineWins, $bonusLine);
                                    // }
                                    
                                    $result_tmp[] = json_encode($res);
                                    break;
                                }
                                
                                $wheelArr = [
                                    3, 
                                    2500, 
                                    2, 
                                    13, 
                                    9, 
                                    1, 
                                    7, 
                                    20, 
                                    4, 
                                    50, 
                                    6, 
                                    15, 
                                    3, 
                                    1, 
                                    8, 
                                    25, 
                                    5, 
                                    50, 
                                    2, 
                                    10, 
                                    6, 
                                    1, 
                                    8, 
                                    30, 
                                    4, 
                                    50, 
                                    5, 
                                    1, 
                                    38, 
                                    9
                                ];
                                
                                $win = 0;
                                $curMpl = 0;
                                $params = '""';
                                $state = 'Ready';
                                for( $i = 0; $i <= 2000; $i++ ) 
                                {
                                    $curPos = rand(0, 29);            
                                    if($debug)
                                        $curPos = 5;                                      
                                    $curMpl = $wheelArr[$curPos];
                                    
                                    if( $allbet * $curMpl <= $spinWinLimit ) 
                                    {
                                        $win = $allbet * $curMpl;
                                        if( $curMpl == 1 ) 
                                        {
                                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + 12);
                                            // $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                            $params = '{"freeSpins":"12","freeSpinsTotal":'.$slotSettings->GetGameData($slotSettings->slotId . 'FreeGames').'}';
                                            $state = 'FreeSpins';
                                        }
                                        break;
                                    }
                                }
                                if($win == 0)
                                {
                                    $curPos = 2;
                                    $curMpl = $wheelArr[$curPos];
                                    $win = $allbet * $curMpl;
                                }
                                $slotSettings->SetBalance($win);
                                $slotSettings->SetBank('bonus', -1 * $win, 'bonus');
                                $slotSettings->SetWin($win);
                                $slotSettings->SaveLogReport('NULL', 0, $win, 'BG');
                                $result_tmp[] = '{"action":"PickBonusItemResponse","result":"true","sesId":"10000134858","data":{"state":"' . $state . '","lastPick":"true","items":[{"type":"BonusItem","index":"' . ($curPos + 1) . '","value":"' . $win . '","picked":"true"}],"bonusItem":{"type":"BonusItem","index":"' . ($curPos + 1) . '","value":"' . $win . '","picked":"true"},"params":' . $params . ',"canGamble":"false"}}';
                                break;
                            case 'CheckBrokenGameRequest':
                                $result_tmp[] = '{"action":"CheckBrokenGameResponse","result":"true","sesId":"false","data":{"haveBrokenGame":"false"}}';
                                break;
                            case 'AuthRequest':
                                
                                $lastEvent = $slotSettings->GetHistory();
                                if( $lastEvent != 'NULL' ) 
                                {
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $lastEvent->serverResponse->bonusWin);
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $lastEvent->serverResponse->totalFreeGames);
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $lastEvent->serverResponse->currentFreeGames);
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $lastEvent->serverResponse->bonusWin);
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $lastEvent->serverResponse->BonusSymbol);
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                                    // $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                                    $rp1 = implode(',', $lastEvent->serverResponse->reelsSymbols->rp);
                                    $rp2 = '[' . $lastEvent->serverResponse->reelsSymbols->reel1[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel2[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel3[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel4[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel5[0] . ']';
                                    $rp2 .= (',[' . $lastEvent->serverResponse->reelsSymbols->reel1[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel2[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel3[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel4[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel5[1] . ']');
                                    $rp2 .= (',[' . $lastEvent->serverResponse->reelsSymbols->reel1[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel2[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel3[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel4[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel5[2] . ']');
                                    $bet = $lastEvent->serverResponse->slotBet * 100 * 20;
                                }
                                else
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                                    $rp1 = implode(',', [
                                        rand(0, count($slotSettings->reelStrip1) - 3), 
                                        rand(0, count($slotSettings->reelStrip2) - 3), 
                                        rand(0, count($slotSettings->reelStrip3) - 3)
                                    ]);
                                    $rp_1 = rand(0, count($slotSettings->reelStrip1) - 3);
                                    $rp_2 = rand(0, count($slotSettings->reelStrip2) - 3);
                                    $rp_3 = rand(0, count($slotSettings->reelStrip3) - 3);
                                    $rp_4 = rand(0, count($slotSettings->reelStrip4) - 3);
                                    $rp_5 = rand(0, count($slotSettings->reelStrip5) - 3);
                                    $rr1 = $slotSettings->reelStrip1[$rp_1];
                                    $rr2 = $slotSettings->reelStrip2[$rp_2];
                                    $rr3 = $slotSettings->reelStrip3[$rp_3];
                                    $rr4 = $slotSettings->reelStrip4[$rp_4];
                                    $rr5 = $slotSettings->reelStrip5[$rp_5];
                                    $rp2 = '[' . $rr1 . ',' . $rr2 . ',' . $rr3 . ',' . $rr4 . ',' . $rr5 . ']';
                                    $rr1 = $slotSettings->reelStrip1[$rp_1 + 1];
                                    $rr2 = $slotSettings->reelStrip2[$rp_2 + 1];
                                    $rr3 = $slotSettings->reelStrip3[$rp_3 + 1];
                                    $rr3 = $slotSettings->reelStrip4[$rp_4 + 1];
                                    $rr3 = $slotSettings->reelStrip5[$rp_5 + 1];
                                    $rp2 .= (',[' . $rr1 . ',' . $rr2 . ',' . $rr3 . ',' . $rr4 . ',' . $rr5 . ']');
                                    $rr1 = $slotSettings->reelStrip1[$rp_1 + 2];
                                    $rr2 = $slotSettings->reelStrip2[$rp_2 + 2];
                                    $rr3 = $slotSettings->reelStrip3[$rp_3 + 2];
                                    $rr3 = $slotSettings->reelStrip4[$rp_4 + 2];
                                    $rr3 = $slotSettings->reelStrip5[$rp_5 + 2];
                                    $rp2 .= (',[' . $rr1 . ',' . $rr2 . ',' . $rr3 . ',' . $rr4 . ',' . $rr5 . ']');
                                    $bet = $slotSettings->Bet[0] * 100 * 20;
                                }
                                if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') == $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ) 
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                }
                                $restoreString = '';
                                $defaultBet = $slotSettings->GetGameData($slotSettings->slotId . 'BetLine');
                                if($defaultBet == 0)
                                    $defaultBet = 1;
                                if( $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') < $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ) 
                                {
                                    $fBonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                                    $fTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                    $fCurrent = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                    $fRemain = $fTotal - $fCurrent;
                                    $restoreString = ',"restoredGameCode":"174","lastResponse":{"spinResult":{"type":"SpinResult","rows":[' . $rp2 . ']},"freeSpinsTotal":"' . $fTotal . '","freeSpinRemain":"' . $fRemain . '","totalBonusWin":"' . $fBonusWin . '","state":"FreeSpins","expandingSymbols":["1"]}';
                                }
                                $result_tmp[0] = '{"action":"AuthResponse","result":"true","sesId":"10000404992","data":{"snivy":"proxy v6.10.48 (API v4.23)","supportedFeatures":["Offers","Jackpots","InstantJackpots","SweepStakes"],"sessionId":"10000404992","defaultLines":["0"],"bets":'.json_encode($slotSettings->GetBets()).',"betMultiplier":"20.0000000","defaultBet":"'.$defaultBet.'","defaultCoinValue":"0.01","coinValues":["0.01"],"gameParameters":{"availableLines":[["0","0","0","0","0"],["1","1","1","1","1"],["2","2","2","2","2"]],"rtp":"95.19","payouts":[{"payout":"2","symbols":["0","0"],"type":"basic"},{"payout":"25","symbols":["0","0","0"],"type":"basic"},{"payout":"125","symbols":["0","0","0","0"],"type":"basic"},{"payout":"250","symbols":["0","0","0","0","0"],"type":"basic"},{"payout":"25","symbols":["1","1","1"],"type":"basic"},{"payout":"100","symbols":["1","1","1","1"],"type":"basic"},{"payout":"150","symbols":["1","1","1","1","1"],"type":"basic"},{"payout":"20","symbols":["2","2","2"],"type":"basic"},{"payout":"50","symbols":["2","2","2","2"],"type":"basic"},{"payout":"125","symbols":["2","2","2","2","2"],"type":"basic"},{"payout":"20","symbols":["3","3","3"],"type":"basic"},{"payout":"50","symbols":["3","3","3","3"],"type":"basic"},{"payout":"100","symbols":["3","3","3","3","3"],"type":"basic"},{"payout":"10","symbols":["4","4","4"],"type":"basic"},{"payout":"40","symbols":["4","4","4","4"],"type":"basic"},{"payout":"50","symbols":["4","4","4","4","4"],"type":"basic"},{"payout":"10","symbols":["5","5","5"],"type":"basic"},{"payout":"40","symbols":["5","5","5","5"],"type":"basic"},{"payout":"50","symbols":["5","5","5","5","5"],"type":"basic"},{"payout":"5","symbols":["6","6","6"],"type":"basic"},{"payout":"20","symbols":["6","6","6","6"],"type":"basic"},{"payout":"40","symbols":["6","6","6","6","6"],"type":"basic"},{"payout":"5","symbols":["7","7","7"],"type":"basic"},{"payout":"20","symbols":["7","7","7","7"],"type":"basic"},{"payout":"40","symbols":["7","7","7","7","7"],"type":"basic"},{"payout":"2","symbols":["8","8","8"],"type":"basic"},{"payout":"10","symbols":["8","8","8","8"],"type":"basic"},{"payout":"30","symbols":["8","8","8","8","8"],"type":"basic"},{"payout":"2","symbols":["9","9","9"],"type":"basic"},{"payout":"10","symbols":["9","9","9","9"],"type":"basic"},{"payout":"30","symbols":["9","9","9","9","9"],"type":"basic"},{"payout":"9","symbols":["13"],"type":"basic"},{"payout":"3","symbols":["14"],"type":"basic"},{"payout":"2500","symbols":["15"],"type":"basic"},{"payout":"2","symbols":["16"],"type":"basic"},{"payout":"13","symbols":["17"],"type":"basic"},{"payout":"9","symbols":["18"],"type":"basic"},{"payout":"7","symbols":["20"],"type":"basic"},{"payout":"20","symbols":["21"],"type":"basic"},{"payout":"4","symbols":["22"],"type":"basic"},{"payout":"50","symbols":["23"],"type":"basic"},{"payout":"6","symbols":["24"],"type":"basic"},{"payout":"15","symbols":["25"],"type":"basic"},{"payout":"3","symbols":["26"],"type":"basic"},{"payout":"8","symbols":["28"],"type":"basic"},{"payout":"25","symbols":["29"],"type":"basic"},{"payout":"5","symbols":["30"],"type":"basic"},{"payout":"50","symbols":["31"],"type":"basic"},{"payout":"2","symbols":["32"],"type":"basic"},{"payout":"10","symbols":["33"],"type":"basic"},{"payout":"6","symbols":["34"],"type":"basic"},{"payout":"8","symbols":["36"],"type":"basic"},{"payout":"30","symbols":["37"],"type":"basic"},{"payout":"4","symbols":["38"],"type":"basic"},{"payout":"50","symbols":["39"],"type":"basic"},{"payout":"5","symbols":["40"],"type":"basic"},{"payout":"1","symbols":["41"],"type":"basic"},{"payout":"38","symbols":["42"],"type":"basic"}],"initialSymbols":[["11","7","2","4","2"],["7","2","12","8","5"],["6","8","9","11","12"]]},"jackpotsEnabled":"true","gameModes":"[]" '.$restoreString.'}}';
                                break;
                            case 'BalanceRequest':
                                $result_tmp[] = '{"action":"BalanceResponse","result":"true","sesId":"10000214325","data":{"entries":"0.00","totalAmount":"' . $slotSettings->GetBalance() . '","currency":" "}}';
                                break;
                            case 'FreeSpinRequest':
                            case 'SpinRequest':
                                $postData['slotEvent'] = 'bet';
                                $bonusMpl = 1;
                                $linesId = $slotSettings->Ways243ToLine();
                                $lines = 20;
                                $betLine = $postData['data']['coin'] * $postData['data']['bet'];
                                $slotSettings->SetGameData($slotSettings->slotId . 'BetLine', $postData['data']['bet']);
                                $allbet = $betLine * $lines;
                                if( !isset($postData['slotEvent']) ) 
                                {
                                    $postData['slotEvent'] = 'bet';
                                }
                                if( $reqId == 'FreeSpinRequest' ) 
                                {
                                    $postData['slotEvent'] = 'freespin';
                                }
                                if( $postData['slotEvent'] != 'freespin' ) 
                                {
                                    $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
                                    $bankSum = $allbet / 100 * $slotSettings->GetPercent();
                                    $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), $bankSum, $postData['slotEvent']);
                                    $slotSettings->UpdateJackpots($allbet);
                                    $slotSettings->SetBet($allbet);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'AllBet', $allbet);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'MoneyBagActive', 0);
                                }
                                else
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1);
                                    $bonusMpl = $slotSettings->slotFreeMpl;
                                }
                                $balance = sprintf('%01.2f', $slotSettings->GetBalance());
                                $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $betLine, $lines);
                                $winType = $winTypeTmp[0];
                                $spinWinLimit = $winTypeTmp[1];
                                if($debug)
                                {
                                    if($postData['slotEvent'] != 'freespin')
                                        $winType = 'bonus';
                                }
                                $spinAcquired = false;
                                for( $i = 0; $i <= 300; $i++ ) 
                                {
                                    $totalWin = 0;
                                    $lineWins = [];
                                    $cWins = [];
                                    $wild = ['10'];
                                    $scatter = '11';
                                    $moneyBag = '12';
                                    $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);                                    
                                    for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                                    {
                                        $csym = $slotSettings->SymbolGame[$j];
                                        if( $csym == $scatter || !isset($slotSettings->Paytable['SYM_' . $csym]) ) 
                                        {
                                        }
                                        else
                                        {
                                            $wscc = 0;
                                            $cl = 0;
                                            for( $swc = 1; $swc <= 5; $swc++ ) 
                                            {
                                                $isNext = false;
                                                if( $reels['reel' . $swc][0] == $csym || in_array($reels['reel' . $swc][0], $wild) ) 
                                                {
                                                    $isNext = true;
                                                }
                                                if( $reels['reel' . $swc][1] == $csym || in_array($reels['reel' . $swc][1], $wild) ) 
                                                {
                                                    $isNext = true;
                                                }
                                                if( $reels['reel' . $swc][2] == $csym || in_array($reels['reel' . $swc][2], $wild) ) 
                                                {
                                                    $isNext = true;
                                                }
                                                if( $isNext ) 
                                                {
                                                    $wscc++;
                                                    if( $wscc == 3 ) 
                                                    {
                                                        $cl = 0;
                                                    }
                                                    if( $wscc == 4 ) 
                                                    {
                                                        $cl = 1;
                                                    }
                                                    if( $wscc == 5 ) 
                                                    {
                                                        $cl = 2;
                                                    }
                                                }
                                                else
                                                {
                                                    break;
                                                }
                                            }
                                            for( $k = 0; $k < count($linesId[$cl]); $k++ ) 
                                            {
                                                $tmpStringWin = '';
                                                $cWins[$k] = 0;
                                                $s = [];
                                                $s[0] = -1;
                                                $s[1] = -1;
                                                $s[2] = -1;
                                                $s[3] = -1;
                                                $s[4] = -1;
                                                $p0 = 0;
                                                $p1 = 0;
                                                $p2 = 0;
                                                $p3 = 0;
                                                $p4 = 0;
                                                if( $wscc == 3 ) 
                                                {
                                                    $s[0] = $reels['reel1'][$linesId[$cl][$k][0] - 1];
                                                    $s[1] = $reels['reel2'][$linesId[$cl][$k][1] - 1];
                                                    $s[2] = $reels['reel3'][$linesId[$cl][$k][2] - 1];
                                                    $s[3] = -1;
                                                    $s[4] = -1;
                                                    $p0 = $linesId[$cl][$k][0] - 1;
                                                    $p1 = $linesId[$cl][$k][1] - 1;
                                                    $p2 = $linesId[$cl][$k][2] - 1;
                                                    $p3 = 0;
                                                    $p4 = 0;
                                                    if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) ) 
                                                    {
                                                        $mpl = 1;
                                                        if( in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) ) 
                                                        {
                                                            $mpl = 0;
                                                        }
                                                        else if( in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) ) 
                                                        {
                                                            $mpl = $slotSettings->slotWildMpl;
                                                        }
                                                        $tmpWin = $slotSettings->Paytable['SYM_' . $csym][3] * $betLine * $mpl * $bonusMpl;
                                                        if( $cWins[$k] < $tmpWin ) 
                                                        {
                                                            $cWins[$k] = $tmpWin;
                                                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"],["2","' . $p2 . '"]]}';
                                                        }
                                                    }
                                                }
                                                if( $wscc == 4 ) 
                                                {
                                                    $s[0] = $reels['reel1'][$linesId[$cl][$k][0] - 1];
                                                    $s[1] = $reels['reel2'][$linesId[$cl][$k][1] - 1];
                                                    $s[2] = $reels['reel3'][$linesId[$cl][$k][2] - 1];
                                                    $s[3] = $reels['reel4'][$linesId[$cl][$k][3] - 1];
                                                    $s[4] = -1;
                                                    $p0 = $linesId[$cl][$k][0] - 1;
                                                    $p1 = $linesId[$cl][$k][1] - 1;
                                                    $p2 = $linesId[$cl][$k][2] - 1;
                                                    $p3 = $linesId[$cl][$k][3] - 1;
                                                    $p4 = 0;
                                                    if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) ) 
                                                    {
                                                        $mpl = 1;
                                                        if( in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) && in_array($s[3], $wild) ) 
                                                        {
                                                            $mpl = 0;
                                                        }
                                                        else if( in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild) ) 
                                                        {
                                                            $mpl = $slotSettings->slotWildMpl;
                                                        }
                                                        $tmpWin = $slotSettings->Paytable['SYM_' . $csym][4] * $betLine * $mpl * $bonusMpl;
                                                        if( $cWins[$k] < $tmpWin ) 
                                                        {
                                                            $cWins[$k] = $tmpWin;
                                                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"],["2","' . $p2 . '"],["3","' . $p3 . '"]]}';
                                                        }
                                                    }
                                                }
                                                if( $wscc == 5 ) 
                                                {
                                                    $s[0] = $reels['reel1'][$linesId[$cl][$k][0] - 1];
                                                    $s[1] = $reels['reel2'][$linesId[$cl][$k][1] - 1];
                                                    $s[2] = $reels['reel3'][$linesId[$cl][$k][2] - 1];
                                                    $s[3] = $reels['reel4'][$linesId[$cl][$k][3] - 1];
                                                    $s[4] = $reels['reel5'][$linesId[$cl][$k][4] - 1];
                                                    $p0 = $linesId[$cl][$k][0] - 1;
                                                    $p1 = $linesId[$cl][$k][1] - 1;
                                                    $p2 = $linesId[$cl][$k][2] - 1;
                                                    $p3 = $linesId[$cl][$k][3] - 1;
                                                    $p4 = $linesId[$cl][$k][4] - 1;
                                                    if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild)) ) 
                                                    {
                                                        $mpl = 1;
                                                        if( in_array($s[0], $wild) && in_array($s[1], $wild) && in_array($s[2], $wild) && in_array($s[3], $wild) && in_array($s[4], $wild) ) 
                                                        {
                                                            $mpl = 0;
                                                        }
                                                        else if( in_array($s[0], $wild) || in_array($s[1], $wild) || in_array($s[2], $wild) || in_array($s[3], $wild) || in_array($s[4], $wild) ) 
                                                        {
                                                            $mpl = $slotSettings->slotWildMpl;
                                                        }
                                                        $tmpWin = $slotSettings->Paytable['SYM_' . $csym][5] * $betLine * $mpl * $bonusMpl;
                                                        if( $cWins[$k] < $tmpWin ) 
                                                        {
                                                            $cWins[$k] = $tmpWin;
                                                            $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"],["2","' . $p2 . '"],["3","' . $p3 . '"],["4","' . $p4 . '"]]}';
                                                        }
                                                    }
                                                }
                                                if( $cWins[$k] > 0 && $tmpStringWin != '' ) 
                                                {
                                                    array_push($lineWins, $tmpStringWin);
                                                    $totalWin += $cWins[$k];
                                                }
                                            }
                                        }
                                    }
                                    $scattersWin = 0;
                                    $scattersWinB = 0;
                                    $scattersPos = [];
                                    $scattersStr = '';
                                    $scattersCount = 0;
                                    $moneyBagCount = 0;
                                    for( $r = 1; $r <= 5; $r++ ) 
                                    {
                                        for( $p = 0; $p <= 2; $p++ ) 
                                        {
                                            if( $reels['reel' . $r][$p] == $scatter ) 
                                            {
                                                $scattersCount++;
                                                $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                                            }
                                        }
                                    }
                                    for( $r = 1; $r <= 5; $r++ ) 
                                    {
                                        for( $p = 0; $p <= 2; $p++ ) 
                                        {
                                            if( $reels['reel' . $r][$p] == $moneyBag ) 
                                            {
                                                $moneyBagCount++;
                                                break;
                                            }
                                        }
                                    }
                                    if( $scattersCount >= 3 && $winType != 'bonus')
                                        continue;
                                    $scattersWin = $slotSettings->Paytable['SYM_' . $scatter][$scattersCount] * $betLine * $lines * $bonusMpl;
                                    $gameState = 'Ready';
                                    if(($scattersCount > 2 && $moneyBagCount > 2) || ($scattersCount > 2 && $postData['slotEvent'] == 'freespin') || ($moneyBagCount > 2 && $postData['slotEvent'] == 'freespin'))
                                        continue;
                                    if( $scattersCount >= 3 && $slotSettings->slotBonus ) 
                                    {
                                        $gameState = 'BonusWheel';
                                        $scw = '{"type":"Bonus","bonusName":"BonusWheel","params":{"pickItems":"30"},"amount":"' . $slotSettings->FormatFloat($scattersWin) . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                                        array_push($lineWins, $scw);
                                    }
                                    if($moneyBagCount > 2)
                                    {
                                        $gameState = 'PickBonus';
                                        $scw = '{"type":"Bonus","bonusName":"PickBonus","params":{"pickItems":"3"},"amount":"0","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                                        array_push($lineWins, $scw);
                                    }
                                    $totalWin += ($scattersWin + $scattersWinB);
                                    if($debug)
                                    {
                                        $spinAcquired = true;
                                        break;
                                    }

                                    if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none') || ($winType == 'bonus' && $scattersCount >= 3) || ($winType == 'bonus' && $moneyBagCount >= 3)))
                                    {
                                        $spinAcquired = true;
                                        if($totalWin < 0.5 * $spinWinLimit && $winType != 'bonus')
                                            $spinAcquired = false;
                                        if($spinAcquired)
                                            break;                                        
                                    }           
                                    else if($winType == 'none' && $totalWin == 0)
                                    {
                                        break;
                                    }
                                }

                                if($totalWin > 0 && $spinAcquired == false)
                                {
                                    $lineWins = [];
                                    $totalWin = 0;
                                    $reels = $slotSettings->GetNoWinSpin($postData['slotEvent']);
                                    $scattersCount = 0;
                                    $moneyBagCount = 0;
                                }
                                                                     
                                if( $totalWin > 0 ) 
                                {
                                    $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                                    $slotSettings->SetBalance($totalWin);            
                                    $slotSettings->SetWin($totalWin);                        
                                }
                                $reportWin = $totalWin;
                                if( $postData['slotEvent'] == 'freespin' ) 
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') + $totalWin);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $slotSettings->GetGameData($slotSettings->slotId . 'TotalWin') + $totalWin);
                                }
                                else
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $totalWin);
                                }
                                if( $scattersCount >= 3 ) 
                                {
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') > 0 ) 
                                    {
                                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + $slotSettings->slotFreeCount);
                                    }
                                    else
                                    {
                                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', $totalWin);
                                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $totalWin);                                        
                                    }
                                }
                                else if($moneyBagCount >= 3)
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'MoneyBagActive', 1);
                                }
                                // $reels = $reelsTmp;
                                $slotSettings->SetGameData($slotSettings->slotId . 'LastReels', $reels);
                                $jsSpin = '' . json_encode($reels) . '';
                                $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                                if( $totalWin > 0 || $winType == 'bonus' ) 
                                {
                                    $winString0 = implode(',', $lineWins);
                                    $winString = ',"slotWin":{"lineWinAmounts":[' . $winString0 . '],"totalWin":"' . $slotSettings->FormatFloat($totalWin) . '","canGamble":"false"}';
                                }
                                else
                                {
                                    $winString = '';
                                }
                                $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"BonusSymbol":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol') . ',"slotLines":' . $lines . ',"slotBet":' . $betLine . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $slotSettings->GetBalance() . ',"afterBalance":' . $slotSettings->GetBalance() . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"freeStartWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeStartWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"bonusInfo":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                                $symb = '["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"]';
                                if($postData['slotEvent'] == 'freespin')
                                    $allbet = 0;
                                $slotSettings->SaveLogReport($response, $allbet, $reportWin, $postData['slotEvent']);
                                if( $postData['slotEvent'] == 'freespin' ) 
                                {
                                    $bonusWin0 = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                                    $freeSpinRemain = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                    $freeSpinsTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                    $gameState = 'FreeSpins';
                                    $gameParameters = '';
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') && $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') > 0 ) 
                                    {
                                        $gameState = 'Ready';
                                        $gameParameters = '"gameParameters":{"initialSymbols":[' . $slotSettings->GetGameData($slotSettings->slotId . 'initialSymbols') . ']},';
                                    }
                                    $result_tmp[] = '{"action":"FreeSpinResponse","result":"true","sesId":"10000228087","data":{' . $gameParameters . '"state":"' . $gameState . '"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']},"totalBonusWin":"' . $slotSettings->FormatFloat($bonusWin0) . '","freeSpinRemain":"' . $freeSpinRemain . '","freeSpinsTotal":"' . $freeSpinsTotal . '"}}';
                                }
                                else
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'initialSymbols', $symb);
                                    $result_tmp[] = '{"action":"SpinResponse","result":"true","sesId":"10000217909","data":{"state":"' . $gameState . '"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']}}}';
                                }
                                break;
                        }
                        $response = implode('------', $result_tmp);
                        $slotSettings->SaveGameData();
                        $slotSettings->SaveGameDataStatic();

                        
                        echo ':::' . $response;
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
                }, 5);
            }
            get_($request, $game);
        }
    }

}

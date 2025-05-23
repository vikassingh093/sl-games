<?php 
namespace VanguardLTE\Games\HitInVegasNG
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
                            if( $slotSettings->GetBalance() < ($postData['data']['coin'] * $postData['data']['bet'] * 40) && $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') <= 0 ) 
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
                                if($slotSettings->GetGameData($slotSettings->slotId . 'WheelGame') == 1)
                                {
                                    //money wheel pick
                                    $pick = [1000,50, 200, 20, 300, 90, 100, 30, 500, 60, 125, 70, 250, 80, 150, 40];
                                    $lowWinIndex = [1, 3, 7, 15];
                                    $index = rand(0, count($pick) - 1);
                                    $betLine = $slotSettings->GetGameData($slotSettings->slotId . 'Betline');
                                    $lines = 40;
                                    $allbet = $betLine * $lines;
                                    $win = $pick[$index] * $allbet;
                                    $winTypeTmp = $slotSettings->GetSpinSettings('freespin', $betLine, $lines);
                                    $cBank = $winTypeTmp[1];
                                    $cc = 0;
                                    $minWin = 1000 * $allbet;
                                    $minIndex = -1;
                                    while($win > $cBank && $cc < 20)
                                    {
                                        $cc++;
                                        $index = rand(0, count($pick) - 1);
                                        $win = $pick[$index] * $allbet;                                                                      
                                    }
                                    if($win >= $cBank)
                                    {
                                        $minIndex = $lowWinIndex[rand(0, count($lowWinIndex) - 1)];
                                        $minWin = $pick[$minIndex] * $allbet;

                                        $win = $minWin;
                                        $index = $minIndex;
                                    }

                                    $slotSettings->SetBank('freespin', -1 * $win);
                                    $slotSettings->SetBalance($win);
                                    $slotSettings->SetWin($win);
                                    $reportWin = $win;
                                    $reels = $slotSettings->GetGameData($slotSettings->slotId . 'LastReels');
                                    
                                    $jsSpin = '' . json_encode($reels) . '';
                                    $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                                    $postData['slotEvent'] = 'freespin';
                                    $symb = '["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"]';
                                    $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"BonusSymbol":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol') . ',"slotLines":' . $lines . ',"slotBet":' . $betLine . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $slotSettings->GetBalance() . ',"afterBalance":' . $slotSettings->GetBalance() . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"freeStartWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeStartWin') . ',"totalWin":' . $win . ',"winLines":[],"bonusInfo":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                                    $symb = '["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"]';
                                    $slotSettings->SaveLogReport($response, $allbet, $reportWin, $postData['slotEvent']);

                                    $bonusItem = [
                                        'index' => $index + 1,
                                        'picked' => true,
                                        'type' => 'BonusMoneyWheel',
                                        'value' => $win
                                    ];

                                    $res = [
                                        'action' => 'PickBonusItemResponse',
                                        'data' => [
                                            'bonusItem' => $bonusItem,
                                            'canGamble' => true,
                                            'gambleParams' => [
                                                'history' => []
                                            ],
                                            'gameParameters' => [
                                                'initialSymbols' => [ [$reels['reel1'][0], $reels['reel2'][0], $reels['reel3'][0], $reels['reel4'][0], $reels['reel5'][0]],
                                                                      [$reels['reel1'][1], $reels['reel2'][1], $reels['reel3'][1], $reels['reel4'][1], $reels['reel5'][1]],
                                                                      [$reels['reel1'][2], $reels['reel2'][2], $reels['reel3'][2], $reels['reel4'][2], $reels['reel5'][2]] ]
                                            ],
                                            'items' => [
                                                $bonusItem
                                            ],
                                            'lastPick' => true,
                                            'params' => [
                                                'totalWin' => $win
                                            ]
                                        ],
                                        'result' => true,
                                        'sesId' => 0
                                    ];
                                    $result_tmp[] = json_encode($res);
                                    break;
                                }
                                $bonusSymbol = $postData['data']['index'];
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $bonusSymbol);
                                $randomWheelPosArr = [
                                    1,
                                    2, 
                                    2, 
                                    2, 
                                    3, 
                                    4, 
                                    4, 
                                    5, 
                                    6, 
                                    6, 
                                    6, 
                                    7, 
                                    7, 
                                    7, 
                                    8, 
                                    8, 
                                    8, 
                                    9, 
                                    10, 
                                    10, 
                                    10, 
                                    11, 
                                    11,
                                    12,
                                    12,
                                    12,
                                    14,
                                    14,
                                    14,
                                    15,
                                    15,
                                    15,
                                    15                                    
                                ];
                                shuffle($randomWheelPosArr);
                                $randomWheelPos = $randomWheelPosArr[0];                                             
                                if($randomWheelPos == 15)
                                    $slotSettings->SetGameData($slotSettings->slotId . 'WheelGame', 1);
                                $bonusWheelArr = [
                                    [], 
                                    [
                                        1, 
                                        'v3sym'
                                    ], 
                                    [
                                        3, 
                                        'bar_wild'
                                    ], 
                                    [
                                        2, 
                                        '2&4w_wild'
                                    ], 
                                    [
                                        3, 
                                        '4top'
                                    ], 
                                    [
                                        1, 
                                        '1&3&5w_wild'
                                    ], 
                                    [
                                        3, 
                                        'seven_wild'
                                    ], 
                                    [
                                        5, 
                                        '1r_wild'
                                    ], 
                                    [
                                        3, 
                                        '1&5w_wild'
                                    ], 
                                    [
                                        1, 
                                        '2&3&4w_wild'
                                    ], 
                                    [
                                        3, 
                                        'cherry_wild'
                                    ], 
                                    [
                                        8, 
                                        '4&5w_wild'
                                    ], 
                                    [
                                        3, 
                                        '1w_wild'
                                    ], 
                                    [
                                        1, 
                                        '1w_wild'
                                    ], 
                                    [
                                        3, 
                                        'dice_wild'
                                    ], 
                                    [
                                        0, 
                                        'wheel_money'
                                    ], 
                                    [
                                        1, 
                                        '4top'
                                    ]
                                ];
                                $curWPos = $bonusWheelArr[$randomWheelPos];
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $curWPos[0]);
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGamesMode', $curWPos[1]);
                                $result_tmp[] = '{"action": "PickBonusItemResponse","result":"true","sesId":"10000413749","data":{"state":"BonusWheelFreespins' . $randomWheelPos . '","lastPick":"true","items":[{"type":"BonusWheelFreespins6","index":"' . ($randomWheelPos + 1) . '","value":"0","picked":"true"}],"bonusItem":{"type":"BonusWheelFreespins' . $randomWheelPos . '","index":"' . ($randomWheelPos + 1) . '","value":"0","picked":"true"},"params":{"FreeSpins":"' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . '"}}}';
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
                                    $restoreString = ',"restoredGameCode":"247","lastResponse":{"spinResult":{"type":"SpinResult","rows":[' . $rp2 . ']},"freeSpinsTotal":"' . $fTotal . '","freeSpinRemain":"' . $fRemain . '","totalBonusWin":"' . $fBonusWin . '","state":"FreeSpins","expandingSymbols":["1"]}';
                                }
                                $result_tmp[0] = '{"action":"AuthResponse","result":"true","sesId":"10000156675","data":{"snivy":"proxy v6.10.48 (API v4.23)","supportedFeatures":["Offers","Jackpots","InstantJackpots","SweepStakes"],"sessionId":"10000156675","defaultLines":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39"],"bets":'.json_encode($slotSettings->GetBets()).',"betMultiplier":"1.0000000","defaultBet":"'.$defaultBet.'","defaultCoinValue":"0.01","coinValues":["0.01"],"gameParameters":{"availableLines":[["1","1","1","1","1"],["0","0","0","0","0"],["2","2","2","2","2"],["0","1","2","1","0"],["2","1","0","1","2"],["1","0","0","0","1"],["1","2","2","2","1"],["0","0","1","2","2"],["2","2","1","0","0"],["1","0","1","0","1"],["1","2","1","2","1"],["0","1","1","1","2"],["2","1","1","1","0"],["1","1","0","1","2"],["1","1","2","1","0"],["0","1","0","1","0"],["2","1","2","1","2"],["0","0","2","0","0"],["2","2","0","2","2"],["1","0","2","0","1"],["1","2","0","2","1"],["0","2","0","2","0"],["2","0","2","0","2"],["0","2","2","2","0"],["2","0","0","0","2"],["0","2","1","2","0"],["2","0","1","0","2"],["1","1","2","1","1"],["1","1","0","1","1"],["0","2","0","1","1"],["2","0","2","1","1"],["0","0","0","1","2"],["2","2","2","1","0"],["0","1","2","2","2"],["2","1","0","0","0"],["1","0","0","1","2"],["1","2","2","1","0"],["0","0","1","0","0"],["2","2","1","2","2"],["1","0","1","2","1"]],"rtp":"0.00","payouts":[{"payout":"10","symbols":["1","1"],"type":"basic"},{"payout":"100","symbols":["1","1","1"],"type":"basic"},{"payout":"500","symbols":["1","1","1","1"],"type":"basic"},{"payout":"1000","symbols":["1","1","1","1","1"],"type":"basic"},{"payout":"5","symbols":["2","2"],"type":"basic"},{"payout":"50","symbols":["2","2","2"],"type":"basic"},{"payout":"200","symbols":["2","2","2","2"],"type":"basic"},{"payout":"500","symbols":["2","2","2","2","2"],"type":"basic"},{"payout":"2","symbols":["3","3"],"type":"basic"},{"payout":"25","symbols":["3","3","3"],"type":"basic"},{"payout":"100","symbols":["3","3","3","3"],"type":"basic"},{"payout":"200","symbols":["3","3","3","3","3"],"type":"basic"},{"payout":"1","symbols":["4","4"],"type":"basic"},{"payout":"15","symbols":["4","4","4"],"type":"basic"},{"payout":"50","symbols":["4","4","4","4"],"type":"basic"},{"payout":"100","symbols":["4","4","4","4","4"],"type":"basic"},{"payout":"4","symbols":["5","5","5"],"type":"basic"},{"payout":"20","symbols":["5","5","5","5"],"type":"basic"},{"payout":"50","symbols":["5","5","5","5","5"],"type":"basic"},{"payout":"3","symbols":["6","6","6"],"type":"basic"},{"payout":"15","symbols":["6","6","6","6"],"type":"basic"},{"payout":"40","symbols":["6","6","6","6","6"],"type":"basic"},{"payout":"2","symbols":["7","7","7"],"type":"basic"},{"payout":"10","symbols":["7","7","7","7"],"type":"basic"},{"payout":"30","symbols":["7","7","7","7","7"],"type":"basic"},{"payout":"1","symbols":["8","8","8"],"type":"basic"},{"payout":"5","symbols":["8","8","8","8"],"type":"basic"},{"payout":"25","symbols":["8","8","8","8","8"],"type":"basic"},{"payout":"25","symbols":["9"],"type":"scatter"},{"payout":"10","symbols":["10"],"type":"scatter"},{"payout":"5","symbols":["11"],"type":"scatter"},{"payout":"1","symbols":["12"],"type":"scatter"},{"payout":"4","symbols":["15","15","15"],"type":"basic"},{"payout":"20","symbols":["15","15","15","15"],"type":"basic"},{"payout":"50","symbols":["15","15","15","15","15"],"type":"basic"},{"payout":"3","symbols":["16","16","16"],"type":"basic"},{"payout":"15","symbols":["16","16","16","16"],"type":"basic"},{"payout":"40","symbols":["16","16","16","16","16"],"type":"basic"},{"payout":"2","symbols":["17","17","17"],"type":"basic"},{"payout":"10","symbols":["17","17","17","17"],"type":"basic"},{"payout":"30","symbols":["17","17","17","17","17"],"type":"basic"},{"payout":"1","symbols":["18","18","18"],"type":"basic"},{"payout":"5","symbols":["18","18","18","18"],"type":"basic"},{"payout":"25","symbols":["18","18","18","18","18"],"type":"basic"},{"payout":"1000","symbols":["20"],"type":"basic"},{"payout":"50","symbols":["20","20"],"type":"basic"},{"payout":"200","symbols":["20","20","20"],"type":"basic"},{"payout":"20","symbols":["20","20","20","20"],"type":"basic"},{"payout":"300","symbols":["20","20","20","20","20"],"type":"basic"},{"payout":"90","symbols":["20","20","20","20","20","20"],"type":"basic"},{"payout":"100","symbols":["20","20","20","20","20","20","20"],"type":"basic"},{"payout":"30","symbols":["20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"500","symbols":["20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"60","symbols":["20","20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"125","symbols":["20","20","20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"70","symbols":["20","20","20","20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"250","symbols":["20","20","20","20","20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"80","symbols":["20","20","20","20","20","20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"150","symbols":["20","20","20","20","20","20","20","20","20","20","20","20","20","20","20"],"type":"basic"},{"payout":"40","symbols":["20","20","20","20","20","20","20","20","20","20","20","20","20","20","20","20"],"type":"basic"}],"initialSymbols":[["7","1","6","7","5"],["2","5","13","4","1"],["5","13","3","3","4"]]},"jackpotsEnabled":"true","gameModes":"[]" '.$restoreString.'}}';
                                break;
                            case 'BalanceRequest':
                                $result_tmp[] = '{"action":"BalanceResponse","result":"true","sesId":"10000214325","data":{"entries":"0.00","totalAmount":"' . $slotSettings->GetBalance() . '","currency":" "}}';
                                break;
                            case 'FreeSpinRequest':
                            case 'SpinRequest':
                                $postData['slotEvent'] = 'bet';
                                $bonusMpl = 1;
                                $linesId = $slotSettings->GetPaylines();                                
                                $lines = 40;
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
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'WheelGame', 0);
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

                                if($postData['slotEvent'] == 'freespin')
                                {
                                    $bonusWin0 = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                                    $freeSpinRemain = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');                                    
                                    if($freeSpinRemain < 4 && $bonusWin0 <= $allbet * 5)
                                        $winType = 'win';
                                }

                                $spinAcquired = false;
                                if($debug && $postData['slotEvent'] != 'freespin')
                                    $winType = 'bonus';

                                $minLineWins = [];
                                $minTotalWin = -1;
                                $minReels = [];                              

                                $vegas_25 = '9';
                                $vegas_10 = '10';
                                $vegas_5 = '11';
                                $vegas_1 = '12';

                                $seven_wild = '15';
                                $bar_wild = '16';
                                $cherry_wild = '17';
                                $dice_wild = '18';

                                for( $i = 0; $i <= 500; $i++ ) 
                                {
                                    $totalWin = 0;
                                    $lineWins = [];
                                    $cWins = array_fill(0, 40, 0);
                                    $wild = ['0'];
                                    $scatter = '13';
                                    $wheel = '14';
                                    $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                                                                        
                                    if( $postData['slotEvent'] == 'freespin' ) 
                                    {
                                        $fMode = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGamesMode');                                        
                                        switch( $fMode ) 
                                        {
                                            case 'v3sym':
                                                $reels['reel2'][0] = '1';
                                                $reels['reel2'][1] = '1';
                                                $reels['reel2'][2] = '1';
                                                $reels['reel3'][0] = '1';
                                                $reels['reel3'][1] = '1';
                                                $reels['reel3'][2] = '1';
                                                $reels['reel4'][0] = '1';
                                                $reels['reel4'][1] = '1';
                                                $reels['reel4'][2] = '1';
                                                break;
                                            case 'bar_wild':
                                                for($r = 1; $r <= 5; $r++)
                                                    for($c = 0; $c < 3; $c++)
                                                    {
                                                        if($reels['reel'.$r][$c] == '6')
                                                            $reels['reel'.$r][$c] = $bar_wild;
                                                    }
                                                $wild = [
                                                    '0', 
                                                    $bar_wild
                                                ];
                                                break;
                                            case '2&4w_wild':
                                                $reels['reel2'][0] = '0';
                                                $reels['reel2'][1] = '0';
                                                $reels['reel2'][2] = '0';
                                                $reels['reel4'][0] = '0';
                                                $reels['reel4'][1] = '0';
                                                $reels['reel4'][2] = '0';
                                                break;
                                            case '4top':
                                                $topReelStrip = [
                                                    1, 
                                                    1, 
                                                    1, 
                                                    1, 
                                                    2, 
                                                    2, 
                                                    2, 
                                                    2, 
                                                    2, 
                                                    3, 
                                                    3, 
                                                    3, 
                                                    3, 
                                                    4, 
                                                    4, 
                                                    4, 
                                                    4, 
                                                    4, 
                                                    4, 
                                                    4
                                                ];
                                                for( $tr = 1; $tr <= 5; $tr++ ) 
                                                {
                                                    shuffle($topReelStrip);
                                                    $reels['reel' . $tr][0] = $topReelStrip[0];
                                                    $reels['reel' . $tr][1] = $topReelStrip[1];
                                                    $reels['reel' . $tr][2] = $topReelStrip[2];
                                                }
                                                break;
                                            case '1&3&5w_wild':
                                                $reels['reel1'][0] = '0';
                                                $reels['reel1'][1] = '0';
                                                $reels['reel1'][2] = '0';
                                                $reels['reel3'][0] = '0';
                                                $reels['reel3'][1] = '0';
                                                $reels['reel3'][2] = '0';
                                                $reels['reel5'][0] = '0';
                                                $reels['reel5'][1] = '0';
                                                $reels['reel5'][2] = '0';
                                                break;
                                            case 'seven_wild':
                                                for($r = 1; $r <= 5; $r++)
                                                    for($c = 0; $c < 3; $c++)
                                                    {
                                                        if($reels['reel'.$r][$c] == '5')
                                                            $reels['reel'.$r][$c] = $seven_wild;
                                                    }
                                                $wild = [
                                                    '0', 
                                                    $seven_wild
                                                ];
                                                break;
                                            case '1r_wild':
                                                $cfg = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                                $reels['reel'.(6-$cfg)][0] = '0';
                                                $reels['reel'.(6-$cfg)][1] = '0';
                                                $reels['reel'.(6-$cfg)][2] = '0';                                                
                                                break;
                                            case '1w_wild':
                                                $reels['reel1'][0] = '0';
                                                $reels['reel1'][1] = '0';
                                                $reels['reel1'][2] = '0';
                                                break;
                                            case '1&5w_wild':
                                                $reels['reel1'][0] = '0';
                                                $reels['reel1'][1] = '0';
                                                $reels['reel1'][2] = '0';
                                                $reels['reel5'][0] = '0';
                                                $reels['reel5'][1] = '0';
                                                $reels['reel5'][2] = '0';
                                                break;
                                            case '2&3&4w_wild':
                                                $reels['reel2'][0] = '0';
                                                $reels['reel2'][1] = '0';
                                                $reels['reel2'][2] = '0';
                                                $reels['reel3'][0] = '0';
                                                $reels['reel3'][1] = '0';
                                                $reels['reel3'][2] = '0';
                                                $reels['reel4'][0] = '0';
                                                $reels['reel4'][1] = '0';
                                                $reels['reel4'][2] = '0';
                                                $winType = 'win';
                                                break;
                                            case 'cherry_wild':
                                                for($r = 1; $r <= 5; $r++)
                                                    for($c = 0; $c < 3; $c++)
                                                    {
                                                        if($reels['reel'.$r][$c] == '7')
                                                            $reels['reel'.$r][$c] = $cherry_wild;
                                                    }
                                                $wild = [
                                                    '0', 
                                                    $cherry_wild
                                                ];
                                                break;
                                            case '4&5w_wild':
                                                $reels['reel4'][0] = '0';
                                                $reels['reel4'][1] = '0';
                                                $reels['reel4'][2] = '0';
                                                $reels['reel5'][0] = '0';
                                                $reels['reel5'][1] = '0';
                                                $reels['reel5'][2] = '0';
                                                break;
                                            case '1w_wild ':
                                                $reels['reel1'][0] = '0';
                                                $reels['reel1'][1] = '0';
                                                $reels['reel1'][2] = '0';
                                                break;
                                            case 'dice_wild':
                                                for($r = 1; $r <= 5; $r++)
                                                    for($c = 0; $c < 3; $c++)
                                                    {
                                                        if($reels['reel'.$r][$c] == '8')
                                                            $reels['reel'.$r][$c] = $dice_wild;
                                                    }
                                                $wild = [
                                                    '0', 
                                                    $dice_wild
                                                ];
                                                break;
                                        }
                                    }

                                    if($postData['slotEvent'] != 'freespin')
                                    {
                                        //random poker chips
                                        if(rand(0, 50) == 0)
                                        {
                                            $poker_chip = rand(0, 100);
                                            $r = rand(1, 5);
                                            $c = rand(0, 2);
                                            if($poker_chip < 50)
                                            {
                                                $reels['reel'.$r][$c] = $vegas_1;
                                            }
                                            else if($poker_chip < 80)
                                            {
                                                $reels['reel'.$r][$c] = $vegas_5;
                                            }
                                            else if($poker_chip < 99)
                                            {
                                                $reels['reel'.$r][$c] = $vegas_10;
                                            }
                                            else 
                                            {
                                                $reels['reel'.$r][$c] = $vegas_25;
                                            }
                                        }
                                    }
                                    for( $k = 0; $k < $lines; $k++ ) 
                                    {
                                        $tmpStringWin = '';
                                        for( $j = 0; $j < count($slotSettings->SymbolGame); $j++ ) 
                                        {
                                            $csym = $slotSettings->SymbolGame[$j];
                                            if( $csym == $scatter || !isset($slotSettings->Paytable['SYM_' . $csym]) ) 
                                            {
                                            }
                                            else
                                            {
                                                $s = [];
                                                $s[0] = $reels['reel1'][$linesId[$k][0] - 1];
                                                $s[1] = $reels['reel2'][$linesId[$k][1] - 1];
                                                $s[2] = $reels['reel3'][$linesId[$k][2] - 1];
                                                $s[3] = $reels['reel4'][$linesId[$k][3] - 1];
                                                $s[4] = $reels['reel5'][$linesId[$k][4] - 1];
                                                $p0 = $linesId[$k][0] - 1;
                                                $p1 = $linesId[$k][1] - 1;
                                                $p2 = $linesId[$k][2] - 1;
                                                $p3 = $linesId[$k][3] - 1;
                                                $p4 = $linesId[$k][4] - 1;
                                                if( $s[0] == $csym || in_array($s[0], $wild) ) 
                                                {
                                                    $mpl = 1;
                                                    $tmpWin = $slotSettings->Paytable['SYM_' . $csym][1] * $betLine * $mpl * $bonusMpl;
                                                    if( $cWins[$k] < $tmpWin ) 
                                                    {
                                                        $cWins[$k] = $tmpWin;
                                                        $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"]]}';
                                                    }
                                                }
                                                if( ($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) ) 
                                                {
                                                    $mpl = 1;
                                                    if( in_array($s[0], $wild) && in_array($s[1], $wild) ) 
                                                    {
                                                        $mpl = 0;
                                                    }
                                                    else if( in_array($s[0], $wild) || in_array($s[1], $wild) ) 
                                                    {
                                                        $mpl = $slotSettings->slotWildMpl;
                                                    }
                                                    $tmpWin = $slotSettings->Paytable['SYM_' . $csym][2] * $betLine * $mpl * $bonusMpl;
                                                    if( $cWins[$k] < $tmpWin ) 
                                                    {
                                                        $cWins[$k] = $tmpWin;
                                                        $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $k . '","amount":"' . $tmpWin . '","wonSymbols":[["0","' . $p0 . '"],["1","' . $p1 . '"]]}';
                                                    }
                                                }
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
                                        }
                                        if( $cWins[$k] > 0 && $tmpStringWin != '' ) 
                                        {
                                            array_push($lineWins, $tmpStringWin);
                                            $totalWin += $cWins[$k];
                                        }
                                    }
                                    $scattersWin = 0;
                                    $scattersPos = [];
                                    $scattersCount = 0;
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
                                    if($scattersCount >= 3 && $winType != 'bonus')
                                        continue;
                                    $scattersWin = $slotSettings->Paytable['SYM_' . $scatter][$scattersCount] * $betLine * $lines * $bonusMpl;
                                    $gameState = 'Ready';
                                    if( $scattersCount >= 3 && $slotSettings->slotBonus ) 
                                    {
                                        $gameState = 'PickBonus';
                                        $scw = '{"wonSymbols":[' . implode(',', $scattersPos) . '],"amount":"0.00","type":"Bonus","bonusName":"BonusWheel","params":{"pickItems":"1"}}';
                                        array_push($lineWins, $scw);
                                    }
                                    $totalWin += $scattersWin;

                                    //check poker chips
                                    for( $r = 1; $r <= 5; $r++ ) 
                                    {
                                        for( $p = 0; $p <= 2; $p++ ) 
                                        {
                                            $amount = 0;
                                            if( $reels['reel' . $r][$p] == $vegas_1 ) 
                                            {
                                                $amount = $allbet;                                                
                                            }
                                            else if( $reels['reel' . $r][$p] == $vegas_5 ) 
                                            {
                                                $amount = 5 * $allbet;
                                            }
                                            else if( $reels['reel' . $r][$p] == $vegas_10 ) 
                                            {
                                                $amount = 10 * $allbet;
                                            }
                                            else if( $reels['reel' . $r][$p] == $vegas_25 ) 
                                            {
                                                $amount = 25 * $allbet;
                                            }

                                            if($amount > 0)
                                            {
                                                $totalWin += $amount;
                                                $scw = '{"wonSymbols":[["'.($r-1).'","'.$c.'"]],"amount":"'.$amount.'","type":"WinAmount"}';
                                                array_push($lineWins, $scw);
                                            }
                                        }
                                    }

                                    //check wheel
                                    $wheelCount = 0;
                                    $wheelPos = [];
                                    for( $r = 1; $r <= 5; $r++ ) 
                                    {
                                        for( $p = 0; $p <= 2; $p++ ) 
                                        {
                                            if( $reels['reel' . $r][$p] == $wheel ) 
                                            {
                                                $wheelCount++;
                                                $wheelPos[] = '["' . ($r - 1) . '","' . $p . '"]';                                                
                                            }
                                        }
                                    }
                                    if($wheelCount >= 3)
                                    {
                                        $gameState = 'PickBonus';
                                        $scw = '{"wonSymbols":[' . implode(',', $wheelPos) . '],"amount":"0.00","type":"Bonus","bonusName":"BonusMoneyWheel","params":{"pickItems":"1"}}';
                                        array_push($lineWins, $scw);
                                    }

                                    if($minTotalWin == -1 || $minTotalWin > $totalWin)
                                    {
                                        $minLineWins = $lineWins;
                                        $minTotalWin = $totalWin;                                        
                                        $minReels = $reels;
                                    }

                                    if($debug)
                                    {
                                        $spinAcquired = true;
                                        break;
                                    }
                                    if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none') || ($winType == 'bonus' && $scattersCount >= 3)))
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
                                    if($postData['slotEvent'] != 'freespin')
                                    {
                                        $lineWins = [];
                                        $totalWin = 0;
                                        $reels = $slotSettings->GetNoWinSpin($postData['slotEvent']);
                                        $scattersCount = 0;
                                        $gameState = 'Ready';
                                    }
                                    else
                                    {
                                        $lineWins = $minLineWins;
                                        $totalWin = $minTotalWin;
                                        $reels = $minReels;                                        
                                    }
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
                                    $slotSettings->SetGameData($slotSettings->slotId . 'Betline', $betLine);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'LastReels', $reels);           
                                    if( $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') > 0 ) 
                                    {
                                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + $slotSettings->slotFreeCount);
                                    }
                                    else
                                    {
                                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', $totalWin);
                                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $totalWin);
                                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->slotFreeCount);
                                    }
                                }
                                if($wheelCount >= 3)
                                {
                                    $slotSettings->SetGameData($slotSettings->slotId . 'WheelGame', 1);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'Betline', $betLine);
                                    $slotSettings->SetGameData($slotSettings->slotId . 'LastReels', $reels);           
                                }
                                
                                $jsSpin = '' . json_encode($reels) . '';
                                $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                                if( $totalWin > 0 || $scattersCount >= 3 || $wheelCount >= 3 ) 
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
                                    $result_tmp[] = '{"action":"FreeSpinResponse","result":"true","sesId":"10000228087","data":{' . $gameParameters . '"state":"FreeSpins"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']},"totalBonusWin":"' . $slotSettings->FormatFloat($bonusWin0) . '","freeSpinRemain":"' . $freeSpinRemain . '","freeSpinsTotal":"' . $freeSpinsTotal . '"}}';
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

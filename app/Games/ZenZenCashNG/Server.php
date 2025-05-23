<?php 
namespace VanguardLTE\Games\ZenZenCashNG
{

    use Illuminate\Support\Facades\DB;

    set_time_limit(5);
    class Server
    {
        public function get($request, $game)
        {
            try
            {
                DB::beginTransaction();
                $userId = \Auth::id();
                $debug = false;
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
                        $item = $postData['data']['index'];
                        $Items = $slotSettings->GetGameData($slotSettings->slotId . 'Items');
                        $BonusState = $slotSettings->GetGameData($slotSettings->slotId . 'BonusState');
                        $Prizes = $slotSettings->GetGameData($slotSettings->slotId . 'Prizes');
                        $SelectedItems = $slotSettings->GetGameData($slotSettings->slotId . 'SelectedItems');
                        $SelectedValues = $slotSettings->GetGameData($slotSettings->slotId . 'SelectedValues');
                        $picks = $slotSettings->GetGameData($slotSettings->slotId . 'Picks');
                        $selectedCount = count($SelectedItems);
                        $allbet = $slotSettings->GetGameData($slotSettings->slotId . 'AllBet');

                        $picksRemain = 1;
                        $winAmount = 0;
                        $lastPick = 'false';
                        $state = 'PickBonus';
                        $gameParameters = '';
                        $pays = [];
                        $pays[0] = 10;
                        $pays[1] = 30;
                        $pays[2] = 150;
                        $pays[3] = 1000;
                        $winCount = ['0' => 3, '1' => 4, '2' => 5, '3' => 6];                        
                        $pickCount = ['0' => 0, '1' => 0, '2' => 0, '3' => 0];
                        $value = $picks[$selectedCount];
                        $SelectedValues[] = $value;

                        $curItem = '{"type":"Picks","index":"' . $item . '","value":"3' . $value . '","picked":"true"}';
                        $Items[] = $curItem;
                        $SelectedItems[] = $item;
                        
                        for($i = 0; $i < count($SelectedValues); $i++)
                        {
                            $pickCount[$SelectedValues[$i]]++;
                        }

                        for($i = 0; $i < 4; $i++)
                            if($pickCount[$i] >= $winCount[$i])
                            {
                                $winAmount = $allbet * $pays[$i];
                                break;
                            }

                        if( $winAmount > 0 ) 
                        {
                            $slotSettings->SetBank('bonus', -$winAmount);
                            $slotSettings->SetBalance($winAmount);
                            $slotSettings->SetWin($winAmount);
                            $slotSettings->SaveLogReport('NULL', 0, $winAmount, 'freespin');
                            $state = 'Ready';
                            $lastPick = 'true';
                            $picksRemain = 0;
                            $gameParameters = ',"gameParameters":{"initialSymbols":[["12","12","8","14","2"],["12","12","8","14","10"],["1","12","8","12","10"]]}';
                            for( $i = 0; $i < 35; $i++ ) 
                            {
                                if( !in_array($i, $SelectedItems) ) 
                                {
                                    $Items[] = '{"type":"Picks","index":"' . $i . '","value":"3' . rand(0, 3) . '","picked":"true"}';
                                }
                            }
                            $slotSettings->SetGameData($slotSettings->slotId . 'GameState', $state);
                        }

                        $result_tmp[] = '{"action":"PickBonusItemResponse","result":"true","sesId":"10000296512","data":{"lastPick":"' . $lastPick . '","state":"' . $state . '","bonusItem":' . $curItem . ',"items":[' . implode(',', $Items) . '],"params":{"picksRemain":"' . $picksRemain . '","winAmount":"' . $winAmount . '"}' . $gameParameters . '}}';
                        $slotSettings->SetGameData($slotSettings->slotId . 'Items', $Items);
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusState', $BonusState);
                        $slotSettings->SetGameData($slotSettings->slotId . 'Prizes', $Prizes);
                        $slotSettings->SetGameData($slotSettings->slotId . 'SelectedItems', $SelectedItems);
                        $slotSettings->SetGameData($slotSettings->slotId . 'SelectedValues', $SelectedValues);
                        break;
                    case 'CheckBrokenGameRequest':
                        $result_tmp[] = '{"action":"CheckBrokenGameResponse","result":"true","sesId":"false","data":{"haveBrokenGame":"false"}}';
                        break;
                    case 'AuthRequest':
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                        $lastEvent = $slotSettings->GetHistory();
                        if( $lastEvent != 'NULL' ) 
                        {
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $lastEvent->serverResponse->bonusWin);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $lastEvent->serverResponse->totalFreeGames);
                            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $lastEvent->serverResponse->currentFreeGames);
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $lastEvent->serverResponse->bonusWin);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $lastEvent->serverResponse->BonusSymbol);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                            $rp1 = implode(',', $lastEvent->serverResponse->reelsSymbols->rp);
                            $rp2 = '[' . $lastEvent->serverResponse->reelsSymbols->reel1[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel2[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel3[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel4[0] . ',' . $lastEvent->serverResponse->reelsSymbols->reel5[0] . ']';
                            $rp2 .= (',[' . $lastEvent->serverResponse->reelsSymbols->reel1[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel2[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel3[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel4[1] . ',' . $lastEvent->serverResponse->reelsSymbols->reel5[1] . ']');
                            $rp2 .= (',[' . $lastEvent->serverResponse->reelsSymbols->reel1[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel2[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel3[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel4[2] . ',' . $lastEvent->serverResponse->reelsSymbols->reel5[2] . ']');
                            $bet = $lastEvent->serverResponse->slotBet * 100 * 20;
                        }
                        else
                        {
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
                        $gameState = $slotSettings->GetGameData($slotSettings->slotId . 'GameState');
                        if($gameState === 'FreeSpins')
                        {
                            if( $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') < $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ) 
                            {
                                $fBonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                                $fTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                                $fCurrent = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                                $fRemain = $fTotal - $fCurrent;
                                $restoreString = ',"restoredGameCode":"368","lastResponse":{"spinResult":{"type":"SpinResult","rows":[' . $rp2 . ']},"freeSpinsTotal":"' . $fTotal . '","freeSpinRemain":"' . $fRemain . '","totalBonusWin":"' . $fBonusWin . '","state":"FreeSpins","expandingSymbols":["1"]}';
                            }
                        }
                        else if($gameState === 'PickBonus')
                        {
                            $fBonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                            $restoreString = ',"restoredGameCode":"368","lastResponse":{"totalBonusWin":"'.$fBonusWin.'","state":"PickBonus","spinResult":{"type":"SpinResult","rows":[["1","7","7","7","11"],["8","7","7","6","2"],["8","12","12","6","8"]]},"lastPick":"false","params":{"picksRemain":"1"}}';
                        }                        
                        $result_tmp[0] = '{"action":"AuthResponse","result":"true","sesId":"10000310431","data":{"snivy":"proxy DEV-v10.15.71 (API v4.16)","bets":["1","2","3","4","5","10"],"coinValues":["0.01"],"betMultiplier":"40.0000000","defaultCoinValue":"0.01","defaultBet":"'.$defaultBet.'","jackpotsEnabled":"false","defaultLines":["0"],"supportedFeatures":["Offers","Jackpots","InstantJackpots","SweepStakes","PaidJackpots"],"sessionId":"10000310431","gameParameters":{"availableLines":[["0","0","0","0","0"],["1","1","1","1","1"],["2","2","2","2","2"]],"rtp":"0.00","initialSymbols":[["8","7","14","7","8"],["12","15","14","7","14"],["12","15","10","13","9"]],"payouts":[{"payout":"40","symbols":["0","0","0"],"type":"scatter"},{"payout":"8","symbols":["3","3","3"],"type":"basic"},{"payout":"10","symbols":["3","3","3","3"],"type":"basic"},{"payout":"12","symbols":["3","3","3","3","3"],"type":"basic"},{"payout":"8","symbols":["4","4","4"],"type":"basic"},{"payout":"10","symbols":["4","4","4","4"],"type":"basic"},{"payout":"12","symbols":["4","4","4","4","4"],"type":"basic"},{"payout":"8","symbols":["5","5","5"],"type":"basic"},{"payout":"10","symbols":["5","5","5","5"],"type":"basic"},{"payout":"12","symbols":["5","5","5","5","5"],"type":"basic"},{"payout":"8","symbols":["6","6","6"],"type":"basic"},{"payout":"10","symbols":["6","6","6","6"],"type":"basic"},{"payout":"12","symbols":["6","6","6","6","6"],"type":"basic"},{"payout":"8","symbols":["7","7","7"],"type":"basic"},{"payout":"10","symbols":["7","7","7","7"],"type":"basic"},{"payout":"12","symbols":["7","7","7","7","7"],"type":"basic"},{"payout":"10","symbols":["8","8","8"],"type":"basic"},{"payout":"15","symbols":["8","8","8","8"],"type":"basic"},{"payout":"20","symbols":["8","8","8","8","8"],"type":"basic"},{"payout":"8","symbols":["9","9","9"],"type":"basic"},{"payout":"10","symbols":["9","9","9","9"],"type":"basic"},{"payout":"12","symbols":["9","9","9","9","9"],"type":"basic"},{"payout":"4","symbols":["10","10","10"],"type":"basic"},{"payout":"6","symbols":["10","10","10","10"],"type":"basic"},{"payout":"8","symbols":["10","10","10","10","10"],"type":"basic"},{"payout":"4","symbols":["11","11","11"],"type":"basic"},{"payout":"6","symbols":["11","11","11","11"],"type":"basic"},{"payout":"8","symbols":["11","11","11","11","11"],"type":"basic"},{"payout":"4","symbols":["12","12","12"],"type":"basic"},{"payout":"6","symbols":["12","12","12","12"],"type":"basic"},{"payout":"8","symbols":["12","12","12","12","12"],"type":"basic"},{"payout":"4","symbols":["13","13","13"],"type":"basic"},{"payout":"5","symbols":["13","13","13","13"],"type":"basic"},{"payout":"6","symbols":["13","13","13","13","13"],"type":"basic"},{"payout":"4","symbols":["14","14","14"],"type":"basic"},{"payout":"5","symbols":["14","14","14","14"],"type":"basic"},{"payout":"6","symbols":["14","14","14","14","14"],"type":"basic"},{"payout":"4","symbols":["15","15","15"],"type":"basic"},{"payout":"5","symbols":["15","15","15","15"],"type":"basic"},{"payout":"6","symbols":["15","15","15","15","15"],"type":"basic"},{"payout":"25","symbols":["30"],"type":"basic"},{"payout":"1","symbols":["30","30"],"type":"basic"},{"payout":"50","symbols":["31"],"type":"basic"},{"payout":"2","symbols":["31","31"],"type":"basic"},{"payout":"250","symbols":["32"],"type":"basic"},{"payout":"3","symbols":["32","32"],"type":"basic"},{"payout":"1000","symbols":["33"],"type":"basic"},{"payout":"5","symbols":["33","33"],"type":"basic"}]},"gameModes":"" '.$restoreString.'}}';
                        break;
                    case 'BalanceRequest':
                        $result_tmp[] = '{"action":"BalanceResponse","result":"true","sesId":"10000214325","data":{"entries":"0.00","totalAmount":"' . $slotSettings->GetBalance() . '","currency":"' . $slotSettings->slotCurrency . '"}}';
                        break;
                    case 'FreeSpinRequest':
                    case 'SpinRequest':                        
                        $postData['slotEvent'] = 'bet';
                        $bonusMpl = 1;
                        $linesId = $slotSettings->Ways243ToLine();
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
                        if($debug && $postData['slotEvent'] != 'freespin')
                        {
                            $winType = 'bonus';
                        }

                        $minLineWins = [];
                        $minTotalWin = -1;
                        $minReels = [];
                        $minReelsTmp = [];
                        $minAdvancedReels = '';
                        $minScattersCount = 0;
                        $minScattersCount2 = 0;
                        $spinAcquired = false;

                        for( $i = 0; $i <= 500; $i++ ) 
                        {
                            $totalWin = 0;
                            $lineWins = [];
                            $cWins = [];
                            $wild = [
                                '3', 
                                '4', 
                                '5'
                            ];
                            $scatter = '0';
                            $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                            $advancedReels = '';
                            $advancedReelsSym = rand(8, 15);
                            $isAdvancedReels = false;

                            $goldStartReel = -1;

                            if(rand(0, 100) < 20 && $winType == 'win' || $postData['slotEvent'] == 'freespin')
                            {
                                $goldStartReel = 0;
                                $goldEndReel = $goldStartReel + rand(0,3);
                                $reels['reel'.($goldStartReel + 1)][0] = 16;
                                $reels['reel'.($goldStartReel + 1)][1] = 16;
                                $reels['reel'.($goldStartReel + 1)][2] = 16;
                                $reels['reel'.($goldEndReel + 1)][0] = 16;
                                $reels['reel'.($goldEndReel + 1)][1] = 16;
                                $reels['reel'.($goldEndReel + 1)][2] = 16;
                            }                            

                            $reelsTmp = $reels;

                            for( $r = 1; $r <= 5; $r++ ) 
                            {
                                for( $p = 0; $p <= 2; $p++ ) 
                                {
                                    if( $reels['reel' . $r][$p] == '16' ) 
                                    {
                                        $isAdvancedReels = true;
                                        $reels['reel' . $r][$p] = $advancedReelsSym;
                                    }
                                }
                            }
 
                            if($goldStartReel > -1)
                            {
                                $goldParams = '';
                                $goldPositions = [];
                                if($goldStartReel != $goldEndReel)
                                {
                                    for($c = 0; $c < 3; $c++)
                                        for($r = 1; $r <= 5; $r++)                                    
                                        {
                                            if($r > $goldStartReel + 1 && $r < $goldEndReel + 1 && $reels['reel' . $r][$c] != '16')
                                            {
                                                $reels['reel' . $r][$c] = $advancedReelsSym;
                                                $goldPositions[] = [($r-1).'', $c.''];
                                            }
                                        }
                                    $params = ['goldReels' => $goldPositions];
                                    $goldParams = ',"params":'.json_encode($params);
                                    $isAdvancedReels = true;
                                }
                                
                                if( $isAdvancedReels ) 
                                {
                                    $syma = '["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"]';
                                    $advancedReels = $goldParams.',"spinResultStage2":{"type":"SpinResult","rows":[' . $syma . ']}';
                                }
                            }

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
                            $scattersPos2 = [];
                            $scattersStr = '';
                            $scattersCount = 0;
                            $scattersCount2 = 0;
                            $bSym = $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol');
                            $bSymCnt = 0;
                            for( $r = 1; $r <= 5; $r++ ) 
                            {
                                $isScat = false;
                                for( $p = 0; $p <= 2; $p++ ) 
                                {
                                    if( $reels['reel' . $r][$p] == $scatter ) 
                                    {
                                        $scattersCount++;
                                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                                        $isScat = true;
                                    }
                                    if( $reels['reel' . $r][$p] == '1' || $reels['reel' . $r][$p] == '2' ) 
                                    {
                                        $scattersCount2++;
                                        $scattersPos2[] = '["' . ($r - 1) . '","' . $p . '"]';
                                        $isScat = true;
                                    }
                                }
                            }
                            if($scattersCount >= 3 && $winType != 'bonus' ||  $scattersCount2 >= 2 && $winType != 'bonus')
                                continue;
                            $scattersWin = $slotSettings->Paytable['SYM_' . $scatter][$scattersCount] * $betLine * $lines * $bonusMpl;
                            $gameState = 'Ready';
                            if( $scattersCount >= 3 && $slotSettings->slotBonus ) 
                            {
                                $gameState = 'FreeSpins';
                                $scw = '{"type":"Bonus","bonusName":"FreeSpins","params":{"freeSpins":"15"},"amount":"' . $slotSettings->FormatFloat($scattersWin) . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                                array_push($lineWins, $scw);
                            }
                            if( $scattersCount2 >= 2 && $slotSettings->slotBonus ) 
                            {
                                $gameState = 'PickBonus';
                                $scw = '{"type":"Bonus","bonusName":"PickBonus","params":{"PickBonus":"1"},"amount":"' . $slotSettings->FormatFloat($scattersWin) . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                                array_push($lineWins, $scw);
                            }
                            if( $scattersCount >= 3 && $scattersCount2 >= 2 ) 
                            {
                                continue;
                            }
                            else
                            {
                                $totalWin += ($scattersWin + $scattersWinB);
                                if($minTotalWin == -1 && $scattersCount < 3 && $scattersCount2 < 2 || ($totalWin > 0 && $totalWin < $minTotalWin))
                                {
                                    $minLineWins = $lineWins;
                                    $minReels = $reels;
                                    $minTotalWin = $totalWin;
                                    $minScattersCount = $scattersCount;
                                    $minScattersCount2 = $scattersCount2;
                                    $minAdvancedReels = $advancedReels;
                                    $minReelsTmp = $reelsTmp;
                                }

                                if($totalWin < $spinWinLimit && $winType != 'none' && $totalWin > 0)
                                {
                                    $spinAcquired = true;
                                    break;
                                }
                                else if($winType == 'none' && $totalWin == 0)
                                {
                                    break;
                                }
                            }
                        }

                        if($totalWin > 0 && !$spinAcquired || $scattersCount >= 3 && $winType != 'bonus' ||  $scattersCount2 >= 2 && $winType != 'bonus')
                        {
                            $lineWins = $minLineWins;
                            $reels = $minReels;
                            $totalWin = $minTotalWin;
                            $scattersCount = $minScattersCount;
                            $scattersCount2 = $minScattersCount2;
                            $advancedReels = $minAdvancedReels;
                            $reelsTmp = $minReelsTmp;
                        }

                        $reels = $reelsTmp;
                        if( $totalWin > 0 ) 
                        {
                            $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                            $slotSettings->SetBalance($totalWin);
                            $slotSettings->SetWin($totalWin);
                        }
                        $reportWin = $totalWin;
                        if( $postData['slotEvent'] == 'freespin' ) 
                        {
                            $gameState = 'FreeSpins';
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
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->slotFreeCount);
                                $slotSettings->SetGameData($slotSettings->slotId . 'InitialSymbols', $reels);
                                $gameState = 'FreeSpins';
                            }
                        }
                        if( $scattersCount2 >= 2 ) 
                        {
                            $slotSettings->SetGameData($slotSettings->slotId . 'SelectedItems', []);
                            $slotSettings->SetGameData($slotSettings->slotId . 'SelectedValues', []);
                            $picks = [0,0,0,0,0,0,1,1,1,2,2,2,2,3,3,3,3,3];
                            shuffle($picks);
                            $slotSettings->SetGameData($slotSettings->slotId . 'Picks', $picks);
                            $slotSettings->SetGameData($slotSettings->slotId . 'Items', []);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusState', 1);
                            $slotSettings->SetGameData($slotSettings->slotId . 'AllBet', $allbet);
                        }
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
                        $slotSettings->SaveLogReport($response, $allbet, $reportWin, $postData['slotEvent']);
                        if( $postData['slotEvent'] == 'freespin' ) 
                        {
                            $bonusWin0 = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                            $freeSpinRemain = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                            $freeSpinsTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                            if($freeSpinRemain > 0)
                                $result_tmp[] = '{"action":"FreeSpinResponse","result":"true","sesId":"10000228087","data":{"state":"FreeSpins"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']}' . $advancedReels . ' ,"totalBonusWin":"' . $slotSettings->FormatFloat($bonusWin0) . '","freeSpinRemain":"' . $freeSpinRemain . '","freeSpinsTotal":"' . $freeSpinsTotal . '"}}';
                            else
                            {
                                $reels = $slotSettings->GetGameData($slotSettings->slotId . 'InitialSymbols');
                                $gameParameters = ', "gameParameters":{"initialSymbols":[["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"]]}';
                                $result_tmp[] = '{"action":"FreeSpinResponse","result":"true","sesId":"10000228087","data":{"state":"Ready"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']}' . $advancedReels . ' ,"totalBonusWin":"' . $slotSettings->FormatFloat($bonusWin0) . '","freeSpinRemain":"' . $freeSpinRemain . '","freeSpinsTotal":"' . $freeSpinsTotal . '"'.$gameParameters.'}}';
                            }
                        }
                        else
                        {
                            $result_tmp[] = '{"action":"SpinResponse","result":"true","sesId":"10000217909","data":{"state":"' . $gameState . '"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']} ' . $advancedReels . ' }}';
                        }
                        $slotSettings->SetGameData($slotSettings->slotId . 'GameState', $gameState);
                        break;
                    default:
                        break;
                }
                $response = implode('------', $result_tmp);
                $slotSettings->SaveGameData();
                $slotSettings->SaveGameDataStatic();
                DB::commit();
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
        }
    }

}

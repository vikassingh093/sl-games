<?php 
namespace VanguardLTE\Games\Royal40FruitsNG
{

    use Illuminate\Support\Facades\DB;

    set_time_limit(5);
    class Server
    {
        private $debug = false;
        public function get($request, $game)
        {
            try
            {
                $userId = \Auth::id();
                DB::beginTransaction();
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
                        $bonusSymbol = $postData['data']['index'];
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $bonusSymbol);
                        $result_tmp[] = '{"action":"PickBonusItemResponse","result":"true","sesId":"10000217909","data":{"state":"PickBonus","params":{"picksRemain":"0","expandingSymbols":["' . $bonusSymbol . '"]}}}';
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
                        if( $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') < $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ) 
                        {
                            $fBonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                            $fTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                            $fCurrent = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                            $fRemain = $fTotal - $fCurrent;
                            $restoreString = ',"restoredGameCode":"340","lastResponse":{"spinResult":{"type":"SpinResult","rows":[' . $rp2 . ']},"freeSpinsTotal":"' . $fTotal . '","freeSpinRemain":"' . $fRemain . '","totalBonusWin":"' . $fBonusWin . '","state":"FreeSpins","expandingSymbols":["1"]}';
                        }
                        $result_tmp[0] = '{"action":"AuthResponse","result":"true","sesId":"10000046130","data":{"snivy":"proxy v6.10.48 (API v4.23)","supportedFeatures":["Offers","Jackpots","InstantJackpots","SweepStakes","PaidJackpots"],"sessionId":"10000046130","defaultLines":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39"],"bets":["1","2","3","4","5","10"],"betMultiplier":"1.0000000","defaultBet":"1","defaultCoinValue":"0.01","coinValues":["0.01"],"gameParameters":{"availableLines":[["0","0","0","0","0"],["1","1","1","1","1"],["2","2","2","2","2"],["3","3","3","3","3"],["0","1","2","1","0"],["1","2","3","2","1"],["2","1","0","1","2"],["3","2","1","2","3"],["0","0","0","0","1"],["1","1","1","1","0"],["2","2","2","2","3"],["3","3","3","3","2"],["0","1","1","1","1"],["1","1","1","1","2"],["2","2","2","2","1"],["3","2","2","2","2"],["1","0","0","0","0"],["1","2","2","2","2"],["2","1","1","1","1"],["2","3","3","3","3"],["0","0","0","1","2"],["1","1","1","2","3"],["2","2","2","1","0"],["3","3","3","2","1"],["0","1","2","2","2"],["1","2","3","3","3"],["2","1","0","0","0"],["3","2","1","1","1"],["0","0","1","0","0"],["1","1","0","1","1"],["2","2","3","2","2"],["3","3","2","3","3"],["0","1","1","1","0"],["1","1","2","1","1"],["2","2","1","2","2"],["3","2","2","2","3"],["1","0","0","0","1"],["1","2","2","2","1"],["2","1","1","1","2"],["2","3","3","3","2"]],"rtp":"0.00","payouts":[{"payout":"40","symbols":["0","0","0"],"type":"basic"},{"payout":"400","symbols":["0","0","0","0"],"type":"basic"},{"payout":"1000","symbols":["0","0","0","0","0"],"type":"basic"},{"payout":"20","symbols":["1","1","1"],"type":"basic"},{"payout":"80","symbols":["1","1","1","1"],"type":"basic"},{"payout":"400","symbols":["1","1","1","1","1"],"type":"basic"},{"payout":"20","symbols":["2","2","2"],"type":"basic"},{"payout":"40","symbols":["2","2","2","2"],"type":"basic"},{"payout":"200","symbols":["2","2","2","2","2"],"type":"basic"},{"payout":"20","symbols":["3","3","3"],"type":"basic"},{"payout":"40","symbols":["3","3","3","3"],"type":"basic"},{"payout":"200","symbols":["3","3","3","3","3"],"type":"basic"},{"payout":"10","symbols":["4","4","4"],"type":"basic"},{"payout":"20","symbols":["4","4","4","4"],"type":"basic"},{"payout":"100","symbols":["4","4","4","4","4"],"type":"basic"},{"payout":"10","symbols":["5","5","5"],"type":"basic"},{"payout":"20","symbols":["5","5","5","5"],"type":"basic"},{"payout":"100","symbols":["5","5","5","5","5"],"type":"basic"},{"payout":"10","symbols":["6","6","6"],"type":"basic"},{"payout":"20","symbols":["6","6","6","6"],"type":"basic"},{"payout":"100","symbols":["6","6","6","6","6"],"type":"basic"},{"payout":"15","symbols":["7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"20","symbols":["7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"45","symbols":["7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"75","symbols":["7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"100","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"125","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"175","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"240","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"450","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"900","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"2000","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"},{"payout":"3000","symbols":["7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7","7"],"type":"scatter"}],"initialSymbols":[["1","2","3","1","4"],["1","2","3","1","1"],["1","2","3","1","1"],["1","5","3","6","1"]]},"jackpotsEnabled":"true","gameModes":"[]"}}';
                        break;
                    case 'BalanceRequest':
                        $result_tmp[] = '{"action":"BalanceResponse","result":"true","sesId":"10000214325","data":{"entries":"0.00","totalAmount":"' . $slotSettings->GetBalance() . '","currency":" "}}';
                        break;
                    case 'FreeSpinRequest':
                    case 'SpinRequest':
                        $postData['slotEvent'] = 'bet';
                        $bonusMpl = 1;
                        $linesId = [];
                        $linesId[0] = [
                            1, 
                            1, 
                            1, 
                            1, 
                            1
                        ];
                        $linesId[1] = [
                            2, 
                            2, 
                            2, 
                            2, 
                            2
                        ];
                        $linesId[2] = [
                            3, 
                            3, 
                            3, 
                            3, 
                            3
                        ];
                        $linesId[3] = [
                            4, 
                            4, 
                            4, 
                            4, 
                            4
                        ];
                        $linesId[4] = [
                            1, 
                            2, 
                            3, 
                            2, 
                            1
                        ];
                        $linesId[5] = [
                            2, 
                            3, 
                            4, 
                            3, 
                            2
                        ];
                        $linesId[6] = [
                            3, 
                            2, 
                            1, 
                            2, 
                            3
                        ];
                        $linesId[7] = [
                            4, 
                            3, 
                            2, 
                            3, 
                            4
                        ];
                        $linesId[8] = [
                            1, 
                            1, 
                            1, 
                            1, 
                            2
                        ];
                        $linesId[9] = [
                            2, 
                            2, 
                            2, 
                            2, 
                            1
                        ];
                        $linesId[10] = [
                            3, 
                            3, 
                            3, 
                            3, 
                            4
                        ];
                        $linesId[11] = [
                            4, 
                            4, 
                            4, 
                            4, 
                            3
                        ];
                        $linesId[12] = [
                            1, 
                            2, 
                            2, 
                            2, 
                            2
                        ];
                        $linesId[13] = [
                            2, 
                            2, 
                            2, 
                            2, 
                            3
                        ];
                        $linesId[14] = [
                            3, 
                            3, 
                            3, 
                            3, 
                            2
                        ];
                        $linesId[15] = [
                            4, 
                            3, 
                            3, 
                            3, 
                            3
                        ];
                        $linesId[16] = [
                            2, 
                            1, 
                            1, 
                            1, 
                            1
                        ];
                        $linesId[17] = [
                            2, 
                            3, 
                            3, 
                            3, 
                            3
                        ];
                        $linesId[18] = [
                            3, 
                            2, 
                            2, 
                            2, 
                            2
                        ];
                        $linesId[19] = [
                            3, 
                            4, 
                            4, 
                            4, 
                            4
                        ];
                        $linesId[20] = [
                            1, 
                            1, 
                            1, 
                            2, 
                            3
                        ];
                        $linesId[21] = [
                            2, 
                            2, 
                            2, 
                            3, 
                            4
                        ];
                        $linesId[22] = [
                            3, 
                            3, 
                            3, 
                            2, 
                            1
                        ];
                        $linesId[23] = [
                            4, 
                            4, 
                            4, 
                            3, 
                            2
                        ];
                        $linesId[24] = [
                            1, 
                            2, 
                            3, 
                            3, 
                            3
                        ];
                        $linesId[25] = [
                            2, 
                            3, 
                            4, 
                            4, 
                            4
                        ];
                        $linesId[26] = [
                            3, 
                            2, 
                            1, 
                            1, 
                            1
                        ];
                        $linesId[27] = [
                            4, 
                            3, 
                            2, 
                            2, 
                            2
                        ];
                        $linesId[28] = [
                            1, 
                            1, 
                            2, 
                            1, 
                            1
                        ];
                        $linesId[29] = [
                            2, 
                            2, 
                            1, 
                            2, 
                            2
                        ];
                        $linesId[30] = [
                            3, 
                            3, 
                            4, 
                            3, 
                            3
                        ];
                        $linesId[31] = [
                            4, 
                            4, 
                            3, 
                            4, 
                            4
                        ];
                        $linesId[32] = [
                            1, 
                            2, 
                            2, 
                            2, 
                            1
                        ];
                        $linesId[33] = [
                            2, 
                            2, 
                            3, 
                            2, 
                            2
                        ];
                        $linesId[34] = [
                            3, 
                            3, 
                            2, 
                            3, 
                            3
                        ];
                        $linesId[35] = [
                            4, 
                            3, 
                            3, 
                            3, 
                            4
                        ];
                        $linesId[36] = [
                            2, 
                            1, 
                            1, 
                            1, 
                            2
                        ];
                        $linesId[37] = [
                            2, 
                            3, 
                            3, 
                            3, 
                            2
                        ];
                        $linesId[38] = [
                            3, 
                            2, 
                            2, 
                            2, 
                            3
                        ];
                        $linesId[39] = [
                            3, 
                            4, 
                            4, 
                            4, 
                            3
                        ];
                        $lines = 40;
                        $betLine = $postData['data']['coin'] * $postData['data']['bet'];
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

                        $minLineWins = [];
                        $minTotalWin = -1;
                        $minReels = [];
                        $spinAcquired = false;

                        for( $i = 0; $i <= 500; $i++ ) 
                        {
                            $totalWin = 0;
                            $lineWins = [];
                            $cWins = array_fill(0, 40, 0);
                            $wild = ['0'];
                            $scatter = '7';
                            $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                            if($winType == 'bonus')
                            {
                                $scatterCnt = rand(9, 17);
                                $scatterPositions = [];
                                
                                while(count($scatterPositions) < $scatterCnt)
                                {   
                                    $r = rand(0, 4);
                                    $c = rand(0, 3);
                                    $linear_pos = $c * 5 + $r;
                                    if(!in_array($linear_pos, $scatterPositions))
                                    {
                                        $scatterPositions[] = $linear_pos;
                                        $reels['reel'.($r+1)][$c] = $scatter;
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
                            $scattersWinB = 0;
                            $scattersPos = [];
                            $scattersStr = '';
                            $scattersCount = 0;
                            $bSym = $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol');
                            $bSymCnt = 0;
                            for( $r = 1; $r <= 5; $r++ ) 
                            {
                                $isScat = false;
                                for( $p = 0; $p <= 3; $p++ ) 
                                {
                                    if( $reels['reel' . $r][$p] == $scatter ) 
                                    {
                                        $scattersCount++;
                                        $scattersPos[] = '["' . ($r - 1) . '","' . $p . '"]';
                                        $isScat = true;
                                    }
                                }
                            }
                            for( $r = 1; $r <= 5; $r++ ) 
                            {
                                $isScat = false;
                                for( $p = 0; $p <= 2; $p++ ) 
                                {
                                    if( $reels['reel' . $r][$p] == $bSym ) 
                                    {
                                        $bSymCnt++;
                                        break;
                                    }
                                }
                            }
                            if($scattersCount > 20)
                                $scattersCount = 20;
                            $scattersWin = $slotSettings->Paytable['SYM_' . $scatter][$scattersCount] * $betLine * $bonusMpl;
                            $gameState = 'Ready';
                            if( $scattersCount >= 3 && $slotSettings->slotBonus ) 
                            {
                                $scw = '{"type":"WinAmount","amount":"' . $slotSettings->FormatFloat($scattersWin) . '","wonSymbols":[' . implode(',', $scattersPos) . ']}';
                                array_push($lineWins, $scw);
                            }
                            else if( $scattersCount >= 9 && $scattersWin > 0 ) 
                            {
                                $scw = '{"wonSymbols":[' . implode(',', $scattersPos) . '],"amount":"' . $slotSettings->FormatFloat($scattersWin) . '","type":"WinAmount"}';
                                array_push($lineWins, $scw);
                            }
                            $totalWin += ($scattersWin + $scattersWinB);

                            if($minTotalWin == -1 || ($totalWin > 0 && $totalWin < $minTotalWin))
                            {
                                $minLineWins = $lineWins;
                                $minReels = $reels;
                                $minTotalWin = $totalWin;
                                $minScattersCount = $scattersCount;
                            }

                            if($this->debug)
                            {
                                $spinAcquired = true;
                                break;
                            }
                            if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none')))
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
                        
                        if($totalWin > 0 && !$spinAcquired)
                        {
                            $lineWins = $minLineWins;
                            $reels = $minReels;
                            $totalWin = $minTotalWin;
                            $scattersCount = $minScattersCount;
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
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->slotFreeCount);
                            }
                        }
                        $jsSpin = '' . json_encode($reels) . '';
                        $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                        if( $totalWin > 0 ) 
                        {
                            $winString = ',"slotWin":{"totalWin":"' . $totalWin . '","lineWinAmounts":[' . implode(',', $lineWins) . '],"canGamble":"false"}';
                        }
                        else
                        {
                            $winString = '';
                        }
                        $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"BonusSymbol":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol') . ',"slotLines":' . $lines . ',"slotBet":' . $betLine . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $slotSettings->GetBalance() . ',"afterBalance":' . $slotSettings->GetBalance() . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"freeStartWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeStartWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"bonusInfo":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                        $symb = '["' . $reels['reel1'][0] . '","' . $reels['reel2'][0] . '","' . $reels['reel3'][0] . '","' . $reels['reel4'][0] . '","' . $reels['reel5'][0] . '"],["' . $reels['reel1'][1] . '","' . $reels['reel2'][1] . '","' . $reels['reel3'][1] . '","' . $reels['reel4'][1] . '","' . $reels['reel5'][1] . '"],["' . $reels['reel1'][2] . '","' . $reels['reel2'][2] . '","' . $reels['reel3'][2] . '","' . $reels['reel4'][2] . '","' . $reels['reel5'][2] . '"],["' . $reels['reel1'][3] . '","' . $reels['reel2'][3] . '","' . $reels['reel3'][3] . '","' . $reels['reel4'][3] . '","' . $reels['reel5'][3] . '"]';
                        $slotSettings->SaveLogReport($response, $allbet, $reportWin, $postData['slotEvent']);
                        if( $postData['slotEvent'] == 'freespin' ) 
                        {
                            $bonusWin0 = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                            $freeSpinRemain = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                            $freeSpinsTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                            $result_tmp[] = '{"action":"FreeSpinResponse","result":"true","sesId":"10000228087","data":{"state":"FreeSpins"' . $winString . ',"spinResult":{"type":"SpinResult","rows":[' . $symb . ']},"totalBonusWin":"' . $slotSettings->FormatFloat($bonusWin0) . '","freeSpinRemain":"' . $freeSpinRemain . '","freeSpinsTotal":"' . $freeSpinsTotal . '"}}';
                        }
                        else
                        {
                            $result_tmp[] = '{"action":"SpinResponse","result":"true","sesId":"10000373695","data":{"spinResult":{"type":"SpinResult","rows":[' . $symb . ']}' . $winString . ',"state":"' . $gameState . '"}}';
                        }
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

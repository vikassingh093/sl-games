<?php 
namespace VanguardLTE\Games\DevilsLock
{
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;
    use SimpleXMLElement;

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

        function generateWagerId()
        {
            $id = date("ymdHms").round(microtime(true) * 1000) % 1000;
            return $id;
        }
        
        function arrayToXml($array, $rootElement = null, $xml = null) 
        {
            $_xml = $xml;
              
            // If there is no Root Element then insert root
            if ($_xml === null) {
                $_xml = new SimpleXMLElement($rootElement !== null ? $rootElement : '<root/>');
            }
              
            // Visit all key value pair
            foreach ($array as $k => $v) {
                  
                // If there is nested array then
                if (is_array($v)) { 
                    // Call function for nested array
                    $this->arrayToXml($v, $k, $_xml->addChild($k));
                }
                      
                else {
                      
                    // Simply add child element. 
                    $_xml->addChild($k, $v);
                }
            }
              
            return $_xml->asXML();
        }

        function sxml_append(SimpleXMLElement $to, SimpleXMLElement $from) {
            $toDom = dom_import_simplexml($to);
            $fromDom = dom_import_simplexml($from);
            $toDom->appendChild($toDom->ownerDocument->importNode($fromDom, true));
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
               
                $postData = $request->all()['gameData'];               
                $header = $postData['header'];
                $reqType = $header['name'];
                $cId = $header['cId'];
                $reportWin = 0;
                $result_tmp = [];
                $balance = $this->getCreditNumber($slotSettings->GetBalance());
                switch( $reqType ) 
                {
                    case 'Authenticate':                       
                        $slotSettings->SetGameData($slotSettings->slotId . 'SpinStatus', '');
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalFreespinWin', '0');
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);                        
                        $res = '{"header":{"mId":1,"cId":'.$cId.',"name":"Authenticate","code":1,"dType":1},"body":{"currencyCode":"USD","countryCode":"SI","username":"DEMO MODE","jurisdictionCode":"MALTA","balance":'.$balance.',"balanceVersion":'.floor(microtime(true)).',"reconnectToken":"b6e6c4cb-b29f-4f8d-9d7b-6756593225af"}}';
                        $result_tmp[] = $res;
                        break;
                    case 'GetPlayerOptions':
                        $res = '{"header":{"mId":2,"cId":'.$cId.',"name":"GetPlayerOptions","code":1,"dType":1},"body":{"data":{}}}';
                        $result_tmp[] = $res;
                        break;
                    case 'OpenGame':
                        $res = '{"header":{"mId":3,"cId":'.$cId.',"name":"OpenGame","code":1,"dType":1},"body":{"ursId":2161946,"gameCode":"BBR_DEL"}}';                        
                        $result_tmp[] = $res;
                        $res = '{"header":{"mId":4,"cId":60692,"name":"GameEvent","dType":2,"dId":2161946},"body":{"seqId":1,"event":["OPEN_GAME"],"data":{"FREE_SPIN":{},"SLOT":{"symbols":[{"id":1,"name":"Nine"},{"id":2,"name":"Ten"},{"id":3,"name":"Jack"},{"id":4,"name":"Queen"},{"id":5,"name":"King"},{"id":6,"name":"Ace"},{"id":7,"name":"Trident"},{"id":8,"name":"Diamonds"},{"id":9,"name":"Bills"},{"id":10,"name":"Crown"},{"id":11,"name":"Wild"},{"id":14,"name":"Amount"}],"lines":3,"betAmounts":[66,132,198,330,462,660],"paylineDef":[{"name":"P0","positions":[1,1,1,1,1]},{"name":"P1","positions":[0,0,0,0,0]},{"name":"P2","positions":[2,2,2,2,2]},{"name":"P3","positions":[0,1,2,1,0]},{"name":"P4","positions":[2,1,0,1,2]},{"name":"P5","positions":[1,0,1,2,1]},{"name":"P6","positions":[1,2,1,0,1]},{"name":"P7","positions":[0,0,1,2,2]},{"name":"P8","positions":[2,2,1,0,0]},{"name":"P9","positions":[0,1,0,1,0]},{"name":"P10","positions":[2,1,2,1,2]},{"name":"P11","positions":[1,0,0,0,1]},{"name":"P12","positions":[1,2,2,2,1]},{"name":"P13","positions":[0,1,1,1,0]},{"name":"P14","positions":[2,1,1,1,2]},{"name":"P15","positions":[1,1,0,1,1]},{"name":"P16","positions":[1,1,2,1,1]},{"name":"P17","positions":[0,2,0,2,0]},{"name":"P18","positions":[2,0,2,0,2]},{"name":"P19","positions":[2,0,1,0,2]},{"name":"P20","positions":[0,2,1,2,0]},{"name":"P21","positions":[0,2,2,2,0]},{"name":"P22","positions":[2,0,0,0,2]},{"name":"P23","positions":[1,0,2,0,1]},{"name":"P24","positions":[1,2,0,2,1]},{"name":"P25","positions":[0,0,2,0,0]},{"name":"P26","positions":[2,2,0,2,2]},{"name":"P27","positions":[1,0,1,0,1]},{"name":"P28","positions":[1,2,1,2,1]},{"name":"P29","positions":[2,2,2,1,0]},{"name":"P30","positions":[0,0,0,1,2]},{"name":"P31","positions":[2,1,0,0,0]},{"name":"P32","positions":[0,1,2,2,2]},{"name":"P33","positions":[1,1,1,0,1]},{"name":"P34","positions":[1,1,1,2,1]},{"name":"P35","positions":[1,0,1,1,1]},{"name":"P36","positions":[1,2,1,1,1]},{"name":"P37","positions":[2,1,1,1,0]},{"name":"P38","positions":[0,1,1,1,2]},{"name":"P39","positions":[1,2,2,1,0]}],"allowedBaseBet":66,"maxAutoplayCount":250,"betAmount":198,"slotFace":[[1,1,3],[5,8,5],[6,11,1],[8,5,6],[5,2,8]]}},"balance":'.$balance.',"balanceVersion":'.floor(microtime(true)).'}}';
                        $result_tmp[] = ':::'.$res;
                        break;                    
                    case 'SetPlayerOptions':
                        $res = '{"header":{"mId":48,"cId":'.$cId.',"name":"SetPlayerOptions","code":1,"dType":1}}';
                        $result_tmp[] = $res;
                        break;
                    case 'GameAction':
                        $body = $postData['body'];
                        $result_tmp[] = '{"header":{"mId":8,"cId":'.$cId.',"name":"GameAction","code":1,"dType":2,"dId":2233641}}';
                        $allbet = (int)($body['data']['betAmount']) * 0.01;
                        $postData['slotEvent'] = 'bet';                        
                        $spinStatus = $slotSettings->GetGameData($slotSettings->slotId . 'SpinStatus');
                        if($body['action'] == 'FS_SPIN')
                        {
                            $postData['slotEvent'] = 'freespin';
                        }
                        
                        if( $postData['slotEvent'] != 'freespin' ) 
                        {
                            if($allbet > $slotSettings->GetBalance())
                            {

                            }
                            $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
                            $bankSum = $allbet / 100 * $slotSettings->GetPercent();
                            $slotSettings->SetBet($allbet);
                            $slotSettings->UpdateJackpots($allbet);
                            $slotSettings->SetGameData($slotSettings->slotId . 'GameWin', 0);                            
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                        }
                        else
                        {
                            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1);
                        }
                        
                        $response = $this->doSpin($slotSettings, $postData);
                        $result_tmp[] = ':::'.$response;
                        break;                 
                    default:
                        break;
                }
                
                $slotSettings->SaveGameData();
                $slotSettings->SaveGameDataStatic();
                DB::commit();          
                $response = implode('------', $result_tmp);                
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

        function doSpin($slotSettings, $postData)
        {
            $linesId = $slotSettings->GetPaylines();
            $reelSetIndex = 0;
            if($postData['slotEvent'] == 'freespin')
            {                
                $slotSettings->SetGameData($slotSettings->slotId . 'LastEvent', 'bonus');
                $reelSetIndex = 1;
                $reelName = 'Reels1';
            }
            else
            {
                $slotSettings->SetGameData($slotSettings->slotId . 'LastEvent', 'bet');
                $reelName = 'Reels0';                
            }

            $lines = count($linesId);
            $body = $postData['body'];
            $allbet = (int)($body['data']['betAmount']) * 0.01;

            $factor = $body['data']['betAmount'] / $body['data']['baseBet'];
            $betLine = $factor * 0.01; 

            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
           
            $spinAcquired = false;             
            $gameWin = $slotSettings->GetGameData($slotSettings->slotId . 'GameWin');

            $minReels = [];
            $minReels0 = [];
            $minLineWins = [];
            $minScatterWins = [];
            $minTotalWin = -1;
            $minFreespinsWon = 0;
            $minAmountSymbolData = [];
            $minRewind = [];

            $totalWin = 0;
            $freespinsWon = 0;
            $lineWins = [];
            $scatterWins = [];
            $reels = [];
            $reels0 = [];
            $amountSymbolData = [];
            $rewind = [];

            $freespinInfo = '';
            $scatterCount = 0;
            $scatter = 14;
            $wild = [11];
            
            if($this->debug && $postData['slotEvent'] != 'freespin')
            {                 
                $winType = 'bonus';
                $spinWinLimit = 1;
            }
            $paytable = $slotSettings->Paytable;
            
            for( $i = 0; $i <= 300; $i++ ) 
            {
                $totalWin = 0;
                $freespinsWon = 0;
                $scatterCount = 0;
                $bonusCount = 0;
                $scatterPos = [];
                $lineWins = [];
                $amountSymbolData = [];
                $scatterWins = [];
                $rewind = [];

                $cWins = array_fill(0, $lines, 0);
                
                $reels = $slotSettings->GetReelStrips($winType);   
                // $reels['reel1'] = [2, 14, 3];
                // $reels['reel2'] = [5, 14, 4];
                // $reels['reel3'] = [14, 11, 1];
                // $reels['reel4'] = [3, 14, 14];
                // $reels['reel5'] = [2, 14, 1];
                if($postData['slotEvent'] == 'freespin')
                    $reels['reel3'][1] = $wild[0];
                $reels0 = $reels;
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
                                                                                
                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) ) 
                            {
                                $mpl = 1;
                                $coin = $paytable[$csym][3];
                                $tmpWin = $paytable[$csym][3] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, $tmpWin, $coin, [1, 1, 1, 0, 0], [$p0, $p1, $p2, -1, -1]];
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
                                    $winline = [$k, $csym, $tmpWin, $coin, [1, 1, 1, 1, 0], [$p0, $p1, $p2, $p3, -1]];
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
                                    $winline = [$k, $csym, $tmpWin, $coin, [1, 1, 1, 1, 1], [$p0, $p1, $p2, $p3, $p4]];
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
                
                //check special symbol win
                if($winType == 'win' && $reels['reel3'][1] == $wild[0])
                {
                    //rewind symbol with low possibility
                    if(rand(0, 100) < 10)
                    {
                        //pick up one non-winning symbol and make it as rewind devil sym
                        $non_winSym = [];
                        if(!empty($lineWins))
                        {
                            foreach($lineWins as $lineWin)
                            {
                                $winPos = $lineWin[5];
                                for($r = 0; $r < 5; $r++)
                                {
                                    $c = $winPos[$r];
                                    if($c == -1)
                                    {
                                        $non_winSym[] = $c * 5 + $r;
                                    }
                                }
                            }
                        }
                        else
                        {
                            $non_winSym = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
                        }

                        $rewind_sym = $non_winSym[rand(0, count($non_winSym) - 1)];
                        $r = $rewind_sym % 5;
                        $c = (int)($rewind_sym / 5);
                        $symbols = [];
                        while(count($symbols) < 4)
                        {
                            $s = rand(0, 10);
                            if(!in_array($s, $symbols))
                                $symbols[] = $s;
                        }
                        $rewind[] = [
                            'finalSymbol' => 14,
                            'pos' => ['pos' => $c, 'reel' => $r],
                            'symbols' => $symbols
                        ];
                        $reels['reel'.($r+1)][$c] = 14;
                    }
                }

                for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < 3; $c++)
                    {
                        if($reels['reel'.($r+1)][$c] == 14)
                        {
                            $rnd = rand(0, 100);
                            if($rnd < 70)
                                $feature = 0;
                            else if($rnd < 90)
                                $feature = 1;
                            else
                                $feature = 2;
                            $name = '';
                            $amount = 0;
                            switch($feature)
                            {
                                case 0: //coin
                                    $name = 'amount';
                                    $rnd = rand(0, 100);
                                    if($rnd <= 70)
                                        $amount = 30 * $factor;
                                    else if($rnd <= 90)
                                        $amount = 60 * $factor;
                                    else
                                        $amount = 100 * $factor;
                                    break;
                                case 1: //mini
                                    $name = 'Mini';
                                    $amount = 250 * $factor;
                                    break;
                                case 2: //minor
                                    $name = 'Minor';
                                    $amount = 750 * $factor;
                                    break;
                                case 3: //major
                                    $name = 'Major';
                                    $amount = 5000 * $factor;
                                    break;
                                case 4: //grand
                                    $name = 'Grand';
                                    $amount = 66000 * $factor;
                                    break;
                            }

                            $amountSymbolData[] = [
                                'symbol' => 14,
                                'displayWinAmount' => $amount,
                                'name' => $name,
                                'pos' => [
                                    'linePos' => $c,
                                    'reelPos' => $r
                                ]
                            ];                            
                        }
                    }

                if($reels['reel3'][1] == $wild[0])
                {
                    foreach($amountSymbolData as $data)
                    {
                        $win = $data['displayWinAmount'] * 0.01;
                        $totalWin += $win;
                        $scatterWins[] = [
                            'amount' => $data['displayWinAmount'],
                            'bgMultiplier' => 1,
                            'multiplier' => 1,
                            'positions' => [
                                [
                                    'pos' => $data['pos']['linePos'],
                                    'reel' => $data['pos']['reelPos']
                                ]
                                ],
                            'symbol' => 14,
                            'type' => 'SCATTER'
                        ];
                    }
                }

                //calculate bonus symbol count
                // for($r = 1; $r <= 5; $r++)
                // {
                //     $isScatterPresent = false;
                //     for($c = 0; $c < 3; $c++)
                //     {
                //         if($reels['reel'.$r][$c] == $scatter)
                //         {
                //             $scatterCount++;
                //             $scatterPos[] = $c;
                //             $isScatterPresent = true;
                //             break;
                //         }                            
                //     }
                //     if(!$isScatterPresent)
                //     {
                //         $scatterPos[] = -1;
                //     }
                // }

                if($winType == 'bonus')
                {
                    $freespinsWon = 6;
                    if(rand(0, 100) < 20)
                        $freespinsWon = 12;
                }

                if($minTotalWin == -1 && $freespinsWon == 0 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minFreespinsWon = $freespinsWon;
                    $minReels = $reels;
                    $minReels0 = $reels0;
                    $minBonusCount = $bonusCount;
                    $minAmountSymbolData = $amountSymbolData;
                    $minScatterWins = $scatterWins;
                    $minRewind = $rewind;
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
                $reels0 = $minReels0;
                $lineWins = $minLineWins;
                $totalWin = $minTotalWin;
                $freespinsWon = $minFreespinsWon;
                $amountSymbolData = $minAmountSymbolData;
                $scatterWins = $minScatterWins;
                $rewind = $minRewind;
            }

            $winInfo = [];
            if(!empty($lineWins))
            {
                foreach($lineWins as $winline)
                {
                    $sym = $winline[3];
                    $winInfo[] = [
                        "name" => "basic",
                        "paylineName" =>  "P" . $winline[0],
                        "symbol" => $winline[1],
                        "amount" => $this->getCreditNumber($winline[2]),
                        "positions" => $winline[4],
                        "type" => "PAYLINE"
                    ];
                }
            }

            if(!empty($scatterWins))
            {
                foreach($scatterWins as $winline)
                    $winInfo[] = $winline;
            }

            $winSC = 0;
            if($totalWin > 0)
            {
                $slotSettings->SetBank($postData['slotEvent'], -1 * $totalWin);
                $slotSettings->SetWin($totalWin);
                $slotSettings->SetBalance($totalWin);
            }

            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $slotSettings->GetGameData($slotSettings->slotId . 'TotalGameWin') + $totalWin);
            if($postData['slotEvent'] == 'freespin')
                $slotSettings->SetGameData($slotSettings->slotId . 'TotalFreespinWin', $slotSettings->GetGameData($slotSettings->slotId . 'TotalFreespinWin') + $totalWin);

            $totalWagerWin = $slotSettings->GetGameData($slotSettings->slotId . 'TotalGameWin');
            $freeSpinWin = $slotSettings->GetGameData($slotSettings->slotId . 'TotalFreespinWin');

            $nextEvent = 'SPIN';
            $event = 'SPIN_RESULT';
            $pigOutcome = 'Both Pigs';
            $pigRand = rand(0, 2);
            if($pigRand == 0)
                $pigOutcome = 'Left Pig';
            else
                $pigOutcome = 'Right Pig';
            $freespinInfo = [];
            $slot = [];
            if($freespinsWon > 0)
            {                
                if($postData['slotEvent'] != 'freespin')
                {
                    $slotSettings->SetGameData($slotSettings->slotId . 'SpinStatus', 'Freespin');
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $freespinsWon);
                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                    $nextEvent = 'FS';
                    $freespinInfo = [
                        'multiplier' => 1,
                        'numFreeSpins' => $freespinsWon,
                        'numFreeSpinsLeft' => $freespinsWon,
                        'totalBaseWinAmount' => 0,
                        'totalGamePlayWinAmount' => $this->getCreditNumber($totalWin),
                        'totalMultiplier' => 1,
                        'totalNumFreeSpins' => $freespinsWon,
                        'totalWinAmount' => 0
                    ];
                }
                else
                {
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + $freespinsWon);
                }                
            }

            $header = $postData['header'];
            $cId = $header['cId'];
            $balanceVersion = floor(microtime(true));
            $res = [
                "header" =>  [
                  "mId" => 0,
                  "cId" => $cId,
                  "name" => "GameEvent",
                  "dType" => $header['dType'],
                  "dId" => 0
                ],
                "body" => [
                  "seqId" => 0,
                  "data" => [
                    "totalWinInRound" => $this->getCreditNumber($totalWin),
                  ],
                  "balance" =>  $this->getCreditNumber($slotSettings->GetBalance()),
                  "balanceVersion" => $balanceVersion,
                ]
            ];

            if($postData['slotEvent'] == 'freespin')
            {
                //set freespin info during freespin (not triggering freespin)
                $totalFreespin = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                $currentFreespin = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                $nextEvent = 'FS';
                $event = 'FS_RESULT';
                $freespinInfo = [
                    "winAmount" => $this->getCreditNumber($totalWin),
                    "wins" => $winInfo,
                    "slotFace" =>  [$reels0['reel1'], $reels0['reel2'], $reels0['reel3'], $reels0['reel4'], $reels0['reel5']],
                    "pigLevelCollection" => [
                      [
                        "Left" => ["level" => 1]
                      ],
                      [
                        "Right" =>  ["level" => 1]
                      ]
                    ],
                    "pigOutcome" => $pigOutcome,
                    "amountSymbolData" => $amountSymbolData,
                    'multiplier' => 1,
                    'numFreeSpins' => $freespinsWon,
                    'numFreeSpinsLeft' => $totalFreespin - $currentFreespin,
                    'totalBaseWinAmount' => $this->getCreditNumber($freeSpinWin),
                    'totalGamePlayWinAmount' => $this->getCreditNumber($totalWagerWin),
                    'totalMultiplier' => 1,
                    'totalNumFreeSpins' => $totalFreespin,
                    'totalWinAmount' => $this->getCreditNumber($freeSpinWin)
                ];

                if($totalFreespin - $currentFreespin == 0)
                {
                    $nextEvent = 'SPIN';
                    $event = 'FS_END';
                }
            }
            else
            {
                $slot = [
                    "winAmount" => $this->getCreditNumber($totalWin),
                    "wins" => $winInfo,
                    "slotFace" =>  [$reels0['reel1'], $reels0['reel2'], $reels0['reel3'], $reels0['reel4'], $reels0['reel5']],
                    "pigLevelCollection" => [
                      [
                        "Left" => ["level" => 1]
                      ],
                      [
                        "Right" =>  ["level" => 1]
                      ]
                    ],
                    "amountSymbolData" => $amountSymbolData
                ];
                if($reels['reel3'][2] == $wild[0])
                    $slot['pigOutcome'] = $pigOutcome;
                if(count($rewind) > 0)
                    $slot['rewind'] = $rewind;

                $res['body']['data']['SLOT'] = $slot;
            }

            if(count($freespinInfo) > 0)
                $res['body']['data']['FREE_SPIN'] = $freespinInfo;
            $res['body']['nextEvent'] = $nextEvent;
            $res['body']['event'] = [$event];
            
            $response = json_encode($res);
            if($postData['slotEvent'] == 'freespin')
                $allbet = 0;
            $slotSettings->SaveLogReport($response, $allbet, $totalWin, $postData['slotEvent']);        
            return $response;
        }
        
        function getActiveSymbols($reels, $sym, $line)
        {
            $rows = 5;
            $cols = count($reels['reel1']);
                        
            $active = array_fill(0, $rows * $cols, 0);
            for($r = 0; $r < $rows; $r++)
                for($c = 0; $c < $cols; $c++)
                {
                    if($reels['reel'.($r+1)][$c] == $sym && $c == $line)
                        $active[$r * $cols + $c] = 1;
                }
            
            return implode("", $active);
        }

        function getPositions($csym, $reels, $cnt, $reelHeight)
        {
            $multiplier = 0;
            $positions = [];
            for($r = 0; $r < $cnt; $r++)
            {
                $reel = $reels['reel'.($r+1)];
                for($c = 8 - $reelHeight; $c < 8; $c++)
                    if($reel[$c] == $csym)
                        $positions[] = $c * 5 + $r;
            }            

            return implode($positions, '|');
        }

        function getCreditNumber($value)
        {
            return intval(number_format($value * 100, 0, '.', '')); 
        }
    }

}



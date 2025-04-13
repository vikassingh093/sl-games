<?php 
namespace VanguardLTE\Games\LockedItLink
{
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;    
    class Server
    {
        function inflateFireball($fireballs, $level)
        {
            $inflate_count = rand(0,3);
            $inflated = 0;
            for($i = count($fireballs) - 1; $i >= 0; $i--)
            {
                if($inflated == $inflate_count)
                    break;
                $fireball = explode(';',$fireballs[$i]);
                $row = intval($fireball[9]);
                $reel = intval($fireball[10]);
                if($row == -1 && $reel == -1)
                {
                    $row = rand(5 - $level, 7);
                    $reel = rand(0, 3);
                    $fireball[9] = $row;
                    $fireball[10] = $reel;                        
                    $inflated++;
                    $fireballs[$i] = implode(';', $fireball);
                }                    
            }
            
            return $fireballs;
        }

        function getFeatureData($fireballs, $slotSettings)
        {
            $initialValues = [];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];
            $initialValues[] = [0,0,0,0,0];

            $finalValues = [];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];
            $finalValues[] = [0,0,0,0,0];

            $ultras = [];
            $upgrades = [];

            $visible_symbols = 0;
            $current_level = 0;
            $featureWin = 0;
            $lastvs = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureVS');
            $availableLevel = intval($lastvs / 4);
            if($availableLevel == 0)
                $availableLevel = 0;

            for($i = 0; $i < count($fireballs); $i++)
            {
                $fireball = explode(';',$fireballs[$i]);
                $row = intval($fireball[9]);
                $reel = intval($fireball[10]);
                if($row != -1 && $reel != -1 && $row >= 5 - $availableLevel)
                {
                    $visible_symbols++;
                    $initial = intval($fireball[1]);
                    $final = intval($fireball[2]);                        
                    $initialValues[$row][$reel] = $final;
                    $finalValues[$row][$reel] = $final;
                    if($initial > $final)
                        $ultras[] = [$row, $reel];
                    else if($initial < $final)
                        $upgrades[] = [$row, $reel];

                    if($fireball[0] > $current_level)
                        $current_level = $fireball[0];
                    $featureWin += $final;
                }
            }

            for($i = 0; $i < count($initialValues); $i++)
                $initialValues[$i] = implode(';', $initialValues[$i]);
            $strInitial = implode('|', $initialValues);

            for($i = 0; $i < count($finalValues); $i++)
                $finalValues[$i] = implode(';', $finalValues[$i]);
            $strFinal = implode('|', $finalValues);             

            for($i = 0; $i < count($ultras); $i++)
                $ultras[$i] = implode(';', $ultras[$i]);
            $strUltra = '['.implode('|', $ultras).']';

            for($i = 0; $i < count($upgrades); $i++)
                $upgrades[$i] = implode(';', $upgrades[$i]);
            $strUpgrades = '['.implode('|', $upgrades).']';
            $data = [$strInitial, $strFinal, $strUltra, $strUpgrades, $visible_symbols, $current_level, $featureWin];
            return $data;
        }        

        public function get($request, $game)
        {
            try
            {
                DB::beginTransaction();
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
                $reqId = $postData['MSGID'];
                $balance = $slotSettings->GetBalance();
                $response = '';
                switch( $reqId ) 
                {
                    case 'INIT':                                                  
                        $response = '{"PAYLOAD":"&MSGID=INIT&B=' . $balance * 100 . '&VER=3.0.3-3.0.3-1.0.3-1.0.3-3&RTP=96.02%&LIM=1|4500|&BD=1|2|3|4|5|6|7|8|9|10|15|20|25|30|40|50|60|70|80|90|&BDD=1&RSTM=1;0|&UGB=0&CUR=ISO:USD|,|.|36;|L|32;|R&LINEWINSYMS=0|1|2|3|4|5|6|7|8|9|10&LINEWINSYMPAYS=0;5;50;100;150|0;0;15;40;100|0;0;10;30;90|0;0;5;25;75|0;0;5;20;50|0;0;5;15;50|0;0;5;10;30|0;0;5;10;30|0;0;5;10;20|0;0;5;10;20|0;5;50;100;150&JPTYPES=-1|-2|-3|-4&JPPAYS=250000|100000|5000|2000&LB=50&GA=0&AB=' . $balance * 100 . '&FRBAL=0&SID=Free:q50t54b8g04kehcqudnpqgjbahr&"}';
                        break;
                    case 'REELSTRIP':
                        $filename = base_path() . '/app/Games/LockedItLink/game.txt';
                        $file = fopen($filename, "r" );
                        $filesize = filesize( $filename );
                        $response = fread( $file, $filesize );
                        $response = str_replace('BAL_REPLACE', $slotSettings->GetBalance() * 100, $response);
                        fclose( $file );

                        $response = '{"PAYLOAD":"'.$response.'"}';
                        break;
                    case 'FEATURE_START':
                        $fireballs = $slotSettings->GetGameData($slotSettings->slotId . 'Fireballs'); //get current fireball map
                        $symb = $slotSettings->GetGameData($slotSettings->slotId . 'initialSymbols');
                            
                        $response = '{"PAYLOAD":"&MSGID='.$reqId;
                        $response .= '&B=' . ($slotSettings->GetBalance() * 100);
                        $response .= '&VER=2.7.6-2.7.9-1.5.2-1-4';                                
                        $response .= '&FID=1|';
                        $response .= '&CFG=1';
                        $response .= '&FS_1=1';
                        $response .= '&NFR_1=1';
                        $response .= '&FTV_1=0;1;1;null;|';
                        $response .= '&FPM_1=|';
                        $response .= '&CFR_1=0';
                        $response .= '&CFP_1=0';    
                        $response .= '&IFG=0';
                        $response .= '&TW=0';                                
                        //game specfic data
                        $response .= '&GSD=siv~';
                        $response .= $symb;
                        $MF = $slotSettings->GetGameData($slotSettings->slotId . 'BaseFeatureWin');                                
                        $response .= '#GWD~[ML;0|MF;'.$MF.'|FL;0|FF;0]#ps~2';
                        $featureData = getFeatureData($fireballs, $slotSettings);
                        $vs = $featureData[4];
                        $slotSettings->SetGameData($slotSettings->slotId . 'FeatureVS', $vs);                                
                        $code = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureCode');
                        
                        $response .= '#code~'.$code;
                        $response .= '#jackpots~[]';
                        $response .= '#fb~'.$code.'|';
                        $response .= implode('|', $fireballs) . '|';
                        $response .= '#ultras~' . $featureData[2];
                        $response .= '#finalValues~' . $featureData[1].'|';
                        $response .= '#initialVals~' . $featureData[0].'|';
                        $response .= '#upgrades~' . $featureData[3];
                        $response .= '#lives~3';
                        $tfp = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureTFP');
                        $response .= '#tfp~' . $tfp; //final value is 2 times by win

                        $maxLevels = $slotSettings->GetGameData($slotSettings->slotId . 'MaxLevels');
                        $response .= '#maxLevels~' . $maxLevels;
                        $response .= '#vs~' . $vs;
                        $response .= '#levels~0';
                        $response .= '&GA=0';
                        $response .= '&AB=' . ($slotSettings->GetBalance() * 100);
                        $response .= '&FRBAL=0';
                        $response .= '&SID=p78fivb12milu9fnbflgku5jgn6';
                        $response .= '"}';                                
                        break;
                    case 'FEATURE_PICK':
                        $fireballs = $slotSettings->GetGameData($slotSettings->slotId . 'Fireballs'); //get current fireball map
                        $featureData = getFeatureData($fireballs, $slotSettings);
                        $fireballs = inflateFireball($fireballs, $featureData[5]);
                        $slotSettings->SetGameData($slotSettings->slotId . 'Fireballs', $fireballs);
                        $cfp = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureCFP');
                        $cfp++;
                        $slotSettings->SetGameData($slotSettings->slotId . 'FeatureCFP', $cfp);
                        //generate random fireball
                        $symb = $slotSettings->GetGameData($slotSettings->slotId . 'initialSymbols');
                            
                        $response = '{"PAYLOAD":"&MSGID='.$reqId;
                        $response .= '&B=' . ($slotSettings->GetBalance() * 100);
                        $response .= '&VER=2.7.6-2.7.9-1.5.2-1-4';                                
                        $response .= '&FID=1|';
                        $response .= '&CFG=1';
                        $response .= '&FS_1=1';
                        $response .= '&NFR_1=1';
                        $fpm = array_fill(0, $cfp, 1);
                        $response .= '&FPM_1=' . implode(';', $fpm) . '|';
                        $response .= '&CFR_1=0';
                        $response .= '&CFP_1=' . $cfp;    
                        $response .= '&IFG=0';
                        $response .= '&TW=0';
                        //game specfic data
                        $response .= '&GSD=siv~';
                        $response .= $symb;
                        $MF = $slotSettings->GetGameData($slotSettings->slotId . 'BaseFeatureWin');                                
                        $response .= '#GWD~[ML;0|MF;'.$MF.'|FL;0|FF;0]#ps~2';
                        $featureData = getFeatureData($fireballs, $slotSettings);
                        $vs = $featureData[4];
                        $lastvs = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureVS');
                        $lives = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureLives');
                        if($vs > $lastvs)
                        {
                            $lives = 3;
                        }
                        else
                        {
                            $lives--;
                        }
                        $slotSettings->SetGameData($slotSettings->slotId . 'FeatureLives', $lives);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FeatureVS', $vs);
                        $code = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureCode');
                        
                        $response .= '#code~'.$code;
                        $response .= '#jackpots~[]';
                        $response .= '#fb~'.$code.'|';
                        $response .= implode('|', $fireballs) . '|';
                        $response .= '#ultras~' . $featureData[2];
                        $response .= '#finalValues~' . $featureData[1].'|';
                        $response .= '#initialVals~' . $featureData[0].'|';
                        $response .= '#upgrades~' . $featureData[3];
                        $response .= '#lives~' . $lives;
                        $tfp = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureTFP');
                        $response .= '#tfp~' . $tfp; //final value is 2 times by win

                        $maxLevels = $slotSettings->GetGameData($slotSettings->slotId . 'MaxLevels');
                        $response .= '#maxLevels~' . $maxLevels;
                        $response .= '#vs~' . $vs;
                        $response .= '#levels~' . $featureData[5];
                        $response .= '&GA=0';
                        $response .= '&AB=' . ($slotSettings->GetBalance() * 100);
                        $response .= '&FRBAL=0';
                        $response .= '&SID=p78fivb12milu9fnbflgku5jgn6';
                        $response .= '"}';                           
                        break;
                    case 'FEATURE_END':
                        $betLine = $slotSettings->GetGameData($slotSettings->slotId . 'BPL');
                        $fireballs = $slotSettings->GetGameData($slotSettings->slotId . 'Fireballs');
                        $featureData = getFeatureData($fireballs, $slotSettings);
                        $featureData[6] = $featureData[6] * $betLine / 100;
                        $symb = $slotSettings->GetGameData($slotSettings->slotId . 'initialSymbols');
                        $featureBaseWin = $slotSettings->GetGameData($slotSettings->slotId . 'FeatureBaseWin');
                        $win = $featureBaseWin + $featureData[6];
                        if($win > 0)
                        {
                            $slotSettings->SetBank('bonus', -1 * $win);
                            $slotSettings->SetBalance($win);
                            
                            $lines = 50;
                            $allbet = $betLine * 0.2;
                            $reels = $slotSettings->GetGameData($slotSettings->slotId . 'Reels');
                            $jsSpin = '' . json_encode($reels) . '';
                            $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                                                                
                            $response = '{"responseEvent":"spin","responseType":"' . 'freespin' . '","serverResponse":{"BonusSymbol":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol') . ',"slotLines":' . $lines . ',"slotBet":' . $betLine . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $slotSettings->GetBalance() . ',"afterBalance":' . $slotSettings->GetBalance() . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"freeStartWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeStartWin') . ',"totalWin":' . $win . ',"winLines":[],"bonusInfo":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                            $symb = $reels['reel1'][0] . ';' . $reels['reel2'][0] . ';' . $reels['reel3'][0] . ';' . $reels['reel4'][0] . ';' . $reels['reel5'][0] . '|' . $reels['reel1'][1] . ';' . $reels['reel2'][1] . ';' . $reels['reel3'][1] . ';' . $reels['reel4'][1] . ';' . $reels['reel5'][1] . '|' . $reels['reel1'][2] . ';' . $reels['reel2'][2] . ';' . $reels['reel3'][2] . ';' . $reels['reel4'][2] . ';' . $reels['reel5'][2] . '|' . $reels['reel1'][3] . ';' . $reels['reel2'][3] . ';' . $reels['reel3'][3] . ';' . $reels['reel4'][3] . ';' . $reels['reel5'][3] . '|';
                            $slotSettings->SaveLogReport($response, 0, $win, 'freespin');                                    
                        }
                        $response = '{"PAYLOAD":"&MSGID='.$reqId;
                        $response .= '&B=' . ($slotSettings->GetBalance() * 100);
                        $response .= '&VER=2.7.6-2.7.9-1.5.2-1-4';                                
                        $response .= '&RID=0';
                        $response .= '&NRID=0';
                        $response .= '&IFG=0';                                
                        $response .= '&TW=' . ($win * 100);                                                           
                        $response .= '&GSD=ps~2';
                        $response .= '#GWD~[ML;'.($featureBaseWin * 100).'|MF;'.($featureData[6] * 100).'|FL;0|FF;0]';
                        $response .= '#siv~' . $symb;
                        $response .= 'FW~' . ($featureData[6] * 100);
                        $response .= '&GA=0';
                        $response .= '&AB=' . ($slotSettings->GetBalance() * 100);
                        $response .= '&FRBAL=0';
                        $response .= '&SID=p78fivb12milu9fnbflgku5jgn6';
                        $response .= '"}';    
                        break;
                    case 'FREE_GAME':
                    case 'BET':
                        $debug = false;
                        $betLine = $postData['BPL'];
                        $slotSettings->SetGameData($slotSettings->slotId . 'BPL', $betLine);
                        $postData['slotEvent'] = 'bet';
                        $bonusMpl = 1;
                        $linesId = $slotSettings->GetPayLines();                                
                        $lines = 50;                                
                        $allbet = $betLine * 0.2;
                        if( !isset($postData['slotEvent']) ) 
                        {
                            $postData['slotEvent'] = 'bet';
                        }
                        $reelSetID = 0;
                        if( $reqId == 'FREE_GAME' ) 
                        {
                            $postData['slotEvent'] = 'freespin';
                            $bonusMpl = 1;
                            $reelSetID = 1;
                        }
                        if( $postData['slotEvent'] != 'freespin' ) 
                        {
                            $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
                            $bankSum = $allbet / 100 * $slotSettings->GetPercent();
                            $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), $bankSum, $postData['slotEvent']);
                            $slotSettings->UpdateJackpots($allbet);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGamesBaseWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);                                    
                            $slotSettings->SetGameData($slotSettings->slotId . 'GameState', 'Spin');                                    
                        }
                        else
                        {
                            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1);
                            $bonusMpl = $slotSettings->slotFreeMpl;
                        }
                        $balance = sprintf('%01.2f', $slotSettings->GetBalance());
                        $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $betLine, $lines);
                        $winType = $winTypeTmp[0];
                        // debug freespin test
                        if($debug && $reqId != 'FREE_GAME')
                        {
                            $winType = 'bonus';
                        }
                        $spinWinLimit = $winTypeTmp[1];
                        $spinAcquired = false;
                        for( $i = 0; $i <= 500; $i++ ) 
                        {
                            $totalWin = 0;
                            $lineWins = [];
                            $cWins = array_fill(0, count($linesId), 0);
                            
                            $wild = ['2'];
                            $scatter = '1';
                            $fireball = '0';
                            $isScatter = 0;
                            $isTrigger = 0;

                            $reels = $slotSettings->GetReelStrips($winType, $postData['slotEvent']);
                            
                            $reelsTmp = $reels;
                            for( $k = 0; $k < count($linesId); $k++ ) 
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
                                                $tmpStringWin = $k.';'.($tmpWin * 100).';'.$p0.';'.$p1.';'.$p2.';-1;-1';
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
                                                $tmpStringWin = $k.';'.($tmpWin * 100).';'.$p0.';'.$p1.';'.$p2.';'.$p3.';-1';
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
                                                $tmpStringWin = $k.';'.($tmpWin * 100).';'.$p0.';'.$p1.';'.$p2.';'.$p3.';'.$p4.'';
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
                            $BetSlipCurrent = $slotSettings->GetGameData($slotSettings->slotId . 'BetSlipCurrent');
                            
                            $scattersWin = 0;                                    
                            $scattersPos = [];                                    
                            $scattersCount = 0;
                            $extraScatterCount = 0;
                            $scattersCount2 = 0;
                            $bSym = $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol');
                            $bSymCnt = 0;

                            //search bonus symbol
                            for( $r = 1; $r <= 5; $r++ ) 
                            {
                                $isScat = false;
                                for( $p = 0; $p <= 3; $p++ ) 
                                {
                                    if($isScat)
                                    {
                                        break;
                                    }
                                    if( $reels['reel' . $r][$p] == $scatter ) 
                                    {
                                        if($r >= 2 && $r <= 4)
                                        {
                                            $scattersCount++;
                                            $scattersPos[] = $p;
                                            $isScat = true;                                                
                                        }
                                        else if($r == 5)
                                        {
                                            $extraScatterCount++;                                                    
                                        }
                                    }                                            
                                }
                            }                                    

                            if($reqId == 'FREE_GAME' && $extraScatterCount > 2)
                            {//insert more bonus win line when free game
                                $tmpStringWin = '-2;0;-1;-1;-1;-1;'.$extraScatterCount.';';
                                array_push($lineWins, $tmpStringWin);     
                                $isTrigger = 1;
                                $isScatter = 1;
                            }
                            
                            if( $scattersCount >= 3 && $slotSettings->slotBonus ) 
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'GameState', 'FreeSpin');                                        
                                $scattersWin = $betLine * 0.2; //bonus win is same as bet size
                                $tmpStringWin = '-1;'.($scattersWin * 100).'-1;-1;-1;-1;-1;';
                                array_push($lineWins, $tmpStringWin);
                                $tmpStringWin = '-2;0;-1;'.$scattersPos[0].';'.$scattersPos[1].';'.$scattersPos[2].';-1;';
                                array_push($lineWins, $tmpStringWin);
                                $reelSetID = 1;
                            }                                    
                            $totalWin += $scattersWin;

                            //search fireball count
                            $fireball_win = [];
                            $fireballCount = 0;
                            $total_freegame_fireball_win = 0;
                            $fireball_pos = [];
                            for( $r = 1; $r <= 5; $r++ ) 
                            {                                        
                                for( $p = 0; $p <= 3; $p++ ) 
                                {                                            
                                    if( $reels['reel' . $r][$p] == $fireball ) 
                                    {
                                        $fireballCount++;
                                        $fireball_pos[] = [$p + 4,$r - 1];
                                        if($reqId == 'FREE_GAME')
                                        {
                                            $randomWin = ($betLine * 0.2) * rand(1,3);
                                            $fireball_win[] = $randomWin * 100;
                                            $total_freegame_fireball_win += $randomWin;
                                        }
                                    }                                            
                                }
                            } 
                            
                            if($reqId == 'FREE_GAME' && count($fireball_win) > 0)
                            {
                                $tmpStringWin = '-1;'.($total_freegame_fireball_win * 100).';-1;-1;-1;-1;-1;';
                                array_push($lineWins, $tmpStringWin);
                                $isTrigger = 1;                                            
                                $totalWin += $total_freegame_fireball_win;
                            }

                            $fireballs = [];
                            $total_fireball_win = 0;
                            $level_count = [];
                            $levels = 0;
                            if($fireballCount > 3 && $reqId == 'BET')
                            {
                                $levels = 1;
                                $rand = rand(0, 100);
                                if($rand < 3)
                                    $levels = 4;
                                else if($rand < 20)
                                    $levels = 3;
                                else if($rand < 50)
                                    $levels = 2;
                                else
                                    $levels = 1;
                                //generate potential fireballs                                        
                                for($level = $levels; $level >= 0; $level--)
                                {
                                    if($level == 0)
                                    {        
                                        $level_count[] = count($fireball_pos);
                                        //use fireball positions that generated in reelset                                                
                                        for($ball = 0; $ball < count($fireball_pos); $ball++)
                                        {
                                            $fb = [];
                                            $fb[] = $level;
                                            $fb[] = $allbet * rand(1,3) * 100 / $betLine; //initial value
                                            $rand = rand(1, 10); //generate hot fireball with 10%
                                            if($rand == 1)
                                                $fb[] = $allbet * rand(1,3) * 100 / $betLine;//final value
                                            else
                                                $fb[] = $fb[1];

                                            $total_fireball_win += $fb[2] * $betLine / 100;
                                            $fb[] = 0; //isJackpot
                                            $fb[] = 1; //isPicked
                                            $fb[] = $fb[1] > $fb[2] ? 1 : 0; //is ultra hot
                                            $fb[] = $fb[1] < $fb[2] ? 1 : 0; //is upgraded
                                            $fb[] = 0; //is potential ultra hot
                                            $fb[] = 0; //unknown
                                            $fb[] = $fireball_pos[$ball][0]; //row
                                            $fb[] = $fireball_pos[$ball][1]; //reel
                                            $fb[] = $fb[1]; //origin
                                            $fb[] = $fb[2] - $fb[1]; //difference
                                            $fireballs[] = implode(';', $fb);
                                        }
                                    }
                                    else
                                    {
                                        $cnt = rand(1,6);
                                        $level_count[] = $cnt;
                                        for($ball = 0; $ball < $cnt; $ball++)
                                        {
                                            $fb = [];
                                            $fb[] = $level;
                                            $fb[] = $allbet * rand(1,5) * 100 / $betLine; //initial value
                                            $rand = rand(1, 10); //generate hot fireball with 10%
                                            if($rand == 1)
                                                $fb[] = $allbet * rand(1,5) * 100 / $betLine; //final value
                                            else
                                                $fb[] = $fb[1];
                                            $total_fireball_win += $fb[2] * $betLine / 100;
                                            $fb[] = 0; //isJackpot
                                            $fb[] = 1; //isPicked
                                            $fb[] = $fb[1] > $fb[2] ? 1 : 0; //is ultra hot
                                            $fb[] = $fb[1] < $fb[2] ? 1 : 0; //is upgraded
                                            $fb[] = 0; //is potential ultra hot
                                            $fb[] = 0; //unknown
                                            $fb[] = -1; //row
                                            $fb[] = -1; //reel
                                            $fb[] = $fb[1]; //origin
                                            $fb[] = $fb[2] - $fb[1]; //difference
                                            $fireballs[] = implode(';', $fb);
                                        }
                                    }
                                }
                                $totalWin += $total_fireball_win; 
                            }

                            if($debug)
                            {
                                $spinAcquired = true;
                                break;
                            }

                            // if($reqId == 'FREE_GAME' && $totalWin > 0)
                            // {
                            //     $spinAcquired = true;
                            //     break;
                            // }
                            if($totalWin <= $spinWinLimit && $winType != 'none' && $totalWin > 0)
                            {
                                $spinAcquired = true;
                                break;
                            }                                    
                            else if( $winType == 'none' && $totalWin == 0) 
                            {
                                break;
                            }
                        }

                        if(!$spinAcquired && $totalWin > 0)
                        {
                            $reels = $slotSettings->GetNoWinSpin($postData['slotEvent']);
                            $total_fireball_win = 0;
                            $totalWin = 0;
                            $lineWins = [];
                            $scattersCount = 0;
                            $extraScatterCount = 0;
                            $isTrigger = 0;
                            $isScatter = 0;
                            $fireball_pos = [];
                        }

                        if($reqId == 'BET')
                            $totalWin -= $total_fireball_win; //fireball win is calculated at the end of firelink
                                                        
                        if( $totalWin > 0 ) 
                        {
                            $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                            $slotSettings->SetBalance($totalWin);
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
                                if($extraScatterCount > 0)
                                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + $extraScatterCount);
                            }
                            else
                            {
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $totalWin);
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->slotFreeCount + $extraScatterCount);
                            }
                        }  
                                                    

                        //$reels = $reelsTmp;
                        $slotSettings->SetGameData($slotSettings->slotId . 'WildsCount', $scattersCount2);
                        $jsSpin = '' . json_encode($reels) . '';
                        $jsJack = '' . json_encode($slotSettings->Jackpots) . '';
                        
                        $response = '{"responseEvent":"spin","responseType":"' . $postData['slotEvent'] . '","serverResponse":{"BonusSymbol":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol') . ',"slotLines":' . $lines . ',"slotBet":' . $betLine . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $slotSettings->GetBalance() . ',"afterBalance":' . $slotSettings->GetBalance() . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"freeStartWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeStartWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"bonusInfo":[],"Jackpots":' . $jsJack . ',"reelsSymbols":' . $jsSpin . '}}';
                        $symb = $reels['reel1'][0] . ';' . $reels['reel2'][0] . ';' . $reels['reel3'][0] . ';' . $reels['reel4'][0] . ';' . $reels['reel5'][0] . '|' . $reels['reel1'][1] . ';' . $reels['reel2'][1] . ';' . $reels['reel3'][1] . ';' . $reels['reel4'][1] . ';' . $reels['reel5'][1] . '|' . $reels['reel1'][2] . ';' . $reels['reel2'][2] . ';' . $reels['reel3'][2] . ';' . $reels['reel4'][2] . ';' . $reels['reel5'][2] . '|' . $reels['reel1'][3] . ';' . $reels['reel2'][3] . ';' . $reels['reel3'][3] . ';' . $reels['reel4'][3] . ';' . $reels['reel5'][3] . '|';
                        $slotSettings->SaveLogReport($response, $allbet, $reportWin, $postData['slotEvent']);
                        $slotSettings->SetGameData($slotSettings->slotId . 'BetSlipCurrent', $BetSlipCurrent);
                        $slotSettings->SetGameData($slotSettings->slotId . 'Reels', $reels);

                        if( $reqId == 'FREE_GAME' ) 
                        {
                            $bonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                            if($extraScatterCount > 0)
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') + $extraScatterCount);
                            $freeSpinsTotal = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                            $freeSpinRemain = $freeSpinsTotal - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');

                            $response = '{"PAYLOAD":"&MSGID='.$reqId;
                            $response .= '&B=' . ($slotSettings->GetBalance() * 100);
                            $response .= '&VER=2.7.6-2.7.9-1.5.2-1-4';
                            $response .= '&RID=1';
                            $response .= '&NRID='.$reelSetID;
                            $response .= '&BPL=' . $postData['BPL'];
                            $response .= '&LB=50';                                    
                            $response .= '&RS='.($reels['rp'][0]-1).'|'.($reels['rp'][1]-1).'|'.($reels['rp'][2]-1).'|'.($reels['rp'][3]-1).'|'.($reels['rp'][4]-1).'|';
                            $response .= '&TW=' . ($bonusWin * 100 + $slotSettings->GetGameData($slotSettings->slotId . 'FreeGamesBaseWin'));
                            
                            if($fireballCount > 0)
                                $isScatter = 1;   
                            
                            $winLineCount = count($lineWins);
                            if(count($fireball_win) > 0)
                                $winLineCount--; //fireball win line is not included in WS count
                            if($extraScatterCount > 0)
                                $winLineCount--; //more bonus win line is not included in WS count
                            $response .= '&WC=' . $winLineCount .'|' . $isScatter . '|'.$isTrigger.'|';
                            if(count($lineWins) > 0)                                    
                                $response .= '&WS='.implode('|', $lineWins).'|';
                            
                            $response .= '&CW=' . ($totalWin * 100);
                            $response .= '&NFG=' . $freeSpinRemain;      
                            if($extraScatterCount > 0)
                                $response .= '&FGT=' . $extraScatterCount;
                            $response .= '&TFG=' . $freeSpinsTotal;

                            $response .= '&CFGG=' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');    
                            $response .= '&FGTW=' .($bonusWin * 100);

                            $response .= '&IFG=1';
                            $response .= '&FID=0|';
                            $response .= '&MUL=1';
                            $response .= '&SUB=0';
                            $response .= '&GSD=ps~3';
                            $response .= '#GWD~[ML;'.($slotSettings->GetGameData($slotSettings->slotId . 'FreeGamesBaseWin')).'|MF;0|FL;'.($bonusWin * 100).'|FF;0]';
                            $response .= '#siv~'.$symb;
                            $response .= '#CWP~'.($totalWin*100);
                            if(count($fireball_win) > 0)
                                $response.= '#FW~'.implode('|', $fireball_win).'|';
                            $response .= '&GA=0';
                            $response .= '&AB=' . ($slotSettings->GetBalance() * 100);
                            $response .= '&FRBAL=0';
                            $response .= '&SID=p78fivb12milu9fnbflgku5jgn6';
                            $response .= '"}';
                        }
                        else if( $reqId == 'BET')
                        {
                            $slotSettings->SetGameData($slotSettings->slotId . 'initialSymbols', $symb);
                            
                            $response = '{"PAYLOAD":"&MSGID='.$reqId;
                            $response .= '&B=' . ($slotSettings->GetBalance() * 100);
                            $response .= '&VER=2.7.6-2.7.9-1.5.2-1-4';
                            $response .= '&RID=0';
                            $response .= '&NRID='.$reelSetID;
                            $response .= '&BPL=' . $postData['BPL'];
                            $response .= '&LB=50';                                    
                            $response .= '&RS='.($reels['rp'][0]-1).'|'.($reels['rp'][1]-1).'|'.($reels['rp'][2]-1).'|'.($reels['rp'][3]-1).'|'.($reels['rp'][4]-1).'|';
                            $response .= '&TW=' . ($totalWin * 100);
                            
                            if($scattersCount == 3)
                                $isScatter = 1;
                            
                            if($reelSetID == 1)
                                $isTrigger = 1;
                            $response .= '&WC=' . count($lineWins) .'|' . $isScatter . '|' . $isTrigger . '|';
                            if(count($lineWins) > 0)
                                $response .= '&WS='.implode('|', $lineWins).'|';
                            $response .= '&IFG=0';
                            $response .= '&MUL=1';
                            $response .= '&SUB=0';
                            
                            if(count($fireball_pos) > 3)
                            {
                                //win fireball feature
                                $slotSettings->SetGameData($slotSettings->slotId . 'Fireballs', $fireballs); //save current fireball map                                        
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureLives', 3);
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureCFP', 0);
                                
                                $slotSettings->SetGameData($slotSettings->slotId . 'TotalFeaturePick', $total_fireball_win);                                        
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureBaseWin', $totalWin);

                                $response .= '&FID=1|';
                                $response .= '&CFG=1';
                                $response .= '&FS_1=0';
                                $response .= '&NFR_1=1';
                                $response .= '&FTV_1=0;1;1;null;|';
                                $response .= '&FPM_1=|';
                                $response .= '&CFR_1=0';
                                $response .= '&CFP_1=0';

                                //game specific data
                                $response .= '&GSD=siv~';
                                $response .= $symb;
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureVS', count($fireball_pos));          
                                $featureData = getFeatureData($fireballs, $slotSettings);
                                $vs = $featureData[4];                                        
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureVS', $vs);                                
                                $code = implode('',$level_count) . '|' . $level_count[count($level_count) - 1];
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureCode', $code);
                                $response .= '#code~'.$code;
                                $response .= '#jackpots~[]';
                                $response .= '#GWD~[ML;'.($totalWin * 100).'|MF;0|FL;0|FF;0]#ps~2';
                                $response .= '#fb~'.$code.'|';
                                $response .= implode('|', $fireballs) . '|';
                                $response .= '#ultras~' . $featureData[2];
                                $response .= '#finalValues~' . $featureData[1].'|';
                                $response .= '#initialVals~' . $featureData[0].'|';
                                $response .= '#upgrades~' . $featureData[3];
                                $response .= '#lives~3';
                                $slotSettings->SetGameData($slotSettings->slotId . 'FeatureTFP', $total_fireball_win * 2);
                                $response .= '#tfp~' . ($total_fireball_win * 2); //final value is 2 times by win

                                $slotSettings->SetGameData($slotSettings->slotId . 'MaxLevels', $levels - 1);
                                $response .= '#maxLevels~' . ($levels - 1);
                                $response .= '#vs~' . $vs;
                                $response .= '#levels~0';                               
                            }
                            else if($reelSetID == 1)
                            {
                                //win bonus
                                $response .= '&CW=' . ($totalWin * 100);
                                $response .= '&NFG=' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');    
                                $response .= '&FGT=' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');    
                                $response .= '&TFG=' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');    
                                $response .= '&CFGG=' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');    
                                $response .= '&FGTW=0';    
                                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGamesBaseWin', $totalWin * 100);
                                //game specific data
                                $response .= '&GSD=siv~';
                                $response .= $symb;
                                $response .= '#GWD~[ML;'.($totalWin * 100).'|MF;0|FL;0|FF;0]#ps~2';
                            }
                            else
                            {
                                //game specific data
                                $response .= '&GSD=siv~';
                                $response .= $symb;
                                $response .= '#GWD~[ML;'.($totalWin * 100).'|MF;0|FL;0|FF;0]#ps~2';
                            }                                                                        
                            
                            $response .= '&GA=0';
                            $response .= '&AB=' . ($slotSettings->GetBalance() * 100);
                            $response .= '&FRBAL=0';
                            $response .= '&SID=p78fivb12milu9fnbflgku5jgn6';
                            $response .= '"}';
                        }
                        
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
    }
}


<?php 
namespace VanguardLTE\Games\SweetAlchemyBingoPNG
{
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;

    /**
     * pattern type: 2 2 7 {number} {cardIndex} {positionInCard} {winlineCnt} [{patternIndex, winAmount}, ..] {pendingWinLineCnt} [{patternIndex, winAmount, position}]
     */

    class Server
    {
        public $gameState;
        public $debug = false;

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
                $postData = $_POST;
                $getData = $_GET;
                $tempData = explode("\n", file_get_contents('php://input'));
                $response = '';
                if( trim($tempData[0]) == 'd=1' ) 
                {
                    echo "d=103 \"WWgb5PqdGvk\"\r\n\r\n";
                }
                if( trim($tempData[0]) == 'd=2' ) 
                {
                    echo "d=103 \"WWgb5PqdGvk!9108\"\r\n101 9108 \"DEMO\" \"\" \"\" \"user9108\" \"\"\r\n127 \"2020-08-23T14:43:01Z\"\r\n";
                }
                $aid = '';
                if( isset($tempData[2]) && trim($tempData[2]) == '0' ) 
                {
                    echo 'd=';
                }
                else if( isset($tempData[2]) ) 
                {
                    $gameData = explode(' ', $tempData[2]);
                    if( trim($gameData[0]) == '104' ) 
                    {
                        $balanceInCents = round($slotSettings->GetBalance() * $slotSettings->CurrentDenom * 100);
                        $resultNums = $this->placeCards($slotSettings);
                        $response = "d=104 1\r\n54 10 1 2 3 4 5 6 7 8 9 10 1\r\n57 \"<custom><RTP Value=\"97\" /></custom>\"\r\n52 " . $balanceInCents . " 0 0\r\n56 60 " . implode(' ', $resultNums) . "\r\n91 10349\r\n109";
                    }
                    if( trim($gameData[0]) == '1' ) 
                    {
                        $aid = 'spin';
                        $postData['slotEvent'] = 'bet';
                    }
                    if( trim($gameData[0]) == '10' ) 
                    {
                        $aid = 'resetcards';
                    }                    
                    if( trim($gameData[0]) == '2') 
                    {
                        if(trim($gameData[1]) == '6')
                            $aid = 'endround';
                        else if(trim($gameData[1]) == '4')
                            $aid = 'stepbonus';
                        else if(trim($gameData[1]) == '3')
                        {
                            if($gameData[2] > 0)
                                $aid = 'extra';
                            else
                                $aid = 'collect';
                        }                            
                    }                    
                    if( trim($gameData[0]) == '102' ) 
                    {
                        $aid = 'exit';
                    }
                    if( trim($gameData[0]) == '7' ) 
                    {
                        $aid = 'freestep';
                    }
                }
                if( isset($getData['command']) && $getData['command'] == 'Configuration_v2' ) 
                {
                    $rtStr = '{"hasMysteryJackpot":false,"hasGuaranteedJackpot":false,"jackpots":null,"disableSwipeToFullscreenPortraitIos":false,"disableSwipeToFullscreenLandscapeIos":false,"disableSwipeToFullscreenIos":false,"defaultHyperSpin":false,"disableHyperSpin":true,"disableVideoActivationScreen":false,"alwaysShowDecimals":false,"useExternalBalanceOnly":false,"disableScrollToFullscreenMessage":false,"bundleMode":0,"disableInGameModals":false,"disableFastplay":false,"unsupportedDeviceMessage":"This game is currently not supported by your device.","jackpotNotifications":true,"bgColor":"green","hideExit":true,"hideHelp":false,"hideHistory":false,"hideFastplay":false,"hideLobby":false,"hideSound":false,"hideAutoAdjustBet":false,"hideSpaceBarToSpin":false,"disableHistory":false,"disableHelp":false,"disableSound":false,"enforceRoundTime":false,"minQuickRoundTime":-1,"autoPlayResume":false,"disableSpacebarToSpin":false,"resourceLevel":-1,"videoLevel":"-1","fps":0,"matchId":"","betMaxMode":0,"betMaxSpin":false,"playForRealDelay":-1,"renderer":"","disableExitInRound":false,"cId":"","defaultFastPlay":false,"defaultSpacebarToSpin":true,"defaultSound":true,"disableFastplayQuestion":false,"disableVideo":"0","requiredPlatformFeatureSupport":"StencilBuffer,EnforceHardwareAcceleration","customDeviceBlockRegex":"","debug":false,"debugAlert":false,"fullScreenMode":true,"defaultAutoAdjustBet":true,"defaultAutoSpins":"50","limits":"","autoSpins":"10,20,50,75,100","cashierUrl":"","lobbyUrl":"","mobileGameHistoryUrl":"/CasinoHistoryMobile","gameModules":"{\"bundleconfig\":{\"script\":\"\",\"resource\":\"resources/games/videobingo/sweetalchemybingo/config_${CHANNEL}.json\"}, \"featurepreview\":{\"script\":\"\",\"resource\":\"resources/games/videobingo/sweetalchemybingo/featurepreview_bundle.json\"}, \"game\":{\"script\":\"\",\"resource\":\"resources/games/videobingo/sweetalchemybingo/game_bundle.json\"}, \"ui\":{\"script\":\"games/videobingo/sweetalchemybingo/ui/desktop/sweetalchemybingo_viewfactory.js\",\"resource\":\"resources/games/videobingo/sweetalchemybingo/ui_${CHANNEL}_bundle.json\"}, \"mysteryjackpot\": {\"script\":\"\", \"resource\":\"resources/games/videobingo/sweetalchemybingo/mysteryjackpot_bundle.json\"}}","availableModules":[],"uiVersion":"","gameURL":"games/videobingo/sweetalchemybingo/sweetalchemybingo_main.js","playForRealUrl":"","desktopGameHistoryUrl":"/CasinoHistory","hasInGameJackpots":false,"hasFreeInGameJackpots":false,"enforceShowGameName":false,"disableMobileBlurHandling":false,"integrationErrorCodes":"{\"IDS_IERR_UNKNOWN\":\"Internal error\",\"IDS_IERR_UNKNOWNUSER\":\"User unknown\",\"IDS_IERR_INTERNAL\":\"Internal error\",\"IDS_IERR_INVALIDCURRENCY\":\"Unknown currency\",\"IDS_IERR_WRONGUSERNAMEPASSWORD\":\"Unable to authenticate user\",\"IDS_IERR_ACCOUNTLOCKED\":\"Account is locked\",\"IDS_IERR_ACCOUNTDISABLED\":\"Account is disabled\",\"IDS_IERR_NOTENOUGHMONEY\":\"There isnt enough funds on the account\",\"IDS_IERR_MAXCONCURRENTCALLS\":\"The system is currently under heavy load. Please try again later\",\"IDS_IERR_SPENDINGBUDGETEXCEEDED\":\"Your spending budget has been reached.\",\"IDS_IERR_SESSIONEXPIRED\":\"Session has expired. Please restart the game\",\"IDS_IERR_TIMEBUDGETEXCEEDED\":\"Your time budget has been reached\",\"IDS_IERR_SERVICEUNAVAILABLE\":\"The system is temporarily unavailable. Please try again later\",\"IDS_IERR_INVALIDIPLOCATION\":\"You are logging in from a restricted location. Your login has been denied.\",\"IDS_IERR_USERISUNDERAGE\":\"You are blocked from playing these games due to being underage. If you have any questions please contact your customer support\",\"IDS_IERR_SESSIONLIMITEXCEEDED\":\"Your session limit has been reached. Please exit the game and start a new game session to continue playing.\"}","autoplayReset":false,"autoplayLimits":false,"settings":"&settings=%3croot%3e%3csettings%3e%3cDenominations%3e%3cdenom+Value%3d%220.01%22+%2f%3e%3cdenom+Value%3d%220.02%22+%2f%3e%3cdenom+Value%3d%220.03%22+%2f%3e%3cdenom+Value%3d%220.04%22+%2f%3e%3cdenom+Value%3d%220.05%22+%2f%3e%3cdenom+Value%3d%220.06%22+%2f%3e%3cdenom+Value%3d%220.07%22+%2f%3e%3cdenom+Value%3d%220.08%22+%2f%3e%3cdenom+Value%3d%220.09%22+%2f%3e%3cdenom+Value%3d%220.1%22+%2f%3e%3c%2fDenominations%3e%3c%2fsettings%3e%3c%2froot%3e","resourceRoot":"/games/SweetAlchemyBingoPNG/8.0.0-sweetalchemybingo.462/","showSplash":true,"loaderMessage":"","loaderMinShowDuration":0,"realityCheck":"","hasJackpots":false,"helpUrl":"/casino/gamehelp?pid=2&gameid=434&lang=en_GB&brand=&jurisdiction=&context=&channel=desktop","showClientVersionInHelp":false,"showFFGamesVersionInHelp":false,"disableAutoplay":false,"waterMark":false,"displayClock":false,"useServerTime":false,"rCmga":0,"minRoundTime":-1,"detailedFreegameMessage":false,"minSpinningTime":"","creditDisplay":0,"pingIncreaseInterval":0,"minPingTime":0,"baccaratHistory":7,"gameRoundBalanceCheck":false,"quickStopEnabled":true,"neverGamble":false,"autoHold":false,"denom":"5","brand":"common","defaultLimit":0,"freeGameEndLogout":false,"lines":0,"mjDemoText":"","mjsupportmessage":"","mjcongratulations":";","mjprizes":",,,","mjnames":"Mini,Minor,Major,Grand"}';
                    echo $rtStr;
                }
                $balanceInCents = round($slotSettings->GetBalance() * $slotSettings->CurrentDenom * 100);
                switch( $aid ) 
                {
                    case 'freestep':
                        echo 'd=83 ' . $gameData[1] . "\r\n\r\n";
                    case 'stepbonus':
                        echo 'd=2 4 ' . trim($gameData[2]) . ' ' . trim($gameData[3]) . " \r\n";
                    case 'exit':
                        echo "d=102 1\r\n\r\n";
                    case 'collect':
                        $response = $this->collect($slotSettings);                        
                        break;
                    case 'endround':
                        $totalWin = $slotSettings->GetGameData($slotSettings->slotId . 'totalWin');
                        $slotSettings->SetGameData($slotSettings->slotId . 'totalWin', 0);
                        if( $totalWin > 0 ) 
                        {
                            $response = "d=2 6\r\n3 0 3 " . ($totalWin * 100) . ' 0 1';
                        }
                        else
                        {
                            $response = "d=2 6\r\n3 0 0 0 0 1\r\n6 0 5\r\n52 " . $balanceInCents . ' 0 0';
                        }
                        break;
                    case 'resetcards':
                        $resultNums = $this->placeCards($slotSettings);
                        $response = 'd=10 60 ' . implode(' ', $resultNums) . "\r\n\r\n";
                        break;
                    case 'spin':
                        $response = $this->doSpin($slotSettings, $gameData, $postData);
                        break;
                    case 'extra':
                        $response = $this->doExtraBall($slotSettings, $gameData, $postData);
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

        function placeCards($slotSettings)
        {
            $allNums = [];
            for( $i = 1; $i <= 89; $i++ ) 
            {
                $allNums[] = $i;
            }

            //remove random 29 values
            for($i = 0; $i < 29; $i++)
            {
                $index = rand(0, count($allNums) - 1);
                array_splice($allNums, $index, 1);
            }
            
            $cc = [array_fill(0, 15, 0), array_fill(0, 15, 0), array_fill(0, 15, 0), array_fill(0, 15, 0)];
            $cardNumOrder = [0, 5, 10, 
                            1, 6, 11, 
                            2, 7, 12, 
                            3, 8, 13, 
                            4, 9, 14];

            $cr = 0;
            for($j = 0; $j < 15; $j++)
                for($i = 0; $i < 4; $i++)
                {
                    $cc[$i][$cardNumOrder[$j]] = $allNums[$cr];
                    $cr++;
                }

            $slotCards = [
                'card1' => $cc[0], 
                'card2' => $cc[1], 
                'card3' => $cc[2], 
                'card4' => $cc[3]
            ];
            $slotSettings->SetGameData($slotSettings->slotId . 'slotCards', $slotCards);
            $slotSettings->SetGameData($slotSettings->slotId . 'InTableCards', $allNums);
            
            return $allNums;
        }

        function collect($slotSettings)
        {
            $selectedNums = $slotSettings->GetGameData($slotSettings->slotId . 'SelectedNums');
            $InTableCards = $slotSettings->GetGameData($slotSettings->slotId . 'InTableCards');
            $availableNums = [];
            for($i = 0; $i < count($InTableCards); $i++)
            {
                if(!in_array($InTableCards[$i], $selectedNums))
                    $availableNums[] = $InTableCards[$i];
            }
            shuffle($availableNums);

            $extraBalls = [];
            for($i = 30; $i < count($selectedNums); $i++)
                $extraBalls[] = $selectedNums[$i];
            $c = 0;
            for($i = count($extraBalls); $i < 13; $i++)
                $extraBalls[] = $availableNums[$c++];
            $response = "d=2 3 0\r\n2 2 20 13 ".implode(" ", $extraBalls)."\r\n2 5 1";
            return $response;
        }

        function doExtraBall($slotSettings, $gameData, $postData)
        {
            $postData['slotEvent'] = 'bet';
            $nCoins = $slotSettings->GetGameData($slotSettings->slotId . 'nCoins');
            $coinValue = $slotSettings->GetGameData($slotSettings->slotId . 'CoinValue');
            $lines = $slotSettings->GetGameData($slotSettings->slotId . 'Lines');
            $cardsArr = $slotSettings->GetGameData($slotSettings->slotId . 'CardsArr');
            $patternArrCards = $slotSettings->GetGameData($slotSettings->slotId . 'PatternArrCards');
            $selectedNums = $slotSettings->GetGameData($slotSettings->slotId . 'SelectedNums');
            $InTableCards = $slotSettings->GetGameData($slotSettings->slotId . 'InTableCards');
            $availableNums = [];
            for($i = 0; $i < count($InTableCards); $i++)
            {
                if(!in_array($InTableCards[$i], $selectedNums))
                    $availableNums[] = $InTableCards[$i];
            }

            $extraBuyCoin = $slotSettings->GetGameData($slotSettings->slotId . 'ExtraBuyCoin');
            $extraBall = $slotSettings->GetGameData($slotSettings->slotId . 'ExtraBall');
            $betline = ($nCoins * $coinValue) / 100;
            $slotCards = $slotSettings->GetGameData($slotSettings->slotId . 'slotCards');
            $allbet = $extraBuyCoin * $coinValue / 100;
            $slotSettings->SetBet($allbet);

            $slotSettings->UpdateJackpots($allbet);
            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
            $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
            $slotSettings->SetBet($allbet);
            $patternArr = $slotSettings->patternArr;
            $paysTable = $slotSettings->Paytable;
            $totalWin = 0;

            $minResultNumsDetail = [];
            $minTotalWin = -1;
            $minPatternArrCards = [];
            $minSpinInfo = [];
            $minBonusData = [];
            $minBonusCard = -1;
            $minNum = -1;
            $isBingo = false;
            for($i = 0; $i < 500; $i++)
            {
                $spinAcquired = false;
                $bonusCard = -1;
                $bonusData = [];
                $isBingo = false;
                $patternArrCards = $slotSettings->GetGameData($slotSettings->slotId . 'PatternArrCards');
                $num = -1;
                $spinInfo = [];
                if($winType == 'none')
                {
                    shuffle($availableNums);
                    $num = $availableNums[0];
                }
                else
                {
                    $selectedPattern = $patternArr[rand(0, 13)];
                    $selectedCard = $cardsArr[rand(0, count($cardsArr) - 1)];
                    for($k = 0; $k < count($cardsArr); $k++)
                    {
                        for($l = 0; $l < count($patternArr); $l++)
                        {
                            for($j = 2; $j < count($selectedPattern) - 1; $j++)
                            {
                                $pos = $selectedPattern[$j];
                                $selected = $slotCards['card' . $selectedCard][$pos];
                                if(in_array($selected, $availableNums))
                                {
                                    $num = $selected;
                                    break;
                                }
                            }
                            if($num != -1)
                                break;
                        }
                        if($num != -1)
                            break;
                    }
                    if($num == -1)
                    {
                        shuffle($availableNums);
                        $num = $availableNums[0];
                    }                        
                }
                
                $curCard = -1;
                $curNumPos = -1;
                for( $d = 1; $d <= 4; $d++ ) 
                {
                    if( in_array($d, $cardsArr) ) 
                    {                            
                        $curNumPos = $slotSettings->GetPositionInCard($slotCards['card' . $d], $num);                            
                        if( $curNumPos != -1 ) 
                        {
                            $curCard = $d - 1;    
                            break;
                        }                            
                    }
                }

                $patternInfo = $slotSettings->CheckPattern($patternArrCards[$curCard], $slotCards['card' . ($curCard+1)], $num, $patternArr);
                $winLines = $patternInfo[0];
                $winLineCandidates = $patternInfo[1];
                if( in_array($curCard+1, $cardsArr) ) 
                {
                    //add win amount for enabled cards only
                    foreach($winLines as $winLine)
                    {
                        if($patternArrCards[$curCard][$winLine[0]][1] == 0)
                        {
                            $payRate_ = $paysTable[$winLine[1]];
                            $totalWin += ($payRate_ * $betline);
                            if($winLine[0] == 16)
                            {
                                $isBingo = true;
                                $totalWin = ($payRate_ * $betline);
                                break;
                            }
                            if($winLine[0] == 15)
                            {
                                $bonusCard = $curCard + 1;
                                $bonusData = $slotSettings->CalculateBonus($bonusCard);
                                $bonusWin = $bonusData[1] * $betline;                    
                                $totalWin += $bonusWin;
                            }
                            $patternArrCards[$curCard][$winLine[0]][1] = 1;
                        }
                    }
                }
                $spinInfo[] = [$winLines, $winLineCandidates];
                
                $lineCmds = [];
                $cnt = count($winLines);
                if(count($bonusData) > 0)
                    $cnt--;
                $lineCmds[] = $cnt; //insert winline count
                foreach($winLines as $winLine)
                {
                    if($winLine[0] != 15)
                    {
                        $lineCmds[] = $winLine[0]; //winline pattern
                        $lineCmds[] = $paysTable[$winLine[1]]; //win amount
                    }                    
                }
                $lineCmds[] = count($winLineCandidates); //insert winline candidate count
                foreach($winLineCandidates as $winLineCandidate)
                {
                    $lineCmds[] = $winLineCandidate[0]; //winline pattern
                    $lineCmds[] = $paysTable[$winLineCandidate[1]]; //win amount
                    $lineCmds[] = $winLineCandidate[2]; //missing position
                }

                $resultNumsDetail[] = "2 2 7 " . $num . " " . $curCard . " " . $curNumPos . " " . implode(" ", $lineCmds) . "\r\n";

                if($minTotalWin == -1 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minResultNumsDetail = $resultNumsDetail;
                    $minTotalWin = $totalWin;
                    $minPatternArrCards = $patternArrCards;
                    $minSpinInfo = $spinInfo;
                    $minNum = $num;
                    $minBonusData = $bonusData;
                    $minBonusCard = $bonusCard;
                }

                if($this->debug)
                {
                    $spinAcquired = true;
                    break;
                }                    

                if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none') || ($winType == 'bonus')))
                {
                    $spinAcquired = true;
                    if($totalWin < 0.4 * $spinWinLimit && $winType != 'bonus')
                        $spinAcquired = false;
                    if($spinAcquired)
                        break;                                        
                }                                          
                else if( $winType == 'none' && $totalWin == 0 ) 
                {
                    break;
                }
            }

            if(!$spinAcquired && $totalWin > 0 && $winType != 'none' || ($winType != 'bonus'))
            {                
                $resultNumsDetail = $minResultNumsDetail;
                $totalWin = $minTotalWin;
                $patternArrCards = $minPatternArrCards;
                $spinInfo = $minSpinInfo;
                $num = $minNum;
                $bonusData = $minBonusData;
                $bonusCard = $minBonusCard;
            }

            $selectedNums[] = $num;

            $expectedWin = 0;
            $referencedPattern = [];

            $lastSpinInfo = $slotSettings->GetGameData($slotSettings->slotId . 'LastSpinInfo');
            foreach($lastSpinInfo as &$info)
            {
                $winLineCandidates = &$info[1];
                $winLines = $spinInfo[0][0];                
                for($k = 0; $k < count($winLineCandidates); $k++)
                {
                    $winLineCandidate = $winLineCandidates[$k];
                    for($i = 0; $i < count($winLines); $i++)
                    {
                        if($winLines[$i][0] == $winLineCandidate[0])
                        {
                            //if winline candidate become winline, remove it from candidates
                            array_splice($winLineCandidates, $k, 1);
                        }
                    }
                }
                $spinInfo[] = $info;
            }

            foreach($spinInfo as $info)
            {
                $winLineCandidates = $info[1];                       
                foreach($winLineCandidates as $winLineCandidate)
                {
                    $pattern = $winLineCandidate[0];
                    if(!in_array($pattern, $referencedPattern))
                    {
                        $expectedWin += $paysTable[$winLineCandidate[1]];
                        if($winLineCandidate[1] == 15) //1 to bonus
                        {
                            $extraBuyCoin += 30;
                        }
                        $referencedPattern[] = $pattern;
                    }                    
                }
            }
            $extraBall++;
            $slotSettings->SetGameData($slotSettings->slotId . 'ExtraBall', $extraBall);
            $isExtraBall = true;
            if($extraBall == 13 || $isBingo)
                $isExtraBall = false;
            $extraBuyCoin = 0;
            $extraBuyCoin += (ceil($expectedWin / 30) * $nCoins);
            if($extraBuyCoin == 0)
                $extraBuyCoin = 1;
            $slotSettings->SetGameData($slotSettings->slotId . 'ExtraBuyCoin', $extraBuyCoin);
            if( $totalWin > 0 ) 
            {
                $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                $slotSettings->SetBalance($totalWin);
            }

            $slotSettings->SetGameData($slotSettings->slotId . 'totalWin', $totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'AllBet', $allbet);
            $slotSettings->SetGameData($slotSettings->slotId . 'PatternArrCards', $patternArrCards);
            $slotSettings->SetGameData($slotSettings->slotId . 'SelectedNums', $selectedNums);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastSpinInfo', $spinInfo);

            $reportWin = $totalWin;
            $balanceInCents = $slotSettings->GetBalance();
            $response_log = '{"responseEvent":"spin","$slotCards":' . json_encode($slotCards) . ',"responseType":"' . $postData['slotEvent'] . '","serverResponse":{"freeState":"","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":[],"reelsSymbols":[]}}';
            $balanceInCents = round($slotSettings->GetBalance() * $slotSettings->CurrentDenom * 100);
            $resultCardsNum = [];
            for( $j = 0; $j < 15; $j++ ) 
            {
                for( $i = 1; $i <= 4; $i++ ) 
                {
                    $resultCardsNum[] = $slotCards['card' . $i][$j];
                }
            }            

            if( $winType == 'bonus' && count($bonusData) > 0) 
            {
                $bws = [
                    0, 
                    0, 
                    0, 
                    0
                ];
                $bws[$bonusCard - 1] = $bonusData[1];
                $bonusString = $bonusData[0];
                $response = "d=2 3 ".$extraBall."\r\n" . implode('', $resultNumsDetail) . $bonusString . "\r\n2 2 16 4 " . implode(' ', $bws) . "\r\n";
                $postData['slotEvent'] = 'BG';
            }
            else
            {
                $response = "d=2 3 ".$extraBall."\r\n" . implode('', $resultNumsDetail);
            }

            if( $isExtraBall ) 
            {
                $response .= "2 2 6 ".$extraBuyCoin."\r\n2 1\r\n";
            }
            else
            {
                $response .= "2 5 1\r\n";
            }
            
            $slotSettings->SaveLogReport($response_log, $allbet, $reportWin, $postData['slotEvent']);
            return $response;
        }

        function doSpin($slotSettings, $gameData, $postData)
        {
            $lines = 4;
            $cardsArr = [1, 2, 3, 4];
            $gameData[4] = trim($gameData[4]);
            if( $gameData[4] == 1 ) 
            {
                $lines = 1;
                $cardsArr = [1];
            }
            else if( $gameData[4] == 2 ) 
            {
                $lines = 1;
                $cardsArr = [2];
            }
            else if( $gameData[4] == 4 ) 
            {
                $lines = 1;
                $cardsArr = [3];
            }
            else if( $gameData[4] == 8 ) 
            {
                $lines = 1;
                $cardsArr = [4];
            }
            else if( $gameData[4] == 3 ) 
            {
                $lines = 2;
                $cardsArr = [1, 2];
            }
            else if( $gameData[4] == 5 ) 
            {
                $lines = 2;
                $cardsArr = [1, 3];
            }
            else if( $gameData[4] == 9 ) 
            {
                $lines = 2;
                $cardsArr = [1, 4];
            }
            else if( $gameData[4] == 6 ) 
            {
                $lines = 2;
                $cardsArr = [2, 3];
            }
            else if( $gameData[4] == 8 ) 
            {
                $lines = 2;
                $cardsArr = [2, 4];
            }
            else if( $gameData[4] == 12 ) 
            {
                $lines = 2;
                $cardsArr = [3, 4];
            }
            else if( $gameData[4] == 7 ) 
            {
                $lines = 3;
                $cardsArr = [1, 2, 3];
            }
            else if( $gameData[4] == 13 ) 
            {
                $lines = 3;
                $cardsArr = [1, 3, 4];
            }
            else if( $gameData[4] == 14 ) 
            {
                $lines = 3;
                $cardsArr = [2, 3, 4];
            }
            else if( $gameData[4] == 11 ) 
            {
                $lines = 3;
                $cardsArr = [1, 2, 4];
            }
            else if( $gameData[4] == 15 ) 
            {
                $lines = 4;
                $cardsArr = [1, 2, 3, 4];
            }
            $patternArr = [];
            
            $betline = ($gameData[1] * $gameData[3]) / 100;
            $allbet = $betline * $lines;
            if( $slotSettings->GetBalance() < $allbet ) 
            {
                $response = 'd=90';
                exit( $response );
            }

            $nCoins = $gameData[1];
            $coinValue = $gameData[3];

            $slotSettings->SetGameData($slotSettings->slotId . 'nCoins', $nCoins);
            $slotSettings->SetGameData($slotSettings->slotId . 'CoinValue', $coinValue);
            $slotSettings->SetGameData($slotSettings->slotId . 'Lines', $lines);
            $slotSettings->SetGameData($slotSettings->slotId . 'CardsArr', $cardsArr);
            
            $slotSettings->UpdateJackpots($allbet);
            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet, $lines);
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
            $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
            $bankSum = $allbet / 100 * $slotSettings->GetPercent();
            $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), $bankSum, $postData['slotEvent']);
            $slotSettings->SetBet($allbet);
            $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
            $slotSettings->SetGameData($slotSettings->slotId . 'Bet', $betline);
            $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', sprintf('%01.2f', $slotSettings->GetBalance()) * 100);
            $balanceInCents = round($slotSettings->GetBalance() * $slotSettings->CurrentDenom * 100);                        
            
            $patternArr = $slotSettings->patternArr;
            $isExtraBall = false;
            $bonusWon = false;
            $spinAcquired = false;
            $paysTable = $slotSettings->Paytable;

            $minResultNumsDetail = [];
            $minTotalWin = -1;
            $minPatternArrCards = [];
            $minSelectedNums = [];
            $minSpinInfo = [];
            $minBonusData = [];
            $minBonusCard = -1;

            $slotCards = $slotSettings->GetGameData($slotSettings->slotId . 'slotCards');
            $InTableCards = $slotSettings->GetGameData($slotSettings->slotId . 'InTableCards');
            $isBingo = false;
            if($this->debug)
            {
                $winType = 'bonus';
            }
            for( $i = 0; $i <= 500; $i++ ) 
            {
                $bonusCard = -1;
                $isBingo = false;
                $totalWin = 0;    
                $selectedNums = [];
                $patternArrCards = [];                
                $bonusData = [];
                $spinInfo = [];
                $patternArrCards[0] = $patternArr;
                $patternArrCards[1] = $patternArr;
                $patternArrCards[2] = $patternArr;
                $patternArrCards[3] = $patternArr;
                $winsArrCards = [];
                $winsArrCards[0] = [];
                $winsArrCards[1] = [];
                $winsArrCards[2] = [];
                $winsArrCards[3] = [];                

                $resultNumsDetail = [];                

                $allNums = $InTableCards;
                shuffle($allNums);
                if($winType == 'none')
                {
                    $selectedNums = array_slice($allNums, 0, 30);
                }
                else if($winType == 'win')
                {
                    $selectedNums = array_fill(0, 30, -1);
                    $selectedPattern = $patternArr[rand(0, 13)];
                    $selectedCard = $cardsArr[rand(0, count($cardsArr) - 1)];
                    for($j = 2; $j < count($selectedPattern) - 1; $j++)
                    {
                        $pos = $selectedPattern[$j];
                        $selectedNums[$j - 2] = $slotCards['card' . $selectedCard][$pos];
                    }
                    $fillPos = $j - 2;
                    for($k = 0; $k < count($allNums); $k++)
                    {
                        if(!in_array($allNums[$k], $selectedNums))
                        {
                            $selectedNums[$fillPos] = $allNums[$k];
                            $fillPos++;
                        }
                        if($fillPos == 30)
                            break;
                    }                    
                }
                else if( $winType == 'bonus' ) 
                {
                    shuffle($cardsArr);
                    $bonusCard = $cardsArr[0];
                    $bonusNums = $slotCards['card' . $bonusCard];
                    $selectedNums[] = $bonusNums[0];
                    $selectedNums[] = $bonusNums[1];
                    $selectedNums[] = $bonusNums[2];
                    $selectedNums[] = $bonusNums[3];
                    $selectedNums[] = $bonusNums[4];
                    $selectedNums[] = $bonusNums[5];
                    $selectedNums[] = $bonusNums[9];
                    $selectedNums[] = $bonusNums[10];
                    $selectedNums[] = $bonusNums[11];
                    $selectedNums[] = $bonusNums[12];
                    $selectedNums[] = $bonusNums[13];
                    $selectedNums[] = $bonusNums[14];
                    $fillPos = count($selectedNums);
                    for($k = 0; $k < count($allNums); $k++)
                    {
                        if(!in_array($allNums[$k], $selectedNums))
                        {
                            $selectedNums[$fillPos] = $allNums[$k];
                            $fillPos++;
                        }
                        if($fillPos == 30)
                            break;
                    }
                    shuffle($selectedNums);
                }
                
                if($this->debug)
                {
                    //candidate test
                    // $selectedNums[0] = $slotCards['card1'][0];
                    // $selectedNums[1] = $slotCards['card1'][1];
                    // $selectedNums[2] = $slotCards['card1'][2];
                    // $selectedNums[3] = $slotCards['card1'][3];
                    // $selectedNums[4] = $slotCards['card1'][4];
                    // $selectedNums[5] = $slotCards['card1'][5];
                    // $selectedNums[6] = $slotCards['card1'][6];
                    // $selectedNums[7] = $slotCards['card1'][7];
                    // $selectedNums[8] = $slotCards['card1'][8];
                    // $selectedNums[9] = $slotCards['card1'][9];
                    // $selectedNums[10] = $slotCards['card1'][10];
                    // $selectedNums[11] = $slotCards['card1'][11];
                    // $selectedNums[12] = $slotCards['card1'][12];
                    // $selectedNums[13] = $slotCards['card1'][13];
                    // $selectedNums[14] = $slotCards['card1'][14];
                    // $selectedNums[0] = 3 ;
                    // $selectedNums[1] = 86;
                    // $selectedNums[2] = 31;
                    // $selectedNums[3] = 34;
                    // $selectedNums[4] = 29;
                    // $selectedNums[5] = 7 ;
                    // $selectedNums[6] = 22;
                    // $selectedNums[7] = 41;
                    // $selectedNums[8] = 62;
                    // $selectedNums[9] = 81;
                    // $selectedNums[10] =65 ;
                    // $selectedNums[11] =14 ;
                    // $selectedNums[12] =17 ;
                    // $selectedNums[13] =20 ;
                    // $selectedNums[14] =13 ;
                    // $selectedNums[15] =41 ;
                    // $selectedNums[16] =23 ;
                    // $selectedNums[17] =15 ;
                    // $selectedNums[18] =44 ;
                    // $selectedNums[19] =71 ;
                    // $selectedNums[20] =88 ;
                    // $selectedNums[21] =84 ;
                    // $selectedNums[22] =83 ;
                    // $selectedNums[23] =37 ;
                    // $selectedNums[24] =67 ;
                    // $selectedNums[25] =54 ;
                    // $selectedNums[26] =68 ;
                    // $selectedNums[27] =89 ;
                    // $selectedNums[28] =12 ;
                    // $selectedNums[29] =48 ;
                }
                $bonusAcquired = false;
                for( $j = 0; $j < 30; $j++ ) 
                {
                    $num = $selectedNums[$j];
                    $curCard = -1;
                    $curNumPos = -1;
                    for( $d = 1; $d <= 4; $d++ ) 
                    {
                        if( in_array($d, $cardsArr) ) 
                        {                            
                            $curNumPos = $slotSettings->GetPositionInCard($slotCards['card' . $d], $num);                            
                            if( $curNumPos != -1 ) 
                            {
                                $curCard = $d - 1;    
                                break;
                            }                            
                        }
                    }

                    $winLines = [];
                    $winLineCandidates = [];
                    $bonusLineExist = false;
                    if( in_array($curCard+1, $cardsArr) ) 
                    {
                        $patternInfo = $slotSettings->CheckPattern($patternArrCards[$curCard], $slotCards['card' . ($curCard+1)], $num, $patternArr);
                        $winLines = $patternInfo[0];
                        $winLineCandidates = $patternInfo[1];
                        //add win amount for enabled cards only
                        foreach($winLines as $winLine)
                        {
                            if($patternArrCards[$curCard][$winLine[0]][1] == 0)
                            {
                                $payRate_ = $paysTable[$winLine[1]];
                                $totalWin += ($payRate_ * $betline);
                                if($winLine[0] == 16)
                                {
                                    $isBingo = true;
                                    $totalWin = $payRate_ * $betline;
                                    break;
                                }           
                                if($winLine[0] == 15)
                                {
                                    $bonusAcquired = true;
                                    $bonusLineExist = true;
                                }
                                $patternArrCards[$curCard][$winLine[0]][1] = 1;
                            }                            
                        }
                    }
                    
                    $spinInfo[$j] = [$winLines, $winLineCandidates];
                    
                    $lineCmds = [];
                    $cnt = count($winLines);
                    if($bonusLineExist)
                        $cnt--;
                    $lineCmds[] = $cnt; //insert winline count
                    foreach($winLines as $winLine)
                    {
                        if($winLine[0] != 15)
                        {
                            $lineCmds[] = $winLine[0]; //winline pattern
                            $lineCmds[] = $paysTable[$winLine[1]]; //win amount
                        }                        
                    }
                    $lineCmds[] = count($winLineCandidates); //insert winline candidate count
                    foreach($winLineCandidates as $winLineCandidate)
                    {
                        $lineCmds[] = $winLineCandidate[0]; //winline pattern
                        $lineCmds[] = $paysTable[$winLineCandidate[1]]; //win amount
                        $lineCmds[] = $winLineCandidate[2]; //missing position
                    }

                    $resultNumsDetail[] = "2 2 7 " . $num . " " . $curCard . " " . $curNumPos . " " . implode(" ", $lineCmds) . "\r\n";
                }

                if($bonusAcquired && $winType != 'bonus')
                    continue;
                
                if( $winType == 'bonus' ) 
                {
                    $bonusData = $slotSettings->CalculateBonus($bonusCard);
                    $bonusWin = $bonusData[1] * $betline;                    
                    $totalWin += $bonusWin;
                }

                if($minTotalWin == -1 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minResultNumsDetail = $resultNumsDetail;
                    $minTotalWin = $totalWin;
                    $minPatternArrCards = $patternArrCards;
                    $minSelectedNums = $selectedNums;
                    $minSpinInfo = $spinInfo;
                    $minBonusData = $bonusData;
                    $minBonusCard = $bonusCard;
                }

                if($this->debug)
                {
                    $spinAcquired = true;
                    break;
                }

                if($totalWin <= $spinWinLimit && (($totalWin > 0 && $winType != 'none') || ($winType == 'bonus' && $bonusAcquired)))
                {
                    $spinAcquired = true;
                    if($totalWin < 0.4 * $spinWinLimit && $winType != 'bonus')
                        $spinAcquired = false;
                    if($spinAcquired)
                        break;
                }
                else if( $winType == 'none' && $totalWin == 0 )
                {
                    break;
                }
            }

            if(!$spinAcquired && $totalWin > 0 && $winType != 'none' || ($winType != 'bonus' && $bonusWon))
            {                
                $resultNumsDetail = $minResultNumsDetail;
                $totalWin = $minTotalWin;
                $patternArrCards = $minPatternArrCards;
                $selectedNums = $minSelectedNums;
                $spinInfo = $minSpinInfo;
                $bonusData = $minBonusData;
                $bonusCard= $minBonusCard;
            }
            
            $extraBuyCoin = 0;
            $referencedPattern = [];
            if(rand(0, 100) < 10)
            {
                $isExtraBall = true;
                $expectedWin = 0;
                foreach($spinInfo as $info)
                {
                    $winLineCandidates = $info[1];                       
                    foreach($winLineCandidates as $winLineCandidate)
                    {
                        $pattern = $winLineCandidate[0];
                        if(!in_array($pattern, $referencedPattern))
                        {
                            $expectedWin += $paysTable[$winLineCandidate[1]];
                            if($winLineCandidate[1] == 15) //1 to bonus
                            {
                                $extraBuyCoin += 30;
                            }
                            $referencedPattern[] = $pattern;
                        }
                        
                    }
                }
                if($expectedWin == 0)
                    $isExtraBall = false;
                $extraBuyCoin += ceil($expectedWin / 30);
                $extraBuyCoin *= $nCoins;
                $slotSettings->SetGameData($slotSettings->slotId . 'ExtraBuyCoin', $extraBuyCoin);
            }
            if($isBingo)
                $isExtraBall = false;

            if( $totalWin > 0 ) 
            {
                $slotSettings->SetBank((isset($postData['slotEvent']) ? $postData['slotEvent'] : ''), -1 * $totalWin);
                $slotSettings->SetBalance($totalWin);
            }

            $slotSettings->SetGameData($slotSettings->slotId . 'totalWin', $totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'AllBet', $allbet);
            $slotSettings->SetGameData($slotSettings->slotId . 'PatternArrCards', $patternArrCards);
            $slotSettings->SetGameData($slotSettings->slotId . 'SelectedNums', $selectedNums);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastSpinInfo', $spinInfo);

            $reportWin = $totalWin;
            $response_log = '{"responseEvent":"spin","$slotCards":' . json_encode($slotCards) . ',"responseType":"' . $postData['slotEvent'] . '","serverResponse":{"freeState":"","slotLines":' . $lines . ',"slotBet":' . $betline . ',"totalFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') . ',"currentFreeGames":' . $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') . ',"Balance":' . $balanceInCents . ',"afterBalance":' . $balanceInCents . ',"bonusWin":' . $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') . ',"totalWin":' . $totalWin . ',"winLines":[],"Jackpots":[],"reelsSymbols":[]}}';
            $balanceInCents = round($slotSettings->GetBalance() * $slotSettings->CurrentDenom * 100);
            $resultCardsNum = [];
            for( $j = 0; $j < 15; $j++ ) 
            {
                for( $i = 1; $i <= 4; $i++ ) 
                {
                    $resultCardsNum[] = $slotCards['card' . $i][$j];
                }
            }

            if( $winType == 'bonus' && count($bonusData) > 0) 
            {
                $bws = [
                    0, 
                    0, 
                    0, 
                    0
                ];
                $bws[$bonusCard - 1] = $bonusData[1];
                $bonusString = $bonusData[0];
                $response = 'd=1 ' . $gameData[1] . ' ' . $gameData[2] . ' ' . $gameData[3] . ' ' . $gameData[4] . ' 60 ' . implode(' ', $resultCardsNum) . "\r\n2 0 0 0 0 0\r\n" . implode('', $resultNumsDetail) . $bonusString . "\r\n2 2 16 4 " . implode(' ', $bws) . "\r\n";
                $postData['slotEvent'] = 'BG';
            }
            else
            {
                $response = 'd=1 ' . $gameData[1] . ' ' . $gameData[2] . ' ' . $gameData[3] . ' ' . $gameData[4] . ' 60 ' . implode(' ', $resultCardsNum) . "\r\n2 0 0 0 0 0\r\n" . implode('', $resultNumsDetail);
            }

            if( $isExtraBall ) 
            {
                $slotSettings->SetGameData($slotSettings->slotId . 'ExtraBall', 0);
                $response .= "2 2 6 ".$extraBuyCoin."\r\n2 1\r\n";
            }
            else
            {
                $response .=  "2 5 1\r\n";
            }

            $slotSettings->SaveLogReport($response_log, $allbet, $reportWin, $postData['slotEvent']);
            return $response;
        }
    }
}



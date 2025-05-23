<?php 
namespace VanguardLTE\Games\LuxorRelicsNG
{

    use VanguardLTE\Lib\BasicSlotSettings;
    use VanguardLTE\Lib\JackpotHandler;

    class SlotSettings extends BasicSlotSettings
    {
        public $winRate = 60;
        public $playerId = null;
        public $splitScreen = null;
        public $reelStrip1 = null;
        public $reelStrip2 = null;
        public $reelStrip3 = null;
        public $reelStrip4 = null;
        public $reelStrip5 = null;
        public $reelStrip6 = null;
        public $reelStripBonus1 = null;
        public $reelStripBonus2 = null;
        public $reelStripBonus3 = null;
        public $reelStripBonus4 = null;
        public $reelStripBonus5 = null;
        public $reelStripBonus6 = null;
        public $slotId = '';
        public $slotDBId = '';
        public $Line = null;
        public $scaleMode = null;
        public $numFloat = null;
        public $gameLine = null;
        public $Bet = null;
        public $isBonusStart = null;
        public $Balance = null;
        public $SymbolGame = null;
        public $GambleType = null;
        public $lastEvent = null;
        public $Jackpots = [];
        public $keyController = null;
        public $slotViewState = null;
        public $hideButtons = null;
        public $slotReelsConfig = null;
        public $slotFreeCount = null;
        public $slotHoldnLinkCount = null;
        public $slotFreeMpl = null;
        public $slotWildMpl = null;
        public $slotExitUrl = null;
        public $slotBonus = null;
        public $slotBonusType = null;
        public $slotScatterType = null;
        public $slotGamble = null;
        public $Paytable = [];
        public $slotSounds = [];
        public $jpgs = null;
        private $Bank = null;
        private $Percent = null;
        private $WinLine = null;
        private $WinGamble = null;
        private $Bonus = null;
        public $shop_id = null;
        public $currency = null;
        public $user = null;
        public $game = null;
        public $shop = null;
        public $jpgPercentZero = false;
        public $count_balance = null;
        public function __construct($sid, $playerId)
        {
            $this->slotId = $sid;
            $this->playerId = $playerId;
            $user = \VanguardLTE\User::lockForUpdate()->find($this->playerId);
            $this->user = $user;
            $this->shop_id = $user->shop_id;
            $gamebank = \VanguardLTE\GameBank::where(['shop_id' => $this->shop_id])->lockForUpdate()->get();
            $game = \VanguardLTE\Game::where([
                'name' => $this->slotId, 
                'shop_id' => $this->shop_id
            ])->first();
            $this->shop = \VanguardLTE\Shop::find($this->shop_id);
            $this->game = $game;
            $this->MaxWin = $this->shop->max_win;
            $this->increaseRTP = 1;
            $this->CurrentDenom = $this->game->denomination;
            $this->scaleMode = 0;
            $this->numFloat = 0;

            $this->Paytable['SYM_0'] = [0,0,0,0,0,0]; //sphere
            $this->Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0]; //fire frame
            $this->Paytable['SYM_2'] = [ //wild
                0, 
                0, 
                0, 
                0, 
                0, 
                5000
            ];
            $this->Paytable['SYM_3'] = [
                0, 
                0, 
                50, 
                500, 
                2500, 
                5000
            ];
            $this->Paytable['SYM_4'] = [
                0, 
                0, 
                0, 
                250, 
                1000, 
                2500
            ];
            $this->Paytable['SYM_5'] = [
                0, 
                0, 
                0, 
                250, 
                1000, 
                2500
            ];
            $this->Paytable['SYM_6'] = [
                0, 
                0, 
                0, 
                150, 
                500, 
                2000
            ];
            $this->Paytable['SYM_7'] = [
                0, 
                0, 
                0, 
                150, 
                500, 
                2000
            ];
            $this->Paytable['SYM_8'] = [
                0, 
                0, 
                0, 
                150, 
                500, 
                2000
            ];
            $this->Paytable['SYM_9'] = [
                0, 
                0, 
                0, 
                150, 
                500, 
                2000
            ];
            $this->Paytable['SYM_10'] = [ 
                0, 
                0, 
                0, 
                100, 
                400, 
                1250
            ];            
            $this->Paytable['SYM_11'] = [
                0, 
                0, 
                0, 
                100, 
                400, 
                1250
            ];
            $this->Paytable['SYM_12'] = [
                0, 
                0, 
                0, 
                50, 
                250, 
                1000
            ];
            $this->Paytable['SYM_13'] = [
                0, 
                0, 
                0, 
                50, 
                250, 
                1000
            ];
            $this->Paytable['SYM_14'] = [
                0, 
                0, 
                0, 
                50, 
                250, 
                1000
            ];
            $reel = new GameReel();
            foreach( [
                'reelStrip1', 
                'reelStrip2', 
                'reelStrip3', 
                'reelStrip4', 
                'reelStrip5', 
                'reelStrip6'
            ] as $reelStrip ) 
            {
                if( count($reel->reelsStrip[$reelStrip]) ) 
                {
                    $this->$reelStrip = $reel->reelsStrip[$reelStrip];
                }
            }
            $this->keyController = [
                '13' => 'uiButtonSpin,uiButtonSkip', 
                '49' => 'uiButtonInfo', 
                '50' => 'uiButtonCollect', 
                '51' => 'uiButtonExit2', 
                '52' => 'uiButtonLinesMinus', 
                '53' => 'uiButtonLinesPlus', 
                '54' => 'uiButtonBetMinus', 
                '55' => 'uiButtonBetPlus', 
                '56' => 'uiButtonGamble', 
                '57' => 'uiButtonRed', 
                '48' => 'uiButtonBlack', 
                '189' => 'uiButtonAuto', 
                '187' => 'uiButtonSpin'
            ];
            $this->slotReelsConfig = [
                [
                    425, 
                    142, 
                    3
                ], 
                [
                    669, 
                    142, 
                    3
                ], 
                [
                    913, 
                    142, 
                    3
                ], 
                [
                    1157, 
                    142, 
                    3
                ], 
                [
                    1401, 
                    142, 
                    3
                ]
            ];
            $this->slotBonusType = 1;
            $this->slotScatterType = 0;
            $this->splitScreen = false;
            $this->slotBonus = true;
            $this->slotGamble = true;
            $this->slotFastStop = 1;
            $this->slotExitUrl = '/';
            $this->slotWildMpl = 1;
            $this->GambleType = 1;
            $this->slotFreeCount = 10;
            $this->slotHoldnLinkCount = 3;
            $this->slotFreeMpl = 1;
            $this->slotViewState = ($game->slotViewState == '' ? 'Normal' : $game->slotViewState);
            $this->hideButtons = [];
            $this->jpgs = \VanguardLTE\JPG::where('shop_id', $this->shop_id)->get();
            
            $this->Bet = explode(',', $game->bet);
            $this->Balance = $user->balance;
            $this->SymbolGame = [2,3,4,5,6,7,8,9,10,11,12,13,14];
            $this->Bank = $game->get_gamebank();
            $this->Percent = $this->shop->percent;
            $this->WinGamble = $game->rezerv;
            $this->slotDBId = $game->id;
            
            $this->count_balance = $user->count_balance;
            // if( $user->address > 0 && $user->count_balance == 0 ) 
            // {
            //     $this->Percent = 0;
            //     $this->jpgPercentZero = true;
            // }
            // else if( $user->count_balance == 0 ) 
            // {
            //     $this->Percent = 100;
            // }
            if( !isset($this->user->session) || strlen($this->user->session) <= 0 ) 
            {
                $this->user->session = serialize([]);
            }
            $this->gameData = unserialize($this->user->session);
            if( count($this->gameData) > 0 ) 
            {
                foreach( $this->gameData as $key => $vl ) 
                {
                    if( $vl['timelife'] <= time() ) 
                    {
                        unset($this->gameData[$key]);
                    }
                }
            }
            if( !isset($this->game->advanced) || strlen($this->game->advanced) <= 0 ) 
            {
                $this->game->advanced = serialize([]);
            }
            $this->gameDataStatic = unserialize($this->game->advanced);
            if( count($this->gameDataStatic) > 0 ) 
            {
                foreach( $this->gameDataStatic as $key => $vl ) 
                {
                    if( $vl['timelife'] <= time() ) 
                    {
                        unset($this->gameDataStatic[$key]);
                    }
                }
            }
        }
        public function is_active()
        {
            if( $this->game && $this->shop && $this->user && (!$this->game->view || $this->shop->is_blocked || $this->user->is_blocked || $this->user->status == \VanguardLTE\Support\Enum\UserStatus::BANNED) ) 
            {
                \VanguardLTE\Session::where('user_id', $this->user->id)->delete();
                $this->user->update(['remember_token' => null]);
                return false;
            }
            if( !$this->game->view ) 
            {
                return false;
            }
            if( $this->shop->is_blocked ) 
            {
                return false;
            }
            if( $this->user->is_blocked ) 
            {
                return false;
            }
            if( $this->user->status == \VanguardLTE\Support\Enum\UserStatus::BANNED ) 
            {
                return false;
            }
            return true;
        }
        public function SetGameData($key, $value)
        {
            $timeLife = 86400;
            $this->gameData[$key] = [
                'timelife' => time() + $timeLife, 
                'payload' => $value
            ];
        }
        public function GetGameData($key)
        {
            if( isset($this->gameData[$key]) ) 
            {
                return $this->gameData[$key]['payload'];
            }
            else
            {
                return 0;
            }
        }
        public function FormatFloat($num)
        {
            $str0 = explode('.', $num);
            if( isset($str0[1]) ) 
            {
                if( strlen($str0[1]) > 4 ) 
                {
                    return round($num * 100) / 100;
                }
                else if( strlen($str0[1]) > 2 ) 
                {
                    return floor($num * 100) / 100;
                }
                else
                {
                    return $num;
                }
            }
            else
            {
                return $num;
            }
        }
        public function SaveGameData()
        {
            $this->user->session = serialize($this->gameData);
            $this->user->save();
        }
        public function CheckBonusWin()
        {
            $allRateCnt = 0;
            $allRate = 0;
            foreach( $this->Paytable as $vl ) 
            {
                foreach( $vl as $vl2 ) 
                {
                    if( $vl2 > 0 ) 
                    {
                        $allRateCnt++;
                        $allRate += $vl2;
                        break;
                    }
                }
            }
            return $allRate / $allRateCnt;
        }
        public function GetRandomPay()
        {
            $allRate = [];
            foreach( $this->Paytable as $vl ) 
            {
                foreach( $vl as $vl2 ) 
                {
                    if( $vl2 > 0 ) 
                    {
                        $allRate[] = $vl2;
                    }
                }
            }
            shuffle($allRate);
            if( $this->game->stat_in < ($this->game->stat_out + ($allRate[0] * $this->AllBet)) ) 
            {
                $allRate[0] = 0;
            }
            return $allRate[0];
        }
        public function HasGameDataStatic($key)
        {
            if( isset($this->gameDataStatic[$key]) ) 
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public function SaveGameDataStatic()
        {
            $this->game->advanced = serialize($this->gameDataStatic);
            $this->game->save();
            $this->game->refresh();
        }
        public function SetGameDataStatic($key, $value)
        {
            $timeLife = 86400;
            $this->gameDataStatic[$key] = [
                'timelife' => time() + $timeLife, 
                'payload' => $value
            ];
        }
        public function GetGameDataStatic($key)
        {
            if( isset($this->gameDataStatic[$key]) ) 
            {
                return $this->gameDataStatic[$key]['payload'];
            }
            else
            {
                return 0;
            }
        }
        public function HasGameData($key)
        {
            if( isset($this->gameData[$key]) ) 
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public function GetHistory()
        {
            $history = \VanguardLTE\GameLog::whereRaw('game_id=? and user_id=? ORDER BY id DESC LIMIT 10', [
                $this->slotDBId, 
                $this->playerId
            ])->get();
            $this->lastEvent = 'NULL';
            foreach( $history as $log ) 
            {
                $tmpLog = json_decode($log->str);
                if( $tmpLog->responseEvent != 'gambleResult' ) 
                {
                    $this->lastEvent = $log->str;
                    break;
                }
            }
            if( isset($tmpLog) ) 
            {
                return $tmpLog;
            }
            else
            {
                return 'NULL';
            }
        }
        public function UpdateJackpots($bet)
        {
            $this->AccumulateBonus($bet);
            JackpotHandler::updateJackpots($this, $bet);            
        }
        public function GetBank($slotState = '')
        {
            if( $slotState == 'bonus' || $slotState == 'freespin' || $slotState == 'respin' ) 
            {
                $slotState = 'bonus';
            }
            else
            {
                $slotState = '';
            }
            $game = $this->game;
            $this->Bank = $game->get_gamebank($slotState);
            
            return $this->Bank / $this->CurrentDenom;
        }
        public function GetPercent()
        {
            return $this->Percent;
        }
        public function GetCountBalanceUser()
        {
            return $this->user->count_balance;
        }
        public function InternalErrorSilent($errcode)
        {
            $strLog = '';
            $strLog .= "\n";
            $strLog .= ('{"responseEvent":"error","responseType":"' . $errcode . '","serverResponse":"InternalError","request":' . json_encode($_REQUEST) . ',"requestRaw":' . file_get_contents('php://input') . '}');
            $strLog .= "\n";
            $strLog .= ' ############################################### ';
            $strLog .= "\n";
            $slg = '';
            if( file_exists(storage_path('logs/') . $this->slotId . 'Internal.log') ) 
            {
                $slg = file_get_contents(storage_path('logs/') . $this->slotId . 'Internal.log');
            }
            file_put_contents(storage_path('logs/') . $this->slotId . 'Internal.log', $slg . $strLog);
        }
        public function InternalError($errcode)
        {
            $strLog = '';
            $strLog .= "\n";
            $strLog .= ('{"responseEvent":"error","responseType":"' . $errcode . '","serverResponse":"InternalError","request":' . json_encode($_REQUEST) . ',"requestRaw":' . file_get_contents('php://input') . '}');
            $strLog .= "\n";
            $strLog .= ' ############################################### ';
            $strLog .= "\n";
            $slg = '';
            if( file_exists(storage_path('logs/') . $this->slotId . 'Internal.log') ) 
            {
                $slg = file_get_contents(storage_path('logs/') . $this->slotId . 'Internal.log');
            }
            file_put_contents(storage_path('logs/') . $this->slotId . 'Internal.log', $slg . $strLog);
            exit( '' );
        }
        public function SetBank($slotState = '', $sum, $slotEvent = '')
        {
            // if( $this->isBonusStart || $slotState == 'bonus' || $slotState == 'freespin' || $slotState == 'holdnlink' ) 
            // {
            //     $slotState = 'bonus';
            // }
            // else
            // {
            //     $slotState = '';
            // }
            // $game = $this->game;
            // if( $this->GetBank($slotState) + $sum < 0 ) 
            // {                
            //     $lost = $this->GetBank($slotState) + $sum;
            //     if($slotState == 'bonus' && $this->GetBank('') > 0)
            //     {
            //         $normal_bank = $this->GetBank('');
            //         $exchange_amount = 0;
            //         if($normal_bank + $lost > 0)
            //             $exchange_amount = $lost;
            //         else
            //             $exchange_amount = -$normal_bank;

            //         $game->set_gamebank($exchange_amount, 'inc', 'bet');
            //         $game->set_gamebank(-$exchange_amount, 'inc', 'bonus');
            //     }  
            // }
            // $sum = $sum * $this->CurrentDenom;
            // $game = $this->game;
            // $bankBonusSum = 0;
            // if( $sum > 0 && $slotEvent == 'bet' ) 
            // {
            //     $this->toGameBanks = 0;
            //     $this->toSlotJackBanks = 0;
            //     $this->toSysJackBanks = 0;
            //     $this->betProfit = 0;
            //     $prc = $this->GetPercent();
            //     $prc_b = $prc / 2;
            //     if( $prc <= $prc_b ) 
            //     {
            //         $prc_b = 0;
            //     }
            //     $gameBet = $sum / $this->GetPercent() * 100;
            //     $bankBonusSum = $gameBet / 100 * $prc_b;
                                  
            //     for( $i = 0; $i < count($this->jpgs); $i++ ) 
            //     {
            //         if( !$this->jpgPercentZero ) 
            //         {
            //             $this->toSlotJackBanks += ($gameBet / 100 * $this->jpgs[$i]->percent);
            //         }
            //     }
            //     $this->toGameBanks = $sum;
            //     $this->betProfit = $gameBet - $this->toGameBanks - $this->toSlotJackBanks - $this->toSysJackBanks;
            // }
            // if( $sum > 0 ) 
            // {
            //     $this->toGameBanks = $sum;
            // }
            // if( $bankBonusSum > 0 ) 
            // {
            //     $sum -= $bankBonusSum;
            //     $game->set_gamebank($bankBonusSum, 'inc', 'bonus');
            // }
            // if( $sum == 0 && $slotEvent == 'bet' && isset($this->betRemains) ) 
            // {
            //     $sum = $this->betRemains;
            // }
            // $game->set_gamebank($sum, 'inc', $slotState);
            // $game->save();
            // return $game;
        }
        public function SetBalance($sum, $slotEvent = '')
        {
            if( $this->GetBalance() + $sum < 0 ) 
            {
                $this->InternalError('Balance_   ' . $sum);
            }
            $sum = $sum * $this->CurrentDenom;
            if( $sum < 0 && $slotEvent == 'bet' ) 
            {
                $user = $this->user;
                if( $user->count_balance == 0 ) 
                {
                    $remains = [];
                    $this->betRemains = 0;
                    $sm = abs($sum);
                    if( $user->address < $sm && $user->address > 0 ) 
                    {
                        $remains[] = $sm - $user->address;
                    }
                    for( $i = 0; $i < count($remains); $i++ ) 
                    {
                        if( $this->betRemains < $remains[$i] ) 
                        {
                            $this->betRemains = $remains[$i];
                        }
                    }
                }
                if( $user->count_balance > 0 && $user->count_balance < abs($sum) ) 
                {
                    $remains0 = [];
                    $sm = abs($sum);
                    $tmpSum = $sm - $user->count_balance;
                    $this->betRemains0 = $tmpSum;
                    if( $user->address > 0 ) 
                    {
                        $this->betRemains0 = 0;
                        if( $user->address < $tmpSum && $user->address > 0 ) 
                        {
                            $remains0[] = $tmpSum - $user->address;
                        }
                        for( $i = 0; $i < count($remains0); $i++ ) 
                        {
                            if( $this->betRemains0 < $remains0[$i] ) 
                            {
                                $this->betRemains0 = $remains0[$i];
                            }
                        }
                    }
                }
                $sum0 = abs($sum);
                if( $user->count_balance == 0 ) 
                {
                    $sm = abs($sum);
                    if( $user->address < $sm && $user->address > 0 ) 
                    {
                        $user->address = 0;
                    }
                    else if( $user->address > 0 ) 
                    {
                        $user->address -= $sm;
                    }
                }
                else if( $user->count_balance > 0 && $user->count_balance < $sum0 ) 
                {
                    $sm = $sum0 - $user->count_balance;
                    if( $user->address < $sm && $user->address > 0 ) 
                    {
                        $user->address = 0;
                    }
                    else if( $user->address > 0 ) 
                    {
                        $user->address -= $sm;
                    }
                }
                $this->user->count_balance = $this->user->updateCountBalance($sum, $this->count_balance);
                $this->user->count_balance = $this->FormatFloat($this->user->count_balance);
            }
            $this->user->increment('balance', $sum);
            $this->user->balance = $this->FormatFloat($this->user->balance);
            $this->user->save();
            JackpotHandler::processBonus($this);
            return $this->user;
        }
        public function GetBalance()
        {
            $user = $this->user;
            $this->Balance = $user->balance / $this->CurrentDenom;
            return $this->Balance;
        }
        
        public function GetSpinSettings($garantType = 'bet', $allbet)
        {
            $this->AllBet = $allbet;
            return $this->SpinSettings($garantType, $this->AllBet);
            // $currentBonusWinChance = $this->game->get_lines_percent_config('bonus');
            // $currentSpinWinChance = $this->game->get_lines_percent_config('bet');
            // $bonusWin = rand(1, 100);
            // $spinWin = rand(1, 100);
            
            // $return = [
            //     'none', 
            //     0
            // ];
            // if( $bonusWin <= $currentBonusWinChance && $this->slotBonus ) 
            // {
            //     $this->isBonusStart = true;
            //     $garantType = 'bonus';
            //     $winLimit = $this->GetBank($garantType);
            //     if($winLimit >= $this->AllBet * 30)
            //     {
            //         $return = ['bonus', $winLimit];
            //     }
            //     else
            //     {
            //         $return = ['none', 0];
            //     }
            // }
            // else if( $spinWin <= $currentSpinWinChance)  
            // {
            //     $winLimit = $this->GetBank($garantType);
            //     $return = [
            //         'win', 
            //         $winLimit
            //     ];
            // }
            // if( $garantType == 'bet' && $this->GetBalance() <= (2 / $this->CurrentDenom) ) 
            // {
            //     $randomPush = rand(1, 10);
            //     if( $randomPush == 1 ) 
            //     {
            //         $winLimit = $this->GetBank('');
            //         $return = [
            //             'win', 
            //             $winLimit
            //         ];
            //     }
            // }
            // return $return;
        }
        public function Ways243ToLine()
        {
            $lines3 = [];
            for( $i0 = 1; $i0 <= 3; $i0++ ) 
            {
                for( $i1 = 1; $i1 <= 3; $i1++ ) 
                {
                    for( $i2 = 1; $i2 <= 3; $i2++ ) 
                    {
                        $lines3[] = [
                            $i0, 
                            $i1, 
                            $i2, 
                            0, 
                            0
                        ];
                    }
                }
            }
            $lines4 = [];
            for( $i0 = 1; $i0 <= 3; $i0++ ) 
            {
                for( $i1 = 1; $i1 <= 3; $i1++ ) 
                {
                    for( $i2 = 1; $i2 <= 3; $i2++ ) 
                    {
                        for( $i3 = 1; $i3 <= 3; $i3++ ) 
                        {
                            $lines4[] = [
                                $i0, 
                                $i1, 
                                $i2, 
                                $i3, 
                                0
                            ];
                        }
                    }
                }
            }
            $lines5 = [];
            for( $i0 = 1; $i0 <= 3; $i0++ ) 
            {
                for( $i1 = 1; $i1 <= 3; $i1++ ) 
                {
                    for( $i2 = 1; $i2 <= 3; $i2++ ) 
                    {
                        for( $i3 = 1; $i3 <= 3; $i3++ ) 
                        {
                            for( $i4 = 1; $i4 <= 3; $i4++ ) 
                            {
                                $lines5[] = [
                                    $i0, 
                                    $i1, 
                                    $i2, 
                                    $i3, 
                                    $i4
                                ];
                            }
                        }
                    }
                }
            }
            return [
                $lines3, 
                $lines4, 
                $lines5
            ];
        }
        public function GetRandomScatterPos($rp, $symbol)
        {
            $rpResult = [];
            for( $i = 0; $i < count($rp); $i++ ) 
            {
                if( $rp[$i] == $symbol) 
                {
                    if( isset($rp[$i + 1]) && isset($rp[$i - 1]) ) 
                    {
                        array_push($rpResult, $i);
                    }
                    if( isset($rp[$i - 1]) && isset($rp[$i - 2]) ) 
                    {
                        array_push($rpResult, $i - 1);
                    }
                    if( isset($rp[$i + 1]) && isset($rp[$i + 2]) ) 
                    {
                        array_push($rpResult, $i + 1);
                    }
                }
            }
            shuffle($rpResult);
            if( !isset($rpResult[0]) ) 
            {
                $rpResult[0] = rand(2, count($rp) - 5);
            }
            return $rpResult[0];
        }
        public function GetGambleSettings()
        {
            $spinWin = rand(1, $this->WinGamble);
            return $spinWin;
        }

        public function GetReelStrips($winType, $slotEvent = 'bet')        
        {
            $symbols = [2,3,4,5,6,7,8,9,10,11,12,13,14];
            $wild = 2;
            $sphere = 0;
            $fire = 1;
            $sym_cnt = count($symbols);
            $reels = [];
            if($winType == 'none' || $winType == 'bonus')
            {
                $sym_cnt = count($symbols);
                $first_reel_syms = [];
                
                //generate first reel
                $reel = [];
                for($c = 0; $c < 4; $c++)
                {
                    $sym = $symbols[rand(0, $sym_cnt - 1)];
                    $reel[] = $sym;
                    if(!in_array($sym, $first_reel_syms))
                        $first_reel_syms[] = $sym;
                }
                $reels['reel1'] = $reel;
                for($r = 1; $r < 5; $r++)
                {
                    $reel = [];
                    for($c = 0; $c < 4; $c++)
                    {
                        if($r == 1)
                        {
                            $sym = $symbols[rand(0, $sym_cnt - 1)];
                            while(in_array($sym, $first_reel_syms))
                            {
                                $sym = $symbols[rand(0, $sym_cnt - 1)];
                            }
                        }
                        else
                            $sym = $symbols[rand(0, $sym_cnt - 1)];
                        $reel[] = $sym;
                    }
                    $reels['reel'.($r+1)] = $reel;
                }

                if($winType == 'bonus')
                {
                    $cnt = 3;
                    $positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                    shuffle($positions);
                    for($i = 0; $i < $cnt; $i++)
                    {
                        $pos = $positions[$i];
                        $r = $pos % 5;
                        $c = (int)($pos / 5);
                        $reels['reel'.($r+1)][$c] = $sphere;
                    }                 
                }                
            }
            else 
            {
                for($r = 0; $r < 5; $r++)
                    $reels['reel'.($r+1)] = [-1,-1,-1,-1];
                
                $paylines = $this->GetPaylines();
                $selected_lines = [];
                
                $lineCnt = rand(1, 2);

                while(count($selected_lines) < $lineCnt)
                {
                    $lineId = rand(0, count($paylines) - 1);
                    if(!in_array($lineId, $selected_lines))
                        $selected_lines[] = $lineId;
                }
                
                $winningSym = $symbols[rand(0, $sym_cnt - 1)];

                for($i = 0; $i < $lineCnt; $i++)
                {
                    //place winning symbol on selected payline
                    $selected_line = $paylines[$selected_lines[$i]];
                    $cnt = rand(3, 5);
                    for($r = 0; $r < $cnt; $r++)
                    {
                        $c = $selected_line[$r];
                        if(rand(0, 100) < 10 && $r > 0 && $r < 4)
                            $reels['reel'.($r+1)][$c] = $wild;
                        else
                            $reels['reel'.($r+1)][$c] = $winningSym;
                    }
                }

                for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < 4; $c++)
                    {
                        if($reels['reel'.($r+1)][$c] == -1)
                        {
                            $sym = $symbols[rand(0, $sym_cnt - 1)];
                            $reels['reel'.($r+1)][$c] = $sym;
                        }
                    }
                if(rand(0, 100) < 30)
                {
                    $reels['reel'.rand(1,5)][rand(0,3)] = $sphere;
                    $reels['reel'.rand(1,5)][rand(0,3)] = $sphere;
                }
            }

            if(rand(0, 100) < 10)
                $reels['reel'.rand(1,5)][rand(0,3)] = $fire;

            //rearrange 3
            for($r = 0; $r < 5; $r++)
            {
                for($c = 0; $c < 4; $c++)
                {
                    if($reels['reel'.($r+1)][$c] == 3)
                    {
                        for($j = 0; $j <= $c; $j++)
                            $reels['reel'.($r+1)][$j] = 3;
                    }
                }
            }
            
            return $reels;
        }

        // public function GetReelStrips($winType, $slotEvent)
        // {
        //     $arrReels = [
        //         'reelStrip1', 
        //         'reelStrip2', 
        //         'reelStrip3', 
        //         'reelStrip4', 
        //         'reelStrip5', 
        //         'reelStrip6'
        //     ];
        //     if( $slotEvent == 'freespin' )
        //     {
        //         $reel = new GameReel();
        //         $fArr = $reel->reelsStripBonus;
        //         foreach($arrReels as $reelStrip ) 
        //         {
        //             $curReel = array_shift($fArr);
        //             if( count($curReel) ) 
        //             {
        //                 $this->$reelStrip = $curReel;
        //             }
        //         }
        //     }
        //     if( $winType != 'bonus' ) 
        //     {
        //         $prs = [];
        //         if($winType == 'win')
        //         {
        //             $sym = rand(2, 10);
        //             foreach($arrReels as $index => $reelStrip ) 
        //             {
        //                 if( is_array($this->$reelStrip) && count($this->$reelStrip) > 0 ) 
        //                 {
        //                     $prs[$index + 1] = $this->GetSymbolPos($this->$reelStrip, $sym, 4);
        //                 }
        //             }
        //         }
        //         else
        //         {
        //             foreach($arrReels as $index => $reelStrip ) 
        //             {
        //                 if( is_array($this->$reelStrip) && count($this->$reelStrip) > 0 ) 
        //                 {
        //                     $prs[$index + 1] = mt_rand(0, count($this->$reelStrip) - 5);
        //                 }
        //             }
        //         }
                
        //     }
        //     else
        //     {
        //         $rbs = rand(0, 100);
        //         $reelsId = [
        //             1, 
        //             2, 
        //             3, 
        //             4, 
        //             5
        //         ];
                
        //         $symbol = 0;
        //         $scatterCount = rand(3, 4);
                
        //         for( $i = 0; $i < count($reelsId); $i++ )
        //         {
        //             if($i < $scatterCount)
        //                 $prs[$reelsId[$i]] = $this->GetRandomScatterPos($this->{'reelStrip' . $reelsId[$i]}, $symbol);
        //             else
        //                 $prs[$reelsId[$i]] = rand(0, count($this->{'reelStrip' . $reelsId[$i]}) - 5);
        //         }
        //     }

        //     $reel = [
        //         'rp' => []
        //     ];
        //     foreach( $prs as $index => $value ) 
        //     {
        //         $key = $this->{'reelStrip' . $index};
        //         $key[-1] = $key[count($key) - 1];                
        //         $reel['reel' . $index][0] = (int)$key[$value];
        //         $reel['reel' . $index][1] = (int)$key[$value + 1];
        //         $reel['reel' . $index][2] = (int)$key[$value + 2];
        //         $reel['reel' . $index][3] = (int)$key[$value + 3];
        //     }
        //     return $reel;
        // }

        public function GetPaylines()
        {
            $linesId = [[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[3,3,3,3,3],[2,1,2,1,2],[1,2,1,2,1],[1,0,0,0,1],
                        [2,3,3,3,2],[3,2,3,2,3],[0,1,0,1,0],[3,3,2,3,3],[0,0,1,0,0],[2,2,2,1,2],[1,1,1,2,1],
                        [0,1,2,1,0],[3,2,1,2,3],[3,0,3,0,3],[0,3,0,3,0],[1,2,3,2,1],[2,1,0,1,2],[0,1,2,3,3],
                        [3,2,1,0,0],[0,0,1,2,3],[3,3,2,1,0],[3,3,2,2,2],[0,0,1,1,1],[2,2,1,1,1],[1,1,2,2,2],
                        [2,3,2,1,0],[1,0,1,2,3],[3,2,1,0,1],[0,1,2,3,1],[3,3,0,3,3],[0,0,3,0,0],[1,1,1,2,3],
                        [2,2,2,1,0],[3,3,1,3,3],[0,0,2,0,0],[0,0,0,1,2],[3,3,3,2,1],[0,0,0,1,0],[3,3,3,2,3],
                        [1,0,3,0,1],[2,3,0,3,2],[2,3,2,1,2],[1,0,1,2,1],[1,2,1,0,1],[2,1,2,3,2],[1,0,2,0,1],
                        [2,3,1,3,2]];
            return $linesId;
        }

    }

}

<?php 
namespace VanguardLTE\Games\LifeOfLuxury
{

    use VanguardLTE\Lib\BasicSlotSettings;
    use VanguardLTE\Lib\JackpotHandler;

    class SlotSettings extends BasicSlotSettings
    {
        public $winRate = 40;
        public $playerId = null;
        public $splitScreen = null;
        public $reelStrips = null;
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
        public $SymbolString = null;
        public $SymbolGame = null;
        public $HighSymbol = null;
        public $GambleType = null;
        public $lastEvent = null;
        public $Jackpots = [];
        public $keyController = null;
        public $slotViewState = null;
        public $hideButtons = null;
        public $slotReelsConfig = null;
        public $slotFreeCount = null;
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
        public $awardIndices = null;
        public $fsPos = null;
        public $freespinReelstrips = null;
        
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
            ])->lockForUpdate()->first();
            $this->shop = \VanguardLTE\Shop::find($this->shop_id);
            $this->game = $game;
            $this->MaxWin = $this->shop->max_win;
            $this->increaseRTP = 1;
            $this->CurrentDenom = $this->game->denomination;
            $this->scaleMode = 0;
            $this->numFloat = 0;

            $this->Paytable['0'] = [0, 0, 0, 5, 20, 100];  //gold
            $this->Paytable['1'] = [0, 0, 0, 5, 25, 120];  //double silver
            $this->Paytable['2'] = [0, 0, 0, 5, 30, 150];  //triple gold
            $this->Paytable['3'] = [0, 0, 0, 10, 30, 150];  //clock
            $this->Paytable['4'] = [0, 0, 0, 10, 50, 200];  //dollar
            $this->Paytable['5'] = [0, 0, 0, 15, 75, 200]; //ring
            $this->Paytable['6'] = [0, 0, 0, 20, 100, 500];  //car
            $this->Paytable['7'] = [0, 0, 5, 30, 200, 1000];  //ship
            $this->Paytable['8'] = [0, 0, 10, 50, 500, 5000]; //plane
            $this->Paytable['9'] = [0, 0, 0, 0, 0, 0];   //wild
            $this->Paytable['10'] = [0, 0, 0, 2, 15, 100];   //scatter

            $this->reelStrips = [];

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
            $this->freespinReelstrips = [[18,16,14,18,18,16,14,16,18,14,20,16,20,14,18,16,26,16,14,24,20,14,16,18,14,14,20,16,14,18,22,14,20,16,14,20,18,16,18,22,16,18,22,14,18,16,18,14,20,16,14,24,18,14,16,14,20,16,14,18,22,14,16,22,26,18,20,14,20,16,14,18,22,14,20,18,16,18,14,20,16,14,18,20,14,16,18,14,26,26,16,14,24,20,14,26,16,14,24,20,14,16,18,14,18,20,14,20,16,14,18,22,14,20,18,14,14,24,18,14,16,20,14,18,16,14,16,18,20,14,16,14,20,16,14,16,18,14,26,16,14,24,14,18,20,18,14,26,16,14,24,20,14,16,18,14,16,14,20,18,16,18,22,16,18,14,16,18,14,18,22,14,18,16,14,16,18,20,18,14,20,16,14,24,18,14,16,20,24,20,14,16,18,14,18,16,14,20,18,14,20,16,14,20,18,16,18,20,14,16,18,14,14,20,16],
                                         [20,17,18,14,20,17,16,25,24,23,18,18,14,15,16,26,15,19,18,14,25,19,20,16,14,19,18,14,15,18,16,14,16,14,24,19,20,14,16,19,18,14,15,14,24,19,20,14,16,19,18,20,17,18,14,20,17,16,25,24,23,18,14,16,20,14,18,27,28,18,16,17,15,19,20,16,14,27,28,18,16,17,15,17,18,22,14,18,15,22,16,21,17,20,16,14,16,17,15,18,22,16,16,22,14,18,21,20,14,20,23,17,16,14,15,18,16,14,20,15,17,16,14,22,14,18,21,18,17,25,22,23,20,14,18,25,27,16,14,16,26,16,26,15,19,18,14,25,15,16,22,14,21,17,18,22,14,18,15,16,14,17,18,20,14,16,15,18,14,26,17,16,14,24,20,23,17,16,14,18,17,25,22,23,20,17,14,27,28,18,16,17,16,22,14,18,21,20,14,20,23,18,21,20,14,20,23,28,18,16,17,26,17,16,14,24,19,20,14,16,19,20,15,17,16,14,19,15,16,22,14,15,18,14,26,17,24,23,18,14,16,14,20,15,17,16,14,19,15,16,14,25,19,20,16,14,27],
                                         [17,24,25,28,18,26,15,16,19,18,14,15,20,25,16,19,14,17,24,25,28,19,22,21,14,18,20,15,21,20,28,15,17,18,19,16,14,17,16,27,15,18,14,25,21,15,18,14,15,20,25,16,19,21,16,19,29,17,20,19,18,23,16,17,18,19,22,23,16,17,18,19,22,23,14,21,15,18,16,14,19,24,15,20,17,14,17,19,16,15,18,14,14,15,16,21,18,17,17,14,15,20,14,17,15,18,14,15,18,15,18,21,16,17,14,15,20,21,20,18,14,15,20,25,16,19,14,17,23,14,21,15,19,18,22,14,17,25,28,18,26,15,16,19,17,20,18,14,15,20,25,16,14,17,15,21,20,18,14,16,15,18,14,15,18,15,20,17,26,15,16,19,17,20,16,14,17,18,19,15,20,14,17,16,27,15,18,14,25,21,15,26,16,14,21,15,19,18,22,18,17,14,15,20,21,16,20,28,15,17,18,19,16,14,15,16,21,14,25,21,15,26,16,14,15,18,19,16,14,20,17,16,23,14,16,15,19,22,21,14,18,14,19,20,15,16,23,18,23,16,20,15,21,17,14,18,20,15,21,17,14,19,20,15,16,23,14,22,21,14,18,20,15,21,17,14,25,28,18,26,15,16,14,15,16,21,18,17,20,28],
                                         [15,17,18,15,19,20,18,22,15,17,19,21,15,18,15,19,20,16,29,30,28,18,16,17,15,18,19,25,16,22,15,18,21,20,19,20,15,18,15,16,15,17,23,19,20,17,18,20,14,17,25,22,29,20,30,18,15,20,17,26,22,17,21,17,18,22,15,14,24,17,15,15,17,19,17,25,18,14,15,18,22,17,20,15,17,16,14,19,15,18,21,20,14,21,25,14,23,19,30,18,15,20,17,26,14,24,19,21,15,18,15,22,29,20,30,18,15,20,17,15,17,19,21,22,15,17,20,15,17,19,18,14,15,18,26,14,24,17,15,14,16,20,22,29,20,30,18,15,20,17,26,14,24,23,19,20,15,17,16,14,18,17,15,20,15,17,16,14,19,20,15,17,16,14,17,15,14,16,20,15,18,29,27,16,14,17,15,19,18,21,15,19,29,20,30,18,15,20,17,26,14,24,14,26,17,25,14,18,14,26,17,15,18,17,15,20,15,17,16,14,19,25,16,17,15,20,15,17,16,14,19,21,15,21,20,14,21,23,17,16,14,23,27,25,22,29,20,30,18,17,15,14,16,20,15,18,29,27,16,18,14,26,17,25,14,14,17,15,19,18,21,15,19,25,16,22,15,18,21,20,14,16,20,15,18,29,27,16,14,17,15,25,18,14,26,17,25],
                                         [17,15,17,19,15,21,17,15,21,19,17,15,17,19,15,21,17,15,19,17,15,15,25,21,15,17,29,15,29,15,19,17,15,29,17,15,23,15,19,17,15,19,15,21,17,15,21,17,17,19,23,15,21,19,15,21,17,15,25,19,15,17,21,29,19,17,17,15,17,23,17,15,25,19,21,15,29,19,17,15,19,15,21,17,15,21,17,17,19,23,17,17,23,15,19,21,15,17,23,15,19,21,15,31,17,15,31,15,31,23,15,17,17,19,23,17,19,23,15,19,17,15,17,19,15,21,17,15,21,17,17,19,21,17,15,21,17,15,17,23,15,19,21,15,31,15,25,21,15,19,21,15,31,17,15,31,15,19,17,15,29,17,15,15,19,21,21,15,17,19,15,27,17,15,19,21,15,31,17,15,31,23,15,15,19,17,15,15,31,23,15,21,19,15,21,17,15,25]];
            $this->slotBonusType = 1;
            $this->slotScatterType = 0;
            $this->splitScreen = false;
            $this->slotBonus = true;
            $this->slotGamble = true;
            $this->slotFastStop = 1;
            $this->slotExitUrl = '/';
            $this->slotWildMpl = 2;
            $this->GambleType = 1;
            $this->slotFreeCount = 10;
            $this->slotFreeMpl = 1;
            $this->slotViewState = ($game->slotViewState == '' ? 'Normal' : $game->slotViewState);
            $this->hideButtons = [];
            $this->jpgs = \VanguardLTE\JPG::where('shop_id', $this->shop_id)->lockForUpdate()->get();
          
            $this->Bet = explode(',', $game->bet);
            $this->Balance = $user->balance;
            $this->SymbolGame = [0,1,2,3,4,5,6,7,8,9];
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
                // if( $tmpLog->responseEvent != 'gambleResult' ) 
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
        
        public function GetSpinSettings($garantType = 'bet', $allbet, $buyBonus = null)
        {
            $this->AllBet = $allbet;
            return $this->SpinSettings($garantType, $this->AllBet, $buyBonus);
        }
        public function GetRandomScatterPos($rp, $endCnt, $sb)
        {
            $rpResult = [];
            for( $i = 0; $i < count($rp); $i++ ) 
            {
                if( $rp[$i] == $sb ) 
                {
                    if( isset($rp[$i]) && isset($rp[$i + $endCnt - 1]) ) 
                    {
                        array_push($rpResult, $i);
                    }
                    if( isset($rp[$i - 1]) && isset($rp[$i + $endCnt - 1]) ) 
                    {
                        array_push($rpResult, $i - 1);
                    }
                    if(isset($rp[$i - 2]) && isset($rp[$i + $endCnt - 2]) ) 
                    {
                        array_push($rpResult, $i - 2);
                    }
                }
            }
            shuffle($rpResult);
            if( !isset($rpResult[0]) ) 
            {
                $rpResult[0] = rand(2, count($rp) - $endCnt);
            }
            return $rpResult[0];
        }

        public function GetRandomHanzoPos($rp, $endCnt, $sb)
        {
            $rpResult = [];
            for( $i = 0; $i < count($rp); $i++ ) 
            {
                if( $rp[$i] == $sb ) 
                {
                    array_push($rpResult, $i);
                }
            }
            shuffle($rpResult);
            if( !isset($rpResult[0]) ) 
            {
                $rpResult[0] = rand(0, count($rp) - $endCnt);
            }
            return $rpResult[0];
        }

        public function GetGambleSettings()
        {
            $spinWin = rand(1, $this->WinGamble);
            return $spinWin;
        }

        public function GetReelStrips($winType, $lines, $slotEvent = 'bet')        
        {
            $symbols = [0,1,2,3,4,5,6,7,8];
            $wild = 9;
            $scatter = 10;

            $sym_cnt = count($symbols);
            $reels = [];
            if($winType == 'none' || $winType == 'bonus')
            {
                $sym_cnt = count($symbols);

                $first_reel_syms = [];
                
                //generate first reel
                $reel = [];
                for($c = 0; $c < 3; $c++)
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
                    for($c = 0; $c < 3; $c++)
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

                if($winType == 'bonus' && $slotEvent == 'bet')
                {
                    $reels['reel1'][rand(0,2)] = $scatter;
                    $reels['reel3'][rand(0,2)] = $scatter;
                    $reels['reel5'][rand(0,2)] = $scatter;
                }
            }
            else 
            {
                for($r = 0; $r < 5; $r++)
                    $reels['reel'.($r+1)] = [-1,-1,-1];
                
                $paylines = $this->GetPaylines($lines);
                $selected_lines = [];
                
                $lineCnt = rand(1, $lines > 2 ? 2 : $lines);

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
                    for($c = 0; $c < 3; $c++)
                    {
                        if($reels['reel'.($r+1)][$c] == -1)
                        {
                            $sym = $symbols[rand(0, $sym_cnt - 1)];
                            $reels['reel'.($r+1)][$c] = $sym;
                        }
                    }

                $poss = rand(0, 100);
                if($slotEvent == 'bet')
                {
                    if($poss < 2)
                        $reels['reel1'][rand(0,2)] = $scatter;
                    else if($poss < 4)
                        $reels['reel3'][rand(0,2)] = $scatter;
                    else if($poss < 6)
                        $reels['reel5'][rand(0,2)] = $scatter;
                }
            }

            return $reels;
        }
        
        public function GetNudgedReel($reelName, $reelIndex, $rp, $nudge)
        {
            $arr = $this->reelStrips[$reelName.($reelIndex+1)];
            if($nudge == -1 && $rp < 3)
                return [];
            if($nudge == 1 && $rp > count($arr) - 4)
                return [];
            $res = array_slice($arr, ($rp + $nudge) - 1, 5);
            
            return $res;
        }

        public function GetPaylines($lines)
        {
            $linesId = [[1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0], [2,1,0,1,2],
                        [1,0,0,0,1], [1,2,2,2,1], [0,0,1,2,2], [2,2,1,0,0], [1,2,1,0,1],
                        [1,0,1,2,1], [0,1,1,1,0], [2,1,1,1,2], [0,1,0,1,0], [2,1,2,1,2]];
            $linesId = array_slice($linesId, 0, $lines);
            return $linesId;
        }

        public function GetReelSymbol($reels)
        {
            $reelSyms = [];
            foreach($reels as $index => $value)
            {
                if(strpos($index, 'reel') !== false)
                {
                    $reel = [];
                    foreach($value as $sym)
                        $reel[] = $sym;
                    $reelSyms[] = $reel;
                }
            }
            return $reelSyms;
        }
        

        function getMultiplier($reel, $sym)
        {
            $multiplier = 0;
            $wild = '0';
            for($c = 0; $c < 3; $c++)
                if(($reel[$c] == $sym || $reel[$c] == $wild ))
                    $multiplier++;

            return $multiplier;
        }

        function GetFreespinReelstrips()
        {
            return $this->freespinReelstrips;
        }
    }

}

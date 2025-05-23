<?php 
namespace VanguardLTE\Games\MysteriousWitch
{

    use VanguardLTE\Lib\BasicSlotSettings;
    use VanguardLTE\Lib\JackpotHandler;

    use function PHPSTORM_META\map;

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
        public $emeraldPays = ['11' => 0.1, '12' => 0.2, '13' => 0.5, '14' => 1, '15' => 2, '16' => 3, '17' => 4, '18' => 5, '19' => 10, '20' => 12.5];
        
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
            $this->CurrentDenom = $this->game->denomination;
            $this->scaleMode = 0;
            $this->numFloat = 0;

            $this->Paytable['0'] = [0, 0, 0, 0, 0, 0];  //
            $this->Paytable['1'] = [0, 0, 0, 5, 10, 25];  //Ten
            $this->Paytable['2'] = [0, 0, 0, 5, 10, 25];  //Jack
            $this->Paytable['3'] = [0, 0, 0, 5, 10, 25];  //Queen
            $this->Paytable['4'] = [0, 0, 0, 5, 15, 50];  //King
            $this->Paytable['5'] = [0, 0, 0, 5, 15, 50]; //Ace
            $this->Paytable['6'] = [0, 0, 0, 5, 20, 75];  //Doll
            $this->Paytable['7'] = [0, 0, 0, 10, 25, 100];  //Water
            $this->Paytable['8'] = [0, 0, 0, 15, 50, 150]; //Candle
            $this->Paytable['9'] = [0, 0, 0, 25, 100, 250];   //Cat
            $this->Paytable['10'] = [0, 0, 0, 50, 150, 500];   //Witch

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
            
            $this->slotBonusType = 1;
            $this->slotScatterType = 0;
            $this->splitScreen = false;
            $this->slotBonus = true;
            $this->slotGamble = true;
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
            $this->SymbolGame = [1,2,3,4,5,6,7,8,9,10];
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

        public function GetReelStripsHoldn($winType)
        {
            $symbols = [1,2,3,4,5,6,7,8,9,10];
            $emerald = 11;

            $sym_cnt = count($symbols);
            $reels = [];
            $rowCnt = 8;
            
            if($winType == 'none' || $winType == 'bonus')
            {
                $sym_cnt = count($symbols);                
                for($r = 0; $r < 5; $r++)
                {
                    $reel = [];
                    for($c = 0; $c < $rowCnt; $c++)
                    {
                        $sym = $symbols[rand(0, $sym_cnt - 1)];                            
                        $reel[] = $sym;
                    }
                    $reels['reel'.($r+1)] = $reel;
                }
            }
            else 
            {
                for($r = 0; $r < 5; $r++)
                    $reels['reel'.($r+1)] = [-1,-1,-1,-1,-1,-1,-1,-1];
                $cnt = rand(1, 3);
                $i = 0;
                while($i < $cnt)
                {
                    $r = rand(0, 4);
                    $c = rand(0, 7);
                    if($reels['reel'.($r+1)][$c] != $emerald)
                    {
                        $reels['reel'.($r+1)][$c] = $emerald;
                        $i++;
                    }
                }
                for($r = 0; $r < 5; $r++)
                    for($c = 0; $c < $rowCnt; $c++)
                        if($reels['reel'.($r+1)][$c] == -1)
                            $reels['reel'.($r+1)][$c] = $symbols[rand(0, $sym_cnt - 1)];
            }

            $emeraldArr = [11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,13,13,14,14,14,14,14,14,14,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,18,18,18,18,19,19,20];
            shuffle($emeraldArr);
            $cnt = count($emeraldArr) - 1;
            //reassign emerald
            for($r = 0; $r < 5; $r++)
            {
                for($c = 0; $c < $rowCnt; $c++)
                {
                    if($reels['reel'.($r+1)][$c] == $emerald)
                    {
                        $reels['reel'.($r+1)][$c] = $emeraldArr[rand(0, $cnt)];
                    }
                }
            }
            return $reels;
        }

        public function GetReelStrips($winType, $lines, $slotEvent = 'bet')        
        {
            $symbols = [1,2,3,4,5,6,7,8,9,10];
            $wild = 24;
            $scatter = 25;
            $emerald = 11;

            $sym_cnt = count($symbols);
            $reels = [];
            $emeraldCnt = 0;
            $rowCnt = 4;
            
            if($winType == 'none' || $winType == 'bonus')
            {
                $sym_cnt = count($symbols);

                $first_reel_syms = [];
                
                //generate first reel
                $reel = [];
                for($c = 0; $c < $rowCnt; $c++)
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
                    for($c = 0; $c < $rowCnt; $c++)
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
                        {
                            if(rand(0, 100) < 40 && $emeraldCnt < 3 && $winType != 'bonus')
                            {
                                $sym = $emerald;
                                $emeraldCnt++;
                            }
                            else
                            {
                                $sym = $symbols[rand(0, $sym_cnt - 1)];
                            }
                        }
                            
                        $reel[] = $sym;
                    }
                    $reels['reel'.($r+1)] = $reel;
                }

                if($winType == 'bonus' && $slotEvent == 'bet')
                {
                    $bonusRnd = rand(0, 1);
                    $bonusRnd = 1;
                    if($bonusRnd == 0)
                    {
                        $reels['reel1'][rand(0,3)] = $scatter;
                        $reels['reel3'][rand(0,3)] = $scatter;
                        $reels['reel5'][rand(0,3)] = $scatter;
                    }
                    else
                    {
                        $cntArr = [4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6];
                        shuffle($cntArr);
                        $cnt = $cntArr[0];
                        $emeraldPos = [];
                        while(count($emeraldPos) < $cnt)
                        {
                            $r = rand(0, 4);
                            $c = rand(0, 3);
                            $pos = $c * 5 + $r;                                
                            if(!in_array($pos, $emeraldPos))
                            {                                
                                $emeraldPos[] = $pos;
                                $reels['reel'.($r+1)][$c] = $emerald;
                            }
                        }
                    }
                }
            }
            else 
            {
                for($r = 0; $r < 5; $r++)
                    $reels['reel'.($r+1)] = [-1,-1,-1,-1];
                
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
                    for($c = 0; $c < $rowCnt; $c++)
                    {
                        if($reels['reel'.($r+1)][$c] == -1)
                        {
                            if(rand(0, 100) < 20 && $emeraldCnt < 3)
                            {
                                $reels['reel'.($r+1)][$c] = $emerald;
                                $emeraldCnt++;
                            }
                            else
                            {
                                $sym = $symbols[rand(0, $sym_cnt - 1)];
                                $reels['reel'.($r+1)][$c] = $sym;
                            }                            
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

            $emeraldArr = [11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,13,13,14,14,14,14,14,14,14,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,18,18,18,18,19,19,20];
            shuffle($emeraldArr);
            $cnt = count($emeraldArr) - 1;
            //reassign emerald
            for($r = 0; $r < 5; $r++)
            {
                for($c = 0; $c < $rowCnt; $c++)
                {
                    if($reels['reel'.($r+1)][$c] == $emerald)
                    {
                        $reels['reel'.($r+1)][$c] = $emeraldArr[rand(0, $cnt)];
                    }
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
            $linesId = [[1,1,1,1,1], [2,2,2,2,2], [0,0,0,0,0], [3,3,3,3,3], [1,2,3,2,1], [2,1,0,1,2],
                        [0,1,2,1,0], [3,2,1,2,3], [2,3,2,3,2], [1,0,1,0,1], [1,1,2,3,3], [2,2,1,0,0],
                        [3,2,2,2,3], [0,1,1,1,0], [1,2,1,0,1], [2,1,2,3,2], [1,0,0,1,2], [2,3,3,2,1],
                        [1,2,2,2,1], [2,1,1,1,2], [2,2,3,2,1], [1,1,0,1,2], [0,1,0,1,0], [3,2,3,2,3],
                        [0,0,1,0,0], [3,3,2,3,3], [1,1,2,1,1], [2,2,1,2,2], [0,0,1,2,2], [3,3,2,1,1],
                        [1,2,1,2,1], [2,1,2,1,2], [2,3,2,1,2], [1,0,1,2,1], [1,0,0,0,1], [2,3,3,3,2],
                        [1,1,1,2,3], [2,2,2,1,0], [0,1,2,3,2], [3,2,1,0,1], [1,2,3,3,3], [2,1,0,0,0],
                        [0,0,0,1,2], [3,3,3,2,1], [3,2,2,1,0], [0,1,1,2,3], [1,2,2,3,3], [2,1,1,0,0],
                        [0,1,0,1,2], [3,2,3,2,1]];
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

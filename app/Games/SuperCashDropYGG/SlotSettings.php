<?php 
namespace VanguardLTE\Games\SuperCashDropYGG
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
        public $highSymbols = null;
        
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

            $this->reelStrips['Reels0'] = [2,2,2,2,5,5,5,5,8,8,3,3,3,3,0,0,9,9,4,4,6,6,6,2,2,2,1,1,7,7,7,7,4,4,4,3,3,8,8,0,0,4,4,4,4,6,6,6,6,2,2,2,9,9,2,2,2,0,0,7,7,5,5,6,6,6,6,1,1,1,1,6,6,6,9,9,8,8,8,9,9,9,9,3,3,3,3,3,0,0,7,7,7,3,3,3,3,7,7,7,7,7,3,3,5,5,5,5,7,7,7,0,0,7,7,4,4,4,6,6,6,5,5,9,9,9,9,2,2,2,8,8,8,8,8,8,3,3,3,7,7,7,7,7,7,8,8,8,8,1,1,1,1,7,7,7,7,4,4,4,7,7,7,5,5,5,5,6,6,6,8,8,8,4,4,4,4,8,8,8,8,7,7,7,6,6,6,8,8,8,8,9,9,9,8,8,8,5,5,5,5,9,9,9,9,2,2,1,1,1,2,2,2,9,9,9,5,5,5,1,1,1,1,9,9,8,8,8,8,8,8,2,2,2,7,7,7,7,6,6,6,6,1,1,6,6,7,7,7,8,8,8,9,9,3,3,3,3,7,7,6,6,5,5,5,4,4,8,8,3,3,3,3,6,6,6,6,3,3,3,3,3,3,3,5,5,2,2,2,3,3,3,3,6,6,4,4,3,3,3,3,4,4,4,4];
            $this->reelStrips['Reels1'] = [1,1,4,4,4,6,6,2,2,2,2,2,2,2,2,4,4,4,6,6,6,1,1,4,4,4,4,3,3,4,4,2,2,2,2,1,1,1,1,4,4,4,4,0,0,2,2,2,3,3,3,2,2,2,6,6,6,6,6,9,9,9,2,2,4,4,4,4,5,5,5,5,9,9,1,1,4,4,4,4,5,5,5,5,4,4,9,9,9,2,2,7,7,7,5,5,4,4,4,4,9,9,9,9,2,2,2,8,8,8,2,2,6,6,6,7,7,7,7,6,6,6,3,3,3,8,8,8,9,9,9,9,3,3,7,7,9,9,9,9,2,2,2,7,7,9,9,9,7,7,7,7,5,5,5,5,5,5,6,6,6,6,9,9,9,9,5,5,4,4,4,3,3,7,7,7,7,8,8,8,8,6,6,6,3,3,3,3,2,2,5,5,5,2,2,2,2,6,6,6,6,6,6,6,6,3,3,3,5,5,5,0,0,1,1,1,1,1,8,8,8,8,5,5,5,0,5,5,3,3,3,4,4,4,4,4,8,8,8,9,9,5,5,2,2,2,1,1,1,1,1,1,1,4,4,2,0,0,0,2,2,2,5,5,5,1,1,8,8,8,4,4,4,8,8,8,8,6,6,6,5,5,5,5,5,5,5,7,7,7,7,6,6,6,6,0,0,5,5,5,5,6,6,6,6,2,2,2];
            $this->reelStrips['Reels2'] = [6,6,6,6,3,3,3,2,2,2,2,2,3,3,3,3,4,4,6,6,6,6,7,7,3,3,3,3,3,9,9,0,0,4,6,6,6,6,2,2,8,8,8,8,1,1,7,7,8,8,8,4,4,4,4,9,9,9,9,3,3,4,4,4,4,1,1,1,1,8,8,8,3,3,3,3,4,4,4,4,4,5,5,5,5,2,2,2,2,4,4,7,7,6,6,6,6,4,4,4,4,3,3,1,1,1,1,1,4,4,4,4,4,4,4,8,8,8,8,4,4,4,9,9,9,9,2,2,7,7,7,7,3,3,3,9,9,9,9,2,2,2,2,2,2,2,1,1,1,1,1,7,7,7,7,6,6,6,6,3,3,3,6,6,6,6,6,6,2,2,8,8,8,9,9,9,9,5,5,9,9,9,9,7,7,7,7,3,3,2,2,2,3,3,3,3,9,9,9,6,6,6,6,5,5,5,5,5,5,5,9,9,9,9,9,9,9,8,8,8,6,6,6,6,5,5,4,4,4,8,8,2,2,2,6,6,6,5,5,5,5,5,5,5,5,5,6,6,6,4,4,4,3,3,8,8,8,8,1,1,5,5,6,6,6,7,7,3,3,3,1,1,1,2,2,0,0,0,5,5,8,8,8,5,5,5,2,2,2,7,7,1,1,1,1,3,3,8,8,8,8,5,5];
            $this->reelStrips['Reels3'] = [2,2,2,2,2,2,2,9,9,9,5,5,5,6,6,4,4,4,4,8,8,8,9,9,9,9,4,4,4,4,8,8,0,0,8,8,8,8,7,7,7,7,7,7,7,9,9,8,8,8,1,1,6,6,6,6,4,4,4,3,3,3,7,7,7,2,2,2,7,7,7,7,4,4,4,4,4,4,4,1,1,1,1,1,1,1,9,9,9,9,9,9,5,5,5,4,4,4,9,9,9,9,7,7,4,4,4,4,9,9,9,8,8,8,4,4,4,4,4,4,4,6,6,6,9,9,1,1,1,1,6,6,6,6,4,4,4,4,4,4,4,7,7,7,7,3,3,8,8,6,6,2,2,2,2,3,3,3,3,3,3,7,7,7,4,4,4,4,2,2,2,1,1,3,3,3,4,4,8,8,8,8,1,1,4,4,5,5,5,5,4,4,4,4,8,8,8,4,4,4,4,8,8,8,3,3,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,3,3,3,3,2,2,2,2,4,4,8,8,8,8,8,8,8,6,6,6,6,4,4,4,5,5,5,6,6,7,7,7,1,1,1,8,8,8,8,7,7,7,0,0,9,9,5,5,9,9,9,2,2,6,6,6,4,4,3,3,4,4,6,6,6,6,8,8,8,8,8,8,3,3,3,3,5,5,2,2];
            $this->reelStrips['Reels4'] = [4,4,4,5,5,5,5,5,5,5,5,6,6,5,5,5,1,1,1,1,3,3,8,8,5,5,5,5,5,2,2,2,2,5,5,5,5,5,5,2,2,2,2,1,1,4,4,4,4,6,6,6,6,7,7,2,2,2,2,2,2,6,6,6,8,8,8,8,9,9,9,0,0,3,3,3,1,1,8,8,2,2,2,2,2,2,5,5,4,4,5,5,2,2,3,3,3,3,9,9,9,9,7,7,9,9,9,9,3,3,3,6,6,6,6,8,8,1,1,1,1,4,4,4,4,3,3,3,3,9,9,9,9,5,5,5,8,8,8,8,7,7,7,7,8,8,7,7,7,4,4,4,4,4,4,9,9,9,1,1,7,7,7,7,7,7,4,4,4,4,3,3,3,3,8,8,8,8,8,8,1,1,6,6,6,6,5,5,5,2,2,2,2,4,4,4,4,1,1,5,5,5,4,4,4,4,9,9,5,5,5,5,2,2,2,2,2,4,4,4,2,2,2,2,4,4,4,2,2,8,8,8,8,3,3,3,9,9,1,1,1,1,1,1,4,4,4,4,6,6,6,6,6,6,5,5,5,6,6,6,6,0,0,0,4,4,4,8,8,8,9,9,5,5,5,5,5,5,5,5,5,8,8,8,8,6,6,6,3,3,7,7];
            $this->reelStrips['Reels5'] = [6,6,8,8,8,8,7,7,5,5,5,0,0,0,5,5,4,4,6,6,4,4,4,1,1,1,1,5,5,1,1,1,7,7,3,3,3,3,2,2,2,2,9,9,8,8,8,1,1,1,6,6,6,7,7,9,9,9,3,3,1,1,1,1,2,2,2,2,4,4,1,1,4,4,4,8,8,8,7,7,7,7,1,1,7,7,7,9,9,9,9,9,9,7,7,7,7,4,4,4,4,1,1,2,2,2,2,2,2,6,6,5,5,6,6,8,8,8,8,7,7,9,9,9,4,4,4,7,7,7,7,2,2,2,3,3,3,3,1,1,1,1,0,0,2,2,4,4,4,3,3,3,3,9,9,9,7,7,7,7,8,8,8,3,3,9,9,9,9,4,4,5,5,5,1,1,1,7,7,7,3,3,3,6,6,8,8,9,9,9,7,7,7,7,8,8,8,8,6,6,6,6,9,9,8,8,1,1,1,1,3,3,3,3,9,9,9,9,7,7,2,2,2,2,9,9,5,5,6,6,7,7,6,6,2,2,2,4,4,4,3,3,3,3,4,4,4,4,4,9,9,5,5,5,7,7,7,7,2,2,1,1,4,4,0,0,3,3,3,3,6,6,3,3,3,3,9,9,9,5,5,5,5,1,1,1,1,1,1,8,8,8,4,4,1,1,1];

            $this->reelStrips['FeatureReels0'] = [1,1,1,1,0,0,1,1,4,4,4,3,3,3,3,3,3,3,1,1,3,3,3,1,1,1,1,1,4,4,1,1,0,0,3,3,2,2,3,3,2,2,3,3,3,3,3,3,3,3,4,4,3,3,2,2,2,2,4,4,4,4,4,3,3,0,0,3,3,3,2,2,3,3,3,2,2,2,4,4,4,1,1,1,1,1,3,3,3,3,2,2,3,3,3,3,4,4,4,4,4,4,1,1,1,1,2,2,2,4,4,4,3,3,3,3,1,1,1,2,2,3,3,2,2,2,3,3,3,3,3,3,0,0,4,4,3,3,2,2,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,2,2,2,3,3,3,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,1,1,1,1,2,2,3,3,3,4,4,4,4,4,4,4,2,2,2,2,1,1,1,1,1,1,1,2,2,2,4,4,3,3,3,4,4,4,4,2,2,4,4,4,3,3,2,2,2,2,2,2,3,3,3,1,1,2,2,2,2,1,1,1,3,3,3,2,2,2,2,2,2,3,3,3,3,1,1,3,3,3,4,4,4,3,3,3,1,1,1,1,3,3,3,3,2,2,1,1,3,3,3,4,4,4,4,4,4,4,4,2,2,2,2,4,4,4];
            $this->reelStrips['FeatureReels1'] = [3,3,4,4,4,4,4,4,4,1,1,1,1,1,3,3,3,3,3,3,3,4,4,4,3,3,3,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,1,1,1,1,1,3,3,3,2,2,1,1,1,1,1,4,4,4,1,1,1,3,3,3,3,3,3,3,2,2,2,2,2,3,3,3,3,4,4,4,4,1,1,1,4,4,4,4,4,4,2,2,2,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,4,4,2,2,4,4,4,2,2,2,1,1,4,4,4,4,4,4,4,2,2,2,2,2,2,3,3,0,0,1,1,4,4,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,3,3,3,4,4,4,4,4,4,1,1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,2,2,1,1,1,1,2,2,3,3,3,2,2,2,2,2,2,1,1,1,1,4,4,4,4,4,3,3,3,1,1,1,1,3,3,3,3,4,4,1,1,1,4,4,3,3,3,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,4,4,4,4,1,1,2,2,4,4,4,4,2,2,2];
            $this->reelStrips['FeatureReels2'] = [1,1,1,1,3,3,4,4,4,4,4,4,4,4,1,1,1,1,1,4,4,4,3,3,3,0,0,4,2,2,2,2,2,2,2,2,2,2,4,4,4,1,1,1,2,2,2,4,4,3,3,3,3,1,1,4,4,4,1,1,1,1,4,4,4,4,4,2,2,2,2,4,4,1,1,1,1,1,1,3,3,2,2,2,2,2,2,2,2,2,3,3,3,1,1,4,4,4,4,2,2,2,2,4,4,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,4,4,2,2,4,4,3,3,3,3,2,2,2,2,3,3,3,1,1,1,1,1,2,2,2,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,3,3,3,4,4,4,3,3,3,4,4,4,4,4,4,4,4,2,2,2,1,1,1,1,2,2,2,2,4,4,4,4,4,4,4,4,4,4,1,1,1,1,3,3,3,3,2,2,2,4,4,4,4,4,4,1,1,1,3,3,3,4,4,2,2,4,4,4,4,2,2,4,4,4,4,4,4,4,1,1,1,1,2,2,2,1,1,1,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4,1,1,4,4,4,3,3];
            $this->reelStrips['FeatureReels3'] = [1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,3,3,3,3,2,2,2,2,2,2,4,4,4,4,3,3,3,1,1,1,1,2,2,4,4,4,2,2,4,4,4,4,1,1,1,2,2,2,2,3,3,3,3,3,2,2,1,1,1,4,4,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,4,4,4,2,2,2,2,2,4,4,4,2,2,2,2,4,4,4,1,1,1,1,2,2,2,2,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,1,1,1,1,3,3,1,1,4,4,3,3,3,3,4,4,3,3,1,1,2,2,2,2,2,2,2,2,4,4,4,2,2,2,4,4,4,2,2,2,4,4,2,2,3,3,3,1,1,2,2,2,4,4,4,3,3,3,3,3,3,4,4,2,2,3,3,1,1,3,3,3,4,4,2,2,4,4,4,4,2,2,2,3,3,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,1,1,1,2,2,2,2,1,1,1,4,4,3,3,3,3,3,3,0,0,2,2,3,3,2,2,4,4,4,4,3,3,4,4,3,3,3,3,4,4,4,4,4,4,4,4];
            $this->reelStrips['FeatureReels4'] = [1,1,1,1,1,3,3,3,0,0,3,3,3,2,2,2,2,3,3,3,3,3,1,1,3,3,3,3,1,1,1,2,2,2,2,3,3,1,1,1,1,3,3,3,3,1,1,1,1,2,2,2,2,1,1,1,3,3,3,3,3,3,3,3,1,1,1,1,4,4,4,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,1,1,3,3,3,3,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,3,3,3,3,3,3,4,4,1,1,3,3,3,4,4,4,4,1,1,1,1,2,2,2,2,1,1,1,1,1,1,3,3,3,2,2,2,1,1,3,3,3,4,4,4,1,1,1,1,1,1,1,1,1,1,4,4,4,4,2,2,2,2,3,3,3,3,1,1,1,1,1,2,2,2,3,3,1,1,1,1,1,1,2,2,2,2,1,1,1,1,2,2,2,2,3,3,3,2,2,3,3,3,3,3,2,2,2,4,4,4,4,4,4,2,2,2,2,2,2,4,4,3,3,3,3,3,3,2,2,2,2,4,4,4,2,2,4,4,4,4,4,4,4,3,3,3,2,2,3,3,3,3,1,1,1,2,2,2,2,2,2,2,2];
            $this->reelStrips['FeatureReels5'] = [4,4,1,1,1,1,3,3,3,3,1,1,1,2,2,2,2,4,4,4,4,4,4,4,2,2,4,4,4,4,4,1,1,1,3,3,3,3,3,3,3,3,3,1,1,1,2,2,2,2,4,4,4,4,4,4,3,3,1,1,4,4,4,4,4,2,2,2,4,4,4,4,4,4,1,1,1,1,1,1,1,1,2,2,3,3,3,1,1,1,4,4,4,4,4,4,1,1,2,2,2,2,4,4,4,1,1,4,4,2,2,2,3,3,3,4,4,1,1,1,4,4,4,2,2,2,2,1,1,1,1,1,1,3,3,2,2,2,2,2,2,2,1,1,4,4,4,2,2,3,3,3,3,1,1,1,4,4,4,4,3,3,3,3,3,4,4,4,4,2,2,2,1,1,1,2,2,2,1,1,1,3,3,3,1,1,1,1,3,3,3,2,2,2,2,2,2,2,2,1,1,1,3,3,3,3,1,1,4,4,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,2,2,3,3,3,3,2,2,2,1,1,1,1,1,1,3,3,4,4,4,2,2,4,4,4,4,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,2,2,2,2,3,3,3,3,2,2,2,3,3,2,2,2,2,2];
            
            $this->Paytable[0] = [0,0,0,50,125,250,500];        //wild
            $this->Paytable[1] = [0,0,0,40,100,200,250];
            $this->Paytable[2] = [0,0,0,25,50,100,200];
            $this->Paytable[3] = [0,0,0,20,40,75,150];
            $this->Paytable[4] = [0,0,0,20,40,75,150];
            $this->Paytable[5] = [0,0,0,10,20,50,100];
            $this->Paytable[6] = [0,0,0,10,20,50,100];
            $this->Paytable[7] = [0,0,0,10,20,50,100];
            $this->Paytable[8] = [0,0,0,10,20,50,100];
            $this->Paytable[9] = [0,0,0,0,0,0,0];
            
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
            // if( $slotState == 'bonus' || $slotState == 'freespin' || $slotState == 'respin' ) 
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
        
        public function GetSpinSettings($garantType = 'bet', $bet, $lines, $isBuyBonus = false)
        {
            $this->AllBet = $bet * $lines;
            return $this->SpinSettings($garantType, $this->AllBet, $isBuyBonus);
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
            //     $winLimit = $this->GetBank($garantType);
            //     if($winLimit >= $this->AllBet * 20)
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
            //     if($winLimit < 0)
            //         $return = ['none', 0];
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
        public function GetRandomScatterPos($rp, $endCnt, $sb)
        {
            $rpResult = [];
            for( $i = 0; $i < count($rp)-$endCnt; $i++ ) 
            {
                if( $rp[$i] == $sb ) 
                {
                    if( isset($rp[$i + 1]) && isset($rp[$i + 2]) ) 
                    {
                        array_push($rpResult, $i);
                    }
                    if( isset($rp[$i - 1]) && isset($rp[$i + 1]) ) 
                    {
                        array_push($rpResult, $i - 1);
                    }
                    if( isset($rp[$i + 3]) && isset($rp[$i + 2]) ) 
                    {
                        array_push($rpResult, $i + 1);
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
        public function GetGambleSettings()
        {
            $spinWin = rand(1, $this->WinGamble);
            return $spinWin;
        }

        public function GetReelStrips($winType, $reelName, $boardHeight, $gcv)
        {
            $reelBlocks = [];
            $blockSum = 0;
            if($gcv != null)
                $reelBlocks = $gcv;
            else
            {
                while($blockSum < 6)
                {
                    $p = rand(0, 100);
                    $maxBlockSize = 6 - $blockSum > 4 ? 4 : 6 - $blockSum;
                    $block = 1;
                    if($p < 60)
                        $block = 1;
                    else 
                    {
                        if($maxBlockSize > 1)
                        {
                            if(rand(0, 100) < 70)
                                $block = 2;
                            else
                                $block = rand(2, $maxBlockSize);
                        }
                        else 
                            $block = 1;
                    }
                    $reelBlocks[] = $block;
                    $blockSum += $block;
                }
    
            }
            $arrReels = [];            
            foreach($reelBlocks as $block)
            {                
                for($i = 0; $i < $block; $i++)
                {
                    if($i == 0)
                    {
                        $arrReels[] = $block;
                    }
                    else
                    {
                        $arrReels[] = -1;
                    }
                }
            }
            
            $endLen = 6;            
            $reels = [];
            $scatterCnt = 0;
            $scatterSym = 9;
            foreach( $arrReels as $index => $value ) 
            {
                $pos = mt_rand(1, count($this->reelStrips[$reelName.$index]) - $endLen);
                if($winType == 'bonus' && $scatterCnt < 5)
                    $pos = $this->GetRandomScatterPos($this->reelStrips[$reelName.$index], $endLen, $scatterSym);
                if($value > 0)
                {
                    $reel = array_slice($this->reelStrips[$reelName.$index], $pos, $boardHeight);
                }
                else
                {
                    $reel = $reels['reel'.$index];
                }
                $reels['reel'.($index+1)] = $reel;
                for($c = 0; $c < $boardHeight; $c++)
                    if($reel[$c] == $scatterSym)
                        $scatterCnt++;
            }
            $reels['height'] = $boardHeight;
            $reels['gcv'] = $reelBlocks;
            return $reels;
        }
       
        public function GetPaylines($lines)
        {
            if($lines == 6)
            {
                $linesId = [
                    [0,0,0,0,0,0], [1,1,1,1,1,1], [2,2,2,2,2,2], [3,3,3,3,3,3], [4,4,4,4,4,4], [5,5,5,5,5,5], [2,1,0,0,1,2], [3,2,1,1,2,3],
                    [4,3,2,2,3,4], [5,4,3,3,4,5], [0,1,2,2,1,0], [1,2,3,3,2,1], [2,3,4,4,3,2], [3,4,5,5,4,3], [0,1,0,0,1,0], [1,2,1,1,2,1],
                    [2,3,2,2,3,2], [3,4,3,3,4,3], [4,5,4,4,5,4], [1,0,1,1,0,1], [2,1,2,2,1,2], [3,2,3,3,2,3], [4,3,4,4,3,4], [5,4,5,5,4,5],
                    [0,1,1,1,1,0], [1,2,2,2,2,1], [2,3,3,3,3,2], [3,4,4,4,4,3], [4,5,5,5,5,4], [1,0,0,0,0,1], [2,1,1,1,1,2], [3,2,2,2,2,3],
                    [4,3,3,3,3,4], [5,4,4,4,4,5], [0,0,1,1,0,0], [1,1,2,2,1,1], [2,2,3,3,2,2], [3,3,4,4,3,3], [4,4,5,5,4,4], [1,1,0,0,1,1],
                    [2,2,1,1,2,2], [3,3,2,2,3,3], [4,4,3,3,4,4], [5,5,4,4,5,5], [2,2,0,0,2,2], [3,3,1,1,3,3], [4,4,3,3,4,4], [5,5,3,3,5,5],
                    [0,0,2,2,0,0], [1,1,3,3,1,1], [2,2,4,4,2,2], [3,3,5,5,3,3], [2,0,0,0,0,2], [3,1,1,1,1,3], [4,2,2,2,2,4], [5,3,3,3,3,5],
                    [0,2,2,2,2,0], [1,3,3,3,3,1], [2,4,4,4,4,2], [3,5,5,5,5,3]
                ];
            }
            else if($lines == 5)
            {
                $linesId = [
                    [0,0,0,0,0,0], [1,1,1,1,1,1], [2,2,2,2,2,2], [3,3,3,3,3,3], [4,4,4,4,4,4], [2,1,0,0,1,2], [3,2,1,1,2,3], [4,3,2,2,3,4],
                    [0,1,2,2,1,0], [1,2,3,3,2,1], [2,3,4,4,3,2], [0,1,0,0,1,0], [1,2,1,1,2,1], [2,3,2,2,3,2], [3,4,3,3,4,3], [1,0,1,1,0,1],
                    [2,1,2,2,1,2], [3,2,3,3,2,3], [4,3,4,4,3,4], [0,1,1,1,1,0], [1,2,2,2,2,1], [2,3,3,3,3,2], [3,4,4,4,4,3], [1,0,0,0,0,1],
                    [2,1,1,1,1,2], [3,2,2,2,2,3], [4,3,3,3,3,4], [0,0,1,1,0,0], [1,1,2,2,1,1], [2,2,3,3,2,2], [3,3,4,4,3,3], [1,1,0,0,1,1],
                    [2,2,1,1,2,2], [3,3,2,2,3,3], [4,4,3,3,4,4], [2,2,0,0,2,2], [3,3,1,1,3,3], [4,4,2,2,4,4], [0,0,2,2,0,0], [1,1,4,4,1,1],
                    [2,2,4,4,2,2], [2,0,0,0,0,2], [3,1,1,1,1,3], [4,2,2,2,2,4], [0,3,3,3,3,0], [1,3,3,3,3,1], [2,4,4,4,4,2], [3,3,0,0,3,3],
                    [4,4,1,1,4,4], [0,0,3,3,0,0]
                ];
            }
            else
            {
                $linesId = [
                    [0,0,0,0,0,0], [1,1,1,1,1,1], [2,2,2,2,2,2], [3,3,3,3,3,3], [2,1,0,0,1,2], [3,2,1,1,2,3], [0,1,2,2,1,0], [1,2,3,3,2,1],
                    [0,1,0,0,1,0], [1,2,1,1,2,1], [2,3,2,2,3,2], [1,0,1,1,0,1], [2,1,2,2,1,2], [3,2,3,3,2,3], [0,1,1,1,1,0], [2,3,3,3,3,2],
                    [2,3,3,3,3,2], [1,0,0,0,0,1], [2,1,1,1,1,2], [3,2,2,2,2,3], [0,0,1,1,0,0], [1,1,2,2,1,1], [2,2,3,3,2,2], [1,1,0,0,1,1],
                    [2,2,1,1,2,2], [3,3,2,2,3,3], [2,2,0,0,2,2], [3,3,1,1,3,3], [0,0,2,2,0,0], [1,1,3,3,1,1], [2,0,0,0,0,2], [3,1,1,1,1,3],
                    [0,2,2,2,2,0], [1,3,3,3,3,1], [3,3,0,0,3,3], [0,0,3,3,0,0], [0,2,0,2,0,2], [1,3,1,3,1,3], [2,0,2,0,2,0], [3,1,3,1,3,1]
                ];
            }
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
    }

}

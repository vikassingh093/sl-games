<?php 
namespace VanguardLTE\Games\LuxuryLife
{
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;

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

        function getBlockedPositions($block)
        {
            $res = [];
            for($r = 0; $r < 5; $r++)
                for($c = 0; $c < 5; $c++)
                    if($block['reel'.($r+1)][$c] == 1)
                        $res[] = $c * 5 + $r;
            $res = implode('|', $res);
            return $res;
        }

        function generateWagerId()
        {
            $id = date("ymdHms").round(microtime(true) * 1000) % 1000;
            return $id;
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
                $data = $request->all();
                $cmd = '';
                if(isset($data['method']))
                    $cmd = $data['method'];
                else
                    $cmd = $data['gameData']['method'];

                $result_tmp = [];
                $balance = $slotSettings->GetBalance();
                switch($cmd)
                {
                    case 'launch':
                        $response = '{"mobileResourcesLocation":"/games/LuxuryLife/games-wgl/endorphina2/LuxuryLife/index.html?session=0CBDC768B3EF4C2192FEC00E386EAA39&sign=fad27dedd3b37322ede9b42b30e49722&endpointUri=","mainSwf":null,"settings":{"autoplayWinExceedsOnOff":false,"backgroundSoundOnOff":true,"creditsDisplayMode":1,"effectsSoundVolume":0.7,"autoplayTimePassedOnOff":false,"realityCheckInterval":1,"autoplayBalanceDecreasedOnOff":false,"autoplayTimePassed":5,"version":"1.0","graphicQuality":"HIGH","autoplayRounds":10,"autoplayRoundsOnOff":false,"masterSoundOnOff":true,"effectsSoundOnOff":true,"autoplayBalanceDecreased":10,"backgroundSoundVolume":0.7,"realityCheckOnOff":false,"autoplayWinExceeds":5,"autoplayBalanceIncreased":1.5,"masterSoundVolume":0.7,"autoplayBalanceIncreasedOnOff":false,"localeID":"en"},"game":"endorphina2_LuxuryLife","session":"0CBDC768B3EF4C2192FEC00E386EAA39","resourcesLocation":"https://demo.endorphina.network/games-wgl/endorphina2/LuxuryLife/index.html?session=0CBDC768B3EF4C2192FEC00E386EAA39&sign=fad27dedd3b37322ede9b42b30e49722&endpointUri=","replaySize":10,"sign":"fad27dedd3b37322ede9b42b30e49722","sessionId":"0CBDC768B3EF4C2192FEC00E386EAA39","type":"ORGANIC","replayLink":"https://demo.endorphina.network/organic/replay/launch?replay=true&session=0CBDC768B3EF4C2192FEC00E386EAA39&sign=fad27dedd3b37322ede9b42b30e49722","exit":null,"endpoint":"","gameName":"Luxury Life","currencyInfo":{"code":"EUR","name":"EUR","denom":1.000000000,"alias":"EUR","useRate":true,"prefix":"€","suffix":"","decimalSeparator":".","groupSeparator":",","decimalPlaces":2,"groupSize":3,"fractionGroupSeparator":"","fractionGroupSize":0},"currency":"EUR"}';
                        return $response;
                        break;
                    case 'init':
                        $result_tmp[] = '{"@type":"MethodInvocation","payload":{"@type":"Balance","balance":"'.$balance.'","currency":"EUR","spins":null,"creditOptions":null,"bonusWin":null},"requestId":"2","method":"GET_BALANCE"}';
                        break;                    
                    case 'GET_PAYTABLE_INFO':
                        $result_tmp[] = '{"@type":"MethodInvocation","payload":{"@type":"logic.api.paytable.slot.Paytable_Info_Slot","gameId":"endorphina2_LuxuryLife","gameName":"LuxuryLife","rtpComment":"96.10 %","jackpotsRtp":"0","reels":5,"sectors":3,"symbols":31,"bets_set":[1,2,3,4,5,10,15,20,30,40,50,60,70,80,90,100],"lines_set":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],"denoms_set":["0.010","0.020","0.050","0.100","0.200","0.500","1.000"],"virtual_strips":null,"virtual_fg_strips":null,"critical_bet":null,"no_gamble_after_bonus":false,"bonus_strips":[],"extra_bet":null,"maxbet_in_money":"150.060","gambleLimit":null,"is_reel_power":false,"buyIns":[{"@type":"logic.api.paytable.slot.BuyIn","id":"BUYIN_FREE_GAMES","price":108}],"minbet_in_money":"0.0100","maxTotalBet":"6250.0000"},"requestId":"1","method":"GET_PAYTABLE_INFO"}';
                        break;
                    case 'GET_BALANCE':
                        $result_tmp[] = '{"@type":"MethodInvocation","payload":{"@type":"Balance","balance":"'.$balance.'","currency":"EUR","spins":null,"creditOptions":null,"bonusWin":null},"requestId":"2","method":"GET_BALANCE"}';
                        break;
                    case 'GET_LAST_GAME':
                        $result_tmp[] = '{"@type":"MethodInvocation","payload":{"@type":"logic.api.gamelogic.Game_History_Item","features":[{"@type":"logic.api.gamelogic.Feature_State","feature_id":"SLOT","feature_name":"","id":0,"init_parameters":{"@type":"logic.api.gamelogic.slot.Slot_Init_Parameters"},"current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":[[7,5,11,1,9,11,9,10,11,9,10,4,7,5,8,9,4,7,9,13,10,9,6,11,9,10,11,9,10,4,7,6,11,9,10,11,9,10,4,7,4,7,9,13,10,9,3,7,6,11,9,9,3,7,6,11,9,10,11,9,10,4,7,5,11,1,9,12,8,11,7,11,5,8,9,10,9,3,11,7,2,11,5],[7,8,11,2,3,10,9,2,8,10,6,8,11,5,11,7,3,10,9,2,8,10,6,8,11,13,12,4,2,8,10,6,6,8,11,13,12,4,8,10,6,8,11,13,12,4,11,2,9,10,12,5,11,10,6,12,10,6,8,11,13,12,4,6,12,4,9,7,6,8,1,7,8,2,8,10,6,8,11,9,2,8,7,6,8,10,6,8,5,3,10,12,4,8,10,5,8,10,6,11,13,12,8,10,6,12,12,4,10,6,9,10,12,5,11,7,5,11,7,3,10,9,2],[11,4,8,9,2,8,5,10,4,6,11,3,6,11,3,10,9,4,7,6,9,11,4,8,9,2,8,5,10,4,11,12,12,13,9,11,6,11,3,10,9,7,3,11,9,5,7,3,11,9,1,11,4,11,3,10,9,4,7,6,9,11,2,7,5,12,7,3,12,2,10,1,11,4,8,9,2,8,5,12,2,10,8,9,12,13,9,11,6,11,6,9,11,2,7,5,12,7,3,11,9,1,11,4,8,9,2,11,12,2,9,5,7,3,11,9,1,11,4,8,9,4,7,6],[2,9,6,10,11,2,11,2,12,13,6,10,4,10,4,12,5,7,2,10,8,2,12,10,3,8,8,4,9,6,12,10,5,12,2,8,7,1,8,8,4,9,6,12,10,5,11,3,7,8,2,9,10,4,12,6,8,12,2,8,7,1,8,4,3,8,10,4,12,13,6,10,4,9,6,12,10,5,11,3,7,8,2,12,6,8,12,2,8,6,12,10,5,11],[5,1,12,6,6,1,11,1,9,3,5,12,1,1,9,3,7,10,4,9,2,7,1,5,10,6,12,10,5,12,8,6,11,13,1,5,10,2,7,5,1,1,12,10,3,5,12,1,10,6,1,12,12,10,3,1,11,1,9,1,9,3,5,12,1,10,6,1,12,10,6,12,10,12,6,1,11,1,10,3,1,11,1,6,12,10,5,12,8,6,11,11,1,9,3,5,12,1,10,6,1,12]],"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":true,"curr_reaction":null,"current_win":0},"prev_current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":false,"curr_reaction":null,"current_win":0},"current_win":0,"status":"FINISHED","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.slot.Slot_Action"},"reaction":{"@type":"logic.api.gamelogic.slot.Slot_Reaction","spin_result":{"@type":"logic.api.paytable.slot.spinresult.Slot_Spin_Result","drum":[[9,10,11],[12,4,8],[2,7,5],[12,10,5],[3,1,11]],"final_drum":null,"items":[],"sound_flags":[false,false,false,false,false],"teaser_flags":[false,false,false,false,false],"wild_multiplier":null,"triggers":null},"dropLevel":0}},"parent_index":0}],"betting_param":{"@type":"logic.api.gamelogic.slot.Slot_Betting_Parameters","denom":"0.010","bet_per_line":1,"num_of_lines":20,"extra_bet":null,"bonusId":null,"buyInId":null},"status":"FINISHED","winLimit":"250000.0000","jurisdictionalMaxWin":null,"round":0,"game_current_state":{"@type":"logic.api.gamelogic.Game_Current_State","counter":null,"num_of_accumulating_jokers_x_total_bet_amount":"0","wildsAccumulator":null,"missAccumulator":null}},"requestId":"3","method":"GET_LAST_GAME"}';
                        break;
                    case 'GET_DYNAMIC_HELP_INFO':
                        $result_tmp[] = '{"@type":"MethodInvocation","payload":{"@type":"logic.api.paytable.slot.Dynamic_Help_Info_Slot","items":[{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":1,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":9000,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":2500,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":250,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":10,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":2,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":750,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":125,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":25,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":2,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":3,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":750,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":125,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":25,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":2,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":4,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":400,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":20,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":5,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":250,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":75,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":15,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":6,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":250,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":75,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":15,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":7,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":125,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":50,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":10,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":8,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":125,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":50,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":10,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":9,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":25,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":10,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":25,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":11,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":25,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":12,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":25,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":2,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":13,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":500,"free_win":0,"is_scatter":true},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":20,"free_win":0,"is_scatter":true},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":true},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":2,"free_win":0,"is_scatter":true},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":0,"free_win":20,"is_scatter":true},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":0,"free_win":20,"is_scatter":true},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":0,"free_win":20,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":14,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":1,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":16,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":2,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":18,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":20,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":10,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":22,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":20,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":24,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":50,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":26,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":28,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":200,"free_win":0,"is_scatter":true}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":30,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":500,"free_win":0,"is_scatter":true}]}]},"requestId":"4","method":"GET_DYNAMIC_HELP_INFO"}';
                        break;
                    case 'START_GAME':
                        $gameData = $data['gameData']['payload'];

                        $lines = $gameData['num_of_lines'];
                        $coinValue = $gameData['denom'];

                        $allbet = $coinValue * $lines;
                        $postData['slotEvent'] = 'bet';
                        
                        if( $postData['slotEvent'] == 'bet' ) 
                        {
                            if(isset($gameData['buyInId']) && $gameData['buyInId'] == 'BUYIN_FREE_GAMES')
                            {
                                //buy bonus with 108x
                                $allbet = $allbet * 108;
                            }
                            $slotSettings->SetBalance(-1 * $allbet, $postData['slotEvent']);
                            $slotSettings->UpdateJackpots($allbet);
                            $slotSettings->SetBet($allbet);
                            $slotSettings->SetGameData($slotSettings->slotId . 'GameWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'AllBet', $allbet);
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'GambleUp', 0);
                            $slotSettings->SetGameData($slotSettings->slotId . 'LastEvent', 'bet');
                        }                                              
                        $result_tmp[] = $this->doSpin($slotSettings, $data['gameData'], $postData);                        
                        break;
                    case 'END_FEATURE':
                        $last_response = json_decode($slotSettings->GetGameData($slotSettings->slotId . 'LastResponse'), true);
                        $payload = $last_response['payload'];
                        $payload['data']['features'][0]['status'] = 'FINISHED';
                        $response = [
                            "@type" => "MethodInvocation",
                            'payload' => $payload['data'],
                            'requestId' => $data['gameData']['requestId'],
                            'method' => $data['gameData']['method']
                        ];
                        $result_tmp[] = json_encode($response);
                        break;
                    case 'END_GAME':
                        $response = json_decode($slotSettings->GetGameData($slotSettings->slotId . 'LastResponse'), true);
                        $response['payload']['data']['features'][0]['status'] = 'FINISHED';
                        $response['payload']['data']['status'] = 'FINISHED';
                        $response['method'] = $data['gameData']['method'];
                        $response['requestId'] = $data['gameData']['requestId'];

                        $totalWin = $slotSettings->GetGameData($slotSettings->slotId . 'TotalGameWin');
                        $coinWin = $slotSettings->GetGameData($slotSettings->slotId . 'TotalCoinWin');
                        $slotSettings->SetBalance($totalWin);
                        $response['payload']['balance']['balance'] = number_format($slotSettings->GetBalance(), 2, '.', '');
                        $lastEvent = $slotSettings->GetGameData($slotSettings->slotId . 'LastEvent');
                        $allbet = $slotSettings->GetGameData($slotSettings->slotId . 'AllBet');                        
                        $response = json_encode($response);
                        $slotSettings->SaveLogReport($response, $allbet, $totalWin, $lastEvent);
                        $result_tmp[] = $response;
                        break;
                    case 'START_FEATURE':
                        if($data['gameData']['payload'][1] == 'GAMBLE') 
                        {
                            $slotSettings->SetGameData($slotSettings->slotId . 'LastGambleWin', 0);
                            $totalWin = $slotSettings->GetGameData($slotSettings->slotId . 'TotalGameWin');
                            $slotSettings->SetGameData($slotSettings->slotId . 'GamebleCnt', 10);
                            $rank = rand(2, 11);
                            $suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'];
                            $suit_index = rand(0, 3);
                            $suit = $suits[$suit_index];
                            $slotSettings->SetGameData($slotSettings->slotId . 'DealerCard', [$rank, $suit_index]);
                            $is_joker = false;
                            $response = [
                                '@type' => 'MethodInvocation',
                                'payload' => [
                                    '@type' => 'logic.api.gamelogic.Feature_State',
                                    'feature_id' => 'GAMBLE',
                                    'feature_name' => '',
                                    'id' => 1,
                                    'init_parameters' => [
                                        '@type' => 'logic.api.gamelogic.gamble.Gamble_Init_Parameters',
                                        'start_win' => number_format($totalWin * 100, 0, '.', ''),
                                        'mults' => [2],
                                        'tries' => 10
                                    ],
                                    'current_state' => [
                                        '@type' => 'logic.api.gamelogic.gamble.BTD_Gamble_Current_State',
                                        'strips_current' => null,
                                        'strips_next' => null,
                                        'strips_changed_bet' => null,
                                        'curr_win' => number_format($totalWin * 100, 0, '.', ''),
                                        'tries' => 10,
                                        'gamble_reactions' => [],
                                        'dealer_card' => [
                                            '@type' => 'logic.api.gamelogic.gamble.Card',
                                            'rank' => $rank,
                                            'is_joker' => $is_joker,
                                            'suit' => $suit
                                        ]
                                    ],
                                    'prev_current_state' => [
                                        '@type' => 'logic.api.gamelogic.gamble.BTD_Gamble_Current_State',
                                        'strips_current' => null,
                                        'strips_next' => null,
                                        'strips_changed_bet' => null,
                                        'curr_win' => number_format($totalWin * 100, 0, '.', ''),
                                        'tries' => 10,
                                        'gamble_reactions' => [],
                                        'dealer_card' => [
                                            '@type' => 'logic.api.gamelogic.gamble.Card',
                                            'rank' => $rank,
                                            'is_joker' => $is_joker,
                                            'suit' => $suit
                                        ]
                                        ],
                                    'current_win' => 0,
                                    'status' => 'IN_PROGRESS',
                                    'last_step' => null,
                                    'parent_index' => 0
                                ],
                                'requestId' => $data['gameData']['requestId'],
                                'method' => $data['gameData']['method']
                            ];
                            $result_tmp[] = json_encode($response);
                        }
                        else
                        {
                            $last_response = json_decode($slotSettings->GetGameData($slotSettings->slotId . 'LastResponse'), true);
                            $freespin_feature = $last_response['payload']['data']['features'][1];
                            $freespin_feature['status'] = 'IN_PROGRESS';
                            $freespin_feature['current_state']['strips_current'] = $slotSettings->GetFreespinReelstrips();
                            $response = [
                                '@type' => 'MethodInvocation',
                                'payload' => $freespin_feature,
                                'requestId' => $data['gameData']['requestId'],
                                'method' => $data['gameData']['method']
                            ];
                            $result_tmp[] = json_encode($response);
                        }
                        break;
                    case 'STEP_FEATURE':
                        if($data['gameData']['payload']['@type'] == 'logic.api.gamelogic.freegames.Free_Games_Action')
                        {
                            $response = $this->doFreespin($slotSettings, $data);
                        }
                        else
                        {
                            $rank = rand(0, 11);
                            $suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'];
                            
                            $last_response = json_decode($slotSettings->GetGameData($slotSettings->slotId . 'LastResponse'), true);
                            $slotSettings->SetGameData($slotSettings->slotId . 'GamebleCnt', $slotSettings->GetGameData($slotSettings->slotId . 'GamebleCnt') - 1);
                            $gambleRemaining = $slotSettings->GetGameData($slotSettings->slotId . 'GamebleCnt');
                            $totalWin = $slotSettings->GetGameData($slotSettings->slotId . 'TotalGameWin');
                            $isGambleWin = false;
                            $curWin = 0;
                            $cards = [];
                            $dealerCard = $slotSettings->GetGameData($slotSettings->slotId . 'DealerCard');                
                            $selectedCards = [];
                            $rank = $dealerCard[0];
                            $suit_index = $dealerCard[1];
                            $selectedCards[] = $rank + $suit_index * 14;        
                            $is_joker = false;
                            $cards[] = [
                                '@type' => 'logic.api.gamelogic.gamble.Card',
                                'rank' => $rank,
                                'is_joker' => $rank == 14,
                                'suit' => $suits[$suit_index]
                            ];
    
                            if(($totalWin * 2 <= $slotSettings->user->spin_bank && rand(0, 100) < 50 && $gambleRemaining > 0))
                            {
                                $isGambleWin = true;
                                $curWin = $totalWin * 2;
                                $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $totalWin * 2);
                            }
                            else
                            {
                                $curWin = -$totalWin;
                            }
    
                            $player_choice = $data['gameData']['payload']['player_choice'];
                            for($i = 0; $i < 4; $i++)
                            {
                                if($i == $player_choice)
                                {
                                    if($isGambleWin)
                                    {
                                        //select a card that bigger than dealer card
                                        $rank = rand($dealerCard[0], 14);
                                        $suit_index = rand(0, 3);
                                        while(in_array($rank + $suit_index * 14, $selectedCards))
                                        {
                                            $rank = rand($dealerCard[0] + 1, 14);
                                            $suit_index = rand(0, 3);
                                        }
                                        $selectedCards[] = $rank + $suit_index * 14;
                                        $cards[] = [
                                            '@type' => 'logic.api.gamelogic.gamble.Card',
                                            'rank' => $rank,
                                            'is_joker' => $rank == 14,
                                            'suit' => $suits[$suit_index]
                                        ];
                                    }
                                    else
                                    {
                                        //select a card that lower than dealer card
                                        $rank = rand(0, $dealerCard[0] - 1);
                                        $suit_index = rand(0, 3);
                                        while(in_array($rank + $suit_index * 14, $selectedCards))
                                        {
                                            $rank = rand($dealerCard[0] + 1, 14);
                                            $suit_index = rand(0, 3);
                                        }
                                        $cards[] = [
                                            '@type' => 'logic.api.gamelogic.gamble.Card',
                                            'rank' => $rank,
                                            'is_joker' => $rank == 14,
                                            'suit' => $suits[$suit_index]
                                        ];
                                        $selectedCards[] = $rank + $suit_index * 14;
                                    }
                                }
                                else
                                {
                                    $rank = rand(0, 13);
                                    $suit_index = rand(0, 3);
                                    while(in_array($rank + $suit_index * 14, $selectedCards))
                                    {
                                        $rank = rand(0, 13);
                                        $suit_index = rand(0, 3);
                                    }
                                    $cards[] = [
                                        '@type' => 'logic.api.gamelogic.gamble.Card',
                                        'rank' => $rank,
                                        'is_joker' => false,
                                        'suit' => $suits[$suit_index]
                                    ];
                                    $selectedCards[] = $rank + $suit_index * 14;
                                }
                            }
    
                            if($isGambleWin)
                            {
                                $rank = rand(1, 12);
                                $suit_index = rand(0, 3);
                                $slotSettings->SetGameData($slotSettings->slotId . 'DealerCard', [$rank, $suit_index]);
                            }
                            else
                            {
                                //gamble failed
                                $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', 0);
                            }
                            
                            $feature = [
                                '@type' => 'logic.api.gamelogic.Feature_State',
                                'feature_id' => 'GAMBLE',
                                'feature_name' => '',
                                'id' => 1,
                                'init_parameters' => [
                                    '@type' => 'logic.api.gamelogic.gamble.Gamble_Init_Parameters',
                                    'start_win' => number_format($totalWin * 100, 0, '.', ''),
                                    'mults' => [2],
                                    'tries' => 10
                                ],
                                'current_state' => [
                                    '@type' => 'logic.api.gamelogic.gamble.BTD_Gamble_Current_State',
                                    'strips_current' => null,
                                    'strips_next' => null, 
                                    'strips_changed_bet' => null,
                                    'curr_win' => $curWin > 0 ? number_format($curWin * 100, 0) : 0,
                                    'tries' => $gambleRemaining,
                                    'gamble_reactions' => [],
                                    'dealer_card' => [
                                        '@type' => 'logic.api.gamelogic.gamble.Card',
                                        'rank' => $rank,
                                        'is_joker' => $rank == 14,
                                        'suit' => $suits[$suit_index]
                                    ],
                                    'must_play' => false
                                ],
                                'prev_current_state' => [
                                    '@type' => 'logic.api.gamelogic.gamble.BTD_Gamble_Current_State',
                                    'strips_current' => null,
                                    'strips_next' => null, 
                                    'strips_changed_bet' => null,
                                    'curr_win' => number_format($slotSettings->GetGameData($slotSettings->slotId . 'LastGambleWin') * 100, 0),
                                    'tries' => $gambleRemaining + 1,
                                    'gamble_reactions' => [],
                                    'dealer_card' => [
                                        '@type' => 'logic.api.gamelogic.gamble.Card',
                                        'rank' => $dealerCard[0],
                                        'is_joker' => $dealerCard[0] == 14,
                                        'suit' => $suits[$dealerCard[1]]
                                    ],
                                    'must_play' => false
                                ],
                                'current_win' => number_format($curWin * 100, 2),
                                'status' => 'IN_PROGRESS',
                                'last_step' => [
                                    '@type' => 'logic.api.gamelogic.Feature_Step',
                                    'action' => $data['gameData']['payload'],
                                    'reaction' => [
                                        '@type' => 'logic.api.gamelogic.gamble.BTD_Gamble_Reaction',
                                        'is_win' => $isGambleWin,
                                        'cards' => $cards
                                    ]
                                ],
                                'parent_index' => 0
                            ];
                            $slotSettings->SetGameData($slotSettings->slotId . 'LastGambleWin', $curWin);
                            $last_response['payload']['data']['features'][0]['status'] = 'FINISHED';
                            $response = [
                                '@type' => 'MethodInvocation',
                                'payload' => [
                                    '@type' => 'logic.api.gamelogic.FeatureStateWrapper',
                                    'state' => $feature,
                                    'historyItem' => [
                                        '@type' => 'logic.api.gamelogic.Game_History_Item',
                                        'features' => [
                                            $last_response['payload']['data']['features'][0],
                                            $feature,
                                        ],
                                        'betting_param' => $last_response['payload']['data']['betting_param'],
                                        'status' => 'IN_PROGRESS',
                                        'winLimit' => '250000.0000',
                                        'jurisdictionalMaxWin' => null,
                                        'round' => 3,
                                        'game_current_state' => [
                                            "@type" => "logic.api.gamelogic.Game_Current_State",
                                            "counter" => null,
                                            "num_of_accumulating_jokers_x_total_bet_amount" => "0",
                                            "wildsAccumulator" => null,
                                            "missAccumulator" => null
                                        ]
                                    ]
                                ],
                                'requestId' => $data['gameData']['requestId'],
                                'method' => $data['gameData']['method']
                            ];
                        }
                        
                        $result_tmp[] = json_encode($response);
                        break;
                }                
                $response = implode('------', $result_tmp);
                $slotSettings->SaveGameData();
                $slotSettings->SaveGameDataStatic();
                DB::commit();    
                return ':::'.$response;            
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

        function doFreespin($slotSettings, $data)
        {
            $response = [];
            $postData['slotEvent'] = 'freespin';
            $lines = $slotSettings->GetGameData($slotSettings->slotId . 'lines');
            $coinValue = $slotSettings->GetGameData($slotSettings->slotId . 'coinValue');
            $allbet = $coinValue * $lines;
            $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
            $freespinRemaining = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1);
            $spinWinLimit = $spinWinLimit / $freespinRemaining;
            $spinAcquired = false;
            $winArray = [
                '14' => 1,
                '16' => 2,
                '18' => 5,
                '20' => 10,
                '22' => 20,
                '24' => 50,
                '26' => 100,
                '28' => 200,
                '30' => 500
            ];

            $minReels = [];
            $minTotalWin = -1;
            $minLineWins = [];

            $lineWins = [];
            for($i = 0; $i < 300; $i++)
            {
                $totalWin = 0;
                $lineWins = [];
                $reels = $slotSettings->GetReelStripsBonus($winType);
                $winMpl = 0;
                for($r = 0; $r < 4; $r++)
                {
                    for($c = 0; $c < 3; $c++)
                    {
                        $sym = $reels['reel'.($r+1)][$c];
                        if($sym % 2 == 0 && $reels['reel'.($r+2)][$c] == $sym + 1)
                        {
                            $winMpl += $winArray[$sym];
                            $win = $winArray[$sym] * $allbet;
                            $lineWins[] = [$sym, [$r, $c], $win, $lines];
                        }
                    }
                }

                $totalWin = $allbet * $winMpl;

                if($minTotalWin == -1 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minReels = $reels;
                    $minLineWins = $lineWins;
                }

                if($totalWin <= $spinWinLimit && ($totalWin > 0 && $winType != 'none'))
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

            if(!$spinAcquired && $totalWin > 0 && $winType != 'none')
            {                
                $reels = $minReels;
                $totalWin = $minTotalWin;
                $lineWins = $minLineWins;
            }

            $slotSettings->SetWin($totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $slotSettings->GetGameData($slotSettings->slotId . 'TotalGameWin') + $totalWin);

            $items = [];
            foreach($lineWins as $lineWin)
            {
                $positions = [];
                $positions[] = [
                    '@type' => 'logic.api.paytable.slot.spinresult.Position2D',
                    'xPos' => $lineWin[1][0],
                    'yPos' => $lineWin[1][1],
                ];
                $positions[] = [
                    '@type' => 'logic.api.paytable.slot.spinresult.Position2D',
                    'xPos' => $lineWin[1][0] + 1,
                    'yPos' => $lineWin[1][1],
                ];
                $items[] = [
                    '@type' => 'logic.api.paytable.slot.spinresult.Spin_Result_Item',
                    'positions' => $positions,
                    'icons' => [$lineWin[0], $lineWin[0] + 1],
                    'jokers' => [0, 0],
                    'strip_icons' => [$lineWin[0], $lineWin[0] + 1],
                    'combo_id' => 47,
                    'line_number' => 0,
                    'isScatter' => true,
                    'win' => $lineWin[2] * 100 / $lineWin[3],
                    'playing_symbol' => -1,
                    'win_multiplier' => $lineWin[3],
                    'bonus_id' => 'NO_BONUS',
                    'feature_name' => '',
                    'feature_state_index' => 0,
                    'win_data' => null,                    
                ];
            }

            $freespinRemaining = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') - $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');

            $last_response = json_decode($slotSettings->GetGameData($slotSettings->slotId . 'LastResponse'), true);
            $payload = $last_response['payload'];
            $freespin_feature = $payload['data']['features'][1];
            $freespin_feature['status'] = 'IN_PROGRESS';
            $freespin_feature['last_step'] = [
                '@type' => 'logic.api.gamelogic.Feature_Step',
                'action' => ['@type' => 'logic.api.gamelogic.freegames.Free_Games_Action'],
                'reaction' => [
                    '@type' => 'logic.api.gamelogic.slot.Slot_Reaction',
                    'spin_result' => [
                        '@type' => 'logic.api.paytable.slot.spinresult.Slot_Spin_Result',
                        'drum' => [$reels['reel1'], $reels['reel2'], $reels['reel3'], $reels['reel4'], $reels['reel5']],
                        'final_drum' => null,
                        'items' => $items,
                        'teaser_flags' => [false, false, false, false, false],
                        'wild_multiplier' => null,
                        'triggers' => null
                    ],
                    'dropLevel' => 0
                ]
            ];

            $freespin_feature['current_state']['played_free_games'] = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
            $freespin_feature['current_state']['not_played_free_games'] = $freespinRemaining;

            $freespin_feature['prev_current_state']['played_free_games'] = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') - 1 >= 0 ? $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') - 1 : 0;
            $freespin_feature['prev_current_state']['not_played_free_games'] = $freespinRemaining + 1 <= 20 ? $freespinRemaining + 1 : 20;

            $payload['data']['features'][1]['last_step'] = $freespin_feature['last_step'];
            $payload['data']['features'][0]['status'] = 'FINISHED';
            $response = [
                '@type' => 'MethodInvocation',
                'payload' => [
                    '@type' => 'logic.api.gamelogic.FeatureStateWrapper',
                    'state' => $freespin_feature,
                    'historyItem' => $payload['data']
                ],
                'requestId' => $data['gameData']['requestId'],
                'method' => $data['gameData']['method']
            ];
            return $response;
        }

        function doSpin($slotSettings, $data, $postData)
        {
            $gameData = $data['payload'];
            $lines = $gameData['num_of_lines'];
            $coinValue = $gameData['denom'];            

            $allbet = $coinValue * $lines;

            $linesId = $slotSettings->GetPaylines($lines);
            $betLine = $coinValue;

            if(isset($gameData['buyInId']) && $gameData['buyInId'] == 'BUYIN_FREE_GAMES')
            {
                //buy bonus
                $winTypeTmp = $slotSettings->GetSpinSettings('bet', $coinValue * $lines, true);
            }
            else
            {
                $winTypeTmp = $slotSettings->GetSpinSettings($postData['slotEvent'], $allbet);
            }
            
            $winType = $winTypeTmp[0];
            $spinWinLimit = $winTypeTmp[1];
            
            $spinAcquired = false;
            $gameWin = $slotSettings->GetGameData($slotSettings->slotId . 'GameWin');            

            if($this->debug && $postData['slotEvent'] != 'freespin')
            {
                $winType = 'bonus';
            }

            $minReels = [];
            $minLineWins = [];
            $minTotalWin = -1;
            $minFreespinsWon = 0;
            $minScatterCount = 0;
            $minBonusCount = 0;            

            $totalWin = 0;
            $freespinsWon = 0;
            $lineWins = [];
            $reels = [];
            
            $scatter = 13;
            $scatterCount = 0;
            $bonusCount = 0;
            $wild = [1, 13];
            $paytable = $slotSettings->Paytable;
            for( $i = 0; $i <= 500; $i++ ) 
            {
                $totalWin = 0;
                $freespinsWon = 0;
                $scatterCount = 0;
                $bonusCount = 0;
                $scatterPos = [];
                $lineWins = [];
                $cWins = array_fill(0, $lines, 0);
                
                $reels = $slotSettings->GetReelStrips($winType, $lines);                
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

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild))) 
                            {                               
                                $mpl = 1;
                                $coin = $paytable[$csym][2];
                                $tmpWin = $paytable[$csym][2] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 2, $mpl, $tmpWin, $coin, [$s[0], $s[1], 0, 0, 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }
                                                                                
                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) ) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][3];
                                $tmpWin = $paytable[$csym][3] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 3, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], 0, 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild))  && ($s[3] == $csym || in_array($s[3], $wild)) ) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($s[3] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][4];
                                $tmpWin = $paytable[$csym][4] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 4, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], $s[3], 0], [$p0, $p1, $p2, $p3, $p4]];
                                }
                            }

                            if(($s[0] == $csym || in_array($s[0], $wild)) && ($s[1] == $csym || in_array($s[1], $wild)) && ($s[2] == $csym || in_array($s[2], $wild)) && ($s[3] == $csym || in_array($s[3], $wild)) && ($s[4] == $csym || in_array($s[4], $wild))) 
                            {
                                $wildCnt = 0;
                                $mpl = 1;
                                if($s[0] == $wild[0])   $wildCnt++;
                                if($s[1] == $wild[0])   $wildCnt++;
                                if($s[2] == $wild[0])   $wildCnt++;
                                if($s[3] == $wild[0])   $wildCnt++;
                                if($s[4] == $wild[0])   $wildCnt++;
                                if($wildCnt > 0)
                                    $mpl = 2;
                                $coin = $paytable[$csym][5];
                                $tmpWin = $paytable[$csym][5] * $betLine * $mpl * $bonusMpl;
                                if( $cWins[$k] < $tmpWin ) 
                                {
                                    $cWins[$k] = $tmpWin;                                    
                                    $winline = [$k, $csym, 5, $mpl, $tmpWin, $coin, [$s[0], $s[1], $s[2], $s[3], $s[4]], [$p0, $p1, $p2, $p3, $p4]];
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

                //calculate bonus symbol count
                for($r = 1; $r <= 5; $r++)
                {
                    $isScatterPresent = false;
                    for($c = 0; $c < 3; $c++)
                    {
                        if($reels['reel'.$r][$c] == $scatter)
                        {
                            $scatterCount++;
                            $scatterPos[] = $c;
                            $isScatterPresent = true;
                            break;
                        }                            
                    }
                    if(!$isScatterPresent)
                    {
                        $scatterPos[] = -1;
                    }
                }

                if($winType != 'bonus' && $scatterCount > 2)
                    continue;

                $scattersWin = 0;
                if($scatterCount > 2)
                {
                    $freespinsWon = 20;
                    $coin = $paytable[$scatter][$scatterCount] * $lines;
                    $scattersWin = $coin * $betLine;
                    $winline = [0, $scatter, $scatterCount, $lines, $scattersWin, $coin, array_fill(0, $scatterCount, $scatter), $scatterPos];
                    $lineWins[] = $winline;
                }

                $totalWin += $scattersWin;

                if($minTotalWin == -1 && $scatterCount < 3 || ($minTotalWin > $totalWin && $totalWin > 0))
                {
                    $minTotalWin = $totalWin;
                    $minLineWins = $lineWins;
                    $minFreespinsWon = $freespinsWon;
                    $minReels = $reels;
                    $minScatterCount = $scatterCount;
                    $minBonusCount = $bonusCount;
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
                    break;
                }
            }

            if(!$spinAcquired && $totalWin > $gameWin && $winType != 'none' || ($winType != 'bonus' && $scatterCount > 2))
            {                
                $reels = $minReels;
                $lineWins = $minLineWins;
                $totalWin = $minTotalWin;
                $freespinsWon = $minFreespinsWon;
                $scatterCount = $minScatterCount;
                $bonusCount = $minBonusCount;
            }

            $winlineCnt = count($lineWins);

            $coins = 0;

            $items = [];
            if($winlineCnt > 0)
            {
                foreach($lineWins as $lineWin)
                {
                    $joker = [0, 0, 0, 0, 0];
                    $syms = $lineWin[6];
                    for($i = 0; $i < count($syms); $i++)
                        if($syms[$i] == 1)
                            $joker[$i] = 10;
                    $payline_positions = $lineWin[7];
                    $positions = [];
                    for($i = 0; $i < 5; $i++)
                    {
                        if($payline_positions[$i] != -1)
                        {
                            $positions[] = [
                                '@type' => 'logic.api.paytable.slot.spinresult.Position2D',
                                'xPos' => $i,
                                'yPos' => $payline_positions[$i]
                            ];
                        }                        
                    }
                    $isScatter = false;                    
                    if($lineWin[1] == $scatter)
                    {
                        $isScatter = true;                        
                    }                    

                    $item = [
                        '@type' => 'logic.api.paytable.slot.spinresult.Spin_Result_Item',
                        'animation_id' => null,
                        'bonus_id' => 'NO_BONUS',
                        'combo_id' => 32,
                        'feature_name' => "",
                        'feature_state_index' => 0,
                        'fullscreenAnimation_id' => null,
                        'fullscreen_animation_id' => null,
                        'icons' => $syms,
                        'isScatter' => $isScatter,
                        'jokers' => $joker,
                        'line_number' => $lineWin[0] + 1,
                        'playing_symbol' => $lineWin[1],
                        'positions' => $positions,
                        'strip_icons' => $syms,
                        'win' => number_format($lineWin[4] / $lineWin[3] * 100, 2, '.', ''),
                        'win_data' => null,
                        'win_multiplier' => $lineWin[3]
                    ];
                    $items[] = $item;
                    if($isScatter == true)
                    {
                        //insert one more item for freespin
                        $item = [
                            '@type' => 'logic.api.paytable.slot.spinresult.Spin_Result_Item',
                            'animation_id' => null,
                            'bonus_id' => 'FREE_GAME',
                            'combo_id' => 46,
                            'feature_name' => "",
                            'feature_state_index' => 0,
                            'fullscreenAnimation_id' => null,
                            'fullscreen_animation_id' => null,
                            'icons' => $syms,
                            'isScatter' => $isScatter,
                            'jokers' => $joker,
                            'line_number' => 0,
                            'playing_symbol' => $lineWin[1],
                            'positions' => $positions,
                            'strip_icons' => $syms,
                            'win' => 0,
                            'win_data' => null,
                            'win_multiplier' => $lineWin[3]
                        ];
                        $items[] = $item;
                    }
                }
            }
            $gameStatus = 'FINISHED';
            if($totalWin > 0)
            {
                $slotSettings->SetWin($totalWin);
                $gameStatus = 'IN_PROGRESS';
            }
            $round = 1;
            
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $totalWin);
            $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', $coins);
            
            $features = [];
            $features[] = [
                '@type' => 'logic.api.gamelogic.Feature_State',
                'feature_id' => 'SLOT',
                'feature_name' => '',
                'id' => 0,
                'init_parameters' => ['@type' => 'logic.api.gamelogic.slot.Slot_Init_Parameters'],
                'current_state' => [
                    '@type' => 'logic.api.gamelogic.slot.Slot_Current_State',
                    'strips_current' => null,
                    'strips_next' => null,
                    'strips_changed_bet' => null,
                    'ext_mults' => null,
                    'is_final' => true,
                    'curr_reaction' => null,
                    'current_win' => 0
                ],
                'prev_current_state' => [
                    '@type' => 'logic.api.gamelogic.slot.Slot_Current_State',
                    'strips_current' => null,
                    'strips_next' => null,
                    'strips_changed_bet' => null,
                    'ext_mults' => null,
                    'is_final' => false,
                    'curr_reaction' => null,
                    'current_win' => 0
                ],
                'current_win' => number_format($totalWin * 100, 2, '.', ''),
                'status' => $gameStatus,
                'last_step' => [
                    '@type' => 'logic.api.gamelogic.Feature_Step',
                    'action' => ['@type' => 'logic.api.gamelogic.slot.Slot_Action'],
                    'reaction' => [
                        '@type' => 'logic.api.gamelogic.slot.Slot_Reaction',
                        'spin_result' => [
                            '@type' => 'logic.api.paytable.slot.spinresult.Slot_Spin_Result',
                            'drum' => [$reels['reel1'], $reels['reel2'], $reels['reel3'], $reels['reel4'], $reels['reel5']],
                            'final_drum' => null,
                            'items' => $items,
                            'teaser_flags' => [false, false, false, false, false],
                            'wild_multiplier' => null,
                            'triggers' => null
                        ],
                        'dropLevel' => 0
                    ],
                ],
                'parent_index' => 0
            ];

            if($freespinsWon > 0)
            {
                //trigger freespin
                $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $freespinsWon);
                $slotSettings->SetGameData($slotSettings->slotId . 'lines', $lines);
                $slotSettings->SetGameData($slotSettings->slotId . 'coinValue', $coinValue);

                //freespin feature
                $features[] = [
                    '@type' => 'logic.api.gamelogic.Feature_State',
                    'feature_id' => 'FREE_GAME',
                    'feature_name' => '',
                    'id' => 1,
                    'init_parameters' => [
                        '@type' => 'logic.api.gamelogic.freegames.Free_Games_Init_Parameters',
                        'free_win' => 20,
                        'mult' => 1,
                        'bet_param' => [
                            '@type' => 'logic.api.gamelogic.slot.Slot_Betting_Parameters',
                            'denom' => $gameData['denom'],
                            'bet_per_line' => $gameData['bet_per_line'],
                            'num_of_lines' => $gameData['num_of_lines'],
                            'extra_bet' => $gameData['extra_bet'],
                            'bonusId' => '',
                            'buyInId' => null
                        ],
                        'basic_win' => number_format($totalWin * 100, 0, '.', ''),
                        'basic_num_of_accumulated_jokers' => 0,
                        'init_battle_wins' => null,
                        'init_drum' => [
                            [rand(14, 29), rand(14, 29), rand(14, 29)],
                            [rand(14, 29), rand(14, 29), rand(14, 29)],
                            [rand(14, 29), rand(14, 29), rand(14, 29)],
                            [rand(14, 29), rand(14, 29), rand(14, 29)],
                            [rand(14, 29), rand(14, 29), rand(14, 29)]
                        ],
                        'freegamesMode' => 0,
                    ],
                    'current_state' => [
                        '@type' => 'logic.api.gamelogic.freegames.Free_Games_Current_State',
                        'strips_current' => null,
                        'strips_next' => null,
                        'strips_changed_bet' => null,
                        'played_free_games' => 0,
                        'not_played_free_games' => 20,
                        'mult' => 1,
                        'strip_spreading_symbol' => 0,
                        'evolution_level' => 0,
                        'evolution_mults' => null,
                        'fixed_jokers' => null,
                        'number_of_lucky_free_games_retriggers' => 0,
                        'is_drop' => false,
                        'curr_drop_reaction' => null,
                        'num_of_accumulated_jokers' => 0,
                        'accumulators' => null,
                        'battle_info' => null,
                        'spreading_accumulators' => null,
                        'strip_spreading_symbols' => null,
                        'strip_extra_wilds' => null,
                        'wild_accumulators' => null,
                        'stickySymbols' => null,
                        'current_win' => 0
                    ],
                    'prev_current_state' => [
                        '@type' => 'logic.api.gamelogic.freegames.Free_Games_Current_State',
                        'strips_current' => null,
                        'strips_next' => null,
                        'strips_changed_bet' => null,
                        'played_free_games' => 0,
                        'not_played_free_games' => 20,
                        'mult' => 1,
                        'strip_spreading_symbol' => 0,
                        'evolution_level' => 0,
                        'evolution_mults' => null,
                        'fixed_jokers' => null,
                        'number_of_lucky_free_games_retriggers' => 0,
                        'is_drop' => false,
                        'curr_drop_reaction' => null,
                        'num_of_accumulated_jokers' => 0,
                        'accumulators' => null,
                        'battle_info' => null,
                        'spreading_accumulators' => null,
                        'strip_spreading_symbols' => null,
                        'strip_extra_wilds' => null,
                        'wild_accumulators' => null,
                        'stickySymbols' => null,
                        'current_win' => 0
                    ],
                    'current_win' => 0,
                    'status' => 'NOT_STARTED',
                    'last_step' => null,
                    'parent_index' => 0
                ];
            }

            $response = [
                '@type' => 'MethodInvocation',
                'payload' => [
                    '@type' => 'GameResponse',
                    'data' => [
                        '@type' => 'logic.api.gamelogic.Game_History_Item',
                        'features' => $features,
                        'betting_param' => [
                            '@type' => 'logic.api.gamelogic.slot.Slot_Betting_Parameters',
                            'denom' => $gameData['denom'],
                            'bet_per_line' => $gameData['bet_per_line'],
                            'num_of_lines' => $gameData['num_of_lines'],
                            'extra_bet' => $gameData['extra_bet'],
                            'bonusId' => '',
                            'buyInId' => null
                        ],
                        'status' => $gameStatus,
                        'winLimit' => 250000.0000,
                        'jurisdictionalMaxWin' => null,
                        'round' => $round,
                        'game_current_state' => [
                            '@type' => 'logic.api.gamelogic.Game_Current_State',
                            'counter' => null,
                            'num_of_accumulating_jokers_x_total_bet_amount' => 0,
                            'wildsAccumulator' => null,
                            'missAccumulator' => null
                        ]
                    ],
                    'balance' => [
                        '@type' => 'Balance',
                        'balance' => number_format($slotSettings->GetBalance(), 2, '.', ''),
                        'currency' => 'EUR',
                        'spins' => null,
                        'creditOptions' => null,
                        'bonusWin' => null,
                    ],
                    'jackpot' => null,
                ],
                'requestId' => $data['requestId'],
                'method' => $data['method']
            ];
           
            if($postData['slotEvent'] == 'bet')
            {         
                if($freespinsWon > 0)
                {
                    //trigger freespin
                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $freespinsWon);

                    $slotSettings->SetGameData($slotSettings->slotId . 'lines', $lines);
                    $slotSettings->SetGameData($slotSettings->slotId . 'coinValue', $coinValue);    
                }
                
                $slotSettings->SetGameData($slotSettings->slotId . 'TotalGameWin', $totalWin);
                $slotSettings->SetGameData($slotSettings->slotId . 'TotalCoinWin', $coins);
            }
            
            $response = json_encode($response);
            $slotSettings->SetGameData($slotSettings->slotId . 'LastResponse', $response);
            if($totalWin == 0)
                $slotSettings->SaveLogReport($response, $allbet, 0, $postData['slotEvent']);
            return $response;
        }
    }
}



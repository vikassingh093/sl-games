<?php
namespace VanguardLTE\Lib;

use Carbon\Carbon;
use VanguardLTE\StatGame;
use VanguardLTE\User;

use function PHPSTORM_META\elementType;

class JackpotHandler{
    public static function float_rand($Min, $Max, $round=0){
        //validate input
        $min = $Min;
        $max = $Max;
        if ($min > $Max) { $min=$Max; $max=$Min; }
            else { $min=$Min; $max=$Max; }
        $randomfloat = $min + mt_rand() / mt_getrandmax() * ($max - $min);
        if($round > 0)
            $randomfloat = round($randomfloat,$round);
     
        return $randomfloat;
    }

    public static function updateJackpots($slotSettings, $bet)
    {
        $shop = \VanguardLTE\Shop::where('id', '=', $slotSettings->shop_id)->get();
        if($shop[0]->jackpot_active == 0)
            return;
        $bet = $bet * $slotSettings->CurrentDenom;        
        $jsum = [];
        $payJack = 0;
        for( $i = 0; $i < count($slotSettings->jpgs); $i++ )
        {
            $jsum[$i] = $bet * $slotSettings->jpgs[$i]->percent + $slotSettings->jpgs[$i]->balance;
            if( $slotSettings->jpgs[$i]->get_pay_sum() < $jsum[$i] && $slotSettings->jpgs[$i]->get_pay_sum() > 0 ) 
            {
                if( $slotSettings->jpgs[$i]->user_id && $slotSettings->jpgs[$i]->user_id != $slotSettings->user->id ) 
                {
                }
                else
                {
                    $jsum[$i] = $slotSettings->jpgs[$i]->get_start_balance();                    
                    if($slotSettings->jpgs[$i]->tick == 0 )
                    {
                        if($slotSettings->jpgs[$i]->name == 'Bronze' || $slotSettings->jpgs[$i]->name == 'Silver')
                        {
                            $payJack = $slotSettings->jpgs[$i]->get_pay_sum() / $slotSettings->CurrentDenom;                            
                            $slotSettings->SetBalance($slotSettings->jpgs[$i]->get_pay_sum() / $slotSettings->CurrentDenom);
                            if( $slotSettings->jpgs[$i]->get_pay_sum() > 0 ) 
                            {
                                \VanguardLTE\StatGame::create([
                                    'user_id' => $slotSettings->playerId, 
                                    'balance' => $slotSettings->Balance * $slotSettings->CurrentDenom, 
                                    'bet' => 0, 
                                    'win' => $slotSettings->jpgs[$i]->get_pay_sum(), 
                                    'game' => 'JPG ' . $slotSettings->jpgs[$i]->id, 
                                    'in_game' => 0, 
                                    'in_jpg' => 0, 
                                    'in_profit' => 0, 
                                    'shop_id' => $slotSettings->shop_id, 
                                    'info' => $slotSettings->jpgs[$i]->name,
                                    'date_time' => \Carbon\Carbon::now()
                                ]);                            
                            }
                        }
                        else
                        {
                            //for gold or platinum
                            //get last betters for 30 secs
                            $date = Carbon::now()->addSeconds(-30);
                            $user = auth()->user();
                            $lastBetUsers = StatGame::where('date_time', '>=', $date)
                                ->where('game', 'NOT LIKE', '% JPG')
                                ->where('game', 'NOT LIKE', '% FG')
                                ->where('user_id', '<>', $user->id)
                                ->where('shop_id', '=', $slotSettings->shop_id)
                                ->groupBy('user_id')->get();
                            $winPerUser = $slotSettings->jpgs[$i]->get_pay_sum() / (count($lastBetUsers) + 1);
                            //process for current better
                            
                            $user->increment('balance', $winPerUser);
                            $user->save();
                            \VanguardLTE\StatGame::create([
                                'user_id' => $user->id, 
                                'balance' => $user->balance, 
                                'bet' => 0, 
                                'win' => $winPerUser, 
                                'game' => 'JPG ' . $slotSettings->jpgs[$i]->id, 
                                'in_game' => 0, 
                                'in_jpg' => 0, 
                                'in_profit' => 0, 
                                'shop_id' => $slotSettings->shop_id, 
                                'info' => $slotSettings->jpgs[$i]->name,
                                'date_time' => \Carbon\Carbon::now()
                            ]);

                            //process for last 30secs betters
                            foreach($lastBetUsers as $betUser)
                            {
                                $user = \VanguardLTE\User::lockForUpdate()->find($betUser->user_id);
                                $user->increment('balance', $winPerUser);
                                $user->save();
                                \VanguardLTE\StatGame::create([
                                    'user_id' => $user->id, 
                                    'balance' => $user->balance, 
                                    'bet' => 0, 
                                    'win' => $winPerUser, 
                                    'game' => 'JPG ' . $slotSettings->jpgs[$i]->id, 
                                    'in_game' => 0, 
                                    'in_jpg' => 0, 
                                    'in_profit' => 0, 
                                    'shop_id' => $slotSettings->shop_id, 
                                    'info' => $slotSettings->jpgs[$i]->name,
                                    'date_time' => \Carbon\Carbon::now()
                                ]);
                            }
                        }
                    }
                    else
                    {

                    }
                    $slotSettings->jpgs[$i]->pay_sum = JackpotHandler::float_rand($slotSettings->jpgs[$i]->start_payout, $slotSettings->jpgs[$i]->end_payout, 2);
                    $slotSettings->jpgs[$i]->tick++;
                    if($slotSettings->jpgs[$i]->tick > $slotSettings->jpgs[$i]->fake_cnt)
                        $slotSettings->jpgs[$i]->tick = 0;
                }
            }
            $slotSettings->jpgs[$i]->balance = $jsum[$i];
            $slotSettings->jpgs[$i]->save();
            if( $slotSettings->jpgs[$i]->balance < $slotSettings->jpgs[$i]->start_balance ) 
            {
                $summ = $slotSettings->jpgs[$i]->get_start_balance();
                if( $summ > 0 ) 
                {
                    $slotSettings->jpgs[$i]->add_jpg('add', $summ);
                }
            }
        }
        if( $payJack > 0 ) 
        {
            $payJack = sprintf('%01.2f', $payJack);
            $slotSettings->Jackpots['jackPay'] = $payJack;
        }
        if($slotSettings->user->sunday_funday_limit > 0)
        {
            $slotSettings->user->sunday_funday_limit -= $bet;
        }
    }

    public static function processBonus($slotSettings)
    {
        $userid = $slotSettings->playerId;
        if($slotSettings->user->balance <= 3 && $slotSettings->user->reward_bonus > 0)
        {
            //add cashback balance
            $balance = $slotSettings->user->balance;
            $reward = $slotSettings->user->reward_bonus;
            $slotSettings->user->update(['balance' => $balance + $reward, 'reward_bonus' => 0]);
            \VanguardLTE\Statistic::create([
                    'user_id' => $userid, 
                    'payeer_id' => 0, 
                    'title' => 'RB',                     
                    'description' => 'Reward',                    
                    'sum' => $reward, 
                    'last_balance' => $balance,
                    'result_balance' => $balance + $reward,
                    'last_payeer_balance' => 0,
                    'result_payeer_balance' => 0,
                    'hh_multiplier' => 0, 
                    'sum2' => $reward, 
                    'shop_id' => $slotSettings->shop_id
                ]);
            $slotSettings->user->reward_bonus = 0;
        }
        else if($slotSettings->user->balance <= 0.15 && $slotSettings->user->balance_cashback > 0)
        {
            //add cashback balance
            $balance = $slotSettings->user->balance;
            $cashback = $slotSettings->user->balance_cashback;
            $slotSettings->user->update(['balance' => $balance + $cashback, 'balance_cashback' => 0]);
            \VanguardLTE\Statistic::create([
                    'user_id' => $userid, 
                    'payeer_id' => 0, 
                    'title' => 'CB',                     
                    'description' => 'Cashback',                    
                    'sum' => $cashback, 
                    'last_balance' => $balance,
                    'result_balance' => $balance + $cashback,
                    'last_payeer_balance' => 0,
                    'result_payeer_balance' => 0,
                    'hh_multiplier' => 0, 
                    'sum2' => $cashback, 
                    'shop_id' => $slotSettings->shop_id
                ]);            
            $slotSettings->user->balance_cashback = 0;
        }        
    }
}
?>
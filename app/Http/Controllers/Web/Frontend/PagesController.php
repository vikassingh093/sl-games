<?php 
namespace VanguardLTE\Http\Controllers\Web\Frontend
{
    use Illuminate\Support\Facade\Redis;
    use Carbon\Carbon;
    use VanguardLTE\Lib\Network;
    use VanguardLTE\Model\CrudModel;

    include_once(base_path() . '/app/ShopCore.php');
    include_once(base_path() . '/app/ShopGame.php');
    class PagesController extends \VanguardLTE\Http\Controllers\Controller
    {
        public function policy()
        {
            return view('frontend.pages.policy');
        }

        public function empty()
        {
            return view('frontend.pages.empty');
        }

        public function new_license()
        {
			/*
			$licensed = false;
			$licensed = true;
            $checked = new \VanguardLTE\Lib\LicenseDK();
            $license_notifications_array = $checked->aplVerifyLicenseDK(null, 0);
            if( $license_notifications_array['notification_case'] == 'notification_license_ok' ) 
            {
                $licensed = true;
            }
            if( !file_exists(resource_path() . '/views/system/pages/new_license.blade.php') ) 
            {
                abort(404);
            }
            return view('system.pages.new_license', compact('licensed'));
			*/
        }
        public function new_license_post(\Illuminate\Http\Request $request)
        {
            $email = trim($request->email);
            $code = trim($request->code);
            file_put_contents(base_path() . '/' . config('LicenseDK.APL_LICENSE_FILE_LOCATION'), '');
            $checked = new \VanguardLTE\Lib\LicenseDK();
            $license_notifications_array = $checked->aplInstallLicenseDK($request->getSchemeAndHttpHost(), $email, $code);
            if( $license_notifications_array['notification_case'] == 'notification_license_ok' ) 
            {
                return redirect()->back()->withSuccess(trans('app.license_is_already_installed'));
            }
            if( $license_notifications_array['notification_case'] == 'notification_already_installed' ) 
            {
                return redirect()->back()->withSuccess(trans('app.license_is_already_installed'));
            }
            return redirect()->back()->withErrors([$license_notifications_array['notification_text']]);
        }

        public function jpstv($id = 0)
        {
            return view('system.pages.jpstv', compact('id'));
        }       

        public function jpstv_json(\Illuminate\Http\Request $request)
        {
            $user = auth()->user();
            if($user == null)
            {
                //return kicked user response
                $res = ['status' => 'logout'];
                return json_encode($res);
            }

            //save login status of player to redis
            $player_key = "player_time_";
            $redis = app()->make('redis');
            $data = ["time" => time(), "ip" => request()->ip()];

            $redis->set($player_key . $user->id, json_encode($data));
            
            //calc bonuses
            $jNames = [
                'bronze',
                'silver',
                'gold',
                'platinum'
            ];
            $jCnt = 0;
            $res = [
                'status' => 'success', 
                'content' => [], 
                'i' => 1
            ];
            
            $data = \VanguardLTE\JPG::where('shop_id', $user->shop_id)->get();
            foreach( $data as $jackpot ) 
            {
                $res['content'][] = [
                    'name' => $jNames[$jCnt], 
                    'jackpot' => $jackpot->balance, 
                    'user' => ''
                ];
                $jCnt++;
                if( $jCnt > 5 ) 
                {
                    break;
                }
            }

            // $date = Carbon::now()->addSeconds(-30)->format('Y-m-d H:i:s');
            //\DB::connection()->enableQueryLog();
            $date = Carbon::now()->addMinutes(-5)->format('Y-m-d H:i:s');
            $jackpot_wins = \VanguardLTE\StatGame::where('game', 'like', 'JPG %')
                            ->where('user_id', '=', $user->id)
                            ->where('date_time', '>=', $date)->get();
            //$queries = \DB::getQueryLog();
            //$res['queries'] = $queries;
            $res['jackpots'] = [];
            foreach($jackpot_wins as $jackpot_win)
            {
                $game = $jackpot_win->game;
                $game = explode(' ', $game);
                $jackpot_id = $game[1];                
                $jackpot_name = \VanguardLTE\JPG::where('id', '=', $jackpot_id)->get()[0]->name;
                $res['jackpots'][] = ['name' => $jackpot_name, 'win' => $jackpot_win->win, 'date' => $jackpot_win->date_time];
            }

            //cash back bonus
            // $cashback_wins = \VanguardLTE\Statistic::where('title', '=', 'CB')
            //                 ->where('user_id', '=', $user->id)
            //                 ->where('created_at', '>=', $date)->get();
            // $res['cashback'] = [];
            // foreach($cashback_wins as $cashback)
            // {
            //     $res['cashback'][] = ['name' => 'cashback', 'win' => $cashback->sum, 'date' => $cashback->created_at];
            // }            

            //reward bonus won
            $reward_wins = \VanguardLTE\Statistic::where('title', '=', 'RB')
                            ->where('user_id', '=', $user->id)
                            ->where('created_at', '>=', $date)->get();
            $res['reward'] = [];
            foreach($reward_wins as $reward)
            {
                $res['reward'][] = ['name' => 'reward', 'win' => $reward->sum, 'date' => $reward->created_at];
            } 

            $res['balance'] = $user->balance;
            $res['reward_available'] = false;
            if($user->reward_base > 0)
                $res['reward_available'] = true;

            //sunday funday bonus won
            $sundayFunday_wins = \VanguardLTE\Statistic::where('title', '=', 'SF')
                            ->where('user_id', '=', $user->id)
                            ->where('created_at', '>=', $date)
                            ->orderBy('id', 'desc')
                            ->get();
            $res['sunday_funday'] = [];
            foreach($sundayFunday_wins as $sunday)
            {
                $res['sunday_funday'][] = ['name' => 'sunday_funday', 'win' => $sunday->sum, 'date' => $sunday->created_at];                
            }            
            // $res['jackpots'][] = ['name' => 'Platinum', 'win' => 1846.27, 'date' => Carbon::now()->format('Y-m-d H:i:s')];
            // $res['cashback'][] = ['name' => 'cashback', 'win' => 12.5, 'date' => Carbon::now()->format('Y-m-d H:i:s')];

            //$balance = $this->GetBalance();
            /*$res = [
                'status' => 'success', 
                'content' => [], 
                'i' => 1
            ];*/

            return json_encode($res);
        }

        public function getReward(\Illuminate\Http\Request $request)
        {
            $data = $request->all();            
            $user = auth()->user();
            $user = \VanguardLTE\User::Find($user->id);
            
            if($user == null)
            {
                return json_encode(['result'=>'failure', 'message'=>'invalid authroization']);
            }
            else
            {
                if($user->reward_base == 0)
                {
                    return json_encode(['result'=>'failure', 'message'=>'no bonus']);
                }

                $rand_percents = [];
                while(count($rand_percents) < 5)
                {
                    $percent = 10 * rand(1, 7);
                    if(!in_array($percent,$rand_percents))
                        $rand_percents[] = $percent;
                }
                
                $pick = $data['pick'];
                if($pick > 4)
                    $pick = rand(0, 4);
                $rand_percents[$pick] = 10 * rand(1,3);
                $percent = $rand_percents[$pick];
                $available_win = [0,0,0,0,0];
                for($i = 0; $i < 5; $i++)
                    $available_win[$i] = (int)($user->reward_base * $rand_percents[$i] / 100);
                $reward_bonus = (int)($user->reward_base * $percent / 100);
                $user->reward_bonus = $user->reward_bonus + $reward_bonus;
                $user->reward_base = 0;
                $user->save();
                $res = [
                    'status' => 'success',
                    'pick_items' => $available_win,
                    'picked_index' => $pick,
                    'win_amount' => $reward_bonus
                ];
                return json_encode($res);
            }
        } 

        public function sundayFunday(\Illuminate\Http\Request $request)
        {
            $data = $request->all();            
            $user = auth()->user();
            $user = \VanguardLTE\User::Find($user->id);
            
            if($user == null)
            {
                return json_encode(['result'=>'failure', 'message'=>'invalid authroization']);
            }
            else
            {
                // if($user->sunday_funday_allow == 0 && $data['allow'] == 1)
                //     $user->sunday_funday_limit = 500;
                // $user->sunday_funday_allow = $data['allow'];
                // $user->last_sunday_funday = date('Y-m-d H:i:s');                
                // $user->save();
            }
        } 

        
        public function error_license()
        {
            return view('system.pages.error_license');
        }
    }

}

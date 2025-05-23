<?php 
namespace VanguardLTE\Http\Controllers\Web\Frontend
{

    use Illuminate\Support\Facades\Auth;

    include_once(base_path() . '/app/ShopCore.php');
    include_once(base_path() . '/app/ShopGame.php');
    class GamesController extends \VanguardLTE\Http\Controllers\Controller
    {
        public function index(\Illuminate\Http\Request $request, $category1 = '', $category2 = '')
        {
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                Auth::logout();
                return redirect()->route('frontend.auth.login');
            }
            if( !\Illuminate\Support\Facades\Auth::check()) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $categories = [];
            $game_ids = [];
            $cat1 = false;
            $is_game_page = true;
            $title = trans('app.games');
            $body = '';
            $keywords = '';
            $description = '';
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            if( $redirect = $this->check_redirect($request, $category1) ) 
            {
                return $redirect;
            }
            \Illuminate\Support\Facades\Cookie::queue('currentCategory' . (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->id : 0), $category1, 2678400);
            if( $category1 != '' ) 
            {
                // $cat1 = \VanguardLTE\Category::where(['href' => $category1])->first();
                // if( !$cat1 && !in_array($category1, [
                //     'all', 
                //     'my_games', 
                //     'new', 
                //     'hot'
                // ]) ) 
                // {
                //     abort(404);
                // }
                // if( $category2 != '' ) 
                // {
                //     $cat2 = \VanguardLTE\Category::where([
                //         'href' => $category2, 
                //         'parent' => $cat1->id
                //     ])->first();
                //     if( !$cat2 ) 
                //     {
                //         abort(404);
                //     }
                //     $categories[] = $cat2->id;
                // }
                // else if( in_array($category1, [
                //     'all', 
                //     'my_games', 
                //     'new', 
                //     'hot'
                // ]) ) 
                // {
                //     $categories = \VanguardLTE\Category::where(['parent' => 0])->pluck('id')->toArray();
                // }
                // else
                // {
                //     $categories = \VanguardLTE\Category::where(['parent' => $cat1->id])->pluck('id')->toArray();
                //     $categories[] = $cat1->id;
                // }
                // if( $frontend == 'Amatic' ) 
                // {
                //     $Amatic = \VanguardLTE\Category::where(['title' => 'Amatic'])->first();
                //     if( $Amatic ) 
                //     {
                //         $categories = \VanguardLTE\Category::where(['parent' => $Amatic->id])->pluck('id')->toArray();
                //         $categories[] = $Amatic->id;
                //     }
                // }
                // if( $frontend == 'NetEnt' ) 
                // {
                //     $Amatic = \VanguardLTE\Category::where(['title' => 'NetEnt'])->first();
                //     if( $Amatic ) 
                //     {
                //         $categories = \VanguardLTE\Category::where(['parent' => $Amatic->id])->pluck('id')->toArray();
                //         $categories[] = $Amatic->id;
                //     }
                // }
                // if( count($categories) > 0 ) 
                // {
                //     $games = $games->whereRaw('original_id IN (SELECT game_id FROM `w_game_categories` WHERE category_id IN(' . implode(',', $categories) . '))');
                //     if( $category1 == 'my_games' ) 
                //     {
                //         $my_games = \VanguardLTE\Lib\GetHotNewMyGames::get_my_games();
                //         if( count($my_games) ) 
                //         {
                //             $games = $games->whereIn('id', $my_games);
                //         }
                //         else
                //         {
                //             $games = $games->where('id', 0);
                //         }
                //     }
                //     if( $category1 == 'new' ) 
                //     {
                //         $new_games = \VanguardLTE\Lib\GetHotNewMyGames::get_new_games();
                //         if( count($new_games) ) 
                //         {
                //             $games = $games->whereIn('id', $new_games);
                //         }
                //         else
                //         {
                //             $games = $games->where('id', 0);
                //         }
                //     }
                //     if( $category1 == 'hot' ) 
                //     {
                //         $hot_games = \VanguardLTE\Lib\GetHotNewMyGames::get_hot_games();
                //         if( count($hot_games) ) 
                //         {
                //             $games = $games->whereIn('id', $hot_games);
                //         }
                //         else
                //         {
                //             $games = $games->where('id', 0);
                //         }
                //     }
                // }
                // else
                // {
                //     $games = $games->where('id', 0);
                // }
            }
            $detect = new \Detection\MobileDetect();
            $devices = [];
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
                $devices = [
                    0, 
                    2
                ];
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
                $devices = [
                    1, 
                    2
                ];
            }
            if( $shop ) 
            {
                switch( $shop->orderby ) 
                {
                    case 'AZ':
                        $games = $games->orderBy('name', 'ASC');
                        break;
                    case 'Rand':
                        $games = $games->inRandomOrder();
                        break;
                    case 'RTP':
                        $games = $games->orderBy(\DB::raw('CASE WHEN(stat_in > 0) THEN(stat_out*100)/stat_in ELSE 0 END '), 'DESC');
                        break;
                    case 'Count':
                        $games = $games->orderBy('bids', 'DESC');
                        break;
                    case 'Date':
                        $games = $games->orderBy('created_at', 'DESC');
                        break;
                }
            }
            $games_firelink = (clone $games)->where('category_temp', '=', 1)->get();
            $games_fish = (clone $games)->where('category_temp', '=', 2)->get();
            $games_slot = (clone $games)->where('category_temp', '=', 3)->get();
            $games = $games->get();
            $jpgs = \VanguardLTE\JPG::where('shop_id', $shop_id)->get();
            $jpgSum = \VanguardLTE\JPG::where('shop_id', $shop_id)->sum('balance');
            $categories = false;
            $currentSliderNum = -1;
            if( $games ) 
            {
                $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                if( count($cat_ids) ) 
                {
                    $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->get();
                    if( $category1 != '' ) 
                    {
                        foreach( $categories as $index => $cat ) 
                        {
                            if( $cat->href == $category1 ) 
                            {
                                $currentSliderNum = $cat->href;
                                break;
                            }
                        }
                    }
                }
            }
          
            $tournament = \VanguardLTE\Tournament::where('shop_id', $shop_id)->where('start', '<=', \Carbon\Carbon::now())->where('end', '>=', \Carbon\Carbon::now())->orderBy('end', 'ASC')->first();
            if( !$tournament ) 
            {
                $tournament = \VanguardLTE\Tournament::where('shop_id', $shop_id)->where('start', '>=', \Carbon\Carbon::now())->where('end', '>=', \Carbon\Carbon::now())->orderBy('end', 'ASC')->first();
            }
            $user = auth()->user();
            $gameData = [
                'slots' => [],
                'fishes' => [],
                'firelinks' => []
            ];
            $new_games = \VanguardLTE\Lib\GetHotNewMyGames::get_new_games(true);
            $hot_games = \VanguardLTE\Lib\GetHotNewMyGames::get_hot_games(true);

            foreach($games_slot as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'small',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/'
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['slots'][] = $data;
            }

            foreach($games_fish as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'big',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/'
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['fishes'][] = $data;
            }

            foreach($games_firelink as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'big',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/'
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['firelinks'][] = $data;
            }
            $gameDataJson = base64_encode(json_encode($gameData));

            return view('frontend.' . $frontend . '.games.list', compact('games', 'user', 'category1', 'cat1', 'categories', 'currentSliderNum', 'title', 'body', 'keywords', 'description', 'jpgs', 'shop', 'devices', 'tournament', 'is_game_page', 'jpgSum'));
        }

        public function index_hub(\Illuminate\Http\Request $request, \VanguardLTE\Repositories\Session\SessionRepository $sessionRepository)
        {
            $userid = request('username');
            $password = request('password');
            $token = request('token');
            
            $credentials = [
                'username' => $userid, 
                'password' => $password
            ];
            if( !\Auth::validate($credentials) ) 
            {
                return 'invalid account';
            }
            $user = \Auth::getProvider()->retrieveByCredentials($credentials);
            if($user->api_token != $token)
            {
                return 'invalid token';
            }
            \Auth::login($user, true);

            if( settings('reset_authentication') && $user->hasRole('user') && count($sessionRepository->getUserSessions(\Auth::id())) ) 
            {
                foreach( $sessionRepository->getUserSessions($user->id) as $session ) 
                {
                    $sessionRepository->invalidateSession($session->id);
                }
            }
            event(new \VanguardLTE\Events\User\LoggedIn());

            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                return redirect()->route('backend.dashboard');
            }
            if( !\Illuminate\Support\Facades\Auth::check()) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $categories = [];
            $game_ids = [];
            $cat1 = false;
            $is_game_page = true;
            $title = trans('app.games');
            $body = '';
            $keywords = '';
            $description = '';
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            
            \Illuminate\Support\Facades\Cookie::queue('currentCategory' . (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->id : 0), '', 2678400);
            
            $detect = new \Detection\MobileDetect();
            $devices = [];
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
                $devices = [
                    0, 
                    2
                ];
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
                $devices = [
                    1, 
                    2
                ];
            }
            if( $shop ) 
            {
                switch( $shop->orderby ) 
                {
                    case 'AZ':
                        $games = $games->orderBy('name', 'ASC');
                        break;
                    case 'Rand':
                        $games = $games->inRandomOrder();
                        break;
                    case 'RTP':
                        $games = $games->orderBy(\DB::raw('CASE WHEN(stat_in > 0) THEN(stat_out*100)/stat_in ELSE 0 END '), 'DESC');
                        break;
                    case 'Count':
                        $games = $games->orderBy('bids', 'DESC');
                        break;
                    case 'Date':
                        $games = $games->orderBy('created_at', 'DESC');
                        break;
                }
            }
            $games_firelink = (clone $games)->where('category_temp', '=', 1)->get();
            $games_fish = (clone $games)->where('category_temp', '=', 2)->get();
            $games_slot = (clone $games)->where('category_temp', '=', 3)->get();
            $games = $games->get();
            $jpgs = \VanguardLTE\JPG::where('shop_id', $shop_id)->get();
            $jpgSum = \VanguardLTE\JPG::where('shop_id', $shop_id)->sum('balance');
            $categories = false;
            $currentSliderNum = -1;
            if( $games ) 
            {
                $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                if( count($cat_ids) ) 
                {
                    $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->get();                    
                }
            }
          
            $tournament = \VanguardLTE\Tournament::where('shop_id', $shop_id)->where('start', '<=', \Carbon\Carbon::now())->where('end', '>=', \Carbon\Carbon::now())->orderBy('end', 'ASC')->first();
            if( !$tournament ) 
            {
                $tournament = \VanguardLTE\Tournament::where('shop_id', $shop_id)->where('start', '>=', \Carbon\Carbon::now())->where('end', '>=', \Carbon\Carbon::now())->orderBy('end', 'ASC')->first();
            }
            $user = auth()->user();
            $gameData = [
                'slots' => [],
                'fishes' => [],
                'firelinks'
            ];
            $new_games = \VanguardLTE\Lib\GetHotNewMyGames::get_new_games(true);
            $hot_games = \VanguardLTE\Lib\GetHotNewMyGames::get_hot_games(true);

            foreach($games_slot as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'small',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/'
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['slots'][] = $data;
            }

            foreach($games_fish as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'big',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/'
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['fishes'][] = $data;
            }

            foreach($games_firelink as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'small',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/'
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['firelinks'][] = $data;
            }
            $gameDataJson = base64_encode(json_encode($gameData));

            return view('frontend.' . $frontend . '.games.list', compact('games', 'user', 'gameDataJson', 'cat1', 'categories', 'currentSliderNum', 'title', 'body', 'keywords', 'description', 'jpgs', 'shop', 'devices', 'tournament', 'is_game_page', 'jpgSum'));
        }

        public function balanceAdd(\Illuminate\Http\Request $request)
        {
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $category1 = '';
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            if( !$request->summ ) 
            {
                $error = __('app.sum_is_empty');
                if( $redirect = $this->check_redirect($request, '', $error) ) 
                {
                    return $redirect;
                }
            }
            $amount = str_replace(',', '.', trim($request->summ));
            $amount = number_format(floatval($amount), 2, '.', '');
            if( $amount < settings('minimum_payment_amount') ) 
            {
                $error = __('app.minimum_payment_amount') . ' ' . settings('minimum_payment_amount') . ' ' . $shop->currency;
                if( $redirect = $this->check_redirect($request, '', $error) ) 
                {
                    return $redirect;
                }
            }
            if( settings('maximum_payment_amount') < $amount ) 
            {
                $error = __('app.maximum_payment_amount') . ' ' . settings('maximum_payment_amount') . ' ' . $shop->currency;
                if( $redirect = $this->check_redirect($request, '', $error) ) 
                {
                    return $redirect;
                }
            }
            if( $shop->balance < $amount ) 
            {
                $error = trans('app.not_enough_money_in_the_shop', [
                    'name' => $shop->name, 
                    'balance' => $shop->balance
                ]);
                if( $redirect = $this->check_redirect($request, '', $error) ) 
                {
                    return $redirect;
                }
            }
            if( strripos($request->system, 'interkassa') !== false ) 
            {
                if( !settings('payment_interkassa') ) 
                {
                    $error = trans('app.system_is_not_available');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
                if( !\VanguardLTE\Lib\Setting::is_available('interkassa', auth()->user()->shop_id) ) 
                {
                    $error = trans('app.something_went_wrong');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
                $payment = \VanguardLTE\Payment::create([
                    'user_id' => auth()->user()->id, 
                    'sum' => $amount, 
                    'currency' => auth()->user()->shop->currency, 
                    'system' => 'interkassa', 
                    'shop_id' => auth()->user()->shop_id
                ]);
                $form = \VanguardLTE\Lib\Interkassa::get_form(auth()->user()->id, auth()->user()->shop_id, $payment->id, $amount, $request->system);
                if( isset($form['success']) ) 
                {
                    $data = $form['form'];
                    if( is_array($data) ) 
                    {
                        $data['fields'] = $data['parameters'];
                        unset($data['parameters']);
                    }
                    return view('frontend.' . $frontend . '.payment_form', compact('data', 'category1'));
                }
                $error = trans('app.something_went_wrong');
                if( $redirect = $this->check_redirect($request, '', $error) ) 
                {
                    return $redirect;
                }
            }
            if( $request->system == 'coinbase' ) 
            {
                if( !settings('payment_coinbase') ) 
                {
                    $error = trans('app.system_is_not_available');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
                if( !\VanguardLTE\Lib\Setting::is_available('coinbase', auth()->user()->shop_id) ) 
                {
                    $error = trans('app.something_went_wrong');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
                $payment = \VanguardLTE\Payment::create([
                    'user_id' => auth()->user()->id, 
                    'sum' => $amount, 
                    'currency' => auth()->user()->shop->currency, 
                    'system' => 'coinbase', 
                    'shop_id' => auth()->user()->shop_id
                ]);
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'X-CC-Api-Key' => \VanguardLTE\Lib\Setting::get_value('coinbase', 'api_key', auth()->user()->shop_id), 
                    'X-CC-Version' => '2018-03-22'
                ])->post('https://api.commerce.coinbase.com/charges', [
                    'name' => 'Payment ID #' . $payment->id, 
                    'description' => 'Account replenishment for a client #' . auth()->user()->id, 
                    'local_price' => [
                        'amount' => $amount, 
                        'currency' => auth()->user()->shop->currency
                    ], 
                    'pricing_type' => 'fixed_price', 
                    'metadata' => ['payment_id' => $payment->id]
                ]);
                if( isset($response['data']['hosted_url']) ) 
                {
                    return redirect()->to($response['data']['hosted_url']);
                }
                else
                {
                    $error = trans('app.something_went_wrong');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
            }
            if( $request->system == 'btcpayserver' ) 
            {
                if( !settings('payment_btcpayserver') ) 
                {
                    $error = trans('app.system_is_not_available');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
                if( !\VanguardLTE\Lib\Setting::is_available('btcpayserver', auth()->user()->shop_id) ) 
                {
                    $error = trans('app.something_went_wrong');
                    if( $redirect = $this->check_redirect($request, '', $error) ) 
                    {
                        return $redirect;
                    }
                }
                $payment = \VanguardLTE\Payment::create([
                    'user_id' => auth()->user()->id, 
                    'sum' => $amount, 
                    'currency' => auth()->user()->shop->currency, 
                    'system' => 'btcpayserver', 
                    'shop_id' => auth()->user()->shop_id
                ]);
                $data = [
                    'method' => 'POST', 
                    'action' => \VanguardLTE\Lib\Setting::get_value('btcpayserver', 'server', auth()->user()->shop_id) . '/api/v1/invoices', 
                    'charset' => 'UTF-8', 
                    'fields' => [
                        'storeId' => \VanguardLTE\Lib\Setting::get_value('btcpayserver', 'store_id', auth()->user()->shop_id), 
                        'orderId' => $payment->id, 
                        'price' => $amount, 
                        'currency' => auth()->user()->shop->currency, 
                        'checkoutDesc' => 'Account replenishment for a client #' . auth()->user()->id, 
                        'serverIpn' => route('payment.btcpayserver.result'), 
                        'browserRedirect' => route('payment.btcpayserver.redirect')
                    ]
                ];
                return view('frontend.' . $frontend . '.payment_form', compact('data', 'category1'));
            }
            $error = trans('app.something_went_wrong');
            if( $redirect = $this->check_redirect($request, '', $error) ) 
            {
                return $redirect;
            }
        }
        public function check_redirect(\Illuminate\Http\Request $request, $category1, $error = '')
        {
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            if( $category1 == '' ) 
            {
                if( $currentCategory = $request->cookie('currentCategory' . (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->id : 0)) ) 
                {
                    $category = \VanguardLTE\Category::where(['href' => $currentCategory])->first();
                    if( $category ) 
                    {
                        $category1 = $category->href;
                        return $this->do_redirect($request, [
                            'category1' => $category1, 
                            'page' => $request->cookie('currentPage')
                        ], $error);
                    }
                }
                if( settings('use_my_games') && \VanguardLTE\Lib\GetHotNewMyGames::get_my_games(true) ) 
                {
                    return $this->do_redirect($request, [
                        'category1' => 'my_games', 
                        'page' => $request->cookie('currentPage')
                    ], $error);
                }
                if( settings('use_new_categories') && \VanguardLTE\Lib\GetHotNewMyGames::get_new_games(true) ) 
                {
                    return $this->do_redirect($request, [
                        'category1' => 'new', 
                        'page' => $request->cookie('currentPage')
                    ], $error);
                }
                if( settings('use_hot_categories') && \VanguardLTE\Lib\GetHotNewMyGames::get_hot_games(true) ) 
                {
                    return $this->do_redirect($request, [
                        'category1' => 'hot', 
                        'page' => $request->cookie('currentPage')
                    ], $error);
                }
                if( settings('use_all_categories') ) 
                {
                    return $this->do_redirect($request, [
                        'category1' => 'all', 
                        'page' => $request->cookie('currentPage')
                    ], $error);
                }
                $games = \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ]);
                $detect = new \Detection\MobileDetect();
                if( $detect->isMobile() || $detect->isTablet() ) 
                {
                    $games = $games->whereIn('device', [
                        0, 
                        2
                    ]);
                }
                else
                {
                    $games = $games->whereIn('device', [
                        1, 
                        2
                    ]);
                }
                $games = $games->get();
                if( $games ) 
                {
                    $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                        'view' => 1, 
                        'shop_id' => $shop_id
                    ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                    if( count($cat_ids) ) 
                    {
                        $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->first();
                        if( $categories ) 
                        {
                            $category1 = $categories->href;
                            return $this->do_redirect($request, ['category1' => $category1], $error);
                        }
                    }
                }
            }
            return false;
        }
        public function do_redirect(\Illuminate\Http\Request $request, $option, $error)
        {
            $errors = session()->get('errors');
            if( $errors ) 
            {
                $errors = json_decode($errors);
            }
            if( $errors ) 
            {
                return redirect()->route('frontend.game.list.category', $option)->withErrors($errors);
            }
            if( $error ) 
            {
                return redirect()->route('frontend.game.list.category', $option)->withErrors($error);
            }
            $modal = session()->get('modal', false);
            $success = session()->get('success', false);

            $cache = array();
            if( $modal ) {
                $cache['modal'] = $modal;
            }
            if( $success ) {
                $cache['success'] = $success;
            }
            
            return redirect()->route('frontend.game.list.category', $option)->with($cache);
        }
        public function setpage(\Illuminate\Http\Request $request)
        {
            $cookie = cookie('currentPage', $request->page, 2678400);
            return response()->json([
                'success' => true, 
                'page' => $request->page
            ])->cookie($cookie);
        }
        public function search_json(\Illuminate\Http\Request $request)
        {
            if( !\Illuminate\Support\Facades\Auth::check() ) 
            {
                return response()->json([
                    'fail' => true, 
                    'text' => __('app.no_permission')
                ]);
            }
            if( !auth()->user()->hasRole('user') ) 
            {
                return response()->json([
                    'fail' => true, 
                    'text' => __('app.no_permission')
                ]);
            }
            $shop = \VanguardLTE\Shop::find(auth()->user()->shop_id);
            if( !$shop ) 
            {
                return response()->json([
                    'fail' => true, 
                    'text' => __('app.no_permission')
                ]);
            }
            $category1 = (isset($request->category1) ? $request->category1 : '');
            $query = (isset($request->q) ? $request->q : '');
            if( isset($request->search_all_db) && $query != '' ) 
            {
                $category1 = '';
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop->id
            ]);
            $games = $games->where(function($q) use ($query)
            {
                $q->where('name', 'like', '%' . $query . '%')->orWhere('title', 'like', '%' . $query . '%');
            });
            if( $category1 != '' ) 
            {
                if( in_array($category1, [
                    'all', 
                    'my_games', 
                    'new', 
                    'hot'
                ]) ) 
                {
                    $categories = \VanguardLTE\Category::where(['parent' => 0])->pluck('id')->toArray();
                }
                else
                {
                    $cat1 = \VanguardLTE\Category::where(['href' => $category1])->first();
                    if( !$cat1 ) 
                    {
                        return response()->json([
                            'fail' => true, 
                            'text' => __('app.no_results')
                        ]);
                    }
                    $categories = \VanguardLTE\Category::where(['parent' => $cat1->id])->pluck('id')->toArray();
                    $categories[] = $cat1->id;
                }
                if( count($categories) ) 
                {
                    $games = $games->whereRaw('original_id IN (SELECT game_id FROM `w_game_categories` WHERE category_id IN(' . implode(',', $categories) . '))');
                    if( $category1 == 'my_games' ) 
                    {
                        $my_games = \VanguardLTE\Lib\GetHotNewMyGames::get_my_games();
                        if( count($my_games) ) 
                        {
                            $games = $games->whereIn('id', $my_games);
                        }
                        else
                        {
                            $games = $games->where('id', 0);
                        }
                    }
                    if( $category1 == 'new' ) 
                    {
                        $new_games = \VanguardLTE\Lib\GetHotNewMyGames::get_new_games();
                        if( count($new_games) ) 
                        {
                            $games = $games->whereIn('id', $new_games);
                        }
                        else
                        {
                            $games = $games->where('id', 0);
                        }
                    }
                    if( $category1 == 'hot' ) 
                    {
                        $hot_games = \VanguardLTE\Lib\GetHotNewMyGames::get_hot_games();
                        if( count($hot_games) ) 
                        {
                            $games = $games->whereIn('id', $hot_games);
                        }
                        else
                        {
                            $games = $games->where('id', 0);
                        }
                    }
                }
                else
                {
                    $games = $games->where('id', 0);
                }
            }
            $detect = new \Detection\MobileDetect();
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
            }
            switch( $shop->orderby ) 
            {
                case 'AZ':
                    $games = $games->orderBy('name', 'ASC');
                    break;
                case 'Rand':
                    $games = $games->inRandomOrder();
                    break;
                case 'RTP':
                    $games = $games->orderBy(\DB::raw('CASE WHEN(stat_in > 0) THEN(stat_out*100)/stat_in ELSE 0 END '), 'DESC');
                    break;
                case 'Count':
                    $games = $games->orderBy('bids', 'DESC');
                    break;
                case 'Date':
                    $games = $games->orderBy('created_at', 'DESC');
                    break;
            }
            $games = $games->get();
            $returns = [];
            if( count($games) ) 
            {
                foreach( $games as $game ) 
                {
                    $array = [
                        'name' => $game->name, 
                        'title' => $game->title, 
                        'is_new' => $game->is_new(), 
                        'is_hot' => $game->is_hot(), 
                        'label' => mb_strtoupper($game->label), 
                        'icon' => ($game->name ? '/frontend/' . $shop->frontend . '/ico/' . $game->name . '.jpg' : ''), 
                        'link' => route('frontend.game.go', $game->name), 
                        'tournaments' => ($game->tournaments->filter(function($tournament)
                        {
                            return \Carbon\Carbon::now()->diffInSeconds(\Carbon\Carbon::parse($tournament->tournament->start), false) <= 0 && \Carbon\Carbon::now()->diffInSeconds(\Carbon\Carbon::parse($tournament->tournament->end), false) >= 0;
                        })->count() ? true : false)
                    ];
                    if( $game->jackpot ) 
                    {
                        $array['jackpot'] = [
                            'balance' => number_format($game->jackpot->balance, 2, '.', ''), 
                            'currency' => $shop->currency
                        ];
                    }
                    $returns[] = $array;
                }
            }
            return response()->json([
                'success' => true, 
                'data' => $returns
            ]);
        }
        public function search(\Illuminate\Http\Request $request)
        {
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                return redirect()->route('backend.dashboard');
            }
            if( !\Illuminate\Support\Facades\Auth::check() ) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $categories = [];
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $category1 = (isset($request->category1) ? $request->category1 : '');
            $category2 = (isset($request->category2) ? $request->category2 : '');
            $query = (isset($request->q) ? $request->q : '');
            if( $query != '' ) 
            {
                $category1 = '';
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $games = $games->where(function($q) use ($query)
            {
                $q->where('name', 'like', '%' . $query . '%')->orWhere('title', 'like', '%' . $query . '%');
            });
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            if( $redirect = $this->check_redirect($request, $category1) ) 
            {
            }
            \Illuminate\Support\Facades\Cookie::queue('currentCategory' . auth()->user()->id, $category1, 2678400);
            if( $category1 != '' ) 
            {
                $cat1 = \VanguardLTE\Category::where(['href' => $category1])->first();
                if( !$cat1 && !in_array($category1, [
                    'all', 
                    'my_games', 
                    'new', 
                    'hot'
                ]) ) 
                {
                    abort(404);
                }
                if( $category2 != '' ) 
                {
                    $cat2 = \VanguardLTE\Category::where([
                        'href' => $category2, 
                        'parent' => $cat1->id
                    ])->first();
                    if( !$cat2 ) 
                    {
                        abort(404);
                    }
                    $categories[] = $cat2->id;
                }
                else if( in_array($category1, [
                    'all', 
                    'my_games', 
                    'new', 
                    'hot'
                ]) ) 
                {
                    $categories = \VanguardLTE\Category::where(['parent' => 0])->pluck('id')->toArray();
                }
                else
                {
                    $categories = \VanguardLTE\Category::where(['parent' => $cat1->id])->pluck('id')->toArray();
                    $categories[] = $cat1->id;
                }
                if( $frontend == 'Amatic' ) 
                {
                    $Amatic = \VanguardLTE\Category::where(['title' => 'Amatic'])->first();
                    if( $Amatic ) 
                    {
                        $categories = \VanguardLTE\Category::where(['parent' => $Amatic->id])->pluck('id')->toArray();
                        $categories[] = $Amatic->id;
                    }
                }
                if( $frontend == 'NetEnt' ) 
                {
                    $Amatic = \VanguardLTE\Category::where(['title' => 'NetEnt'])->first();
                    if( $Amatic ) 
                    {
                        $categories = \VanguardLTE\Category::where(['parent' => $Amatic->id])->pluck('id')->toArray();
                        $categories[] = $Amatic->id;
                    }
                }
                if( count($categories) > 0 ) 
                {
                    $games = $games->whereRaw('original_id IN (SELECT game_id FROM `w_game_categories` WHERE category_id IN(' . implode(',', $categories) . '))');
                    if( $category1 == 'my_games' ) 
                    {
                        $my_games = \VanguardLTE\Lib\GetHotNewMyGames::get_my_games();
                        if( count($my_games) ) 
                        {
                            $games = $games->whereIn('id', $my_games);
                        }
                        else
                        {
                            $games = $games->where('id', 0);
                        }
                    }
                    if( $category1 == 'new' ) 
                    {
                        $new_games = \VanguardLTE\Lib\GetHotNewMyGames::get_new_games();
                        if( count($new_games) ) 
                        {
                            $games = $games->whereIn('id', $new_games);
                        }
                        else
                        {
                            $games = $games->where('id', 0);
                        }
                    }
                    if( $category1 == 'hot' ) 
                    {
                        $hot_games = \VanguardLTE\Lib\GetHotNewMyGames::get_hot_games();
                        if( count($hot_games) ) 
                        {
                            $games = $games->whereIn('id', $hot_games);
                        }
                        else
                        {
                            $games = $games->where('id', 0);
                        }
                    }
                }
                else
                {
                    $games = $games->where('id', 0);
                }
            }
            $detect = new \Detection\MobileDetect();
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $games = $games->get();
            $returns = '';
            $currency = (auth()->user()->present()->shop ? auth()->user()->present()->shop->currency : '');
            if( count($games) ) 
            {
                foreach( $games as $game ) 
                {
                    $returns .= view('frontend.Default.partials.game', compact('game', 'currency'));
                }
            }
            return json_encode([
                'success' => true, 
                'data' => $returns
            ]);
        }

        public function directopen(\Illuminate\Http\Request $request, $game, \VanguardLTE\Repositories\Session\SessionRepository $sessionRepository)
	{
		if( \Auth::check() )
            {
                event(new \VanguardLTE\Events\User\LoggedOut());
                \Auth::logout();
            }
            $token = request('token');
            $us = \VanguardLTE\User::where('api_token', '=', $token)->get();
            if( isset($us[0]->id) )
            {
                \Auth::loginUsingId($us[0]->id, true);
                $ref = request()->server('HTTP_REFERER');
                $gameUrl = 'game/' . $game . '?api_exit=' . $ref;
                return redirect()->to($gameUrl);
            }
            exit;
            /*$userid = request('userid');
            if($userid == null)
            {
                return json_encode(array('status' => 'invalid authorization'));
            }*/
            $token = request('token');
            $users = \VanguardLTE\User::where('api_token', '=', $token)->get();
            if( isset($users[0]->id) ) 
            {
            }
            else
            {
                return json_encode(array('status' => 'invalid authorization'));
            }
            //$users = \VanguardLTE\User::where('username', '=', $userid)->get();
            $user = $users[0];
            /*if($user->api_token != $token)
            {
                return json_encode(array('status' => 'invalid authorization'));
            }*/

            // $credentials = [
            //     'username' => request('userid'), 
            //     'password' => request('userid')
            // ];
            // if( !\Auth::validate($credentials) ) 
            // {
            //     return 'invalid account';
            // }
            // $user = \Auth::getProvider()->retrieveByCredentials($credentials);
            \Auth::login($user, true);
            if( settings('reset_authentication') && $user->hasRole('user') && count($sessionRepository->getUserSessions(\Auth::id())) ) 
            {
                foreach( $sessionRepository->getUserSessions($user->id) as $session ) 
                {
                    $sessionRepository->invalidateSession($session->id);
                }
            }
            event(new \VanguardLTE\Events\User\LoggedIn());

            if($user->api_token != $token)
            {
                abort(403);
            }
            $user->save();
            
            $detect = new \Detection\MobileDetect();
            $object = '\VanguardLTE\Games\\' . $game . '\SlotSettings';
            if( !class_exists($object) ) 
            {
                abort(404);
            }
            $game = \VanguardLTE\Game::where([
                'name' => $game, 
                'shop_id' => auth()->user()->shop_id
            ]);
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $game = $game->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $game = $game->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $game = $game->first();
            if( !$game ) 
            {
                return redirect()->route('frontend.game.list');
            }
            if( !$game->view ) 
            {
                return redirect()->route('frontend.game.list');
            }
            $userId = \Illuminate\Support\Facades\Auth::id();
            $slot = new $object($game->name, $userId);
            $is_api = false;
            cookie()->queue(cookie('uid', $userId, 60));
            return view('frontend.games.list.' . $game->name, compact('slot', 'game', 'is_api'));
        }

        public function go(\Illuminate\Http\Request $request, $game, $prego='')
        {
            if($prego == ''){
                if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
                {
                    return redirect()->route('backend.dashboard');
                }
                if( !\Illuminate\Support\Facades\Auth::check() ) 
		{
			$token = $request->get('api_token');
			$us = \VanguardLTE\User::where('api_token', '=', $token)->get();
            		if( isset($us[0]->id) )
            		{
                		\Auth::loginUsingId($us[0]->id, true);
            		}
                    //return redirect()->route('frontend.auth.login');
                }
                $userId = \Illuminate\Support\Facades\Auth::id();
                $request->session()->put('freeUserID', 0);
            }else{
                $freeUser = \Auth::getProvider()->retrieveByCredentials(array('email'=>'demo01@gmail.com'));
                if(!isset($freeUser)){
                    $userId = 1;
                }else{
                    $freeUser->balance = 10000;
                    $freeUser->count_balance = 10000;
                    $freeUser->last_login = new \DateTime("now", new \DateTimeZone("UTC"));
                    $freeUser->session = '';
                    
                    $userId = $freeUser->id;
                }
                \Auth::login($freeUser, false);
                $request->session()->put('freeUserID', $userId);
            }
            
            $detect = new \Detection\MobileDetect();
            $object = '\VanguardLTE\Games\\' . $game . '\SlotSettings';
            if( !class_exists($object) ) 
            {
                abort(404);
            }
            $game = \VanguardLTE\Game::where([
                'name' => $game, 
                'shop_id' => auth()->user()->shop_id
            ]);
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $game = $game->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $game = $game->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $game = $game->first();
            if( !$game ) 
            {
                return redirect()->route('frontend.game.list');
            }
            if( !$game->view ) 
            {
                return redirect()->route('frontend.game.list');
            }
            $slot = new $object($game->name, $userId);
            $is_api = false;
            return view('frontend.games.list.' . $game->name, compact('slot', 'game', 'is_api'));
        }
        
        public function progress()
        {
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                return redirect()->route('backend.dashboard');
            }
            if( !\Illuminate\Support\Facades\Auth::check() ) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $currentSliderNum = -1;
            $category1 = '';
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $detect = new \Detection\MobileDetect();
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $games = $games->get();
            $categories = false;
            if( $games ) 
            {
                $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                if( count($cat_ids) ) 
                {
                    $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->get();
                }
            }
            $progress = false;
            if( $shop && $shop->progress_active ) 
            {
                $progress = \VanguardLTE\Progress::where(['shop_id' => $shop_id])->orderBy('rating')->get();
            }
            else
            {
                return redirect()->route('frontend.game.list');
            }
            return view('frontend.' . settings('frontend') . '.pages.progress', compact('currentSliderNum', 'category1', 'categories', 'progress'));
        }
        public function faq()
        {
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                return redirect()->route('backend.dashboard');
            }
            if( !\Illuminate\Support\Facades\Auth::check() ) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $currentSliderNum = -1;
            $category1 = '';
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $detect = new \Detection\MobileDetect();
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $games = $games->get();
            $categories = false;
            if( $games ) 
            {
                $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                if( count($cat_ids) ) 
                {
                    $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->get();
                }
            }
            $faqs = \VanguardLTE\Faq::orderBy('rank', 'ASC')->get();
            if( !$faqs ) 
            {
                return redirect()->route('frontend.game.list');
            }
            return view('frontend.' . settings('frontend') . '.pages.faq', compact('currentSliderNum', 'category1', 'categories', 'faqs'));
        }
        public function bonuses()
        {
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                return redirect()->route('backend.dashboard');
            }
            if( !\Illuminate\Support\Facades\Auth::check() ) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $shop = \VanguardLTE\Shop::find(auth()->user()->shop_id);
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $currentSliderNum = -1;
            $category1 = '';
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $detect = new \Detection\MobileDetect();
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $games = $games->get();
            $categories = false;
            if( $games ) 
            {
                $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                if( count($cat_ids) ) 
                {
                    $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->get();
                }
            }
            $faqs = \VanguardLTE\Faq::orderBy('rank', 'ASC')->get();
            $bonuses = $shop->getBonusesList();
            if( !$bonuses ) 
            {
                return redirect()->route('frontend.game.list');
            }
            return view('frontend.' . settings('frontend') . '.pages.bonuses', compact('currentSliderNum', 'category1', 'categories', 'bonuses', 'shop'));
        }
        public function bonus_conditions()
        {
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                return redirect()->route('backend.dashboard');
            }
            if( !\Illuminate\Support\Facades\Auth::check() ) 
            {
                return redirect()->route('frontend.auth.login');
            }
            $shop = \VanguardLTE\Shop::find(auth()->user()->shop_id);
            $shop_id = (\Illuminate\Support\Facades\Auth::check() ? auth()->user()->shop_id : 0);
            $shop = \VanguardLTE\Shop::find($shop_id);
            $currentSliderNum = -1;
            $category1 = '';
            $frontend = settings('frontend');
            if( $shop_id && $shop ) 
            {
                $frontend = $shop->frontend;
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $shop_id
            ]);
            $detect = new \Detection\MobileDetect();
            if( $detect->isMobile() || $detect->isTablet() ) 
            {
                $games = $games->whereIn('device', [
                    0, 
                    2
                ]);
            }
            else
            {
                $games = $games->whereIn('device', [
                    1, 
                    2
                ]);
            }
            $games = $games->get();
            $categories = false;
            if( $games ) 
            {
                $cat_ids = \VanguardLTE\GameCategory::whereIn('game_id', \VanguardLTE\Game::where([
                    'view' => 1, 
                    'shop_id' => $shop_id
                ])->pluck('original_id'))->groupBy('category_id')->pluck('category_id');
                if( count($cat_ids) ) 
                {
                    $categories = \VanguardLTE\Category::whereIn('id', $cat_ids)->orderBy('position', 'ASC')->get();
                }
            }
            $bonuses = $shop->getBonusesList();
            if( !$bonuses ) 
            {
                return redirect()->route('frontend.game.list');
            }
            return view('frontend.' . settings('frontend') . '.pages.bonus_conditions', compact('currentSliderNum', 'category1', 'categories', 'shop', 'bonuses'));
        }
        public function server(\Illuminate\Http\Request $request, $game)
        {
            $userId = request()->cookie('uid');
            if( \Illuminate\Support\Facades\Auth::check() && !auth()->user()->hasRole('user') ) 
            {
                echo '{"responseEvent":"error","responseType":"start","serverResponse":"Wrong User"}';
                exit();
            }
            if( !\Illuminate\Support\Facades\Auth::check() && !$userId) 
            {
                echo '{"responseEvent":"error","responseType":"start","serverResponse":"User not Authorized"}';
                exit();
            }
            // $subssession = \VanguardLTE\Subsession::where([
            //     'subsession' => $request->sessionId, 
            //     'user_id' => auth()->user()->id
            // ])->orderBy('created_at', 'desc')->first();
            // if( settings('check_active_tab') ) 
            // {
            //     if( !$request->sessionId ) 
            //     {
            //         echo '{"responseEvent":"error","responseType":"start","serverResponse":"Wrong sessionId"}';
            //         exit();
            //     }
                // if( $subssession && !$subssession->active ) 
                // {
                //     echo '{"responseEvent":"error","responseType":"error","serverResponse":"Wrong sessionId"}';
                //     exit();
                // }
            // }
            // if( !$subssession ) 
            // {
            //     $subssession = \VanguardLTE\Subsession::create([
            //         'subsession' => $request->sessionId, 
            //         'user_id' => auth()->user()->id
            //     ]);
            // }
            // \VanguardLTE\Subsession::where('id', '!=', $subssession->id)->where('user_id', auth()->user()->id)->update(['active' => 0]);
            $object = '\VanguardLTE\Games\\' . $game . '\Server';
            $server = new $object();
            if(substr($game, -3, 3) == 'YGG')
            {
                $ret = $server->get($request, $game);
                $ret = json_decode($ret, true);
                return response()->json($ret);
            }
            else
            {
                return $server->get($request, $game);
            }
        }
        public function subsession(\Illuminate\Http\Request $request)
        {
            $sessionId = (isset($request->sessionId) ? $request->sessionId : 0);
            $subssession = \VanguardLTE\Subsession::where([
                'user_id' => auth()->user()->id, 
                'subsession' => $sessionId
            ])->orderBy('created_at', 'desc')->first();
            if( $subssession && $subssession->active ) 
            {
                return json_encode(['status' => 1]);
            }
            return json_encode(['status' => 0]);
        }

        public function list()
        {
            $user = auth()->user();
            $gameData = [
                'slots' => [],
                'fishes' => [],
                'firelinks' => []
            ];
            if($user == null)
            {
                return json_encode($gameData);
            }
            $games = \VanguardLTE\Game::where([
                'view' => 1, 
                'shop_id' => $user->shop_id
            ])->orderBy('created_at','desc');
            $games_firelink = (clone $games)->where('category_temp', '=', 1)->get();
            $games_fish = (clone $games)->where('category_temp', '=', 2)->get();
            $games_slot = (clone $games)->where('category_temp', '=', 3)->get();            

            foreach($games_slot as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'small',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/',
                    'orientation' => $game->orientation
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['slots'][] = $data;
            }

            foreach($games_fish as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'big',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/',
                    'orientation' => $game->orientation
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['fishes'][] = $data;
            }

            foreach($games_firelink as $game)
            {
                $data = [
                    'id' => $game->id, 
                    'src' => '/frontend/Default/ico/'. $game->name .'.png',
                    'size' => 'big',
                    'tag' => '',
                    'url' => '/game/'.$game->name.'?api_exit=/',
                    'orientation' => $game->orientation
                ];
                if($game->tag == 1)
                    $data['tag'] = 'hot';
                else if($game->tag == 2)
                    $data['tag'] = 'new';
                $gameData['firelinks'][] = $data;
            }
            return json_encode($gameData);
        }
    }

}

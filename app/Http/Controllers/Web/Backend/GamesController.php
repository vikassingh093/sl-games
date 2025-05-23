<?php 
namespace VanguardLTE\Http\Controllers\Web\Backend
{

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\DB;
    use VanguardLTE\Game;
    use VanguardLTE\GameWinSetting;    

    include_once(base_path() . '/app/ShopCore.php');
    include_once(base_path() . '/app/ShopGame.php');
    class GamesController extends \VanguardLTE\Http\Controllers\Controller
    {
        public function __construct()
        {
            $this->middleware([
                'auth',                 
            ]);
            $this->middleware('permission:access.admin.panel');
            $this->middleware('permission:games.manage');
            // $this->middleware('shopzero');
        }
        public function index(\Illuminate\Http\Request $request)
        {
            $views = [
                '' => 'All', 
                'Active', 
                '0' => 'Disabled'
            ];
            $devices = [
                '' => 'All', 
                '2' => 'Mobile + Desktop', 
                '0' => 'Mobile', 
                '1' => 'Desktop'
            ];
            $order = [
                '' => '---', 
                'low' => 'Low', 
                'high' => 'High'
            ];
            $categories = \VanguardLTE\Category::where(['parent' => 0])->get();
            $games = \VanguardLTE\Game::select('games.*')->where('shop_id', auth()->user()->shop_id);
            if( $request->order ) 
            {
                switch( $request->order ) 
                {
                    case 'low':
                        $games = $games->orderBy(DB::raw('stat_in - stat_out'), 'ASC');
                        break;
                    case 'high':
                        $games = $games->orderBy(DB::raw('`stat_in` - `stat_out`'), 'DESC');
                        break;
                    default:
                        $games = $games->orderBy('name', 'ASC');
                }
            }
            else
            {
                $games = $games->orderBy('name', 'ASC');
            }
            $savedCategory = ($request->session()->exists('games_category') ? explode(',', $request->session()->get('games_category')) : []);
            if( (count($request->all()) || isset($request->category)) && $request->session()->get('games_category') != $request->category ) 
            {
                if( isset($request->category) ) 
                {
                    $savedCategory = $request->category;
                    $request->session()->put('games_category', implode(',', $request->category));
                }
                else
                {
                    $savedCategory = [];
                    $request->session()->forget('games_category');
                }
            }
            if( isset($request->clear) ) 
            {
                $request->session()->forget('games_category');
            }
            if( $request->search != '' ) 
            {
                $search = $request->search;
                $games = $games->where(function($q) use ($search)
                {
                    $q->where('title', 'like', '%' . $search . '%')->orWhere('name', 'like', '%' . $search . '%');
                });
            }
            if( $request->view != '' ) 
            {
                $games = $games->where('view', $request->view);
            }
            if( $request->device != '' ) 
            {
                $games = $games->where('device', $request->device);
            }
            if( $request->gamebank != '' ) 
            {
                $games = $games->where('gamebank', $request->gamebank);
            }
            if( $request->label != '' ) 
            {
                $games = $games->where('label', $request->label);
            }
            if( $request->jpg != '' ) 
            {
                $games = $games->where('jpg_id', $request->jpg);
            }
            if( $request->denomination != '' ) 
            {
                $games = $games->where('denomination', $request->denomination);
            }
            if( $request->rezerv != '' ) 
            {
                if( $request->rezerv == '1' ) 
                {
                    $games = $games->where('rezerv', '!=', '');
                }
                if( $request->rezerv == '0' ) 
                {
                    $games = $games->where('rezerv', '');
                }
            }
            if( $savedCategory ) 
            {
                $games = $games->join('game_categories', 'game_categories.game_id', '=', 'games.original_id');
                $games = $games->whereIn('game_categories.category_id', $savedCategory);
            }
            $games = $games->get();
            $emptyGame = new \VanguardLTE\Game();
            $stats = [
                'bank' => 0, 
                'in' => 0, 
                'out' => 0, 
                'rtp' => 0, 
                'slots' => \VanguardLTE\GameBank::where('shop_id', auth()->user()->shop_id)->sum('slots'), 
                'little' => \VanguardLTE\GameBank::where('shop_id', auth()->user()->shop_id)->sum('little'), 
                'table_bank' => \VanguardLTE\GameBank::where('shop_id', auth()->user()->shop_id)->sum('table_bank'), 
                'fish' => \VanguardLTE\FishBank::where('shop_id', auth()->user()->shop_id)->sum('fish'), 
                'bonus' => \VanguardLTE\GameBank::where('shop_id', auth()->user()->shop_id)->sum('bonus'), 
                'games' => \VanguardLTE\Game::where([
                    'shop_id' => auth()->user()->shop_id, 
                    'view' => 1
                ])->count(), 
                'disabled' => \VanguardLTE\Game::where([
                    'shop_id' => auth()->user()->shop_id, 
                    'view' => 0
                ])->count()
            ];            
            $allGames = \VanguardLTE\Game::select('games.*')->where('shop_id', auth()->user()->shop_id)->get();
            foreach( $allGames as $game ) 
            {
                $stats['in'] += $game['stat_in'];
                $stats['out'] += $game['stat_out'];
            }
            $stats['bank'] = $stats['slots'] + $stats['little'] + $stats['table_bank'] + $stats['fish'] + $stats['bonus'];
            $percent = (auth()->user()->shop ? auth()->user()->shop->get_percent_label() : 0);
            $stats['rtp'] = ($stats['in'] > 0 ? $stats['out'] / $stats['in'] * 100 : 0);
            $jpgs = \VanguardLTE\JPG::where('shop_id', auth()->user()->shop_id)->pluck('name', 'id')->toArray();
            return view('backend.games.list', compact('games', 'views', 'jpgs', 'devices', 'categories', 'emptyGame', 'stats', 'savedCategory', 'percent', 'order'));
        }
        public function index_json(\Illuminate\Http\Request $request)
        {
            $games = \VanguardLTE\Game::select('games.*')->where('shop_id', auth()->user()->shop_id);
            if( $request->view != '' ) 
            {
                $games = $games->where('view', $request->view);
            }
            if( $request->device != '' ) 
            {
                $games = $games->whereIn('device', (array)$request->device);
            }
            if( $request->categories ) 
            {
                $categories = $request->categories;
                foreach( $categories as $cat ) 
                {
                    $inner = \VanguardLTE\Category::where(['parent' => $cat])->get();
                    if( $inner ) 
                    {
                        $categories = array_merge($categories, $inner->pluck('id')->toArray());
                    }
                }
                $games = $games->join('game_categories', 'game_categories.game_id', '=', 'games.original_id');
                $games = $games->whereIn('game_categories.category_id', (array)$categories);
            }
            return $games->groupBy('name')->get()->pluck('name')->toJson();
        }
        public function views(\Illuminate\Http\Request $request)
        {
            $games = [];
            if( $games = $request->only('checkbox') ) 
            {
                $games = array_keys($games['checkbox']);
            }
            if( !count($games) ) 
            {
                return redirect()->route('backend.game.list')->withErrors([trans('app.games_not_selected')]);
            }
            $games = array_unique($games);
            if( $request->action == 'enable' ) 
            {
                if( !auth()->user()->hasPermission('games.enable') ) 
                {
                    abort(403);
                }
                foreach( $games as $game_id ) 
                {
                    $game = \VanguardLTE\Game::find($game_id);
                    $game->update(['view' => 1]);
                }
            }
            if( $request->action == 'disable' ) 
            {
                if( !auth()->user()->hasPermission('games.disable') ) 
                {
                    abort(403);
                }
                foreach( $games as $game_id ) 
                {
                    $game = \VanguardLTE\Game::find($game_id);
                    $game->update(['view' => 0]);
                }
            }
            return redirect()->route('backend.game.list')->withSuccess(trans('app.games_updated'));
        }
        public function categories(\Illuminate\Http\Request $request)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $games = [];
            if( isset($request->ids) ) 
            {
                $ids = explode(',', $request->ids);
                if( count($ids) ) 
                {
                    $games = $ids;
                }
            }
            if( isset($request->games) ) 
            {
                $temp = explode("\n", $request->games);
                foreach( $temp as $item ) 
                {
                    $game = \VanguardLTE\Game::where([
                        'name' => trim($item), 
                        'shop_id' => auth()->user()->shop_id
                    ])->first();
                    if( $game ) 
                    {
                        $games[] = $game->id;
                    }
                }
            }
            if( !count($games) ) 
            {
                return redirect()->route('backend.game.list')->withErrors([trans('app.games_not_selected')]);
            }
            $games = array_unique($games);
            if( $request->action == 'change_category' ) 
            {
                if( !$request->category || !count($request->category) ) 
                {
                    return redirect()->route('backend.game.list')->withErrors([trans('app.categories_not_selected')]);
                }
                foreach( $games as $game_id ) 
                {
                    $temp = $request->only(['category']);
                    if( count($temp) ) 
                    {
                        foreach( $temp as $key => $item ) 
                        {
                            $data['category_temp'] = implode(',', $item);
                        }
                    }
                    $game = \VanguardLTE\Game::find($game_id);
                    if( isset($data['category_temp']) ) 
                    {
                        $game->update(['category_temp' => $data['category_temp']]);
                    }
                    \VanguardLTE\GameCategory::where('game_id', $game->original_id)->delete();
                    foreach( $request->category as $category ) 
                    {
                        \VanguardLTE\GameCategory::create([
                            'game_id' => $game->original_id, 
                            'category_id' => $category
                        ]);
                    }
                }
            }
            if( $request->action == 'add_category' ) 
            {
                if( !$request->category || !count($request->category) ) 
                {
                    return redirect()->route('backend.game.list')->withErrors([trans('app.categories_not_selected')]);
                }
                foreach( $games as $game_id ) 
                {
                    $game = \VanguardLTE\Game::find($game_id);
                    foreach( $request->category as $category ) 
                    {
                        $exist = \VanguardLTE\GameCategory::where([
                            'game_id' => $game->original_id, 
                            'category_id' => $category
                        ])->count();
                        if( !$exist ) 
                        {
                            \VanguardLTE\GameCategory::create([
                                'game_id' => $game->original_id, 
                                'category_id' => $category
                            ]);
                        }
                    }
                    $game = \VanguardLTE\Game::find($game_id);
                }
            }
            if( $request->action == 'delete_games' && count($games) ) 
            {
                $gameArray = \VanguardLTE\Game::whereIn('id', $games)->get();
                foreach( $gameArray as $game ) 
                {
                    \VanguardLTE\Task::create([
                        'category' => 'game', 
                        'action' => 'delete', 
                        'item_id' => $game->id, 
                        'shop_id' => auth()->user()->shop_id
                    ]);
                    event(new \VanguardLTE\Events\Game\DeleteGame($game));
                    \VanguardLTE\Game::destroy($game->id);
                }
                return redirect()->route('backend.game.list')->withSuccess(trans('app.games_deleted'));
            }
            if( $request->action == 'stay_games' && count($games) ) 
            {
                $count = \VanguardLTE\Game::whereNotIn('id', $games)->where('shop_id', auth()->user()->shop_id)->count();
                $pages = ceil($count / 100);
                for( $i = 0; $i < $pages; $i++ ) 
                {
                    $gameArray = \VanguardLTE\Game::whereNotIn('id', $games)->where('shop_id', auth()->user()->shop_id)->take(100)->get();
                    foreach( $gameArray as $game ) 
                    {
                        \VanguardLTE\Task::create([
                            'category' => 'game', 
                            'action' => 'delete', 
                            'item_id' => $game->id, 
                            'shop_id' => auth()->user()->shop_id
                        ]);
                        \VanguardLTE\Game::destroy($game->id);
                    }
                }
                return redirect()->route('backend.game.list')->withSuccess(trans('app.games_deleted'));
            }
            if( $request->action == 'change_values' ) 
            {
                $fields = [
                    'rezerv', 
                    'cask', 
                    'scaleMode', 
                    'numFloat', 
                    'gamebank', 
                    'slotViewState', 
                    'ReelsMath', 
                    'bet', 
                    'view', 
                    'label', 
                    'denomination', 
                    'jpg_id'
                ];
                $base = [];
                $data = $request->only($fields);
                foreach( $data as $key => $value ) 
                {
                    $value = trim($value);
                    if( strlen($value) ) 
                    {
                        $base[$key] = $value;
                    }
                    if( $key == 'label' && $value == 'clear' ) 
                    {
                        $base[$key] = null;
                    }
                }
                $additional = [];
                $data = $request->only([
                    'line_spin', 
                    'line_spin_bonus', 
                    'line_bonus', 
                    'line_bonus_bonus'
                ]);
                foreach( $data as $key => $value ) 
                {
                    $additional[$key] = $value;
                }
                $shopIds = [auth()->user()->shop_id];
                $gameNames = \VanguardLTE\Game::whereIn('id', $games)->pluck('name')->toArray();
                $jackpotName = false;
                if( isset($base['jpg_id']) ) 
                {
                    $jpg = \VanguardLTE\JPG::find($base['jpg_id']);
                    if( $jpg ) 
                    {
                        $jackpotName = $jpg->name;
                    }
                }
                if( $request->all_shops && auth()->user()->hasRole('admin') && auth()->user()->shop_id == 0 ) 
                {
                    $shopIds = \VanguardLTE\Shop::pluck('id');
                    if( $shopIds ) 
                    {
                        $shopIds = array_merge([0], $shopIds->toArray());
                    }
                }
                foreach( $shopIds as $shopId ) 
                {
                    $ids = \VanguardLTE\Game::whereIn('name', $gameNames)->where('shop_id', $shopId)->pluck('id');
                    if( $ids ) 
                    {
                        $ids = $ids->toArray();
                    }
                    if( count($base) || isset($request->gamebank) ) 
                    {
                        if( $jackpotName ) 
                        {
                            $jpg = \VanguardLTE\JPG::where([
                                'name' => $jackpotName, 
                                'shop_id' => $shopId
                            ])->first();
                            if( $jpg ) 
                            {
                                $base['jpg_id'] = $jpg->id;
                            }
                        }
                        \VanguardLTE\Jobs\UpdateGames::dispatch('game', $ids, $base);
                        $text = '';
                        foreach( $base as $key => $change ) 
                        {
                            $text .= ($key . '=' . $change . ', ');
                        }
                        $text = str_replace('  ', ' ', $text);
                        $text = trim($text, ' ');
                        $text = trim($text, '/');
                        $text = trim($text, ',');
                        \VanguardLTE\Task::create([
                            'category' => 'event', 
                            'action' => 'GameEdited', 
                            'item_id' => implode(',', $ids), 
                            'user_id' => auth()->user()->id, 
                            'details' => $text, 
                            'ip_address' => $request->server('REMOTE_ADDR'), 
                            'user_agent' => substr((string)$request->header('User-Agent'), 0, 500), 
                            'shop_id' => auth()->user()->shop_id
                        ]);
                    }
                    if( count($additional) > 0 ) 
                    {
                        \VanguardLTE\Jobs\UpdateGamesLine::dispatch($ids, $additional);
                    }
                }
            }
            return redirect()->route('backend.game.list')->withSuccess(trans('app.games_updated') . __('app.few_minutes'));
        }
        public function view(\VanguardLTE\User $user, \VanguardLTE\Repositories\Activity\ActivityRepository $activities)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $userActivities = $activities->getLatestActivitiesForUser($user->id, 10);
            return view('backend.user.view', compact('user', 'userActivities'));
        }
        public function create()
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $game = new \VanguardLTE\Game();
            $categories = \VanguardLTE\Category::where(['parent' => 0])->get();
            return view('backend.games.add', compact('categories', 'game'));
        }
        public function store(\Illuminate\Http\Request $request)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $data = $request->all();
            if( !in_array($request->shop_id, auth()->user()->availableShops()) ) 
            {
                abort(404);
            }
            return redirect()->route('backend.game.list')->withSuccess(trans('app.game_created'));
        }
        public function edit($game)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $edit = true;
            $game = \VanguardLTE\Game::where('id', $game)->firstOrFail();
            if( !in_array($game->shop_id, auth()->user()->availableShops()) ) 
            {
                abort(404);
            }
            $game_stat = $game->statistics()->orderBy('date_time', 'DESC')->limit(5)->get();
            $categories = \VanguardLTE\Category::where(['parent' => 0])->get();
            $cats = \VanguardLTE\GameCategory::where('game_id', $game->original_id)->pluck('category_id')->toArray();
            $jpgs = \VanguardLTE\JPG::where('shop_id', auth()->user()->shop_id)->pluck('name', 'id')->toArray();
            $activity = \VanguardLTE\Services\Logging\UserActivity\Activity::where([
                'system' => 'game', 
                'item_id' => $game->id
            ])->take(2)->get();
            return view('backend.games.edit', compact('edit', 'game', 'game_stat', 'categories', 'cats', 'jpgs', 'activity'));
        }
        public function mass(\Illuminate\Http\Request $request)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $request->validate([
                'fishing_rtp' => 'numeric',
                'slot_rtp' => 'numeric'
            ]);
           
            $data = $request->all();
            $fishing_rtp = $data['fishing_rtp'];
            $slot_rtp = $data['slot_rtp'];

            \VanguardLTE\Game::where('category_temp', '=', '2')->update(['rtp' => $fishing_rtp]);
            \VanguardLTE\Game::where('category_temp', '<>', '2')->update(['rtp' => $slot_rtp]);

            return redirect()->route('backend.game.setting')->withSuccess(trans('app.games_are_updated'));
        }
        public function go(\Illuminate\Http\Request $request, $game)
        {
            $userId = \Illuminate\Support\Facades\Auth::id();
            $object = '\VanguardLTE\Games\\' . $game . '\SlotSettings';
            $slot = new $object($game, $userId);
            $game = \VanguardLTE\Game::where('name', $game)->first();
            return view('backend.games.list.' . $game->name, compact('slot', 'game'));
        }
        public function server(\Illuminate\Http\Request $request, $game)
        {
            $object = '\VanguardLTE\Games\\' . $game . '\Server';
            $server = new $object();
            echo $server->get($request, $game);
        }
        public function update($game, \Illuminate\Http\Request $request)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            $request->validate([
                'category' => 'min:0',
                'rtp' => 'min:0'
            ]);
            $fields = [
                'category',
                'tag',
                'rtp'
            ];
            $data = $request->only($fields);
            $data['category_temp'] = $data['category'];            

            $gamesData = false;
            $gameData = \VanguardLTE\Game::find($game);
            if( $gameData ) 
            {
                $gamesData = \VanguardLTE\Game::where(['name' => $gameData->name])->get();
            }
            if( !in_array($gameData->shop_id, auth()->user()->availableShops()) ) 
            {
                abort(403);
            }
            if( $gamesData ) 
            {
                foreach( $gamesData as $item ) 
                {
                    $item->update($data);
                }
            }

            if( isset($request->view) ) 
            {
                $gameData->update(['view' => $request->view]);
            }
            if( isset($request->category) && $gamesData ) 
            {
                foreach( $gamesData as $item ) 
                {
                    \VanguardLTE\GameCategory::where('game_id', $item->original_id)->delete();
                    \VanguardLTE\GameCategory::create([
                        'game_id' => $item->original_id, 
                        'category_id' => $request->category
                    ]);
                }
            }
           
            return '{"result":"Game setting has been updated"}';
        }

        public function clear_games()
        {
            \VanguardLTE\Task::create([
                'category' => 'game', 
                'action' => 'clear', 
                'item_id' => 0, 
                'shop_id' => auth()->user()->shop_id
            ]);
            return redirect()->route('backend.game.list')->withSuccess(trans('app.games_are_cleared'));
        }
        public function delete(\VanguardLTE\Game $game)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            if( !in_array($game->shop_id, auth()->user()->availableShops()) ) 
            {
                abort(404);
            }
            event(new \VanguardLTE\Events\Game\DeleteGame($game));
            \VanguardLTE\Game::destroy($game->id);
            return redirect()->route('backend.game.list')->withSuccess(trans('app.game_deleted'));
        }
        public function security()
        {
        }

        public function get_game_settings()
        {
            if( !auth()->user()->hasRole('admin') )
            {
                abort(403);
            }
            $games = \VanguardLTE\Game::where('shop_id', '=', 0)->orderBy('category_temp')->get();
            $templates = \VanguardLTE\WinSettingTemplate::orderBy('id', 'desc')->get(['id', 'name']);
            return view('backend.games.edit', compact('games', 'templates'));
        }

        public function get_game_win_settings(Game $game)
        {
            if( !auth()->user()->hasRole('admin') )
            {
                abort(403);
            }
            $winsetting = GameWinSetting::where('gameid', '=', $game->id)->get();
            if(count($winsetting) == 0)
            {
                GameWinSetting::create(['gameid' => $game->id, 'gamename' => $game->name]);
                $winsetting = GameWinSetting::where('gameid', '=', $game->id)->get();
            }
            $winsetting = $winsetting[0];
            return view('backend.games.win_setting', compact('winsetting', 'game'));
        }

        public function update_game_win_settings(Request $request)
        {
            if( !auth()->user()->hasRole('admin') )
            {
                abort(403);
            }
            $data = $request->all();
            $setting_id = $data['id'];
            unset($data['_token']);
            unset($data['id']);
            unset($data['game_id']);
            $type = $data['type'];
            unset($data['type']);

            if($type == 0)
            {
                $winsetting = GameWinSetting::where('id', '=', $setting_id);
                $winsetting->update($data);   
    
                //update current redis values
                $gamewin_setting_key = "game_winsetting_" . $winsetting->get()[0]->gameid;
                $redis = app()->make('redis');
                $winsetting = $redis->get($gamewin_setting_key);
                if($winsetting != null)
                {
                    $winsetting = json_decode($winsetting, true);
                    foreach($data as $key => $value)
                    {
                        $winsetting[$key] = $value;
                    }
                    $redis->set($gamewin_setting_key, json_encode($winsetting)); 
                }
            }            
            else
            {
                GameWinSetting::where('id','>', 0)->update($data);                
            }
            return '{"result":"success"}';
        }

        public function switch(\VanguardLTE\Game $game)
        {
            if( !auth()->user()->hasRole('admin') ) 
            {
                abort(403);
            }
            if( !in_array($game->shop_id, auth()->user()->availableShops()) ) 
            {
                abort(404);
            }
            
            if($game->view)
                \VanguardLTE\Game::where('original_id', '=', $game->id)->update(['view' => 0]);
            else
                \VanguardLTE\Game::where('original_id', '=', $game->id)->update(['view' => 1]);
            return '{"result":"success"}';
        }

        public function savetemplate(Request $request)
        {
            if( !auth()->user()->hasRole('admin') )
            {
                abort(403);
            }
            if(!$request->validate([
                'name' => 'required',                
            ]))
            {
                return redirect()->route('backend.game.setting')->withError(['Please input template name']);
            }            

            $settings = \VanguardLTE\GameWinSetting::all(['id', 'bsc_min','bsc_max','bsw_min','bsw_max','bbc_min','bbc_max','bbw_min','bbw_max','fc_min','fc_max','fw_min','fw_max','fw_bc_min','fw_bc_max','fw_bw_min','fw_bw_max','gamename','gameid']);
            $data = json_encode($settings->toArray());
            \VanguardLTE\WinSettingTemplate::create(['name' => $request['name'], 'info' => $data]);
            return redirect()->route('backend.game.setting')->withSuccess(['Saved as template']);
        }

        public function loadtemplate(Request $request)
        {
            if( !auth()->user()->hasRole('admin') )
            {
                abort(403);
            }
            $template_id = $request['template'];
            $template = \VanguardLTE\WinSettingTemplate::where('id', '=', $template_id)->get();
            if(count($template) > 0)
            {
                $template = $template[0];
                $info = $template['info'];
                $data = json_decode($info, true);
                foreach($data as $setting)
                {
                    \VanguardLTE\GameWinSetting::where('id', '=', $setting['id'])->update($setting);
                }
                return redirect()->route('backend.game.setting')->withSuccess(['Win Settings loaded from template']);
            }
            else
            {
                return redirect()->route('backend.game.setting')->withError(['Invalid template id']);
            }
        }
    }

}

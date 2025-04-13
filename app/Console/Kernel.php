<?php 
namespace VanguardLTE\Console
{
    class Kernel extends \Illuminate\Foundation\Console\Kernel
    {
        protected $commands = [
            Commands\BetWinLog::class,
            Commands\DeleteLogs::class
        ];

        protected function schedule(\Illuminate\Console\Scheduling\Schedule $schedule)
        {
            
        }

        protected function commands()
        {
            require(base_path('routes/console.php'));

            \Artisan::command('utils:newgame {categoryid} {originalid}', function ($categoryid, $originalid) {
                set_time_limit(0);
                $this->info("Begin adding new game to all shop");
                
                $buffgame = \VanguardLTE\Game::where('id', $originalid)->first();
                if (!$buffgame)
                {
                    $this->error('Can not find original game of new game');
                    return;
                }
                $shop_ids = \VanguardLTE\Shop::all()->pluck('id')->toArray();
                $data = $buffgame->toArray();
                foreach ($shop_ids as $id)
                {
                    if (\VanguardLTE\Game::where(['shop_id'=> $id, 'original_id' => $originalid])->first())
                    {
                        $this->info("Game already exist in " . $id . " shop");
                    }
                    else{
                        $data['shop_id'] = $id;
                        $game = \VanguardLTE\Game::create($data);
                        $cat = \VanguardLTE\Category::where(['shop_id' => $id, 'original_id' => $categoryid])->first();
                        if ($cat){
                            \VanguardLTE\GameCategory::create(['game_id'=>$game->id, 'category_id'=>$cat->id]);
                        }
                    }
                }
                $this->info('End');
            });
        }
    }

}

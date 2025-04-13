<?php

namespace VanguardLTE\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class BetWinLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'utils:betwinlog';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Save bet win log of users everyday';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Started saving bet win log for all users');
        $dateFrom = date("Y-m-d", strtotime("-1 days"));
        $timeFrom = ' 00:00';
        $dateFrom = $dateFrom . $timeFrom; 

        $dateTill = date("Y-m-d", strtotime("-1 days"));
        $timeTill = ' 23:59';
        $dateTill = $dateTill . $timeTill;

        DB::unprepared("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        CREATE TEMPORARY TABLE insert_batch AS select A.*, B.parents, B.parent_id, B.shop_id from (select sum(bet) as bet, sum(win) as win, T.user_id from w_stat_game T
                     inner join w_shops S on T.shop_id = S.id
                     where S.is_demo = 0 and date_time between '".$dateFrom."' and '".$dateTill."' group by user_id) A
                 inner join w_users B on B.id = A.user_id ;
                         
        INSERT INTO w_bet_wins (bet, win, user_id, parents, parent_id, shop_id) SELECT * FROM insert_batch;
        DROP TEMPORARY TABLE insert_batch;");

        $this->info('Finished saving bet win log for all users');
    }
}

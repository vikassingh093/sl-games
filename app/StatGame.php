<?php 
namespace VanguardLTE
{

    use Carbon\Carbon;
    use DateTime;

    class StatGame extends \Illuminate\Database\Eloquent\Model
    {
        protected $table = 'stat_game';
        protected $fillable = [
            'date_time', 
            'user_id', 
            'balance', 
            'bet', 
            'win', 
            'game', 
            'game_name',
            'shop_id', 
            'game_id',
            'category',
            'info'
        ];
        public $timestamps = false;
        public static function boot()
        {
            parent::boot();
        }        
        public function getInGameAttribute($value)
        {
            return number_format($value, 2);
        }
        public function getInJpgAttribute($value)
        {
            return number_format($value, 2);
        }
        public function getInProfitAttribute($value)
        {
            return number_format($value, 2);
        }
        public function user()
        {
            return $this->belongsTo('VanguardLTE\User', 'user_id');
        }
        public function shop()
        {
            return $this->belongsTo('VanguardLTE\Shop');
        }
        public function game_item()
        {
            return $this->hasOne('VanguardLTE\Game', 'name', 'game');
        }
        public function name_ico()
        {
            return explode(' ', $this->game)[0];
        }

        public function getDateTimeAttribute($value)
        {
            // $user = auth()->user();
            // $serverTimezone = (new DateTime())->getTimezone();
            // $userTimezone = \VanguardLTE\TimeZone::find($user->timezone);            
            // $userDatetime = Carbon::parse($value, $serverTimezone)->timezone($userTimezone->value);
            // return $userDatetime->format('m-d-Y H:i:s');
            return Carbon::parse($value)->format('m-d-Y H:i:s');
        }
    }

}

<?php

namespace VanguardLTE\Http\Controllers\Web\Frontend {

	use Mail;
	use VanguardLTE\Mail\UserWithdrawRequest;

	include_once(base_path() . '/app/ShopCore.php');
	include_once(base_path() . '/app/ShopGame.php');
	class ProfileController extends \VanguardLTE\Http\Controllers\Controller
	{
		protected $theUser = null;
		private $users = null;
		public function __construct(\VanguardLTE\Repositories\User\UserRepository $users)
		{
			$this->middleware('auth');
			$this->middleware('session.database', [
				'only' => [
					'sessions',
					'invalidateSession'
				]
			]);
			$this->users = $users;
			$this->middleware(function ($request, $next) {
				$this->theUser = auth()->user();
				return $next($request);
			});
		}
		public function index(\VanguardLTE\Repositories\Role\RoleRepository $rolesRepo)
		{
			$user = $this->theUser;
			$edit = true;
			$roles = $rolesRepo->lists();
			$statuses = \VanguardLTE\Support\Enum\UserStatus::lists();
			return view('frontend.user.profile', compact('user', 'edit', 'roles', 'statuses'));
		}
		public function updateDetails(\VanguardLTE\Http\Requests\User\UpdateProfileDetailsRequest $request)
		{
			$data = array();
			$data['language'] = $request->language;
			$old_password = $request->old_password;
			$password = $request->password;
			if ($old_password != "" && $password != "") {
				if (!\Illuminate\Support\Facades\Hash::check($old_password, auth()->user()->password)) {
					return redirect()->back()->withErrors(trans('passwords.current_password'));
				} else {
					$data['password'] = $request->password;
				}
			}

			$this->users->update($this->theUser->id, $data);
			event(new \VanguardLTE\Events\User\UpdatedProfileDetails());
			// return response()->json(['success' => trans('app.profile_updated_successfully')], 200);
			return redirect()->back()->withSuccess(trans('app.profile_updated_successfully'));
		}
		public function updatePassword(\VanguardLTE\Http\Requests\User\UpdateProfilePasswordRequest $request)
		{
			$old_password = $request->old_password;
			if (!\Illuminate\Support\Facades\Hash::check($old_password, auth()->user()->password)) {
				return response()->json(['error' => trans('passwords.current_password')], 422);
			}
			$this->users->update($this->theUser->id, $request->only('password', 'password_confirmation'));
			event(new \VanguardLTE\Events\User\UpdatedProfileDetails());
			return response()->json(['success' => trans('app.profile_updated_successfully')], 200);
		}
		public function updateAvatar(\Illuminate\Http\Request $request, \VanguardLTE\Services\Upload\UserAvatarManager $avatarManager)
		{
			$this->validate($request, ['avatar' => 'image']);
			$name = $avatarManager->uploadAndCropAvatar($this->theUser, $request->file('avatar'), $request->get('points'));
			if ($name) {
				return $this->handleAvatarUpdate($name);
			}
			return redirect()->route('frontend.profile')->withErrors(trans('app.avatar_not_changed'));
		}
		private function handleAvatarUpdate($avatar)
		{
			$this->users->update($this->theUser->id, ['avatar' => $avatar]);
			event(new \VanguardLTE\Events\User\ChangedAvatar());
			return redirect()->route('frontend.profile')->withSuccess(trans('app.avatar_changed'));
		}
		public function updateAvatarExternal(\Illuminate\Http\Request $request, \VanguardLTE\Services\Upload\UserAvatarManager $avatarManager)
		{
			$avatarManager->deleteAvatarIfUploaded($this->theUser);
			return $this->handleAvatarUpdate($request->get('url'));
		}
		public function updateLoginDetails(\VanguardLTE\Http\Requests\User\UpdateProfileLoginDetailsRequest $request)
		{
			$data = $request->except('role', 'status');
			if (trim($data['password']) == '') {
				unset($data['password']);
				unset($data['password_confirmation']);
			}
			$this->users->update($this->theUser->id, $data);
			return redirect()->route('frontend.profile')->withSuccess(trans('app.login_updated'));
		}
		public function exchange(\Illuminate\Http\Request $request)
		{
			$user = auth()->user();
			$shop = \VanguardLTE\Shop::find($user->shop_id);
			$exchange_rate = $user->point()->exchange_rate(true);
			$add = $request->sumpoints * $exchange_rate;
			$wager = $add * $user->point()->exchange_wager();
			if (!$shop) {
				return response()->json(['error' => trans('app.wrong_shop')], 422);
			}
			if (!$request->sumpoints) {
				return response()->json(['error' => trans('app.zero_points')], 422);
			}
			if ($user->points < $request->sumpoints) {
				return response()->json(['error' => trans('app.available_points', ['points' => $user->points])], 422);
			}
			if ($shop->balance < $add) {
				return response()->json(['error' => 'Not Money "' . $shop->name . '"'], 422);
			}
			$open_shift = \VanguardLTE\OpenShift::where([
				'shop_id' => auth()->user()->shop_id,
				'end_date' => null
			])->first();
			if (!$open_shift) {
				return response()->json(['error' => trans('app.shift_not_opened')], 422);
			}
			$user->decrement('points', $request->sumpoints);
			$user->increment('balance', $add);
			$user->increment('wager', $wager);
			$user->increment('bonus', $wager);
			$shop->decrement('balance', $add);
			$open_shift->increment('balance_out', $add);
			\VanguardLTE\Statistic::create([
				'user_id' => $user->id,
				'type' => 'add',
				'sum' => abs($add),
				'title' => 'Exchange points',
				'shop_id' => $user->shop_id
			]);
			return response()->json(['success' => true], 200);
		}
		public function activity(\VanguardLTE\Repositories\Activity\ActivityRepository $activitiesRepo, \Illuminate\Http\Request $request)
		{
			$user = $this->theUser;
			$activities = $activitiesRepo->paginateActivitiesForUser($user->id, $perPage = 20, $request->get('search'));
			return view('frontend.activity.index', compact('activities', 'user'));
		}
		public function sessions(\VanguardLTE\Repositories\Session\SessionRepository $sessionRepository)
		{
			$profile = true;
			$user = $this->theUser;
			$sessions = $sessionRepository->getUserSessions($user->id);
			return view('frontend.user.sessions', compact('sessions', 'user', 'profile'));
		}
		public function invalidateSession($session, \VanguardLTE\Repositories\Session\SessionRepository $sessionRepository)
		{
			$sessionRepository->invalidateSession($session->id);
			return redirect()->route('frontend.profile.sessions')->withSuccess(trans('app.session_invalidated'));
		}
		public function balance(\Illuminate\Http\Request $request)
		{
			$user = \VanguardLTE\User::where('id', auth()->user()->id)->first();
			if ($user) {
				$message = \VanguardLTE\Message::where([
					'user_id' => auth()->user()->id,
					'type' => 'reward',
					'status' => 0
				])->first();
				if ($message) {
					$message->update(['status' => 1]);
				}
				return response()->json([
					'currency' => $user->shop->currency,
					'balance' => number_format($user->balance, 2, '.', ''),
					'bonus' => number_format($user->bonus, 2, '.', ''),
					'wager' => number_format($user->wager, 2, '.', ''),
					'count_refund' => number_format($user->count_refund, 2, '.', ''),
					'rating' => $user->badge(),
					'message' => ($message ? $message->value : '')
				]);
			}
			return response()->json([]);
		}
		public function pincode(\Illuminate\Http\Request $request)
		{
			$user = \VanguardLTE\User::find(auth()->user()->id);
			$shop = \VanguardLTE\Shop::find($user->shop_id);
			if (!setting('payment_pin')) {
				return response()->json([
					'fail' => 'fail',
					'error' => 'System is not available'
				], 200);
			}
			if (!$request->pincode) {
				return response()->json([
					'fail' => 'fail',
					'error' => 'Please enter pincode'
				], 200);
			}
			$pincode = \VanguardLTE\Pincode::where([
				'code' => $request->pincode,
				'shop_id' => auth()->user()->shop_id
			])->first();
			if (!$pincode) {
				return response()->json([
					'fail' => 'fail',
					'error' => 'Pincode not exist'
				], 200);
			}
			if (!$pincode->status) {
				return response()->json([
					'fail' => 'fail',
					'error' => 'Wrong Pincode'
				], 200);
			}
			$open_shift = \VanguardLTE\OpenShift::where([
				'shop_id' => auth()->user()->shop_id,
				'end_date' => null
			])->first();
			if (!$open_shift) {
				return response()->json([
					'fail' => 'fail',
					'error' => trans('app.shift_not_opened')
				], 200);
			}
			if ($shop->balance < $pincode->nominal) {
				return response()->json([
					'fail' => 'fail',
					'error' => trans('app.not_enough_money_in_the_shop', [
						'name' => $shop->name,
						'balance' => $shop->balance
					])
				], 200);
			}
			$shop->decrement('balance', $pincode->nominal);
			$open_shift->increment('balance_out', abs($pincode->nominal));
			$open_shift->increment('money_in', abs($pincode->nominal));
			$open_shift->increment('transfers');
			event(new \VanguardLTE\Events\User\MoneyIn($user, $pincode->nominal));
			\VanguardLTE\Statistic::create([
				'user_id' => auth()->user()->id,
				'payeer_id' => auth()->user()->parent_id,
				'sum' => abs($pincode->nominal),
				'type' => 'add',
				'system' => 'pincode',
				'shop_id' => $user->shop_id,
				'item_id' => $pincode->code,
				'title' => 'PIN ' . $pincode->code
			]);
			$user->update([
				'balance' => $user->balance + $pincode->nominal,
				'count_balance' => $user->count_balance + $pincode->nominal,
				'count_refund' => $user->count_refund + \VanguardLTE\Lib\Functions::count_refund($pincode->nominal, $user->shop_id),
				'total_in' => $user->total_in + $pincode->nominal
			]);
			$pincode->delete();
			return response()->json([
				'success' => 'success',
				'text' => 'Pincode activated'
			], 200);
		}
		public function phone(\Illuminate\Http\Request $request)
		{
			$phone = preg_replace('/[^0-9]/', '', $request->phone);
			if (!$phone) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.phone_empty')
				], 200);
			}
			$phone = '+' . $phone;
			$inviter = \VanguardLTE\Invite::where(['shop_id' => auth()->user()->shop_id])->first();
			if (!$inviter) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.error')
				], 200);
			}
			if (!$inviter->status) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.error')
				], 200);
			}
			$sms = \VanguardLTE\SMS::where('user_id', auth()->user()->id)->where('status', '!=', 'DELIVERED')->count();
			if ($inviter->max_invites <= $sms) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.max_invites_error', ['max' => $inviter->max_invites])
				], 200);
			}
			$uniq = \VanguardLTE\User::where(['phone' => $phone])->where('id', '!=', auth()->user()->id)->count();
			if ($uniq) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('validation.unique', ['attribute' => 'phone'])
				], 200);
			}
			$code = rand(1111, 9999);
			$sender = new \VanguardLTE\Lib\SMS_sender();
			$return = $sender->send($phone, 'Code: ' . $code);
			if (!isset($return['success'])) {
				return response()->json([
					'fail' => 'fail',
					'text' => $return['message']
				], 200);
			}
			\VanguardLTE\User::find(auth()->user()->id)->update([
				'phone' => $phone,
				'sms_token' => $code
			]);
			\VanguardLTE\SMS::create([
				'user_id' => auth()->user()->id,
				'message' => $code,
				'message_id' => $return['message_id'],
				'shop_id' => auth()->user()->shop_id,
				'status' => 'Sent'
			]);
			if (isset($return['success'])) {
				return response()->json([
					'success' => 'success',
					'text' => __('app.sms_sent')
				], 200);
			}
			return response()->json([
				'fail' => 'fail',
				'text' => trans('app.sms_error')
			], 200);
		}
		public function code(\Illuminate\Http\Request $request)
		{
			$code = preg_replace('/[^0-9]/', '', $request->code);
			if (!$code) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.empty_string')
				], 200);
			}
			$user = \VanguardLTE\User::find(auth()->user()->id);
			if ($code != $user->sms_token) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.wrong_code')
				], 200);
			}
			$user->update([
				'sms_token' => null,
				'phone_verified' => 1
			]);
			return response()->json([
				'success' => 'success',
				'text' => __('app.sms_sent')
			], 200);
		}
		public function sms(\Illuminate\Http\Request $request)
		{
			$phone = preg_replace('/[^0-9]/', '', $request->phone);
			if (!$phone) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.phone_empty')
				], 200);
			}
			$phone = '+' . $phone;
			$inviter = \VanguardLTE\Invite::where(['shop_id' => auth()->user()->shop_id])->first();
			if (!$inviter) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.error')
				], 200);
			}
			if (!$inviter->status) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.error')
				], 200);
			}
			$sms = \VanguardLTE\SMS::where('user_id', auth()->user()->id)->where('status', '!=', 'DELIVERED')->count();
			if ($inviter->max_invites <= $sms) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.max_invites_error', ['max' => $inviter->max_invites])
				], 200);
			}
			$uniq = \VanguardLTE\User::where(['phone' => $phone])->count();
			if ($uniq) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('validation.unique', ['attribute' => 'phone'])
				], 200);
			}
			$username = rand(111111111, 999999999);
			$password = rand(111111111, 999999999);
			foreach ([
				'url' => route('frontend.auth.login'),
				'login' => $username,
				'password' => $password
			] as $key => $value) {
				$inviter->message = str_replace(':' . $key, $value, $inviter->message);
			}
			$sender = new \VanguardLTE\Lib\SMS_sender();
			$return = $sender->send($phone, $inviter->message);
			if (!isset($return['success'])) {
				return response()->json([
					'fail' => 'fail',
					'text' => $return['message']
				], 200);
			}
			$user = $this->users->create([
				'phone' => $phone,
				'username' => $username,
				'password' => $password,
				'role_id' => 1,
				'parent_id' => auth()->user()->parent_id,
				'inviter_id' => auth()->user()->id,
				'shop_id' => auth()->user()->shop_id,
				'status' => \VanguardLTE\Support\Enum\UserStatus::UNCONFIRMED
			]);
			$role = \jeremykenedy\LaravelRoles\Models\Role::where('name', '=', 'User')->first();
			$user->attachRole($role);
			\VanguardLTE\ShopUser::create([
				'shop_id' => auth()->user()->shop_id,
				'user_id' => $user->id
			]);
			\VanguardLTE\SMS::create([
				'user_id' => auth()->user()->id,
				'new_user_id' => $user->id,
				'message' => $inviter->message,
				'message_id' => $return['message_id'],
				'shop_id' => auth()->user()->shop_id,
				'status' => 'Sent'
			]);
			\VanguardLTE\Reward::create([
				'user_id' => $user->inviter_id,
				'referral_id' => $user->id,
				'sum' => $inviter->sum,
				'ref_sum' => $inviter->sum_ref,
				'until' => \Carbon\Carbon::now()->addDays($inviter->waiting_time),
				'shop_id' => $inviter->shop_id
			]);
			if (isset($return['success'])) {
				return response()->json([
					'success' => 'success',
					'text' => __('app.sms_sent'),
					'data' => [
						'user_id' => $user,
						'phone' => $user->formatted_phone(),
						'created' => $user->created_at->format(config('app.date_format')),
						'until' => $user->created_at->addDays($inviter->waiting_time)->format(config('app.date_format'))
					]
				], 200);
			}
			return response()->json([
				'fail' => 'fail',
				'text' => trans('app.sms_error')
			], 200);
		}
		public function reward(\Illuminate\Http\Request $request)
		{
			$reward_id = preg_replace('/[^0-9]/', '', $request->reward_id);
			if (!$reward_id) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.empty_string')
				], 200);
			}
			$inviter = \VanguardLTE\Invite::where(['shop_id' => auth()->user()->shop_id])->first();
			if (!$inviter) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.error')
				], 200);
			}
			if (!$inviter->status) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.error')
				], 200);
			}
			$rewards = auth()->user()->rewards();
			if (!count($rewards)) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.empty_string')
				], 200);
			}
			$reward = false;
			foreach ($rewards as $item) {
				if ($item->id == $reward_id) {
					$reward = $item;
				}
			}
			if (!$reward) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.wrong_reward')
				], 200);
			}
			if (!$reward->activated) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.reward_is_not_activated')
				], 200);
			}
			if (\Carbon\Carbon::parse($reward->until)->diffInMicroseconds(\Carbon\Carbon::now(), false) >= 0) {
				return response()->json([
					'fail' => 'fail',
					'text' => __('app.reward_date_is_out')
				], 200);
			}
			$sum = '';
			if (!$reward->user_received) {
				event(new \VanguardLTE\Events\User\MoneyIn($reward->user, $reward->sum));
				$reward->user->addBalance('add', $reward->sum, $reward->user->referral, 0, 'invite');
				$reward->update(['user_received' => 1]);
				\VanguardLTE\Message::create([
					'user_id' => $reward->referral_id,
					'type' => 'reward',
					'value' => $reward->ref_sum
				]);
			}
			if (!$reward->referral_received) {
				event(new \VanguardLTE\Events\User\MoneyIn($reward->referral, $reward->ref_sum));
				$reward->referral->addBalance('add', $reward->ref_sum, $reward->referral->referral, 0, 'invite');
				$reward->update(['referral_received' => 1]);
				\VanguardLTE\Message::create([
					'user_id' => $reward->user_id,
					'type' => 'reward',
					'value' => $reward->sum
				]);
			}
			if ($reward->user_id == auth()->user()->id) {
				$sum = $reward->sum;
			} else {
				$sum = $reward->ref_sum;
			}
			return response()->json([
				'success' => 'success',
				'value' => $sum
			], 200);
		}
		public function refunds(\Illuminate\Http\Request $request)
		{
			$user = \VanguardLTE\User::find(auth()->user()->id);
			$shop = \VanguardLTE\Shop::find($user->shop_id);
			$sum = floatval($user->count_refund);
			$refund = \VanguardLTE\Refund::where('shop_id', $user->shop_id)->first();
			if ($sum) {
				if ($refund && $refund->min_balance < $user->balance) {
					return response()->json([
						'fail' => 'fail',
						'value' => 0,
						'balance' => $user->balance,
						'text' => 'Min Balance "' . $refund->min_balance . '"'
					], 200);
				}
				if ($shop->balance < $sum) {
					return response()->json([
						'fail' => 'fail',
						'value' => 0,
						'balance' => $user->balance,
						'text' => 'Not Money "' . $shop->name . '"'
					], 200);
				}
				$open_shift = \VanguardLTE\OpenShift::where([
					'shop_id' => auth()->user()->shop_id,
					'end_date' => null
				])->first();
				if (!$open_shift) {
					return response()->json([
						'fail' => 'fail',
						'value' => 0,
						'balance' => $user->balance,
						'text' => trans('app.shift_not_opened')
					], 200);
				}
				$user->increment('balance', $sum);
				$user->increment('count_bonus', $sum);
				$user->update(['count_refund' => 0]);
				\VanguardLTE\Statistic::create([
					'user_id' => $user->id,
					'type' => 'add',
					'payeer_id' => $user->parent_id,
					'sum' => abs($sum),
					'system' => 'refund',
					'shop_id' => $user->shop_id,
					'title' => 'Refund ' . $refund->percent . '%'
				]);
				event(new \VanguardLTE\Events\User\MoneyIn($user, $sum));
				$open_shift->increment('balance_out', $sum);
				return response()->json([
					'success' => 'success',
					'value' => number_format($sum, 2, '.', ''),
					'balance' => number_format($user->balance, 2, '.', ''),
					'count_refund' => number_format($user->count_refund, 2, '.', ''),
					'currency' => $shop->currency
				], 200);
			}
			return response()->json([
				'success' => 'success',
				'value' => 0,
				'balance' => number_format($user->balance, 2, '.', ''),
				'currency' => $shop->currency
			], 200);
		}
		public function jackpots(\Illuminate\Http\Request $request)
		{
			$jackpots = \VanguardLTE\JPG::select([
				'id',
				'balance',
				'shop_id'
			])->where('shop_id', auth()->user()->shop_id)->get();
			return response()->json($jackpots->toArray());
		}
		public function setlang($lang)
		{
			auth()->user()->update(['language' => $lang]);
			return redirect()->back();
		}
		public function agree()
		{
			auth()->user()->update(['agreed' => 1]);
			return redirect()->back();
		}
		public function success(\Illuminate\Http\Request $request)
		{
			return redirect()->route('frontend.profile.balance')->withSuccess(trans('app.payment_success'));
		}
		public function fail(\Illuminate\Http\Request $request)
		{
			return redirect()->route('frontend.profile.balance')->withSuccess(trans('app.payment_fail'));
		}

		public function withdraw(\VanguardLTE\Http\Requests\User\WithdrawRequest $request)
		{
			$txtamount = $request->txtamount;
			$txtcurrency = $request->txtcurrency;
			$details = [
				'username' => auth()->user()->username,
				'email' => auth()->user()->email,
				'amount' => $txtamount,
				'currency' => $txtcurrency,
			];			
			
			Mail::to(env('APP_EMAIL'))->send(new UserWithdrawRequest($details));
			event(new \VanguardLTE\Events\User\UpdatedProfileDetails());
			return redirect()->back()->withSuccess(trans('app.user_withdrawal_request_submitted'));
		}
	}
}

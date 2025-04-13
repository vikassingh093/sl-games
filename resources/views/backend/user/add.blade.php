@extends('backend.layouts.app')

@section('page-title', trans('app.add_user'))
@section('page-heading', trans('app.create_new_user'))

@section('content')

    <section class="content-header">
        @include('backend.partials.messages')
    </section>
    <section class="content">
        @if( Auth::user()->hasRole('agent') || Auth::user()->hasRole('admin') )
        <div id="main-content" class="for-print">
            <form class="form-horizontal" id="yw0" action="{{ route('backend.user.create') }}" method="post">
                @csrf
                <input type="hidden" name="role_id" value="{{auth()->user()->role_id}}">
                <ul id="settings-tabs" class="nav nav-tabs">
                    <li class="active"><a href="#settings-general" data-toggle="tab">General</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="settings-general">
                        <div class="row-fluid">
                            <fieldset>
                                <legend>Master Fields</legend>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_role" class="required">Account Type <span
                                                class="required">*</span></label> </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[type]" id="Users_role">
                                            <option value="">-- please select --</option>
                                            <option value="agent">Distributor</option>
                                            <option value="manager">Shop</option>
                                        </select>                                        
                                    </div>
                                    
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_login" class="required">Username <span class="required">*</span></label>
                                    </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" autocomplete="off" name="Users[username]" id="Users_login"
                                            type="text" maxlength="32">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_password" class="required">Password <span
                                                class="required">*</span></label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" autocomplete="off" value="" name="Users[password]"
                                            id="Users_password" type="password" maxlength="64">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_password_repeat" class="required">Repeat password <span
                                                class="required">*</span></label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" autocomplete="off" value="" name="Users[password_confirmation]"
                                            id="Users_password_repeat" type="password">
                                    </div>
                                </div>                               
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_status">Status</label> </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[status]" id="Users_status">
                                            <option value="disabled">Disabled</option>
                                            <option value="enabled" selected="selected">Enabled</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_status">RTP</label> </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[rtp]" id="Users_rtp">
                                            @if(Auth::user()->hasRole('admin'))
                                                <option value="70" {{auth()->user()->percent == 70 ? 'selected' : ''}}>70</option>
                                                <option value="80" {{auth()->user()->percent == 80 ? 'selected' : ''}}>80</option>
                                                <option value="87" {{auth()->user()->percent == 87 ? 'selected' : ''}}>87</option>
                                                <option value="90" {{auth()->user()->percent == 90 ? 'selected' : ''}}>90</option>
                                                <option value="95" {{auth()->user()->percent == 95 ? 'selected' : ''}}>95</option>
                                            @else
                                                <option value="{{auth()->user()->percent}}" selected>{{auth()->user()->percent}}</option>
                                            @endif
                                        </select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_balance">Balance</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" autocomplete="off" step="0.01" value="0"
                                            name="Users[balance]" id="Users_balance" type="number">
                                    </div>
                                </div>                                
                                
                                <legend>Contact Details</legend>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_country">Country</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[country]" id="Users_country" type="text"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_city">City</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[city]" id="Users_city" type="text"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_name">Name</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[name]" id="Users_name" type="text"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_email">E-mail</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[email]" id="Users_email" type="text"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_phone">Phone number</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[phone]" id="Users_phone" type="text"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group" style="display: none;">
                                    <label class="control-label">
                                        <label for="Users_percent">Finance</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" placeholder="0.00" name="Users[percent]" id="Users_percent"
                                            type="text" maxlength="6">
                                    </div>
                                </div>
                                <div class="controls">
                                    <input class="btn btn-primary" type="submit" name="yt0" value="Create shop"> <a class="btn"
                                        href="/user">Cancel</a>
                                </div>
                            </fieldset>
                        </div>
                        <script>
                            $('#unlock-login-field').one('click', function (e) {
                                $(this).prop('disabled', true).closest('form').find('#users-login:disabled').prop('disabled', false);
                            });
                            $('#unlock-password-fields').one('click', function (e) {
                                $(this).prop('disabled', true).closest('form').find('input[type="password"]:disabled').prop('disabled', false);
                            });
                            $('.phone-mask1').mask('(999) 999-9999');
                            $('.phone-mask2').mask('(999) 999-9999');
                        </script>
                    </div>
                </div>
            </form>
            <script>
                $(function () {
                    var currentTab = window.localStorage['settings-tab-active-admin'];
                    if (currentTab) {
                        $('#settings-tabs').find('a[href="' + currentTab + '"]').tab('show');
                    }
                    else {
                        $('#settings-tabs').find('a:first').tab('show');
                    }
                });
                $('#settings-tabs').on('click', 'a[data-toggle="tab"]', function (e) {
                    window.localStorage.removeItem('settings-tab-active-admin');
                    window.localStorage.setItem('settings-tab-active-admin', $(this).attr('href'));
                });
            </script>
        </div>
        @endif
    </section>
@stop

@section('scripts')
    {!! JsValidator::formRequest('VanguardLTE\Http\Requests\User\CreateUserRequest', '#user-form') !!}

    <script>

        $("#role_id").change(function (event) {
            var role_id = parseInt($('#role_id').val());
            $("#parent > option").each(function() {
                var id = parseInt($(this).attr('role'));
                if( (id - role_id) != 1 ){
                    $(this).attr('hidden', true);
                } else{
                    $(this).attr('hidden', false);
                }
                $(this).attr('selected', false);
            });
            $('#parent option[value=""]').attr('selected', true);
        });

        $("#role_id").trigger('change');

    </script>
@stop
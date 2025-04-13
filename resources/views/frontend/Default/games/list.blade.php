@extends('frontend.Default.layouts.app')

@section('content')
    <div id="root" balance='{{$user->balance}}' username='{{$user->username}}' type='hub'></div>  
    <video preload="metadata" autoplay playsinline loop muted class="bgvideo" id="bgvideo" poster="/images/black.png">    
        <source src="/images/background/back.mp4" type="video/mp4"></source>
    </video>    
    <script src="{{asset('js/index.js').'?t='.time()}}" defer></script>

    @include('frontend.Default.partials.bonus_popup')
    <!-- @include ('frontend.Default.partials.popups') -->
@endsection

@section('scripts')
<link rel="stylesheet" type="text/css" href="/frontend/Default/css/notification.css" />
    <script type="text/javascript">
        window.page = "hub";
        var mob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        window.localStorage.setItem('game_orientation', 'landscape');
        try
        {
            JSBridge.sendMessageToNative("landscape");    
        }catch(e){}
        try
        {
            window.webkit.messageHandlers.swiftJSBridge.postMessage("landscape");
        }catch(e){}
        
        function showPopup(title, message)
        {
            $('.notification__text').html(message);
            $('.notification__title').html(title);
            $('.notification').css('display', 'block');
        }

        $('#change-pass-change').on('click', ()=>{
            var line1 = $('#change-pass-text-line1').val();
            var line2 = $('#change-pass-text-line2').val();
            var message = '';
            if(line1 == '')
                message = 'Please input new password';
            if(line2 == '')
                message = 'Please input confirm password';
            if(line1 != line2)
                message = 'Password confirm does not match';
            if(line1.length < 6 )
                message = 'Please input more than 6 characters';
            if(message != '')
            {
                showPopup('Error', message);
            }
            else
            {
                $.ajax({
                    url: '/profile/password/updateNew',
                    type: "POST",
                    dataType: 'json',
                    data: {password : line1, password_confirmation: line2,  "_token": "{{ csrf_token() }}",},            
                    success: function (data) {
                        showPopup("Success", data.success);
                    },
                    error: function (data) {
                        showPopup("Error", data.error);
                    }
                });               
            }            
        });

        $('#info-user-add').on("click", function(){
            var tel = $('#info-user-text-tel').val();
            $.ajax({
                url: '/profile/updatePhone',
                type: "POST",
                dataType: 'json',
                data: {phone : tel,  "_token": "{{ csrf_token() }}",},            
                success: function (data) {
                    showPopup("Success", data.success);
                },
                error: function (data) {
                    showPopup("Error", data.error);
                }
            });
        });
        
        function openChange() {
        	const change_popup = document.getElementById("change-pass");
        	if(change_popup) {
                change_popup.classList.remove("hide-settings");
			    change_popup.classList.add("show-settings");
            }
        }
    </script>
	@include('frontend.Default.partials.scripts')

@endsection

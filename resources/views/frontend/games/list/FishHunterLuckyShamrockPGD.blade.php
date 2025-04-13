@extends('frontend.games.layouts.app')
@section('content')
    <iframe id="mainframe" style="overflow:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" ></iframe>
    @include ('frontend.games.partials.popups')
@endsection
@section('scripts')
    <script type="text/javascript">
        if( !sessionStorage.getItem('sessionId') ){
            sessionStorage.setItem('sessionId', parseInt(Math.random() * 1000000));
        }
        $(document).ready(function() {
            var exitUrl = '';
            if (document.location.href.split("api_exit=")[1] != undefined) {
                exitUrl = document.location.href.split("api_exit=")[1].split("&")[0];
            }
            var url = '/games/FishHunterLuckyShamrockPGD/index.html?api_exit=' + exitUrl;
            
            $('#mainframe').attr('src', url);
        });
    </script>
@endsection
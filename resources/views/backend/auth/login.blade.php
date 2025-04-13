<html lang="en" class="">

<head>
    <meta charset="utf-8">
    <title>Admin | Panel</title>
    <meta name="description" content="Admin || GGinc || BackOffice">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="https://netbo.gapi.lol/css/v1/login/animate.css" type="text/css">
    <link rel="stylesheet" href="https://netbo.gapi.lol/css/v1/login/font-awesome.css" type="text/css">
    <link rel="stylesheet" href="https://netbo.gapi.lol/css/v1/login/simple-line-icons.css" type="text/css">
    <link rel="stylesheet" href="https://netbo.gapi.lol/css/v1/login/bootstrap.css" type="text/css">
    <link rel="stylesheet" href="https://netbo.gapi.lol/css/v1/login/font.css" type="text/css">
    <link rel="stylesheet" href="https://netbo.gapi.lol/css/v1/login/app.css" type="text/css">
    <link rel="stylesheet" href="/css/main.css" type="text/css">
</head>

<body style="background-color: #003355;">
    <div class="app app-header-fixed">
        <div class="container w-xxl w-auto-xs">
            <img src="/images/logo.png" style="width: 100%;">
            <div class="m-b-lg">                
                @include('backend.partials.messages')
                <form name="form" method="post" class="form-validation" action="<?= route('backend.auth.login.post') ?>">
                  <input type="hidden" value="<?= csrf_token() ?>" name="_token">
                  <div class="text-danger wrapper text-center" ng-show="authError">
                    </div>
                    <div class="list-group list-group-sm">
                        <div class="list-group-item">
                            <input type="text" placeholder="Username" name="username" class="form-control no-border"
                                required="">
                        </div>
                        <div class="list-group-item">
                            <input type="password" placeholder="Password" name="password" class="form-control no-border"
                                required="">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block">Log in</button>
                    <div class="line line-dashed"></div>
                </form>
            </div>
            <div class="text-center">
                <p>
                    <small class="text-center" style="color: #ffffff;">RiverDragon © 2022</small>
                </p>
            </div>
        </div>
    </div>


</body>

</html>












@section('scripts')
    {!! JsValidator::formRequest('VanguardLTE\Http\Requests\Auth\LoginRequest', '#login-form') !!}
@stop

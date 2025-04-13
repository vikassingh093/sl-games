<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>{{ settings('app_name') }}</title>
    <!-- <meta name="apple-mobile-web-app-capable" content="yes" /> -->
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="description" content="{{ settings('app_name') }}">
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
	<link rel="stylesheet" href="/css/bootstrap.min.css">	    
    <!-- Style css -->
    
    <script src="/frontend/Default/js/jquery-3.5.1.min.js"></script>
    <script src="/frontend/Default/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/jquery.fullscreen-min.js"></script>
</head>

<body class="@yield('add-body-class')" style="padding-left: 100px; padding-right: 100px;">
<style>    

</style>

<!-- MAIN -->
<main class="main">
    @yield('content')
    <!-- Start Fullscreen and orientation code -->   
</main>

<!-- /.MAIN -->
@yield('footer')
@yield('scripts')
</body>
</html>

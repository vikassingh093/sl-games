<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title><?php echo e(settings('app_name')); ?></title>
    <!-- <meta name="apple-mobile-web-app-capable" content="yes" /> -->
	<meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
	<meta name="description" content="<?php echo e(settings('app_name')); ?>">
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
	<link rel="stylesheet" href="/css/bootstrap.min.css">	    
    <!-- Style css -->
    
    <script src="/frontend/Default/js/jquery-3.5.1.min.js"></script>
    <script src="/frontend/Default/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/jquery.fullscreen-min.js"></script>
</head>

<body class="<?php echo $__env->yieldContent('add-body-class'); ?>" style="padding-left: 100px; padding-right: 100px;">
<style>    

</style>

<!-- MAIN -->
<main class="main">
    <?php echo $__env->yieldContent('content'); ?>
    <!-- Start Fullscreen and orientation code -->   
</main>

<!-- /.MAIN -->
<?php echo $__env->yieldContent('footer'); ?>
<?php echo $__env->yieldContent('scripts'); ?>
</body>
</html>
<?php /**PATH /var/www/RiverDragon/resources/views/frontend/Default/layouts/page.blade.php ENDPATH**/ ?>
<?php $__env->startSection('page-title', trans('app.login')); ?>
<?php $__env->startSection('add-main-class', 'main-login'); ?>

<?php $__env->startSection('content'); ?>   
    <div id="root" type='login' token='<?php echo e(csrf_token()); ?>'></div>  
    <video autoplay loop muted class="bgvideo" id="bgvideo">
        <source src="/images/background/back.mp4" type="video/mp4"></source>
    </video> 
    <script src="<?php echo e(asset('js/index.js')); ?>" defer></script>
    <?php if(isset ($errors) && count($errors) > 0): ?>
    
        <div class="notification_bonus popup" style="display: block; z-index:1000">    
            <button class="notification__close"></button>            
            <p class="popup_message">
                <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $error; ?><br>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </p>
        </div>
        <script>
            $(function(){
                var width = $('.notification_bonus').width();
                var height = width * 752 / 1024;
                $('.notification_bonus').css('height', height + 'px');

                width = width * 0.08;
                $('.notification__close').css('height', width + 'px');
            })

            $('.notification__close').on('click', () => {
                $('.popup').css('display', 'none');
            })    
        </script>
    <?php endif; ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
    <link rel="stylesheet" type="text/css" href="/frontend/Default/css/login.css" />
    <link rel="stylesheet" type="text/css" href="/frontend/Default/css/notification.css" />
    <script type="text/javascript">
        $('.notification__close').on('click', () => {
            $('.notification').css('display', 'none');
        })
        
    </script>
  <?php echo JsValidator::formRequest('VanguardLTE\Http\Requests\Auth\LoginRequest', '#login-form'); ?>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('frontend.Default.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/frontend/Default/auth/login.blade.php ENDPATH**/ ?>
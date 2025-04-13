<?php $__env->startSection('content'); ?>
    <iframe id="mainframe" style="overflow:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" ></iframe>
    <?php echo $__env->make('frontend.games.partials.popups', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php $__env->stopSection(); ?>
<?php $__env->startSection('scripts'); ?>
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
<?php $__env->stopSection(); ?>
<?php echo $__env->make('frontend.games.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/slot-games/resources/views/frontend/games/list/FishHunterLuckyShamrockPGD.blade.php ENDPATH**/ ?>
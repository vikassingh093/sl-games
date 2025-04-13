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
            try
            {
                JSBridge.sendMessageToNative("portrait");    
            }catch(e){}
            try
            {
                window.webkit.messageHandlers.swiftJSBridge.postMessage("portrait");
            }catch(e){}
            var url = '/games/OlveraStreet/web-mobile/index.html?_token=<?php echo csrf_token(); ?>';
            
            $('#mainframe').attr('src', url);
            $('.home-btn').css('display', 'none');
        });
        
    </script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('frontend.games.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/slot-games/resources/views/frontend/games/list/OlveraStreet.blade.php ENDPATH**/ ?>
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
            // $('.home-btn').css('right', '10px');
            // $('.home-btn').css('left', 'auto');
            
            
            var isMobile;
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                // true for mobile device                
                isMobile = true;
                try
                {
                    JSBridge.sendMessageToNative("portrait");    
                }catch(e){}
                try
                {
                    window.webkit.messageHandlers.swiftJSBridge.postMessage("portrait");
                }catch(e){}
            }
            else 
            {
                // false for not mobile device
                isMobile = false;
            }
            var url;
            // url = '/games/KenoPop/www.1x2-cloud-1.com/f1x2games/PhoneApp/index.jsp';
            url = '/games/KenoPop1x2/index.html';
            $('#mainframe').attr('src', url);
        });
    </script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('frontend.games.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/slot-games/resources/views/frontend/games/list/KenoPop1x2.blade.php ENDPATH**/ ?>
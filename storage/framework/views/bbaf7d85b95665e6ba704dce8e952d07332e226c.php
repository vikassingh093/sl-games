<?php $__env->startSection('content'); ?>
    <iframe id="mainframe" style="overflow:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" ></iframe>
    <?php echo $__env->make('frontend.games.partials.popups', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php $__env->stopSection(); ?>
<?php $__env->startSection('scripts'); ?>
    <script type="text/javascript">        
        var qstr = '?launcher=true&sfx_500236410=1616417992679&commonVersion=(build%2088)&game=277&userId=003403186056&wshost=&quality=high&lang=en&noframe=yes';
        $(document).ready(function() {
            
            var isMobile;
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                // true for mobile device                
                isMobile = true;
            }
            else 
            {
                // false for not mobile device
                isMobile = false;
            }
            var url;
            if(isMobile)
                url = '/games/MagicDragonsNG/index.html';
            else
                url = '/games/MagicDragonsNG/index.html';
            url += qstr;
            $('#mainframe').attr('src', url);
        });

        if (!sessionStorage.getItem('sessionId')) {
            sessionStorage.setItem('sessionId', parseInt(Math.random() * 1000000));
        }

        var uparts = document.location.href.split("?");
       
        var exitUrl = '';
        if (document.location.href.split("api_exit=")[1] != undefined) {
            exitUrl = document.location.href.split("api_exit=")[1].split("&")[0];
        }
        addEventListener('message', function (ev) {

            if (ev.data == 'CloseGame') {
                var isFramed = false;
                try {
                    isFramed = window != window.top || document != top.document || self.location != top.location;
                } catch (e) {
                    isFramed = true;
                }

                if (isFramed) {
                    window.parent.postMessage('CloseGame', "*");
                }
                document.location.href = exitUrl;
            }
        });
    </script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('frontend.games.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/frontend/games/list/MagicDragonsNG.blade.php ENDPATH**/ ?>
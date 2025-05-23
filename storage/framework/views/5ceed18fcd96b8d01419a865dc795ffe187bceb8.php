<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>
	<section class="content-header">
	<?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
	</section>

	<section class="content">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <div id="main-content" class="for-print">            
        <div id="modal-create" class="modal hide fade" aria-hidden="true" style="display: none;">
            <form id="uploadForm" action="" enctype="multipart/form-data" method="post">
                <?php echo csrf_field(); ?>
                <div class="pt-5 align-items-center">
                    <div class="dot col-4 align-items-center pt-5 pb-5" id="dropzone" style="background-size: contain;">                                                
                        <input type="file" class="form-control-file <?php $__errorArgs = ['image'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" style="display: none" id="image" name="image">    
                    </div>
                    <div class="d-flex">
                        <button type="button" class="btn-link" id="selectImage">Select an image</a>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <input class="btn btn-primary" type="button" value="  Add  " onclick="addPoster()"> 
                    <input class="btn" data-dismiss="modal" aria-hidden="true" type="button" value="Cancel">
                </div>
            </form>
        </div>

        <?php if(auth()->user()->hasRole(['admin'])): ?>
        <div class="row">
            <p>
                <button type="button" class="btn btn-success btn-block" data-toggle="modal" data-target="#modal-create">
                <i class="icon-plus icon-white"></i> Add poster </button>
            </p>
        </div>
        <?php endif; ?>
        <div class="row">
                <?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="column center">
                    <img src="<?php echo e($post->url); ?>" onclick="openGallery(this);">
                    <?php if(auth()->user()->hasRole(['admin'])): ?>
                    <button type="button" class="btn btn-warning" style="margin-top: 2px;"  onclick="deletePost('<?php echo e($post->Id); ?>')">
                        <i class="gg-trash"></i>
                    </button>                    
                    <?php endif; ?>
                    <a href="<?php echo e($post->url); ?>"  class="btn btn-success" style="margin-top: 2px" download>
                        <i class="gg-software-download"></i>                        
                    </a>
                </div>
                
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>

            <!-- The expanding image container -->
            <div class="gallery_container">
            <!-- Close the image -->
            <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>

            <!-- Expanded image -->
            <img id="expandedImg" style="width:100%">

            <!-- Image text -->
            <div id="imgtext"></div>
            </div>
        </div>
	</section>	
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
	<script>
        var form;
        var file;
        
        window.addEventListener('load', function(){
            form = document.getElementById("dropzone");
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
                
                form.addEventListener(event, function (e) {
                    // preventing the unwanted behaviours
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragenter'].forEach(function (event) {
                form.addEventListener(event, function () {
                    form.classList.add('dragover');
                });            

                form.addEventListener('drop', function (e) {
                    var droppedFiles;
                    droppedFiles = e.dataTransfer.files; // the files that were dropped

                    if (droppedFiles.length > 0)
                    {
                        file = droppedFiles[0];
                        $("#image").prop('files', droppedFiles);
                        var reader = new FileReader();
                        reader.onload = (function(f){
                            return function(e) {
                                $(".thumb").remove();
                                var div = '<div class="thumb"  style="width: 100%; height: 100%"> \
                                    <img class="center" src="' + e.target.result + '" title="' + escape(f.name) + '"/> \
                                    <div class="close" style="cursor:pointer">X</div> \
                                </div>';
                                $("#dropzone").append(div);                            
                                $('img').on('load',function(){
                                    var css;
                                    var ratio=$(this).width() / $(this).height();
                                    var pratio=$(this).parent().width() / $(this).parent().height();
                                    if (ratio <= pratio) css={width:'auto', height:'100%'};
                                    else css={width:'100%', height:'auto'};
                                    $(this).css(css);
                                });
                            };
                        })(file);
                        reader.readAsDataURL(file);
                    }
                });
            });

            ['dragleave', 'dragend', 'drop'].forEach(function (event) {
                form.addEventListener(event, function () {
                    form.classList.remove('dragover');
                });
            });

            $("#dropzone").on("click", ".close", function(e) {
                var $target = $(e.target);
                var idx = $target.attr('data-idx');
                $target.parent().remove();
            });

            $("#selectImage").on("click", function(e){
                $("#image").click();
            });

            $("#image").change(function(){   
                if(this.files.length == 0)
                    return;
                var file = this.files[0];
                var reader = new FileReader();
                
                reader.onload = (function(f){
                    return function(e) {
                        $(".thumb").remove();
                        var div = '<div class="thumb" style="width: 100%; height: 100%"> \
                            <img class="center" src="' + e.target.result + '" title="' + escape(f.name) + '"/> \
                            <div class="close" style="cursor:pointer">X</div> \
                        </div>';
                        $("#dropzone").append(div);
                        $('img').on('load',function(){
                            var css;
                            var ratio=$(this).width() / $(this).height();
                            var pratio=$(this).parent().width() / $(this).parent().height();
                            if (ratio <= pratio) css={width:'auto', height:'100%'};
                            else css={width:'100%', height:'auto'};
                            $(this).css(css);
                        });
                    };
                })(file);
                reader.readAsDataURL(file);
            });
        });

        function deletePost(id)
        {
            if(confirm("Do you want to really remove this content?"))
            {
                var formData = new FormData();
                formData.append('content_id', id);
                $.ajax({
                    type: 'POST',
                    url: '<?php echo route("backend.post.delete"); ?>',
                    cache: false,
                    contentType: false,
                    processData: false,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : formData,
                    success: function(result){
                        console.log(result);
                        var res = JSON.parse(result);
                        if(res.status == "success")
                        {
                            window.location.reload()
                        }
                        else if(res.status == "failure")
                        {
                            alert(res.error);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }            
        }

        function downloadPost(url)
        {
            window.location.href = url;
        }
        
        function addPoster()
        {
            var files = $("#image").prop("files");
            if(files.length > 0)
            {
                var file = files[0];
                var formData = new FormData();
                formData.append('image', file);
                $.ajax({
                    type: 'POST',
                    url: '<?php echo route("backend.post.addposter"); ?>',
                    cache: false,
                    contentType: false,
                    processData: false,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : formData,
                    success: function(result){
                        console.log(result);
                        var res = JSON.parse(result);
                        if(res.status == "success")
                        {
                            window.location.reload()
                        }
                        else if(res.status == "failure")
                        {
                            alert(res.error);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }
        }
        
        function openGallery(imgs) {
            // Get the expanded image
            var expandImg = document.getElementById("expandedImg");
            // Get the image text
            var imgText = document.getElementById("imgtext");
            // Use the same src in the expanded image as the image being clicked on from the grid
            expandImg.src = imgs.src;
            // Use the value of the alt attribute of the clickable image as text inside the expanded image
            imgText.innerHTML = imgs.alt;
            // Show the container element (hidden with CSS)
            expandImg.parentElement.style.display = "block";
        }
	</script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/post/poster.blade.php ENDPATH**/ ?>
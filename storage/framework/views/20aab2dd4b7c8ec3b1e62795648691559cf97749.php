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
                <div class="align-items-center" style="padding: 20px;">
                    <label for="caption" class="description-content">Title</label>                    
                    <input id="caption" type="text" class="description-content" name="caption"required autocomplete="caption" autofocus>
                    <div class="div pt-4">
                        <textarea id="p_description" placeholder="Description" class="description-content" required name="description"  style="height: 300px"></textarea>                        
                    </div>                      
                </div>
                <div class="modal-footer">
                    <input class="btn btn-primary" type="button" value="  Add  " onclick="addNews()"> 
                    <input class="btn" data-dismiss="modal" aria-hidden="true" type="button" value="Cancel">
                </div>
            </form>
        </div>

        <?php if(auth()->user()->hasRole(['admin'])): ?>
        <div class="row">
            <p>
                <button type="button" class="btn btn-success btn-block" data-toggle="modal" data-target="#modal-create">
                <i class="icon-plus icon-white"></i> Add news </button>
            </p>
        </div>
        <?php endif; ?>
        <div class="row">
                <?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="description-content">
                    <h1><?php echo e($post->title); ?></h1>
                    <h3><?php echo e($post->content); ?></h3>
                    <?php if(auth()->user()->hasRole(['admin'])): ?>
                    <button type="button" class="btn btn-warning" style="margin-top: 2px;"  onclick="deletePost('<?php echo e($post->Id); ?>')">
                        <i class="gg-trash"></i>
                    </button>                    
                    <?php endif; ?>
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

        function addNews()
        {
            var formData = new FormData();
            var title = $("#caption").val();
            if(title == '')
            {
                alert("Please input title");
                return;
            }
            var description = $("#p_description").val();
            if(description == '')
            {
                alert("Please input news content");
                return;
            }

            formData.append('title', title);
            formData.append('content', description);
            $.ajax({
                type: 'POST',
                url: '<?php echo route("backend.post.addnews"); ?>',
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
        
	</script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/post/news.blade.php ENDPATH**/ ?>
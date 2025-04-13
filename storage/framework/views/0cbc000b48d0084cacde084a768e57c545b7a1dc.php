<?php $__env->startSection('page-title', trans('app.edit_jpg')); ?>


<?php $__env->startSection('content'); ?>

<section class="content-header">
<?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

    <section class="content">
        <div id="main-content" class="for-print">
            <form class="form-horizontal form-vertical" action="/jp/updatejp" method="post">
                <?php echo csrf_field(); ?>
                <div class="table-wrapper">
                    <table class="table table-striped table-hover">
                        <tbody>
                            <tr>
                                <th width="10%">LEVEL</th>
                                <th width="10%">Balance</th>
                                <th width="20%">STARTING VALUE</th>
                                <th width="20%">STARTING PAYOUT VALUE</th>                                
                                <th width="20%">END PAYOUT VALUE</th>     
                                <th width="10%">PAYSUM</th>
                                <th width="10%"></th>
                            </tr>
                            <?php $__currentLoopData = $jackpots; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $jackpot): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php echo $__env->make('backend.jpg.partials.row_jackpot', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </tbody>
                    </table>                    
                </div>
                <label class="control-label" for="">Global Fee</label>
                <input class="ml-5" type="number" step=".01" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($jackpots[0]->percent); ?>" name="percent">
                <button class="ok btn btn-info" type="submit">Save</button>
            </form>
        </div>
    </section>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script>
    $(".jp_regenerate").click(function(e){
        var jackpot_name = $(this).data('name');        
        $.ajax({
            url: '/jp/regenerate',
            type: "POST",
            dataType: 'json',
            data: {'name' : jackpot_name,  "_token": "<?php echo e(csrf_token()); ?>",},            
            success: function (data) {
                location.reload();
            },
            error: function () {
            }
        });    
    });
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/jpg/edit.blade.php ENDPATH**/ ?>
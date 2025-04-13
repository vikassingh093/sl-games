<?php $__env->startSection('page-title', trans('app.edit_user')); ?>
<?php $__env->startSection('page-heading', $user->present()->username); ?>

<?php $__env->startSection('content'); ?>
    <section class="content-header">
        <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <div id="main-content" class="for-print">
            <form class="form-horizontal" id="yw0" action="/user/cashier_update/<?php echo e($user->id); ?>" method="post">
                <?php echo csrf_field(); ?>
                <h3>Cashier Settings</h3>
                <div class="well">
                    <div class="control-group">
                        <label class="control-label">
                            <label for="Users_login">Login</label> </label>
                        <div class="controls">
                            <input class="input-xxlarge" autocomplete="off" readonly="readonly" name="Users[username]"
                                id="Users_login" type="text" maxlength="32" value="<?php echo e($user->username); ?>">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">
                            <label for="Users_password">Password</label> </label>
                        <div class="controls">
                            <input class="input-xxlarge" name="Users[password]" id="Users_password" type="password"
                                maxlength="64">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">
                            <label for="Users_password_repeat">Repeat password</label> </label>
                        <div class="controls">
                            <input class="input-xxlarge" name="Users[password_confirmation]" id="Users_password_repeat"
                                type="password">
                        </div>
                    </div>                    
                    <div class="controls">
                        <input class="btn btn-primary" type="submit" name="yt0" value="Update"> <input class="btn"
                            data-dismiss="modal" aria-hidden="true" name="yt1" type="button" value="Cancel">
                    </div>
                </div>
                
            </form>
            <div class="table-wrapper">
                <table id="table-accounts" class="table table-striped table-hover">
                <tbody>
                    <tr>
                        <th width="200">Login</th>                       
                        <th>Created</th>                        
                        <th>Last Login</th>                        
                        <th style="text-align: center;">Manage</th>
                    </tr>                               
                    <?php $__currentLoopData = $cashiers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('backend.user.partials.row_cashier', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </div>
        </div>
    </section>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
    <script>
		$(function() {		

            $('.toggle-switch').click(function(){
                var data_id = $(this).data('id');
                var btn = this;
                jQuery.ajax(
                    {
                    'type':'POST',
                    'data': {'user_id':data_id, "_token": "<?php echo e(csrf_token()); ?>"},
                    'success': function(data){
                        $(btn).attr('class', data == 'enabled' ? 'btn btn-mini btn-success' : 'btn btn-mini btn-warning');
                    },
                    
                    'url':'/user/toggle/' + data_id,
                    'cache':false});
            })
		});
	</script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/edit_cashier.blade.php ENDPATH**/ ?>
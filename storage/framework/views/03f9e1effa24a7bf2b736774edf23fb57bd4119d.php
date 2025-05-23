<?php $__env->startSection('page-title', trans('app.add_user')); ?>
<?php $__env->startSection('page-heading', trans('app.create_new_user')); ?>

<?php $__env->startSection('content'); ?>

    <section class="content-header">
        <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </section>
    <section class="content">        
        <div id="main-content" class="for-print">            
            <div id="modal-usersetting">
                <form class="form-horizontal" id="yw1" action="<?php echo e(route('backend.user.changepassword')); ?>" method="post">
                    <input id="modal-profile-user-id" name="user-id" type="hidden" value="<?php echo e(auth()->user()->id); ?>">
                    <?php echo csrf_field(); ?>
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h3>Change Passwword</h3>
                    </div>
                    <div class="modal-body">
                    <div class="control-group">
                            <label class="control-label"><label for="password" class="required">New Passwowrd</label></label>
                            <div class="controls">
                                <input id="password" autocomplete="off" name="password" type="password">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"><label for="password_confirmation" class="required">Confirm Passwowrd</label></label>
                            <div class="controls">
                                <input id="password_confirmation" autocomplete="off" name="password_confirmation" type="password">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input class="btn btn-primary" type="submit" name="yt1" value="Update">
                        <input class="btn" data-dismiss="modal" aria-hidden="true" name="yt2" type="button" value="Cancel">
                    </div>                    
                </form>
            </div>          
        </div>       
    </section>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
	<script>
        function changePassword()
        {
            var password = $('#password').val();
            var password_confirm = $('#password_confirmation').val();
            if(password == '')
            {
                alert('Please input new password');
                return;
            }
            if(password != password_confirm)
            {
                alert('Password confirmation is wrong');
                return;
            }
            if(password.length < 6)
            {
                alert('Password must be at least 6 characters');
                return;
            }
            $.ajax({
                url: '/password/change',
                type: "GET",
                data: {
                    password: password,
                    password_confirmation: password_confirm
                },
                dataType: 'json',
                success: function (response) {             
                    alert(response.result);
                },
                error: function () {
                }
                
            });
        }		
	</script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/profile.blade.php ENDPATH**/ ?>
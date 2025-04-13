<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>

	<section class="content-header">
	<?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
	</section>

	<section class="content">		
        <div id="main-content" class="for-print">
            <div class="table-wrapper">
                <table id="table-accounts" class="table table-striped table-hover">
                <tbody>
                    <tr>
                        <th width="250">Login</th>
                        <th width="110">Type</th>
                        <th width="180">Created</th>
                        <th>Last Login</th>
                        <th width="130" style="text-align: right;">Balance</th>
                        <th width="160" style="text-align: center;">Deposit / Redeem</th>
                        <th width="70" style="text-align: center;">Manage</th>
                        <!-- <th width="70" style="text-align: center;">Delete</th> -->
                    </tr>                                   
                    <?php $__currentLoopData = $users; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('backend.user.partials.row', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </div>
        </div>
	</section>	
<?php $__env->stopSection(); ?>
<?php if( count($users) > 0): ?>
    <?php echo $__env->make('backend.user.partials.modals', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php endif; ?>
<?php $__env->startSection('scripts'); ?>
	<script>
        
        function expandChildren(id, hide){
            var $table = $('#table-accounts');
            var children = $table.find('tr[data-parent="' + id + '"]');
            children.each(function(i, el){
                var node = $(el); hide ? node.hide() : node.toggle();
                if(node.is(':hidden')){
                    node.find('.tree-minus').toggleClass('tree-minus tree-plus');
                    expandChildren(node.data('id'), true);
                }
            });
            if(!hide){
                $table.find('tr[data-id="' + id + '"]').find('[rel="tree-icon"]').toggleClass('tree-plus tree-minus');
            }
            return false;
        }


		$(function() {
			
            $('.tree_switch').click(function(){
                var data_id = $(this).data('id');
                return expandChildren(data_id);
            })

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

            $('.delete-user').click(function(){
                if(confirm("Do you really want to delete this user?"))
                {
                    var data_id = $(this).data('id');                
                    jQuery.ajax(
                    {
                    'type':'POST',
                    'data': {"_token": "<?php echo e(csrf_token()); ?>"},
                    'success': function(data){
                        window.location.reload();
                    },
                    
                    'url':'/user/delete/' + data_id,
                    'cache':false});
                }
            })

		});
	</script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/list.blade.php ENDPATH**/ ?>
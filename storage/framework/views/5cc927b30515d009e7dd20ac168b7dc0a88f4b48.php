<tr style="display: <?php echo e(empty($hierarchy[$user->id]) ? 'auto' : 'none'); ?>" data-id="<?php echo e($user->id); ?>" data-parent="<?php echo e($user->parent_id); ?>">
    <td>
        <?php if($direct_children[$user->id] > 0): ?>
        <a data-id="<?php echo e($user->id); ?>" style="margin-left: <?php echo e(count($hierarchy[$user->id]) * 15); ?>px;" href="#" class="tree_switch"><span class="tree-plus" rel="tree-icon"></span></a><?php echo e($user->username ?: trans('app.n_a')); ?>        
        <?php else: ?>
        <span class="tree-line" style="margin-left: <?php echo e(count($hierarchy[$user->id]) * 15); ?>px;"></span> <?php echo e($user->username ?: trans('app.n_a')); ?>

        <?php endif; ?>
    </td>
    <td>
        <?php if( $user->hasRole('agent')): ?>
        <span class="label">Agent</span>
        <?php elseif($user->hasRole('distributor')): ?>
        <span class="label">Distributor</span>
        <?php elseif($user->hasRole('manager')): ?>
        <span class="label">Shop</span>
        <?php endif; ?>
    </td>
    <td class="muted"><?php echo e($user->created_at); ?></td>
    <td class="muted"><?php echo e($user->last_online); ?></td>
    <td style="text-align: right;">
        <code rel="balance"><?php echo e($user->balance); ?></code>
    </td>
    <td style="text-align: center;">
        <?php if($user->parent_id == $current_user): ?>        
        <div class="btn-group">
        <button data-target="#modal-deposite" data-toggle="modal" class="btn btn-mini btn-primary" type="button" onclick="
			$('#modal-deposite-code').html('<?php echo e($user->username); ?>');
			$('#modal-deposite-id').val('<?php echo e($user->role_id == 3 ? $user->shop_id : $user->id); ?>');
            $('#yw1').attr('action', '<?php echo e($user->role_id == 3 ? route('backend.shop.balance') : route('backend.user.balance.update')); ?>');
			">Deposit</button>
        <button data-target="#modal-withdrawal" data-toggle="modal" class="btn btn-mini btn-danger" type="button" onclick="
				$('#modal-withdrawal-code').html('<?php echo e($user->username); ?>');
				$('#modal-withdrawal-id').val('<?php echo e($user->role_id == 3 ? $user->shop_id : $user->id); ?>');
				$('#modal-reedem-available').html('Available: <?php echo e($user->role_id == 3 ? \VanguardLTE\Shop::where('id',$user->shop_id)->get()[0]->balance : $user->balance); ?>');
                $('#yw2').attr('action', '<?php echo e($user->role_id == 3 ? route('backend.shop.balance') : route('backend.user.balance.update')); ?>');
			">Reedem</button>
        </div>
        <?php endif; ?>
    </td>
    <td style="text-align: center;">
        <div class="btn-group">
            <a title="Edit" class="btn btn-mini btn-info" href="<?php echo e($user->role_id == 3 ? '/shops/'.$user->shop_id.'/edit' : '/user/'.$user->id.'/profile'); ?>">
                <i class="icon-pencil icon-white icon-wide"></i>
            </a>
            <a data-id="<?php echo e($user->id); ?>" title="Enable/Disable" class="<?php echo e($user->is_blocked == 0 ? 'btn btn-mini btn-success' : 'btn btn-mini btn-warning'); ?> toggle-switch" href="#">
                <i class="icon-off icon-white"></i>
            </a>
            <!-- <?php if( auth()->user()->hasRole('admin')): ?>
            <a title="Remove" class="btn btn-mini btn-danger delete-user" data-id="<?php echo e($user->id); ?>">
                <i class="icon-trash icon-white icon-wide"></i>
            </a>
            <?php endif; ?> -->
        <div>
    </td>    
</tr>
<?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row.blade.php ENDPATH**/ ?>
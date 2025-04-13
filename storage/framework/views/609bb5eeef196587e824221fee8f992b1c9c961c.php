<tr>
    <td>
        <?php echo e($user->username); ?>

    </td>
    <td>
        <?php echo e($user->created_at); ?>

    </td>
    <td>
        <?php echo e($user->last_online); ?>

    </td>
    <td style="text-align: center;">
        <div class="btn-group">
            <a title="Edit" class="btn btn-mini btn-info" href="/user/cashier_edit/<?php echo e($user->id); ?>">
                <i class="icon-pencil icon-white icon-wide"></i>
            </a> 
            <a title="Enable/Disable" data-id="<?php echo e($user->id); ?>" class="btn btn-mini toggle-switch <?php echo e($user->is_blocked? 'btn-warning' : 'btn-success'); ?>" href="#">
                <i class="icon-off icon-white"></i>
            </a>
        </div>
    </td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_cashier.blade.php ENDPATH**/ ?>
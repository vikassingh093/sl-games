<tr>
    <td>
        <span class="label label-inverse"><?php echo e($stat->account); ?></span>
    </td>
    <td><?php echo e($stat->name); ?></td>
    <td style="text-align: right;">
        <span class="badge <?php echo e($stat->type == 'add' ? 'badge-success' : 'badge-important'); ?>" style="text-align: center; width: 90%;">
            <?php echo e($stat->type == 'add' ? $stat->sum : number_format(-$stat->sum, 2)); ?> </span>
    </td>
    <td class="<?php echo e($stat->type == 'add' ? 'text-success' : 'text-error'); ?>">
        <?php echo e($stat->description); ?> </td>
    <td>
        <?php echo e($stat->cashier); ?> </td>
    <td class="text-info" style="text-align: right;">
        <?php echo e($stat->last_balance . ' → ' . $stat->result_balance); ?> </td>
    <td class="muted">
        <?php echo e($stat->created_at); ?> </td>
    <td>
        <span class="muted"><?php echo e($stat->id); ?></span>
    </td>
    <td class="print">
    </td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_history.blade.php ENDPATH**/ ?>
<tr>
    <td class="muted" >
        <?php echo e($transaction->created_at); ?></td>
    <td>
        <span class="badge <?php echo e(($transaction->type == 'add' && $transaction->user_id == auth()->user()->id || $transaction->type == 'out' && $transaction->user_id != auth()->user()->id) ? 'badge-success' : 'badge-important'); ?>" style="text-align: center; width: 90%;">
            <?php echo e(($transaction->type == 'add' && $transaction->user_id == auth()->user()->id || $transaction->type == 'out' && $transaction->user_id != auth()->user()->id) ? $transaction->sum : number_format(-$transaction->sum, 2)); ?></span>
    </td>
    <td class="<?php echo e(($transaction->type == 'add' && $transaction->user_id == auth()->user()->id || $transaction->type == 'out' && $transaction->user_id != auth()->user()->id) ? 'text-success' : 'text-warning'); ?>">
        <?php echo e($transaction->description); ?> </td>
    <td class="text-info" >
        <?php echo e($transaction->type == 'add'? $transaction->payeer. '→' .$transaction->receipt : $transaction->receipt. '→' .$transaction->payeer); ?> </td>
    <td class="text-info" style="text-align: right;"><?php echo e($transaction->last_payeer_balance . '→' . $transaction->result_payeer_balance); ?> </td>
    <td class="text-info" style="text-align: right;"><?php echo e($transaction->last_balance . '→' . $transaction->result_balance); ?> </td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_transactions.blade.php ENDPATH**/ ?>
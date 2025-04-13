<tr>
	<td><?php echo e($jackpot->name); ?></td>
    <td><?php echo e(number_format($jackpot->balance, 2)); ?></td>
	<td><input class="ml-5" type="number" step=".01" tabindex="0" autocomplete="off" role="textbox" value="<?php echo e($jackpot->start_balance); ?>" name="<?php echo e($jackpot->name); ?>[start_balance]"></td>
	<td><input class="ml-5" type="number" step=".01" tabindex="0" autocomplete="off" role="textbox" value="<?php echo e($jackpot->start_payout); ?>" name="<?php echo e($jackpot->name); ?>[start_payout]"></td>
	<td><input class="ml-5" type="number" step=".01" tabindex="0" autocomplete="off" role="textbox" value="<?php echo e($jackpot->end_payout); ?>" name="<?php echo e($jackpot->name); ?>[end_payout]"></td>	
    <td><?php echo e($jackpot->pay_sum); ?></td>
    <td><button class="ok btn btn-info jp_regenerate" type="button" data-name="<?php echo e($jackpot->name); ?>">Regenerate</button></td>
</tr>
<?php /**PATH /var/www/RiverDragon/resources/views/backend/jpg/partials/row_jackpot.blade.php ENDPATH**/ ?>
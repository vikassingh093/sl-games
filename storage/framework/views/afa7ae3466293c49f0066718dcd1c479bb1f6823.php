<tr>
    <td>
        <?php echo e(number_format($report->bet, 2)); ?>

    </td>
    <td>
        <?php echo e(number_format($report->win, 2)); ?>

    </td>
    <td>
        <?php echo e(number_format($report->bet - $report->win, 2)); ?>

    </td>
    <td>
        <?php echo e($report->bet == 0 ? '0.00' : number_format($report->win / $report->bet * 100, 2)); ?>

    </td>    
    <td>
        <?php echo e($report->date); ?>

    </td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_daily_report.blade.php ENDPATH**/ ?>
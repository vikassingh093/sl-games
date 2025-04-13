<tr>
    <td>
        <span class="label label-inverse"><?php echo e($gamelog->name); ?></span>
    </td>    
    <td><?php echo e($gamelog->account); ?></td>
    <td><?php echo e($gamelog->game); ?></td>
    <td style="text-align: right;">
        <span class="badge badge-success" style="text-align: center; width: 90%;">
            <?php echo e($gamelog->bet); ?> </span>
    </td>
    <td style="text-align: right;">
        <span class="badge badge-success" style="text-align: center; width: 90%;">
            <?php echo e($gamelog->win); ?> </span>
    </td>    
    <td class="muted">
        <?php echo e($gamelog->date_time); ?> </td>    
    <td class="print">
    </td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_gamelogs.blade.php ENDPATH**/ ?>
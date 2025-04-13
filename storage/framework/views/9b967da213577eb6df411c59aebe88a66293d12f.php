<tr>
    <td>
        <?php echo e($game->name); ?>

    </td>
    <td><?php echo e($game->betcount); ?></td>
    <td><?php echo e(number_format($game->bet, 2)); ?></td>
    <td><?php echo e(number_format($game->win, 2)); ?></td>
    <td><?php echo e(number_format($game->bet - $game->win, 2)); ?></td>
    <td><?php echo e($game->bet == 0 ? '---' : number_format($game->win / $game->bet * 100, 2)); ?></td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_report.blade.php ENDPATH**/ ?>
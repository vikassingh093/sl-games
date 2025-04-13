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
        <span >Agent</span>       
        <?php elseif($user->hasRole('manager')): ?>
        <span >Shop</span>
        <?php endif; ?>
    </td>
        
    <td style="text-align: right;">
        <?php echo e($user->balance); ?>

    </td>
    <td style="text-align: right;">
        <?php echo e($deposits[$user->id]); ?>

    </td>
    <td style="text-align: right;">
        <?php echo e($reedems[$user->id]); ?>

    </td>
    <td style="text-align: right;">
        <?php echo e($deposits[$user->id] - $reedems[$user->id]); ?>

    </td>
    <td style="text-align: right;">
        <?php echo e($deposits[$user->id] > 0 ? number_format(($reedems[$user->id]) * 100 / $deposits[$user->id], 2) . '%' : '0'); ?>

    </td>
</tr>
<?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_statistics.blade.php ENDPATH**/ ?>
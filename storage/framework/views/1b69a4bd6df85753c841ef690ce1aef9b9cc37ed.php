<tr>
	<td ><?php echo e($game->name); ?></td>
    <td><input id="<?php echo e('input_category_' . $game->id); ?>" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" value="<?php echo e($game->category_temp); ?>" name="<?php echo e($game->id); ?>" style="width:50px"></td>	    
    <td>
        <select name="tag" id="<?php echo e('input_tag_' . $game->id); ?>" style="width: 100px">
            <option value="0" <?php echo e($game->tag == 0 ? 'selected' : ''); ?>>None</option>
            <option value="1" <?php echo e($game->tag == 1 ? 'selected' : ''); ?>>Hot</option>
            <option value="2" <?php echo e($game->tag == 2 ? 'selected' : ''); ?>>New</option>
        </select>
        
    </td>
    <td><input id="<?php echo e('input_rtp_' . $game->id); ?>"  type="number" step="1" tabindex="0" autocomplete="off" role="textbox" value="<?php echo e($game->rtp); ?>" name="<?php echo e($game->id); ?>" style="width:50px"></td>
    <td><a class="ok btn btn-info game_win_setting" type="button" href="/game_win_setting/<?php echo e($game->id); ?>">Edit</a></td>
    <td><button class="ok btn btn-info game_update" type="button" data-name="<?php echo e($game->id); ?>" style="width: 100px">Update</button></td>
    <td><button class="ok btn <?php echo e($game->view == 1 ? 'btn-danger' : 'btn-info'); ?> game_switch" type="button" style="width: 100px" data-name="<?php echo e($game->id); ?>"><?php echo e($game->view == 1 ? 'Deactivate' : 'Activate'); ?></button></td>
</tr>
<?php /**PATH /var/www/RiverDragon/resources/views/backend/games/partials/row_setting.blade.php ENDPATH**/ ?>
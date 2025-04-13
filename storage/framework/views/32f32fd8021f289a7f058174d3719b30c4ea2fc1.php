<tr rel="account" data-id="<?php echo e($user->username); ?>" data-confirm-redeem="0">
    <td>
        <span class="label label-inverse"><?php echo e($user->first_name); ?></span>
    </td>
    <td>
        <span class="copy-to-clipboard-btn" style="margin-left: -10px;" data-text="<?php echo e($user->username); ?>">
            📄<span>📄</span>
        </span>
    </td>    
    <td class="muted"><?php echo e($user->created_at); ?></td>
    <td><?php echo e($user->username); ?></td>
    <td>
        <div class="pull-right">
            <code rel="balance"><?php echo e($user->balance); ?></code>            
        </div>
    </td>
    <td style="text-align: center;">
        <span rel="online" class="label <?php echo e($user->status == 'online' ? 'btn-success' : 'btn-danger'); ?>"><?php echo e($user->status); ?></span>
    </td>
    <td style="text-align: center;">
        <a class="btn btn-mini btn-round btn-danger force-logout" data-id=<?php echo e($user->id); ?>><i class="icon icon-white icon-home"></i></a>
    </td>  
    <td style="text-align: center;">
        <div class="btn-group">
            <button rel="deposite" data-target="#modal-deposite" data-toggle="modal" class="btn btn-mini btn-primary" onclick="
				$('#modal-deposite-id').val(<?php echo e($user->id); ?>);
				$('#modal-deposite-code').html('<?php echo e($user->username); ?>');
			" name="yt7" type="button">Deposit</button>
            <button rel="withdrawal" data-target="#modal-withdrawal" data-toggle="modal" class="btn btn-mini btn-danger" onclick="
				$('#modal-withdrawal-id').val(<?php echo e($user->id); ?>);
				$('#modal-withdrawal-code').html('<?php echo e($user->username); ?>');
				$('#modal-reedem-available').html('Available: <?php echo e($user->balance); ?>');                
			" name="yt8" type="button">Redeem</button>
        </div>
    </td>    
    <td style="text-align: center;">
        <a class="btn btn-mini btn-round <?php echo e($user->is_blocked == 0 ? 'btn-success' : 'btn-danger'); ?> toggle-switch" data-id=<?php echo e($user->id); ?>><i class="icon icon-white icon-off"></i></a>
    </td>    
    <td style="text-align: center;">
        <button class="btn btn-mini btn-round user-setting" data-target="#modal-usersetting" data-toggle="modal" onclick="
            $('#profile-username').val('<?php echo e($user->username); ?>');
            $('#modal-profile-user-id').val('<?php echo e($user->id); ?>');
        "><i class="icon icon-user"></i></button>
    </td>
    <td style="text-align: center;">
        <a href="/user/history?DateFilterForm[search]=<?php echo e($user->username); ?>"><i class="icon-calendar"></i></a>
    </td>
    <td style="text-align: center;">
        <a target="_blank" href="/user/gamelogs?DateFilterForm[search]=<?php echo e($user->username); ?>"><i class="icon-list"></i></a>
    </td>
</tr><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/row_player.blade.php ENDPATH**/ ?>
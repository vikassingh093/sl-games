<?php $__env->startSection('page-title', trans('app.game_setting')); ?>
<?php $__env->startSection('content'); ?>

<section class="content-header">
<?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

    <section class="content">
        <div id="main-content" class="for-print">
            <form class="form-vertical" action="<?php echo e(route('backend.game.store_win_setting')); ?>" method="post">
                <?php echo csrf_field(); ?>
                <input type="hidden" id="id" value="<?php echo e($winsetting->id); ?>"/>
                <input type="hidden" id="game_id" value="<?php echo e($game->id); ?>"/>
                <div class="div">
                    <legend><?php echo e($game->name); ?></legend>
                </div>
                <div class="div">
                    <label class="control-label" for="">Basic small win counter</label>
                    <input class="ml-5" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bsc_min); ?>" id="bsc_min">
                    <input type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bsc_max); ?>" id="bsc_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Basic small win (x times)</label>
                    <input class="ml-5" type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bsw_min); ?>" id="bsw_min">
                    <input type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bsw_max); ?>" id="bsw_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Basic big win counter</label>
                    <input class="ml-5" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bbc_min); ?>" id="bbc_min">
                    <input type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bbc_max); ?>" id="bbc_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Basic big win (x times)</label>
                    <input class="ml-5" type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bbw_min); ?>" id="bbw_min">
                    <input type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->bbw_max); ?>" id="bbw_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Freespin counter</label>
                    <input class="ml-5" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fc_min); ?>" id="fc_min">
                    <input type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fc_max); ?>" id="fc_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Freespin win (x times)</label>
                    <input class="ml-5" type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fw_min); ?>" id="fw_min">
                    <input type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fw_max); ?>" id="fw_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Freespin bigwin count</label>
                    <input class="ml-5" type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fw_bc_min); ?>" id="fw_bc_min">
                    <input type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fw_bc_max); ?>" id="fw_bc_max">
                </div>
                <div class="div">
                    <label class="control-label" for="">Freespin bigwin</label>
                    <input class="ml-5" type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fw_bw_min); ?>" id="fw_bw_min">
                    <input type="number" step="0.1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($winsetting->fw_bw_max); ?>" id="fw_bw_max">
                </div>
                <button class="ok btn btn-info" type="button" onclick="saveSetting(0);">Apply</button>
                <button class="ok btn btn-info" type="button" onclick="saveSetting(1);">Apply to all Games</button>
            </form>
        </div>
    </section>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script>
    function saveSetting(type)
    {
        var id = $("#id").val();
        var game_id = $("#game_id").val();
        var bsc_min = $("#bsc_min").val();
        var bsc_max = $("#bsc_max").val();
        var bsw_min = $("#bsw_min").val();
        var bsw_max = $("#bsw_max").val();
        var bbc_min = $("#bbc_min").val();
        var bbc_max = $("#bbc_max").val();
        var bbw_min = $("#bbw_min").val();
        var bbw_max = $("#bbw_max").val();
        var fc_min = $("#fc_min").val();
        var fc_max = $("#fc_max").val();
        var fw_min = $("#fw_min").val();
        var fw_max = $("#fw_max").val();
        var fw_bc_min = $("#fw_bc_min").val();
        var fw_bc_max = $("#fw_bc_max").val();
        var fw_bw_min = $("#fw_bw_min").val();
        var fw_bw_max = $("#fw_bw_max").val();

        $.ajax({
            url: '<?php echo e(route("backend.game.store_win_setting")); ?>',
            type: "POST",
            dataType: 'json',
            data: {
                "_token": "<?php echo e(csrf_token()); ?>",
                id: id,
                game_id: game_id,
                bsc_min: bsc_min,
                bsc_max: bsc_max,
                bsw_min: bsw_min,
                bsw_max: bsw_max,
                bbc_min: bbc_min,
                bbc_max: bbc_max,
                bbw_min: bbw_min,
                bbw_max: bbw_max,
                fc_min: fc_min,
                fc_max: fc_max,
                fw_min: fw_min,
                fw_max: fw_max,
                fw_bc_min: fw_bc_min,
                fw_bc_max: fw_bc_max,
                fw_bw_min: fw_bw_min,
                fw_bw_max: fw_bw_max,
                type: type
                },            
            success: function (data) {
                alert("Settings applied succesfully.")
            },
            error: function () {
            }
        });
    }
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/games/win_setting.blade.php ENDPATH**/ ?>
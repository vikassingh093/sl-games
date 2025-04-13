<?php $__env->startSection('page-title', trans('app.game_setting')); ?>
<?php $__env->startSection('content'); ?>

<section class="content-header">
<?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

    <section class="content">
        <div id="main-content" class="for-print">
            <!-- <form class="form-vertical" action="<?php echo e(route('backend.game.mass')); ?>" method="post">
                <?php echo csrf_field(); ?>
                <div class="div">
                    <label class="control-label" for="">Slot Rtp</label>
                    <input class="ml-5" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="" name="slot_rtp">
                </div>
                <div class="div">
                    <label class="control-label" for="">Fishing Rtp</label>
                    <input class="ml-5" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="" name="fishing_rtp">
                </div>
                <button class="ok btn btn-info" type="submit">Mass Update</button>                             
            </form> -->
            <div class="div" id="verification_panel">
                <div class="div">
                    <label class="control-label" for="">Input password</label>
                    <input id="input_password" class="ml-5" type="text" autocomplete="off" role="textbox" style="margin-left: 5px;" value="">
                </div>
                <button class="ok btn btn-info" type="button" onclick="openMain()">Confirm</button>                             
            </div>
            <div class="div" id="main_panel" style="display:none">
                <form class="form-vertical" action="<?php echo e(route('backend.game.savetemplate')); ?>" method="post">
                    <?php echo csrf_field(); ?>
                    <div class="div">
                        <label class="control-label" for="">Template name</label>
                        <input class="ml-5" type="text" autocomplete="off" role="textbox" style="margin-left: 5px;" value="" name="name">
                    </div>                
                    <button class="ok btn btn-info" type="submit">Save as template</button>                             
                </form>
                <form class="form-vertical" action="<?php echo e(route('backend.game.loadtemplate')); ?>" method="post">
                    <?php echo csrf_field(); ?>
                    <div class="div">
                        <select name="template" style="width: 100px">
                            <?php $__currentLoopData = $templates; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $template): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <option value="<?php echo e($template->id); ?>"><?php echo e($template->name); ?></option>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </select>
                    </div>                
                    <button class="ok btn btn-info" type="submit">Load from template</button>
                </form>
                <div class="table-wrapper" style="margin-top: 10px;">
                    <table class="table table-striped table-hover">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>                  
                                <th>Tag</th>
                                <th>RTP</th>
                                <th>Game Win Setting</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <?php $__currentLoopData = $games; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $game): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php echo $__env->make('backend.games.partials.row_setting', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </tbody>
                    </table>
                </div>   
            </div>
              
        </div>
    </section>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script>
    function openMain()
    {
        var password = $('#input_password').val();
        if(password === '239239')
        {
            $('#verification_panel').css('display', 'none');
            $('#main_panel').css('display', 'block');
        }
        else
        {
            alert('Incorrect password');
        }
    }

    $(".game_update").click(function(e){
        var game_id = $(this).data('name');
        var normal_win_rate = $('#input_normal_winrate_' + game_id).val();
        var bonus_win_rate = $('#input_bonus_winrate_' + game_id).val();
        var categoiry = $('#input_category_' + game_id).val();
        var tag = $('#input_tag_' + game_id).val();
        var rtp = $('#input_rtp_' + game_id).val();
        $.ajax({
            url: 'game/'+game_id+'/update',
            type: "POST",
            dataType: 'json',
            data: {
                "game_id" : game_id,
                "_token": "<?php echo e(csrf_token()); ?>",
                "normal_win_rate": normal_win_rate,
                "bonus_win_rate": bonus_win_rate,
                "category": categoiry,
                "tag": tag,
                "rtp": rtp
                },            
            success: function (data) {
                location.reload();
            },
            error: function () {
            }
        });
    });

    $(".game_switch").click(function(e){
        var game_id = $(this).data('name');
        $.ajax({
            url: 'game/'+game_id+'/switch',
            type: "POST",
            dataType: 'json',
            data: {"_token": "<?php echo e(csrf_token()); ?>",},
            success: function (data) {
                location.reload();
            },
            error: function () {
            }
        });
    });
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/games/edit.blade.php ENDPATH**/ ?>
<?php $__env->startSection('page-title', trans('app.edit_shop')); ?>
<?php $__env->startSection('page-heading', $shop->title); ?>

<?php $__env->startSection('content'); ?>

    <section class="content-header">
        <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </section>

    <section class="content">

        <div id="main-content" class="for-print">
            <form autocomplete="off" class="form-horizontal form-vertical" enctype="multipart/form-data" id="yw0"
                action="/shops/<?php echo e($shop->id); ?>/update" method="post">
                <?php echo csrf_field(); ?>
                <ul id="settings-tabs" class="nav nav-tabs">
                    <li class="active"><a href="#settings-general" data-toggle="tab">General</a></li>
                    <?php if(auth()->user()->hasRole(['admin'])): ?>
                    <li class=""><a href="#settings-jackpots" data-toggle="tab">Jackpots</a></li>                    
                    <?php endif; ?>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="settings-general">
                        <div class="row-fluid">
                            <fieldset>
                                <legend>Master Fields</legend>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_parent">Parent</label> </label>
                                    <div class="controls">
                                        <div class="input-xxlarge uneditable-input"><?php echo e($selector); ?></div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_login">Login</label> </label>
                                    <div class="controls">
                                        <input id="users-login" class="input-xxlarge" autocomplete="off" disabled="disabled"
                                            name="Users[login]" type="text" maxlength="32" value="<?php echo e($shop->name); ?>">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_password">Password</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" autocomplete="off" value="" name="Users[password]"
                                            id="Users_password" type="password" maxlength="64">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_password_repeat">Repeat password</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" autocomplete="off" value="" name="Users[password_confirmation]"
                                            id="Users_password_repeat" type="password">
                                    </div>
                                </div>                                
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_status">Status</label> </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[status]" id="Users_status">
                                            <option value="disabled" <?php echo e($shop->is_blocked == 1? 'selected' : ''); ?>>Disabled</option>
                                            <option value="enabled" <?php echo e($shop->is_blocked == 0? 'selected' : ''); ?>>Enabled</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_status">RTP</label> </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[rtp]" id="Users_rtp">
                                        <?php if(Auth::user()->hasRole('admin')): ?>
                                            <option value="70" <?php echo e($shop->percent == 70 ? 'selected' : ''); ?>>70</option>
                                            <option value="80" <?php echo e($shop->percent == 80 ? 'selected' : ''); ?>>80</option>
                                            <option value="87" <?php echo e($shop->percent == 87 ? 'selected' : ''); ?>>87</option>
                                            <option value="90" <?php echo e($shop->percent == 90 ? 'selected' : ''); ?>>90</option>
                                            <option value="95" <?php echo e($shop->percent == 95 ? 'selected' : ''); ?>>95</option>                                            
                                        <?php else: ?>
                                            <option value="<?php echo e($shop->percent); ?>" selected><?php echo e($shop->percent); ?></option>
                                        <?php endif; ?>
                                        </select>
                                    </div>
                                </div>
                                <legend>Timezone settings</legend>
                                <div class="control-group">
                                    <label class="control-label">
                                    <label for="Users_time_zone" class="required">Time Zone <span class="required">*</span></label>            </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[time_zone]" id="Users_time_zone">
                                            <?php $__currentLoopData = $zones; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $timezone): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                <?php echo $__env->make('backend.user.partials.row_timezone', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>                                            
                                        </select> 
                                    </div>
                                </div>                                                            
                                <legend>Contact Details</legend>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_country">Country</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[country]" id="Users_country" type="text" value="<?php echo e($contact_info['country']); ?>"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_city">City</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[city]" id="Users_city" type="text" value="<?php echo e($contact_info['city']); ?>"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_name">Name</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[name]" id="Users_name" type="text" value="<?php echo e($contact_info['name']); ?>"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_email">E-mail</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[email]" id="Users_email" type="text" value="<?php echo e($contact_info['email']); ?>"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_phone">Phone number</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" name="Users[phone]" id="Users_phone" type="text" value="<?php echo e($contact_info['phone']); ?>"
                                            maxlength="128">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_percent">Finance</label> </label>
                                    <div class="controls">
                                        <input class="input-xxlarge" placeholder="0.00" name="Users[percent]" id="Users_percent" value="<?php echo e($contact_info['percent']); ?>"
                                            type="text" maxlength="6" value="0.00">
                                    </div>
                                </div>
                                <div class="controls">
                                    <input class="btn btn-primary" type="submit" name="yt0" value="Save Changes"> <a class="btn"
                                        href="/user">Cancel</a>
                                </div>
                            </fieldset>
                        </div>
                        <script>
                            $('#unlock-login-field').one('click', function (e) {
                                $(this).prop('disabled', true).closest('form').find('#users-login:disabled').prop('disabled', false);
                            });
                            $('#unlock-password-fields').one('click', function (e) {
                                $(this).prop('disabled', true).closest('form').find('input[type="password"]:disabled').prop('disabled', false);
                            });
                            $('.phone-mask1').mask('(999) 999-9999');
                            $('.phone-mask2').mask('(999) 999-9999');
                        </script>
                    </div>
                    <?php if(auth()->user()->hasRole(['admin'])): ?>
                    <div class="tab-pane" id="settings-jackpots">
                        <div class="row-fluid">
                            <fieldset class="alert alert-success">
                                <div class="control-group">
                                    <label class="control-label">
                                        <label for="Users_jackpots_status">Jackpots status</label> </label>
                                    <div class="controls">
                                        <select class="input-xxlarge" name="Users[jackpots_status]" id="Users_jackpots_status">
                                            <option value="enabled" <?php echo e($shop->jackpot_active == 1 ? 'selected' : ''); ?>>Enabled</option>
                                            <option value="disabled" <?php echo e($shop->jackpot_active == 0 ? 'selected' : ''); ?>>Disabled</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Options</legend>                                                                
                            </fieldset>
                            <div class="table-wrapper">
                                <table class="table table-striped table-hover">
                                    <tbody>
                                        <tr>
                                            <th width="10%">LEVEL</th>
                                            <th width="10%">Balance</th>
                                            <th width="20%">STARTING VALUE</th>
                                            <th width="20%">STARTING PAYOUT VALUE</th>                                
                                            <th width="20%">END PAYOUT VALUE</th>     
                                            <th width="10%">PAYSUM</th>
                                            <th width="10%"></th>
                                        </tr>
                                        <?php $__currentLoopData = $jackpots; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $jackpot): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                            <?php echo $__env->make('backend.jpg.partials.row_jackpot', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                    </tbody>
                                </table>                    
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="">Jackpot Fee</label>
                                <input class="ml-5" type="number" step=".01" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($jackpots[0]->percent); ?>" name="Users[jp_fee]">
                            </div>
                            <div class="control-group">
                            <label class="control-label" for="">Fake Count</label>
                                <input class="ml-5" type="number" step="1" tabindex="0" autocomplete="off" role="textbox" style="margin-left: 5px;" value="<?php echo e($jackpots[0]->fake_cnt); ?>" name="Users[jp_fake_count]">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" type="submit" name="yt1">Save Changes</button>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
                <input type="hidden" id="visitorId" name="visitorId" value="734218e3dc97058d70e4ea316409deba">
            </form>
            <script>
                $(function () {
                    var currentTab = window.localStorage['settings-tab-active'];
                    if (currentTab) {
                        $('#settings-tabs').find('a[href="' + currentTab + '"]').tab('show');
                    }
                    else {
                        $('#settings-tabs').find('a:first').tab('show');
                    }
                });
                $('#settings-tabs').on('click', 'a[data-toggle="tab"]', function (e) {
                    window.localStorage.removeItem('settings-tab-active');
                    window.localStorage.setItem('settings-tab-active', $(this).attr('href'));
                });
            </script>
        </div>

    </section>

<?php $__env->stopSection(); ?>
<?php $__env->startSection('scripts'); ?>
<script>
    $(".jp_regenerate").click(function(e){
        var jackpot_name = $(this).data('name');        
        $.ajax({
            url: "/shops/<?php echo e($shop->id); ?>/regenerate_jp",
            type: "POST",
            dataType: 'json',
            data: {'name' : jackpot_name,  "_token": "<?php echo e(csrf_token()); ?>"},
            success: function (data) {
                location.reload();
            },
            error: function () {
            }
        });    
    });
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/shops/edit.blade.php ENDPATH**/ ?>
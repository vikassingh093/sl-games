<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>

<section class="content-header">
    <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

<section class="content">
    <div id="main-content" class="for-print">
        <form class="form-horizontal form-vertical" action="<?php echo e(route('backend.jpg.jackpot_history')); ?>" method="get">
            <?php echo csrf_field(); ?>
            <div id="date-filter" class="well">
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_dateFrom">From</label> </label>
                    <div class="controls controls-row">
                        <div class="input-append date" data-date="" data-date-format="mm-dd-yyyy">
                            <input class="input-large" autocomplete="off" placeholder="mm-dd-yyyy" id="DateFilterForm_dateFrom" name="DateFilterForm[dateFrom]" value="<?php echo e($DateFilterForm['dateFrom']); ?>" type="text"> <a class="button add-on" href="#"><i class="icon-calendar"></i></a>
                        </div>
                        <input class="input-mini" autocomplete="off" placeholder="hh:mm" id="DateFilterForm_timeFrom" name="DateFilterForm[timeFrom]" type="text" value="<?php echo e($DateFilterForm['timeFrom']); ?>">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_dateTill">Until</label> </label>
                    <div class="controls controls-row">
                        <div class="input-append date" data-date="" data-date-format="mm-dd-yyyy">
                            <input class="input-large" autocomplete="off" placeholder="mm-dd-yyyy" id="DateFilterForm_dateTill" name="DateFilterForm[dateTill]" type="text" value="<?php echo e($DateFilterForm['dateTill']); ?>"> <a class="button add-on" href="#"><i class="icon-calendar"></i></a>
                        </div>

                        <input class="input-mini" autocomplete="off" placeholder="hh:mm" id="DateFilterForm_timeTill" name="DateFilterForm[timeTill]" type="text" value="<?php echo e($DateFilterForm['timeTill']); ?>">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_shop">Shop</label> </label>
                    <div class="controls controls-row">
                        <select class="input-large" name="DateFilterForm[shop]" id="DateFilterForm_shop">
                            <option value="">-- all --</option>
                            <?php $__currentLoopData = $shops; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $shop): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <option value="<?php echo e($shop->name); ?>" <?php echo e($shop->name == $DateFilterForm['shop'] ? 'selected' : ''); ?>><?php echo e($shop->name); ?></option>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </select>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_jpg">Jackpot</label> </label>
                    <div class="controls controls-row">
                        <select class="input-large" name="DateFilterForm[jpg]" id="DateFilterForm_jpg">
                            <option value="">-- all --</option>
                            <?php $__currentLoopData = $jpgs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $jpg): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <option value="<?php echo e($jpg->name); ?>" <?php echo e($jpg->name == $DateFilterForm['jpg'] ? 'selected' : ''); ?>><?php echo e($jpg->name); ?></option>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_search">Search</label> </label>
                    <div class="controls controls-row">
                        <input class="input-large" placeholder="Account" name="DateFilterForm[search]" id="DateFilterForm_search" type="text" value="<?php echo e($DateFilterForm['search']); ?>">
                    </div>
                </div>
                <div class="controls">
                    <div class="btn-group">
                        <button class="btn btn-info" type="submit" name="yt0">Apply Filter</button> <button class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="/user/gamelogs?filter=today">for today</a>
                            </li>
                            <li>
                                <a href="/user/gamelogs?filter=yesterday">for yesterday</a>
                            </li>
                            <li>
                                <a href="/user/gamelogs?filter=week">this week</a>
                            </li>
                            <li>
                                <a href="/user/gamelogs?filter=month">this month</a>
                            </li>
                        </ul>
                    </div>
                    <a class="btn" href="/user/gamelogs">Reset</a>
                    <button type="button" id="print-button" onclick="printContent()" class="btn"><i class="icon icon-print"></i></button>
                </div>
            </div>
        </form>
        <div class="table-wrapper">
            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>
                            Jackpot </th>
                        <th >
                            Winners </th>
                        <th >
                            Amount </th>
                    </tr>
                </thead>
                <tbody>
                    <?php ($totalWin = 0); ?>
                    <?php ($totalWinners = 0); ?>
                    <?php $__currentLoopData = $sumlogs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php ($totalWin += $row->win); ?>
                        <?php ($totalWinners += $row->winners); ?>
                        <?php echo $__env->make('backend.jpg.partials.row_sum', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    <tr>
                        <td><b>Total</b></td>
                        <td><b><?php echo e($totalWinners); ?></b></td>
                        <td><b><?php echo e(number_format($totalWin, 2)); ?></b></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <hr/>
        <div class="table-wrapper">
            <table class="table table-striped table-hover">
                <tbody>
                    <tr>
                        <th>Account #</th>
                        <th>Shop</th>
                        <th>Jackpot</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    <?php $__currentLoopData = $jpglogs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $__env->make('backend.jpg.partials.row_history', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
            <div class="pagination">
                <?php echo e($jpglogs->appends(request()->query())->links()); ?>

            </div>
        </div>
    </div>
</section>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script>
    function inputPrependSize(form) {
        var $form = $(form);
        setTimeout(function() {
            $form.find('input[type=text]').filter(':first').focus();
        }, 500);
    }


    $(function() {
        // (function clock(container) {
        //     String.prototype.twoDigist = function(str) {
        //         return this.length == 1 ? ("0" + this) : this;
        //     };
        //     var serverTime = new Date("Jan 21, 2022 23:28:00"),
        //         localTime = Date.now(),
        //         timeDiff = serverTime.getTime() - localTime;

        //     function dateTime() {
        //         var date = new Date(Date.now() + timeDiff);
        //         return date.getFullYear() + "/" + (date.getMonth() + 1).toString().twoDigist() + "/" + date.getDate().toString().twoDigist() + " " +
        //             date.getHours().toString().twoDigist() + ":" + date.getMinutes().toString().twoDigist() + ":" + date.getSeconds().toString().twoDigist();
        //     }
        //     (function adminClock() {
        //         $(container).html(dateTime());
        //         setTimeout(adminClock, 1000);
        //     })();
        // })("#clock-block");

        /*<![CDATA[*/
        jQuery(function($) {
            jQuery("#DateFilterForm_dateFrom").mask("99-99-9999");
            jQuery("#DateFilterForm_timeFrom").mask("99:99");
            jQuery("#DateFilterForm_dateTill").mask("99-99-9999");
            jQuery("#DateFilterForm_timeTill").mask("99:99");
        });
        jQuery(window).on('load', function() {
            $("body").tooltip({
                selector: "[rel=tooltip]",
                placement: "top"
            });
        });
        /*]]>*/

        $('.date').datepicker({

        });

        $(document).ready(function() {
            if ($('.receipt').length) {
                $('#print-button').hide();
            }
        });
    });
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/jpg/history.blade.php ENDPATH**/ ?>
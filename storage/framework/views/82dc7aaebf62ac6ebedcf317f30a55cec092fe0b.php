<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>

<section class="content-header">
    <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

<section class="content">
    <div id="main-content" class="for-print">
        <form class="form-horizontal form-vertical" id="yw0" action="/user/transactions" method="get">
            <?php echo csrf_field(); ?>
            <div id="date-filter" class="well">
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_dateFrom">From</label> </label>
                    <div class="controls controls-row">
                        <div class="input-append date" data-date="" data-date-format="mm-dd-yyyy">
                            <input class="input-large" autocomplete="off" placeholder="mm-dd-yyyy" id="DateFilterForm_dateFrom" name="DateFilterForm[dateFrom]" value="<?php echo e($DateFilterForm['dateFrom']); ?>" type="text"> <a class="button add-on" href="#"><i class="icon-calendar"></i></a>
                        </div>
                        <input class="input-mini" autocomplete="off" placeholder="hh:mm" id="DateFilterForm_timeFrom" name="DateFilterForm[timeFrom]" value="<?php echo e($DateFilterForm['timeFrom']); ?>" type="text">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_dateTill">Until</label> </label>
                    <div class="controls controls-row">
                        <div class="input-append date" data-date="" data-date-format="mm-dd-yyyy">
                            <input class="input-large" autocomplete="off" placeholder="mm-dd-yyyy" id="DateFilterForm_dateTill" name="DateFilterForm[dateTill]" value="<?php echo e($DateFilterForm['dateTill']); ?>" type="text"> <a class="button add-on" href="#"><i class="icon-calendar"></i></a>
                        </div>

                        <input class="input-mini" autocomplete="off" placeholder="hh:mm" id="DateFilterForm_timeTill" name="DateFilterForm[timeTill]" value="<?php echo e($DateFilterForm['timeTill']); ?>" type="text">
                    </div>
                </div>
                <div class="controls">
                    <div class="btn-group">
                        <button class="btn btn-info" type="submit" name="yt0">Apply Filter</button> <button class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="/user/transactions?filter=today">for today</a>
                            </li>
                            <li>
                                <a href="/user/transactions?filter=yesterday">for yesterday</a>
                            </li>
                            <li>
                                <a href="/user/transactions?filter=week">this week</a>
                            </li>
                            <li>
                                <a href="/user/transactions?filter=month">this month</a>
                            </li>
                        </ul>
                    </div>
                    <a class="btn" href="/user/transactions">Reset</a> 
                    <button type="button" id="print-button" onclick="printContent()" class="btn"><i class="icon icon-print"></i></button>
                </div>
            </div>
        </form>        
        <div class="table-wrapper">
            <table class="table table-striped table-hover">
                <tbody>
                    <tr class="table-active">
                        <th >Date</th>
                        <th style="text-align: center;">Amount</th>
                        <th>Description</th>
                        <th>From → to</th>
                        <th  style="text-align: right;">Payeer Balance change</th>
                        <th  style="text-align: right;">Receiptor Balance change</th>
                    </tr>
                    <?php $__currentLoopData = $transactions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $transaction): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('backend.user.partials.row_transactions', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
            <div class="pagination">
                <?php echo e($transactions->appends(request()->query())->links()); ?>

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
        (function clock(container) {
            String.prototype.twoDigist = function(str) {
                return this.length == 1 ? ("0" + this) : this;
            };
            var serverTime = new Date("Jan 21, 2022 23:28:00"),
                localTime = Date.now(),
                timeDiff = serverTime.getTime() - localTime;

            function dateTime() {
                var date = new Date(Date.now() + timeDiff);
                return date.getFullYear() + "/" + (date.getMonth() + 1).toString().twoDigist() + "/" + date.getDate().toString().twoDigist() + " " +
                    date.getHours().toString().twoDigist() + ":" + date.getMinutes().toString().twoDigist() + ":" + date.getSeconds().toString().twoDigist();
            }
            (function adminClock() {
                $(container).html(dateTime());
                setTimeout(adminClock, 1000);
            })();
        })("#clock-block");

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
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/transactions.blade.php ENDPATH**/ ?>
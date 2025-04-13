<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>

<section class="content-header">
    <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

<section class="content">
    <div id="main-content" class="for-print">
        <form class="form-horizontal form-vertical" id="yw0" action="/user/report" method="get">
            <?php echo csrf_field(); ?>
            <div id="date-filter" class="well">
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_dateFrom">From</label> </label>                    
                    <div class="controls controls-row">                        
                        <div class="input-append date" data-date="" data-date-format="mm-dd-yyyy">
                            <input class="input-large" autocomplete="off" placeholder="mm-dd-yyyy" id="DateFilterForm_dateFrom" name="DateFilterForm[dateFrom]" value="<?php echo e($DateFilterForm['dateFrom']); ?>" type="text" > <a class="button add-on" href="#"><i class="icon-calendar"></i></a>
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
                
                <div class="controls">
                    <div class="btn-group">
                        <button class="btn btn-info" type="submit" name="yt0">Apply Filter</button> <button class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="/user/report?filter=today">for today</a>
                            </li>
                            <li>
                                <a href="/user/report?filter=yesterday">for yesterday</a>
                            </li>
                            <li>
                                <a href="/user/report?filter=week">this week</a>
                            </li>
                            <li>
                                <a href="/user/report?filter=month">this month</a>
                            </li>
                        </ul>
                    </div>
                    <a class="btn" href="/user/report">Reset</a>
                    <button type="button" id="print-button" onclick="printContent()" class="btn"><i class="icon icon-print"></i></button>
                </div>
            </div>            
        </form>  
        <div class="table-wrapper">
            <table id="table-report" class="table table-bordered table-hover">
                <tbody>
                    <tr style="background: #eee" >
                        <td >
                            <div role="columnheader" class="webix_hcell">GAME</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">BET COUNT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">BET AMOUNT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">WIN AMOUNT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">COMPANY PROFIT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">ACTUAL RTP %</div>
                        </td>                        
                    </tr>
                    <?php $__currentLoopData = $games; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $game): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('backend.user.partials.row_report', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    <?php $__currentLoopData = $fishing_games; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $game): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('backend.user.partials.row_report', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
        </div>
        
        <div class="table-wrapper">
            <legend>Total Report</legend>
            <table id="table-total" class="table table-bordered table-hover">
                <tbody>
                    <tr style="background: #eee" >
                        <td>
                            <div role="columnheader" class="webix_hcell">Type</div>
                        </td>                        
                        <td>
                            <div role="columnheader" class="webix_hcell">BET COUNT</div>
                        </td>                        
                        <td >
                            <div role="columnheader" class="webix_hcell">BET AMOUNT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">WIN AMOUNT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">COMPANY PROFIT</div>
                        </td>
                        <td >
                            <div role="columnheader" class="webix_hcell">ACTUAL RTP %</div>
                        </td>                        
                    </tr>
                    <tr>
                        <td>Slots</td>
                        <td><?php echo e($total[0]->betcount); ?></td>
                        <td><?php echo e(number_format($total[0]->bet, 2)); ?></td>
                        <td><?php echo e(number_format($total[0]->win, 2)); ?></td>
                        <td><?php echo e(number_format($total[0]->bet - $total[0]->win, 2)); ?></td>
                        <td><?php echo e($total[0]->bet == 0 ? '---' : number_format($total[0]->win / $total[0]->bet * 100, 2)); ?></td>
                    </tr>
                    <tr>
                        <td>Fishing</td>
                        <td><?php echo e($total_fishing[0]->betcount); ?></td>
                        <td><?php echo e(number_format($total_fishing[0]->bet, 2)); ?></td>
                        <td><?php echo e(number_format($total_fishing[0]->win, 2)); ?></td>
                        <td><?php echo e(number_format($total_fishing[0]->bet - $total_fishing[0]->win, 2)); ?></td>
                        <td><?php echo e($total_fishing[0]->bet == 0 ? '---' : number_format($total_fishing[0]->win / $total_fishing[0]->bet * 100, 2)); ?></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td><?php echo e($total[0]->betcount + $total_fishing[0]->betcount); ?></td>
                        <td><?php echo e(number_format($total[0]->bet + $total_fishing[0]->bet, 2)); ?></td>
                        <td><?php echo e(number_format($total[0]->win + $total_fishing[0]->win, 2)); ?></td>
                        <td><?php echo e(number_format($total[0]->bet + $total_fishing[0]->bet - $total[0]->win - $total_fishing[0]->win, 2)); ?></td>
                        <td><?php echo e($total[0]->bet + $total_fishing[0]->bet == 0 ? '---' : number_format(($total_fishing[0]->win + $total[0]->win) / ($total[0]->bet + $total_fishing[0]->bet) * 100, 2)); ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script>
    $(function() {
        jQuery("#DateFilterForm_dateFrom").mask("99-99-9999");
        jQuery("#DateFilterForm_timeFrom").mask("99:99");
        jQuery("#DateFilterForm_dateTill").mask("99-99-9999");
        jQuery("#DateFilterForm_timeTill").mask("99:99");
    });
    $('.date').datepicker({

    });
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/report.blade.php ENDPATH**/ ?>
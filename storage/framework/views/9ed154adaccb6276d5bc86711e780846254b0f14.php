<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>

<section class="content-header">
    <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

<section class="content">
    <div id="main-content" class="for-print">
        <form class="form-horizontal form-vertical" id="yw0" action="/user/statistics" method="get">
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

                <div class="controls">
                    <div class="btn-group">
                        <button class="btn btn-info" type="submit" name="yt0">Apply Filter</button> <button class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="/user/statistics?filter=today">for today</a>
                            </li>
                            <li>
                                <a href="/user/statistics?filter=yesterday">for yesterday</a>
                            </li>
                            <li>
                                <a href="/user/statistics?filter=week">this week</a>
                            </li>
                            <li>
                                <a href="/user/statistics?filter=month">this month</a>
                            </li>
                        </ul>
                    </div>
                    <a class="btn" href="/user/statistics">Reset</a>
                    <button type="button" id="print-button" onclick="printContent()" class="btn"><i class="icon icon-print"></i></button>
                </div>
            </div>
        </form>
        <div class="table-wrapper">
            <table id="table-accounts" class="table table-bordered table-hover">
                <tbody>
                    <tr style="background: #eee">
                        <td>
                            <div role="columnheader" class="webix_hcell">Login</div>
                        </td>
                        <td>
                            <div role="columnheader" class="webix_hcell">Type</div>
                        </td>
                        <td>
                            <div role="columnheader" class="webix_hcell">Balance</div>
                        </td>
                        <td>
                            <div role="columnheader" class="webix_hcell">Deposits</div>
                        </td>
                        <td>
                            <div role="columnheader" class="webix_hcell">Redeems</div>
                        </td>
                        <td>
                            <div role="columnheader" class="webix_hcell">Profit</div>
                        </td>
                        <td>
                            <div role="columnheader" class="webix_hcell">PayOut %</div>
                        </td>
                    </tr>
                    <?php $__currentLoopData = $users; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $__env->make('backend.user.partials.row_statistics', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
        </div>
    </div>
</section>
<?php $__env->stopSection(); ?>
<?php $__env->startSection('scripts'); ?>
<script>
    function expandChildren(id, hide) {
        var $table = $('#table-accounts');
        var children = $table.find('tr[data-parent="' + id + '"]');
        children.each(function(i, el) {
            var node = $(el);
            hide ? node.hide() : node.toggle();
            if (node.is(':hidden')) {
                node.find('.tree-minus').toggleClass('tree-minus tree-plus');
                expandChildren(node.data('id'), true);
            }
        });
        if (!hide) {
            $table.find('tr[data-id="' + id + '"]').find('[rel="tree-icon"]').toggleClass('tree-plus tree-minus');
        }
        return false;
    }


    $(function() {

        $('.tree_switch').click(function() {
            var data_id = $(this).data('id');
            return expandChildren(data_id);
        })

        $('.toggle-switch').click(function() {
            var data_id = $(this).data('id');
            var btn = this;
            jQuery.ajax({
                'type': 'POST',
                'data': {
                    'user_id': data_id,
                    "_token": "<?php echo e(csrf_token()); ?>"
                },
                'success': function(data) {
                    $(btn).attr('class', data == 'enabled' ? 'btn btn-mini btn-success' : 'btn btn-mini btn-warning');
                },

                'url': '/user/toggle/' + data_id,
                'cache': false
            });
        })

        $('.delete-user').click(function() {
            var data_id = $(this).data('id');
            var btn = this;

        })

        jQuery("#DateFilterForm_dateFrom").mask("99-99-9999");
        jQuery("#DateFilterForm_timeFrom").mask("99:99");
        jQuery("#DateFilterForm_dateTill").mask("99-99-9999");
        jQuery("#DateFilterForm_timeTill").mask("99:99");

        $('.date').datepicker({

        });
    });
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/statistics.blade.php ENDPATH**/ ?>
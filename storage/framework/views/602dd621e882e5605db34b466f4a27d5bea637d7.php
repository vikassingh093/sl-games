<!DOCTYPE html>


<?php $__env->startSection('page-title', trans('app.users')); ?>
<?php $__env->startSection('page-heading', trans('app.users')); ?>

<?php $__env->startSection('content'); ?>

<section class="content-header">
    <?php echo $__env->make('backend.partials.messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</section>

<section class="content">
    <div id="main-content" class="for-print">
        <form class="form-horizontal form-vertical" action="/user/gamelogs" method="get">
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
                <div class="control-group">
                    <label class="control-label">
                        <label for="DateFilterForm_game">Game</label> </label>
                    <div class="controls controls-row">
                        <select class="input-large" name="DateFilterForm[game]" id="DateFilterForm_game">
                            <option value="">-- all --</option>
                            <?php $__currentLoopData = $games; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $game): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <option value="<?php echo e($game->name); ?>" <?php echo e($game->name == $DateFilterForm['game'] ? 'selected' : ''); ?> ><?php echo e($game->name); ?></option>
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
            <table class="table table-striped table-hover">
                <tbody>
                    <tr>
                        <th width="125">Account #</th>
                        <th>Username</th>
                        <th>Game</th>
                        <th width="150" style="text-align: center;">Bet</th>
                        <th width="150" style="text-align: center;">Win</th>                                                
                        <th width="145">Date</th>                        
                        <th width="40">&nbsp;</th>
                </tr>
                    <?php $__currentLoopData = $gamelogs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $gamelog): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('backend.user.partials.row_gamelogs', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
            <div class="pagination">
                <?php echo e($gamelogs->appends(request()->query())->links()); ?>

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
        (function clock(container){
	    String.prototype.twoDigist = function(str){ return this.length == 1 ? ("0" + this) : this; };
        var serverTime = new Date("Jan 21, 2022 23:28:00"), localTime = Date.now(), timeDiff = serverTime.getTime() - localTime;
        function dateTime(){
            var date = new Date(Date.now() + timeDiff);
            return date.getFullYear() + "/" + (date.getMonth() + 1).toString().twoDigist() + "/" + date.getDate().toString().twoDigist() + " " +
                date.getHours().toString().twoDigist() + ":" + date.getMinutes().toString().twoDigist() + ":" + date.getSeconds().toString().twoDigist();
        }
        (function adminClock(){ $(container).html(dateTime()); setTimeout(adminClock, 1000); })();
        })("#clock-block");

        /*<![CDATA[*/
        jQuery(function($) {
        jQuery("#DateFilterForm_dateFrom").mask("99-99-9999");
        jQuery("#DateFilterForm_timeFrom").mask("99:99");
        jQuery("#DateFilterForm_dateTill").mask("99-99-9999");
        jQuery("#DateFilterForm_timeTill").mask("99:99");
        });
        jQuery(window).on('load',function() {
        $("body").tooltip({selector: "[rel=tooltip]", placement: "top"});
        });
        /*]]>*/

        $('.date').datepicker({
            
        });
        $('select.data-select-login').select2({
            ajax: {
                url: '/office/searchLogin?roles%5B0%5D=agent&roles%5B1%5D=cashier',
                dataType: 'json',
                delay: 250,
                cache: true,
                data: function(params) {
                    return {
                        login: params.term,
                        currency: $('#DateFilterForm_currencyId').val()
                    };
                },
                processResults: function(data) {
                    return {
                        results: $.map(data, function(item) {
                            return {
                                id: item.id,
                                text: item.text
                            }
                        })
                    };
                }
            },
            maximumSelectionLength: 0,
            minimumInputLength: 2
        });
        $(document).ready(function() {
            if ($('.receipt').length) {
                $('#print-button').hide();
            }
        });

        function printContent() {
            const
                $report = $('#report'),
                content = $report.length ? $('#date-filter').html() + '<hr>' + $report.html() : $(".for-print").html();

            $("#forprint").html(content);

            window.print();
        }
    });

    
    
        
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('backend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/gamelogs.blade.php ENDPATH**/ ?>
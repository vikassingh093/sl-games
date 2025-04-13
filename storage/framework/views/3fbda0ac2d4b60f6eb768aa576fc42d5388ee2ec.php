<div id="modal-withdrawal" class="modal hide fade">
    <form class="form-horizontal" id="yw2" action="<?php echo e(route('backend.user.balance.update')); ?>" method="post">
        <input id="modal-withdrawal-id" name="DepositeForm[id]" type="hidden" value="<?php echo e($user->id); ?>">
        <input name="DepositeForm[type]" id="DepositeForm_type" type="hidden" value="out">
        <?php echo csrf_field(); ?>
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>Redeem from the balance</h3>
        </div>
        <div class="modal-body">
            <div class="control-group text-center">
                <span id="modal-withdrawal-code" class="text-success lead">xx-xx-xx-xx-xx-xx</span>
            </div>
            <div class="control-group text-center">
                <span id="modal-reedem-available" class=""></span>
            </div>
            <div class="control-group">
                <label class="control-label"><label for="DepositeForm_amount" class="required">Amount <span class="required">*</span></label></label>
                <div class="controls">
                    <input id="modal-withdrawal-amount" autocomplete="off" placeholder="0.00" step="0.01" name="DepositeForm[amount]" type="number" min="0.01">
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <input class="btn btn-primary" type="submit" name="yt3" value="Redeem"> <input class="btn" data-dismiss="modal" aria-hidden="true" name="yt4" type="button" value="Cancel">
        </div>
                            
    </form>
</div>
<div id="modal-deposite" class="modal hide fade">
    <form class="form-horizontal" id="yw1" action="<?php echo e(route('backend.user.balance.update')); ?>" method="post">
        <input id="modal-deposite-id" name="DepositeForm[id]" type="hidden" value="<?php echo e($user->id); ?>">
        <input name="DepositeForm[type]" id="DepositeForm_type" type="hidden" value="add">
        <?php echo csrf_field(); ?>
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>Deposit the balance</h3>
        </div>
        <div class="modal-body">
            <div class="control-group text-center">
                <span id="modal-deposite-code" class="text-success lead">xx-xx-xx-xx-xx-xx</span>
            </div>
            <div class="control-group text-center">
                <span id="modal-deposite-available" class="">
                    Available: 
                <?php if( auth()->user()->hasRole(['admin'])): ?>
                    unlimited
                <?php elseif(auth()->user()->hasRole(['agent']) ): ?>
                    <?php echo e(auth()->user()->balance); ?>                   
                <?php else: ?>
                    <?php echo e(\VanguardLTE\Shop::where('id',auth()->user()->shop_id)->get()[0]->balance); ?>

                <?php endif; ?>
                </span>
            </div>
            <div class="control-group">
                <label class="control-label"><label for="DepositeForm_amount" class="required">Amount <span class="required">*</span></label></label>
                <div class="controls">
                    <input id="modal-deposite-amount" autocomplete="off" placeholder="0.00" step="0.01" name="DepositeForm[amount]" type="number" min="0.01">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <input class="btn btn-primary" type="submit" name="yt1" value="Deposit"> <input class="btn" data-dismiss="modal" aria-hidden="true" name="yt2" type="button" value="Cancel">
        </div>                    
    </form>
</div>
<?php /**PATH /var/www/RiverDragon/resources/views/backend/user/partials/modals.blade.php ENDPATH**/ ?>
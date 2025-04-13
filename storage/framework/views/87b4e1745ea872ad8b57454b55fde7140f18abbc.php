<table id="table-accounts" class="table table-striped table-hover">
    <tbody>
        <tr>
            <th width="105">Account #</th>
            <th width="20"></th>
            <th width="145">Created</th>
            <th>Username</th>
            <th width="175" style="text-align: right;">Balance</th>
            <th width="100" style="text-align: center;">State</th>
            <th width="100" style="text-align: center;">Logout player</th>
            <th width="150" style="text-align: center;">Deposit / Redeem</th>
            <th width="60" style="text-align: center;">Lock</th>
            <th width="60" style="text-align: center;">Setting</th>
            <th width="40" style="text-align: center;">Hist</th>
            <th width="40" style="text-align: center;">Logs</th>
        </tr>
        <?php $__currentLoopData = $players; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php echo $__env->make('backend.user.partials.row_player', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </tbody>
</table>
<div class="pagination">
    <?php echo e($players->links()); ?>

</div>

<script>
    $(function() {
        $(".pagination a").click(function() {
            var href = $(this).attr('href');
            var page = href.substring(href.indexOf("page=", 0), href.length).replace("page=", "");
            curPage = page;
            return call_post_func(page);
        });

        $('.toggle-switch').click(function(){
            var action;
            if($(this).hasClass('btn-success'))
                action = confirm('This account will be disconnected and locked.\nAre you sure to continue?');                    
            else
                action = confirm('Are you sure to unblock this player?');                

            if(action)
            {
                var data_id = $(this).data('id');
                var btn = this;
                jQuery.ajax(
                    {
                    'type':'POST',
                    'data': {'user_id':data_id, "_token": "<?php echo e(csrf_token()); ?>"},
                    'success': function(data){
                        $(btn).attr('class', data == 'enabled' ? 'btn btn-mini btn-success' : 'btn btn-mini btn-danger');
                        var result = data == 'enabled' ? 'User is recovered' : 'User is blocked';
                        alert(result);
                    },
                    
                    'url':'/user/toggle/' + data_id,
                    'cache':false});
            }
        })           

        $('.force-logout').click(function(){
            var action = confirm('Are you sure to kickout this player?');

            if(action)
            {
                var data_id = $(this).data('id');
                var btn = this;
                jQuery.ajax(
                    {
                    'type':'POST',
                    'data': {'user_id':data_id, "_token": "<?php echo e(csrf_token()); ?>"},
                    'success': function(data){
                        
                    },
                    
                    'url':'/user/kickout/' + data_id,
                    'cache':false});
            }
        })

        $('.delete-user').click(function(){
            var data_id = $(this).data('id');
            var btn = this;
        })
    });
    function call_post_func(href)
    {
        console.log(href);
        post_this(href, searchClue);
        return false;
    }

</script><?php /**PATH /var/www/RiverDragon/resources/views/backend/user/add_player_table.blade.php ENDPATH**/ ?>
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->

        <div class="span2">
            <div class="alert alert-block">
                <?php if( auth()->user()->hasRole(['admin'])): ?>
                <p>
                    Your balance: <b style="white-space: nowrap;">unlimited</b>
                </p>
                <?php elseif(auth()->user()->hasRole(['agent']) ): ?>
                <p>
                    Your balance: <b style="white-space: nowrap;"><?php echo e(auth()->user()->balance); ?> usd</b>
                </p>
                <?php else: ?>
                <p>
                    Your balance: <b style="white-space: nowrap;"><?php echo e(\VanguardLTE\Shop::where('id',auth()->user()->shop_id)->get()[0]->balance); ?> usd</b>
                </p>
                <?php endif; ?>
            </div>
            <div class="well well-small">
                <ul class="nav nav-list">
                    <li>
                        <?php if (\Auth::user()->hasPermission('users.manage')) : ?>
                        <?php if( auth()->user()->hasRole(['admin']) || auth()->user()->hasRole(['agent']) ): ?>
                        <a href="<?php echo e(route('backend.user.list')); ?>">
                            <i class="icon-user"></i>
                            <?php if( auth()->user()->hasRole(['admin']) ): ?>
                            <span><?php echo app('translator')->get('app.agent_management'); ?></span>
                            <?php elseif( auth()->user()->hasRole(['agent']) ): ?>
                            <span><?php echo app('translator')->get('app.shops_management'); ?></span>
                            <?php endif; ?>
                        </a>
                        <?php elseif(auth()->user()->hasRole(['manager']) || auth()->user()->hasRole(['cashier'])): ?>
                        <a href="<?php echo e(route('backend.user.player_create')); ?>">
                            <i class="icon-user"></i>
                            <span><?php echo app('translator')->get('app.accounts_management'); ?></span>
                        </a>
                        <?php endif; ?>
                        <?php endif; ?>
                    </li>
                    <?php if( auth()->user()->hasRole(['admin']) || auth()->user()->hasRole(['agent']) ): ?>
                    <li><a href="<?php echo e(route('backend.user.create')); ?>"><i class="icon-plus"></i><?php echo app('translator')->get('app.create_shop'); ?></a></li>
                    <?php else: ?>
                    <li><a href="/user/history"><i class="icon-calendar"></i><?php echo app('translator')->get('app.accounts_history'); ?></a></li>
                    <?php endif; ?>

                    <?php if( auth()->user()->hasRole(['manager']) || auth()->user()->hasRole(['agent']) || auth()->user()->hasRole(['admin']) ): ?>
                    <?php if (\Auth::user()->hasPermission('users.manage')) : ?>
                    <li><a href="<?php echo e(route('backend.user.transactions')); ?>"><i class="icon-search"></i><?php echo app('translator')->get('app.transaction_history'); ?></a></li>
                    <?php endif; ?>
                    <?php endif; ?>

                    <?php if( auth()->user()->hasRole(['admin']) || auth()->user()->hasRole(['agent']) || auth()->user()->hasRole(['manager']) ): ?>
                    <?php if (\Auth::user()->hasPermission('stats.pay')) : ?>
                    <li>
                        <a href="<?php echo e(route('backend.user.statistics')); ?>">
                            <i class="icon-signal"></i>
                            <?php echo app('translator')->get('app.statistics'); ?>
                        </a>
                    </li>
                    <?php endif; ?>
                    <?php endif; ?>

                    <?php if(auth()->user()->hasRole(['admin'])): ?>
                    <li>
                        <a href="<?php echo e(route('backend.jp.edit')); ?>">
                            <i class="icon-gift"></i>
                            <?php echo app('translator')->get('app.jackpot_settings'); ?>
                        </a>
                    </li>
                    <?php endif; ?>

                    <?php if(auth()->user()->hasRole(['admin'])): ?>
                    <a class="sub-btn" href="#"> <i class="icon-tasks"></i> Report</a>
                    <div class="sub-menu">
                        <a href="<?php echo e(route('backend.user.report')); ?>">
                            <?php echo app('translator')->get('app.game_report'); ?>
                        </a>
                        <a href="<?php echo e(route('backend.user.daily_report')); ?>">
                            <?php echo app('translator')->get('app.daily_report'); ?>
                        </a>
                    </div>                    
                    <li>
                        <a href="<?php echo e(route('backend.game.setting')); ?>">
                            <i class="icon-wrench"></i>
                            <?php echo app('translator')->get('app.game_setting'); ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo e(route('backend.shop.danger')); ?>">
                            <i class="icon-wrench"></i>
                            <?php echo app('translator')->get('app.danger_shop'); ?>
                        </a>
                    </li>
                    <?php endif; ?>
                    <!-- <?php if(!auth()->user()->hasRole(['cashier'])): ?>
                    <li><a href="/agent/jackpotsHistory"><i class="icon-gift"></i> Jackpots history</a></li>
                    <?php endif; ?> -->
                    <?php if(auth()->user()->hasRole(['manager'])): ?>
                    <li><a href="<?php echo e(route('backend.user.cashier_create')); ?>"><i class="icon-user"></i> Cashiers management</a></li>
                    <?php endif; ?>
                    <li>
                        <a href="<?php echo e(route('backend.jpg.jackpot_history')); ?>">
                            <i class="icon-gift"></i>
                            <?php echo app('translator')->get('app.jackpot_history'); ?>
                        </a>
                    </li>
                    <li>
                        <a class="sub-btn" href="#"> <i class="icon-camera"></i> Platform News</a>
                        <div class="sub-menu">
                            <a href="<?php echo e(route('backend.post.poster')); ?>" class="sub-item">Download Posters</a>
                            <a href="<?php echo e(route('backend.post.video')); ?>" class="sub-item">Download Videos</a>
                            <a href="<?php echo e(route('backend.post.news')); ?>" class="sub-item">Coming soon</a>
                            <?php if(auth()->user()->hasRole(['admin'])): ?>
                            <a href="<?php echo e(route('backend.post.notification')); ?>" class="sub-item">Notification</a>
                            <?php endif; ?>
                        </div>
                    </li>
                    <li class="divider"></li>
                    <li><a href="<?php echo e(route('backend.user.changepassword')); ?>"><i class="icon-wrench"></i> Change Password</a></li>
                    <li><a href="<?php echo e(route('backend.auth.logout')); ?>"> <i class="icon-off"></i> <?php echo app('translator')->get('app.logout'); ?></a></li>                    
                </ul>
            </div>
        </div>
    </section>
</aside>

<script type="text/javascript">
    $(document).ready(function() {
        //jquery for toggle sub menus
        $('.sub-btn').click(function() {
            $(this).next('.sub-menu').slideToggle();
            $(this).next('.sub-menu').css("display", "flex");
            $(this).next('.sub-menu').css("flex-direction", "column");
            $(this).find('.dropdown').toggleClass('rotate');
        });
    });
</script><?php /**PATH /var/www/RiverDragon/resources/views/backend/partials/sidebar.blade.php ENDPATH**/ ?>
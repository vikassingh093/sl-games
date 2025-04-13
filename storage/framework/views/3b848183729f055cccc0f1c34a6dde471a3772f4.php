<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />    
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap-responsive.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/custom.css?v=1.1" />
    <link rel="stylesheet" type="text/css" href="/lib/datepicker/css/datepicker.css" />
    <link rel="stylesheet" type="text/css" href="/lib/select2/css/select2.min.css" />
    <style type="text/css">
    /*<![CDATA[*/
    body {
        background-image: url('/images/bg.png');        
    }
            
    @media  print {
        body { padding: 0; margin: 0; background: none; }
        a:link:after, a:visited:after { content: ""; }
        .notforprint { display: none; }
        .forprint { display: block; }
        .for-print { display: block !important; }
    }

    @media  screen {
        .notforprint { display: block; }
        .forprint { display: none; }
    }
    /*]]>*/
    </style>
    <script type="text/javascript" src="/assets/e21adcaf/jquery.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/datepicker/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="/lib/select2/js/select2.min.js"></script>
    <script type="text/javascript" src="/assets/e21adcaf/jquery.maskedinput.min.js"></script>    
    <script type="text/javascript" src="/assets/e21adcaf/jquery.ba-bbq.min.js"></script>
    <script type="text/javascript" src="/js/main.js?v=1.1.1"></script>
    <script type="text/javascript" src="/js/fp.min.js"></script>
    <script type="text/javascript" src="/js/fp-bootstrap.js"></script>
    <script src="/back/bower_components/moment/min/moment.min.js"></script>
    <script src="/back/bower_components/moment/min/moment-timezone-with-data-1970-2030.min.js"></script>
    
    <title>River Dragon</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/main.css?v=1.02"/>
</head>

<body>
	<div class="notforprint">
        <style type="text/css">
            @media (min-width: 992px) {
                body {
                    padding-top: 80px;
                    padding-bottom: 40px;
                }
            }
        </style>
        <?php echo $__env->make('backend.partials.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <div class="container-fluid">
            <div class="row-fluid">            
                <div class="row-fluid">            
                    <?php echo $__env->make('backend.partials.sidebar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    <div class="span10">
                            <?php if( auth()->user()->hasRole(['admin'])): ?>
                            <ul class="breadcrumb">      
                        <ul class="breadcrumb">      
                            <ul class="breadcrumb">      
                                <li><span id="users_indicator"></span></li>
                            </ul>
                            <?php endif; ?>
                        <?php echo $__env->yieldContent('content'); ?>
                    </div>                
                </div>
            </div>
        </div>
        <footer class="pull-right">
            <small class="muted">© RiverDragon 2022</small>
        </footer>
	</div>
    <div id="forprint" class="forprint"></div>
    <script>
        function printContent(){
            const
                $report = $('#report'),
                content = $report.length ? $('#date-filter').html() + '<hr>' + $report.html() : $(".for-print").html();

            $("#forprint").html(content);

            window.print();
        }

        var interval = setInterval(() => {
            var t = (new Date()).getTime();
            $.ajax({
                url: '/user/isconnected?r=' + t,
                type: "GET",
                data: {},
                dataType: 'json',
                success: function (response) {
                    if(response.status == "logout")
                    {
                        clearInterval(interval);
                        window.location.href = '/login';
                    }                    
                },
                error: function (error) {                                 
                }
                
            });
        }, 5000);
    </script>
    <?php echo $__env->yieldContent('scripts'); ?>
</body><?php /**PATH /var/www/RiverDragon/resources/views/backend/layouts/app.blade.php ENDPATH**/ ?>
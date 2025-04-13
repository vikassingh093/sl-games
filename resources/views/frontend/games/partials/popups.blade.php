<div class="popup" id="loading_popup">
    <!--p id="gameLoadingGuide">This game could take up to 90 seconds to load. <br> Thank you for your patience.</p-->
    <p id="gameLoadingGuide">This game could take few seconds to load. <br> Thank you for your patience.</p>
    <div id="gameLoadingBack">        
        <div id="gameLoadingProgress"></div>
        <p id="progressPercent">0.00%</p>
    </div>
</div>
<script>
    $(function() {
        var div = $('#gameLoadingBack');
        var width = div.width();    
        div.css('height', width * 48 / 854);
    });

    window.addEventListener('resize', function(){
        var div = $('#gameLoadingBack');
        var width = div.width();    
        div.css('height', width * 48 / 854);
    }, false);

    addEventListener('message', function(e){
        
        try{
            var data = JSON.parse(e.data);            
            if(data.event == 'loadProgress')
            {                
                if(data.value >= 0.99999)
                {
                    setTimeout(()=>{$('#loading_popup').css('display', 'none');}, 2500);
                }
                else
                {
                    setGameLoadingProgress(data.value * 100);
                    $('#loading_popup').css('display', 'block');
                }
            }            
        }
        catch(e){}
    })

    function setGameLoadingProgress(progress)
    {
        if(progress > 100)
            progress = 100;
        var progress_div = $('#gameLoadingProgress');        
        progress_div.css('width', progress + '%');
        $('#progressPercent').html(parseFloat(progress).toFixed(2) + '%');
    }
</script>
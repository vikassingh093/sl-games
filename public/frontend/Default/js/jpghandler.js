function init()
{    
    setInterval(() => {
        var t = (new Date()).getTime();
        $.ajax({
            url: '/jpstv.json?r=' + t,
            type: "GET",
            data: {},
            dataType: 'json',
            success: function (response) {             
                if(response.status == "logout")
				{
					var isMobile;
					if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
						// true for mobile device                
						isMobile = true;
					}
					else 
					{
						// false for not mobile device
						isMobile = false;
					}
					
					if(!isMobile)
						window.location.href = '/logout';
					else
					{
                        if(window.vuplex)
                        {
                            window.vuplex.postMessage('logout');
                        }
                        try
                        {
                            JSBridge.sendMessageToNative("logout");    
                        }catch(e){}
                        try
                        {
                            window.webkit.messageHandlers.swiftJSBridge.postMessage("logout");
                        }catch(e){}
                    }
					return;
				}
                if(response.jackpots.length > 0)
                {
                    var name = '';
                    var win = 0;
                    for(var i = 0; i < response.jackpots.length; i++)
                    {
                        name = response.jackpots[i].name;
                        var lastjackpot = window.localStorage.getItem('jackpot_' + name);
                        if(lastjackpot != response.jackpots[i].date)
                        {
                            win = response.jackpots[i].win;
                            window.localStorage.setItem('jackpot_' + name, response.jackpots[i].date);
                            break;
                        }
                    }

                    //enable popup
                    if(win != 0)
                    {
                        showBonusPopup(name.toLowerCase()+'_jackpot', win);
                        var audio = new Audio('/frontend/Default/sound/jackpot.mp3');
                        audio.play();         
                    }
                }

                if(response.reward.length > 0)
                {
                    name = 'reward_bonus';
                    var lastreward = window.localStorage.getItem('reward');
                    if(lastreward != response.reward[0].date)
                    {
                        var win = parseFloat(parseFloat(response.reward[0].win).toFixed(2));
                        window.localStorage.setItem('reward', response.reward[0].date);
                        showBonusPopup(name, win);
                        var audio = new Audio('/frontend/Default/sound/cashback.mp3');
                        audio.play();                        
                    }
                }
            },
            error: function () {
            }
            
        });
    }, 5000);
}

function showBonusPopup(name, win)
{
    var ele = $('.notification_bonus');
    $('.notification_bonus').css('display', 'block');    
    var width = ele.width;
    var height = width * 731 / 1154;
    $('.notification_bonus').height(height);

    $('.bonus_wintype').attr('src', '/frontend/Default/img/' + name + '.png');
    $('.bonus_balance').html(win.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));    
}

window.addEventListener("load", (e) => {
    init();
});

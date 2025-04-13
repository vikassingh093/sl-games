import * as PIXI from "pixi.js";
import { EE } from "../../App";
import { HubDown } from "./elements/HubDown";
import {HubTop} from "./elements/HubTop";

export class Hub extends PIXI.Sprite{
	cont:PIXI.Sprite;
	down:HubDown;
	hubTop: HubTop;
	TTL: any;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.hubTop = new HubTop();
		this.cont.addChild(this.hubTop);
		this.down = this.cont.addChild(new HubDown());

		this.onResize = this.onResize.bind(this);
		
		EE.addListener("RESIZE", this.onResize);
		this.readJackpot();
		setInterval(()=>{this.readJackpot();}, 10000);
		this.TTL = 0;
	}

	onResize(data:any) {

		/*this.back.width = this.cont1mask.width = this.cont2mask.width = (data.w/data.scale);
		this.cont1.x = this.cont2.x = (this.back.width - 1920)/2;
		//
		let yy = (data.h/data.scale) - 116;
		if(yy<this.defaultY) yy = this.defaultY;
		this.cont2.y = this.cont2mask.y = this.back2.y = yy;
		 */
		this.down.y = (data.h/data.scale) - 134;
	}

	readJackpot()
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

		this.TTL += 5;
		
		if(this.TTL >= 180)
		{
			if(!isMobile)
				window.location.href = '/logout';
			else
			{
				var data = JSON.stringify({event: 'Logout', value: "logout"});
				window.postMessage(data, "*");
				window.location.href = '/logout';
			}
		}

		var t = (new Date()).getTime();
		fetch('/jpstv.json?r=' + t, {method: 'GET'})
            .then(response => response.json())
            .then(response => {
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
						var data = JSON.stringify({event: 'Logout', value: "logout"});
						window.postMessage(data, "*");
						window.location.href = '/logout';
					}
					return;
				}
				this.down.user.number.text = response.balance;     
                var content = response.content;				
				// console.log("jackpot response: " + content);
				this.hubTop.grand.number.text = content[3]['jackpot'];  
				this.hubTop.major.number.text = content[2]['jackpot'];  
				this.hubTop.minor.number.text = content[1]['jackpot'];  
				this.hubTop.mini.number.text = content[0]['jackpot'];  				

                //jackpot
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
                            win += parseFloat(parseFloat(response.jackpots[i].win).toFixed(2));
                            window.localStorage.setItem('jackpot_' + name, response.jackpots[i].date);
                            break;
                        }
                    }

                    //enable popup
                    if(win > 0)
                    {
                        this.showBonusPopup(name.toLowerCase()+'_jackpot', win);
						return;
                        // sound.play('jackpot');
                    }
                }
                // if(response.cashback.length > 0)
                // {
                //     name = 'cashback_bonus';
                //     var lastcashback = window.localStorage.getItem('cashback');
                //     if(lastcashback != response.cashback[0].date)
                //     {
                //         var win = parseFloat(parseFloat(response.cashback[0].win).toFixed(2));
                //         window.localStorage.setItem('cashback', response.cashback[0].date);
                //         this.showBonusPopup(name, win);                        
                //     }
                // }

				if(response.reward.length > 0)
                {
                    name = 'reward_bonus';
                    var lastreward = window.localStorage.getItem('reward');
                    if(lastreward != response.reward[0].date)
                    {
                        var win = parseFloat(parseFloat(response.reward[0].win).toFixed(2));
                        window.localStorage.setItem('reward', response.reward[0].date);
                       	this.showBonusPopup(name, win);
						return;
                    }
                }				
				
				if(response.reward_available)           
				{
					EE.emit("SHOW_BONUS");
					return;
				}

				if(response.sunday_funday.length > 0)
				{
					name = 'sunday_funday';
                    var lastsunday = window.localStorage.getItem('sunday_funday');
                    if(lastsunday != response.sunday_funday[0].date)
                    {
                        EE.emit('SHOW_LUCKY');
                        window.localStorage.setItem('sunday_funday', response.sunday_funday[0].date);
						return;
                    }
				}
            });
    }

	showBonusPopup(name:string, win:Number)
    {
        var popup = document.getElementsByClassName('notification_bonus');
        popup[0].setAttribute('style', 'display: block');
        var width = popup[0].clientWidth;
        var height = width * 731 / 1154;
        popup[0].setAttribute('style', 'height: ' + height + 'px');
        var ele = document.getElementsByClassName('bonus_wintype');
        ele[0].setAttribute('src', '/frontend/Default/img/' + name + '.png');
        ele = document.getElementsByClassName('bonus_balance');
        ele[0].innerHTML = win.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		  });
    }
}
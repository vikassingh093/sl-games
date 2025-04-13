import * as PIXI from "pixi.js";
import {JackpotUnit} from "./JackpotUnit";
import {ButtonItem} from "../../gui/ButtonItem";
import {EE} from "../../../App";
import {signOut} from "../../../server/server";
import {SOUND} from "../../../Game";
import { PAGE_SIZE_DEFAULT } from "../../../common/Config";

export class HubTop extends PIXI.Sprite{
	cont:PIXI.Sprite;
	unitcont:PIXI.Sprite;
	back:PIXI.Sprite;
	logo:PIXI.Sprite;
	frame_ex1:PIXI.Sprite;
	frame_ex2:PIXI.Sprite;

	grand: JackpotUnit;
	major: JackpotUnit;
	minor: JackpotUnit;
	mini: JackpotUnit;


	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/bg_up.png")));
		this.back.width = 1980;
		this.unitcont = this.cont.addChild(new PIXI.Sprite());
		const frame1 = this.unitcont.addChild(new Frame());
		frame1.x = 962;
		const frame2 = this.unitcont.addChild(new Frame());
		frame2.scale.x = -1;
		frame2.x = 962;

		this.logo = this.unitcont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/top_logo.png")));
		this.logo.x = 834;

		this.grand = new JackpotUnit("GRAND");
		const btn1 = this.unitcont.addChild(this.grand);
		btn1.x = 159;
		btn1.y = 17;

		this.major = new JackpotUnit("MAJOR");
		const btn2 = this.unitcont.addChild(this.major);
		btn2.x = 498;
		btn2.y = 17;

		this.minor = new JackpotUnit("MINOR");
		const btn3 = this.unitcont.addChild(this.minor);
		btn3.x = 1090;
		btn3.y = 17;

		this.mini = new JackpotUnit("MINI");
		const btn4 = this.unitcont.addChild(this.mini);
		btn4.x = 1422;
		btn4.y = 17;

		const buttonExit = this.unitcont.addChild(new ButtonItem("/images/screens/elements/buttons/exit.png", ()=>{
			signOut(()=>{
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
			})
		}));
		buttonExit.x = 13;

		const buttonSnd = this.unitcont.addChild(new ButtonItem("/images/screens/elements/buttons/sound.png", ()=>{
			buttonSnd.visible = false;
			buttonSndOff.visible = true;
			SOUND.muteSounds();
		}));
		buttonSnd.x = 1805;
		buttonSnd.y = -5;
		const buttonSndOff = this.unitcont.addChild(new ButtonItem("/images/screens/elements/buttons/sound2.png", ()=>{
			buttonSnd.visible = true;
			buttonSndOff.visible = false;
			SOUND.unmuteSounds();
		}));
		buttonSndOff.visible = false;
		buttonSndOff.x = 1805;
		buttonSndOff.y = -5;

		this.frame_ex1 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/jackpot/frame_extension.png")));
		this.frame_ex1.y = 1;

		this.frame_ex2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/jackpot/frame_extension.png")));
		this.frame_ex2.y = 1;

		this.onResize = this.onResize.bind(this);

		EE.addListener("RESIZE", this.onResize);
	}

	

	onResize(data:any) {
		const spaceX = (data.w/data.scale) - PAGE_SIZE_DEFAULT.width;
		this.back.width = (data.w/data.scale);
		this.frame_ex1.width = this.frame_ex2.width = spaceX/2;
		this.frame_ex2.x = this.back.width - spaceX/2;
		this.unitcont.x = spaceX/2;
	}

}

class Frame extends PIXI.Sprite{
	cont:PIXI.Sprite;
	animate:PIXI.AnimatedSprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.play = this.play.bind(this);
		//
		const json0 = PIXI.Loader.shared.resources["/images/anim/frame_up.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		this.animate = new PIXI.AnimatedSprite(array0);
		this.animate.animationSpeed = 0.5;
		this.animate.loop = true;
		this.cont.addChild(this.animate);
		this.animate.gotoAndPlay(1);
	}

	play() {
		this.animate.gotoAndPlay(1);
	}

}
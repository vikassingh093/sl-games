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
	// frame_ex1:PIXI.Sprite;
	// frame_ex2:PIXI.Sprite;

	grand: JackpotUnit;
	major: JackpotUnit;
	minor: JackpotUnit;
	mini: JackpotUnit;


	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.back = this.cont.addChild(new TopBack());

		this.unitcont = this.cont.addChild(new PIXI.Sprite());
		/*const frame1 = this.unitcont.addChild(new Frame());
		frame1.x = 962;
		const frame2 = this.unitcont.addChild(new Frame());
		frame2.scale.x = -1;
		frame2.x = 962;*/		

		this.grand = new JackpotUnit("GRAND");
		const btn1 = this.unitcont.addChild(this.grand);
		btn1.x = 90;
		btn1.y = 0;

		this.major = new JackpotUnit("MAJOR");
		const btn2 = this.unitcont.addChild(this.major);
		btn2.x = 410;
		btn2.y = 0;

		this.minor = new JackpotUnit("MINOR");
		const btn3 = this.unitcont.addChild(this.minor);
		btn3.x = 1190;
		btn3.y = 0;

		this.mini = new JackpotUnit("MINI");
		const btn4 = this.unitcont.addChild(this.mini);
		btn4.x = 1510;
		btn4.y = 0;

		this.logo = this.unitcont.addChild(new Logo());
		this.logo.y = -21.65;
		this.logo.x = 745;
		this.logo.visible = false;
		const buttonExit = this.unitcont.addChild(new ButtonItem("/images_christmas/screens/elements/buttons/exit.png", ()=>{
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
		buttonExit.x = 0;

		const buttonSnd = this.unitcont.addChild(new ButtonItem("/images_christmas/screens/elements/buttons/sound.png", ()=>{
			buttonSnd.visible = false;
			buttonSndOff.visible = true;
			SOUND.muteSounds();
		}));
		buttonSnd.x = 1815;
		buttonSnd.y = -10;
		const buttonSndOff = this.unitcont.addChild(new ButtonItem("/images_christmas/screens/elements/buttons/sound2.png", ()=>{
			buttonSnd.visible = true;
			buttonSndOff.visible = false;
			SOUND.unmuteSounds();
		}));
		buttonSndOff.visible = false;
		buttonSndOff.x = 1815;
		buttonSndOff.y = -10;

/*
		this.frame_ex1 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/jackpot/frame_extension.png")));
		this.frame_ex1.y = 1;

		this.frame_ex2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/jackpot/frame_extension.png")));
		this.frame_ex2.y = 1;
		*/

		this.onResize = this.onResize.bind(this);

		EE.addListener("RESIZE", this.onResize);
	}

	

	onResize(data:any) {
		const spaceX = (data.w/data.scale) - PAGE_SIZE_DEFAULT.width;
		//this.back.width = (data.w/data.scale);
		//this.frame_ex1.width = this.frame_ex2.width = spaceX/2;
		//this.frame_ex2.x = (data.w/data.scale) - spaceX/2;
		this.unitcont.x = spaceX/2;
	}

}

class TopBack extends PIXI.Sprite{
	contL:PIXI.Sprite = new PIXI.Sprite();
	contR:PIXI.Sprite = new PIXI.Sprite();
	constructor() {
		super();
		this.contL = this.addChild(new PIXI.Sprite());
		this.contL.anchor.x = 1;
		this.contL.scale.x = -1;
		this.contR = this.addChild(new PIXI.Sprite());
		this.onResize = this.onResize.bind(this);
		//
		EE.addListener("RESIZE", this.onResize);
		EE.emit('FORCE_RESIZE');
	}

	onResize(_data:any) {
		const len_segment = 199;
		this.contL.removeChildren();
		this.contR.removeChildren();
		const len = (_data.w/_data.scale)/2;
		this.contR.x = this.contL.x = len;
		const count = Math.ceil(len/len_segment)-1;
		for(let i=0;i<count;i++) {
			let pic_src = "/images_christmas/screens/elements/bg_up_multi.png";
			//if(i===(count-1)) pic_src = "images/screens/elements/bg_up_multi_end.png";
			const el = this.contR.addChild(new PIXI.Sprite(PIXI.Texture.from(pic_src)));
			el.x = i*len_segment;
			this.contR.addChild(el);
			const el2 = this.contR.addChild(new PIXI.Sprite(PIXI.Texture.from(pic_src)));
			el2.x = i*len_segment;
			this.contL.addChild(el2);
			if(i===(count-1)) {
				el.width = el2.width = (len - 180) - el.x;
			}
		}
		/*const end_r = this.contR.addChild(new PIXI.Sprite(PIXI.Texture.from("images/screens/elements/bg_up_multi_end.png")));
		end_r.x = len - 180;
		const end_l = this.contL.addChild(new PIXI.Sprite(PIXI.Texture.from("images/screens/elements/bg_up_multi_end.png")));
		end_l.x = len - 180;*/
		const end_r = this.contR.addChild(new Ball());
		end_r.x = len - 180;
		const end_l = this.contL.addChild(new Ball());
		end_l.x = len - 180;

	}
}
export class Frame extends PIXI.Sprite{
	cont:PIXI.Sprite;
	animate:PIXI.AnimatedSprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.play = this.play.bind(this);
		//
		const json0 = PIXI.Loader.shared.resources["/images_christmas/anim/frame_up.json"].spritesheet;
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
export class Ball extends PIXI.Sprite{
	cont:PIXI.Sprite;
	animate:PIXI.AnimatedSprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		let src = "/images_christmas/anim/ball_r.json";
		const json0 = PIXI.Loader.shared.resources[src].spritesheet;
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
		this.animate.play();
	}

}

export class Logo extends PIXI.Sprite{
	cont:PIXI.Sprite;
	animate:PIXI.AnimatedSprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		let src = "/images_christmas/anim/logo.json";
		const json0 = PIXI.Loader.shared.resources[src].spritesheet;
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
		this.animate.play();
	}

}
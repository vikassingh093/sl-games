import * as PIXI from "pixi.js";
import { EE } from "../../../App";
// import { User } from "../../../server/server";

// import {ButtonItem} from "../../gui/ButtonItem";
import { Buttons } from "./Buttons";
import {SliderControl} from "./SliderControl";
import {SOUND} from "../../../Game";
import { PAGE_SIZE_DEFAULT } from "../../../common/Config";

export class HubDown extends PIXI.Sprite{
	cont:PIXI.Sprite;
	unitcont:PIXI.Sprite;
	user:UserBlock;
	back:PIXI.Sprite;
	dback:PIXI.Sprite;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.unitcont = this.cont.addChild(new PIXI.Sprite());
		this.back = this.unitcont.addChild(new DownBack());
		this.back.x = 960;
		this.dback = this.unitcont.addChild(new DownBackCenter());
		this.dback.x = 645;
		this.dback.y = -52;
		this.user = this.unitcont.addChild(new UserBlock());
		this.user.y = 95;

		/*const backcb = this.unitcont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/down/backbtn.png")));
		backcb.x = 1475;
		backcb.y = -31.1;*/

		// const buttonCb = this.unitcont.addChild(new ButtonItem("/images_christmas/screens/elements/buttons/cashback.png", ()=>{
		// 	EE.emit('SHOW_RULES');
		// }));
		// buttonCb.x = 1570;
		// buttonCb.y = 70;

		const btns = this.unitcont.addChild(new Buttons());
		btns.x = -80;
		btns.y = 80;

		this.onResize = this.onResize.bind(this);
		EE.addListener("RESIZE", this.onResize);

	}

	onResize(data:any) {
		this.unitcont.x = ((data.w/data.scale) - PAGE_SIZE_DEFAULT.width)/2;
	}

}

class DownBack extends PIXI.Sprite{
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
		const len_segment = 262;
		this.contL.removeChildren();
		this.contR.removeChildren();
		const len = (_data.w/_data.scale)/2;
		const count = Math.ceil(len/len_segment);
		for(let i=0;i<count;i++) {
			let pic_src = "/images_christmas/screens/elements/bg_down_multi.png";
			const el = this.contR.addChild(new PIXI.Sprite(PIXI.Texture.from(pic_src)));
			el.x = i*len_segment;
			this.contR.addChild(el);
			const el2 = this.contR.addChild(new PIXI.Sprite(PIXI.Texture.from(pic_src)));
			el2.x = i*len_segment;
			this.contL.addChild(el2);
		}

	}
}

class UserBlock extends PIXI.Sprite{
	cont:PIXI.Sprite;
	animate:PIXI.AnimatedSprite;
	number: PIXI.Text;
	constructor() {
		super();
		const styletext = new PIXI.TextStyle({
			fontFamily: "Roboto",
			fontSize: "23px",
			fill: "#ACFFF6",
			dropShadow: true,
			dropShadowBlur: 1,
			dropShadowColor: "#000000",
			dropShadowDistance: 3,
			align: "center",
			fontWeight: "400"
		});

		const styletext2 = new PIXI.TextStyle({
			fontFamily: "Roboto",
			fontSize: "30px",
			fill: "#72E5FD",
			dropShadow: true,
			dropShadowBlur: 2,
			dropShadowColor: "#000000",
			dropShadowDistance: 2,
			align: "center",
			fontWeight: "500"
		});
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.play = this.play.bind(this);
		//
		const json0 = PIXI.Loader.shared.resources["/images_christmas/anim/user.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		this.animate = new PIXI.AnimatedSprite(array0);
		this.animate.animationSpeed = 0.3;
		this.animate.loop = true;
		this.animate.y = -23;
		this.cont.addChild(this.animate);
		this.animate.gotoAndPlay(1);
		this.animate.interactive = true;
		this.animate.buttonMode = true;
		this.animate.on('pointerdown', ()=>{
			SOUND.playSound('click');
			EE.emit('SHOW_INFO');
		})
		//
		this.cont.addChild(new SliderControl());
		//
		var username:string = document.getElementById('root')?.getAttribute('username')!;
		const nameuser = this.cont.addChild(new PIXI.Text(username, styletext));
		nameuser.x = 215 - (nameuser.width/2);
		nameuser.y = -10;

		var balance:string = document.getElementById('root')?.getAttribute('balance')!;
		this.number = this.cont.addChild(new PIXI.Text(balance, styletext2));
		this.number.x = 215 - (this.number.width/2);
		this.number.y = 20;
	}

	play() {
		this.animate.gotoAndPlay(1);
	}

}

let dwn_factor_color:number = 1;
class DownBackCenter extends PIXI.Sprite{
	cont:PIXI.Sprite;
	back2:PIXI.Sprite;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/down_back1.png")));
		this.back2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/down_back2.png")));
		this.back2.alpha = 0;
		//
		this.onUpdate = this.onUpdate.bind(this);

		EE.addListener("UPDATE", this.onUpdate);
	}

	onUpdate() {
		if(this.back2.alpha>=1) {
			dwn_factor_color = -1;
		}
		if(this.back2.alpha<=0) {
			dwn_factor_color = 1;
		}
		this.back2.alpha += 0.02*dwn_factor_color;
	}



}
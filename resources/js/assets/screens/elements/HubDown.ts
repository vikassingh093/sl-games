import * as PIXI from "pixi.js";
import { EE } from "../../../App";
// import { User } from "../../../server/server";

//import {ButtonItem} from "../../gui/ButtonItem";
import { Buttons } from "./Buttons";
import {SliderControl} from "./SliderControl";
import {SOUND} from "../../../Game";
import { PAGE_SIZE_DEFAULT } from "../../../common/Config";

export class HubDown extends PIXI.Sprite{
	cont:PIXI.Sprite;
	unitcont:PIXI.Sprite;
	user:UserBlock;
	dback:PIXI.Sprite;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.unitcont = this.cont.addChild(new PIXI.Sprite());
		this.dback = this.unitcont.addChild(new DownBack());
		this.dback.x = 410.5;
		this.user = this.unitcont.addChild(new UserBlock());
		this.user.y = -10;

		const backcb = this.unitcont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/down/backbtn.png")));
		backcb.x = 1475;

		// const buttonCb = this.unitcont.addChild(new ButtonItem("/images/screens/elements/buttons/cashback.png", ()=>{
		// 	EE.emit('SHOW_RULES');
		// }));
		// buttonCb.x = 1510;
		// buttonCb.y = 23;	

		const btns = this.unitcont.addChild(new Buttons());
		btns.x = 0;

		this.onResize = this.onResize.bind(this);
		EE.addListener("RESIZE", this.onResize);

	}

	onResize(data:any) {
		this.unitcont.x = ((data.w/data.scale) - PAGE_SIZE_DEFAULT.width)/2;
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
			fill: "0xBBE2FC",
			dropShadow: true,
			dropShadowBlur: 6,
			dropShadowColor: "#072E45",
			dropShadowDistance: 0,
			align: "center",
			fontWeight: "900"
		});

		const styletext2 = new PIXI.TextStyle({
			fontFamily: "Roboto",
			fontSize: "30px",
			fill: "0xBBE2FC",
			dropShadow: true,
			dropShadowBlur: 6,
			dropShadowColor: "#072E45",
			dropShadowDistance: 0,
			align: "center",
			fontWeight: "900"
		});
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.play = this.play.bind(this);
		//
		const json0 = PIXI.Loader.shared.resources["/images/anim/user.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		this.animate = new PIXI.AnimatedSprite(array0);
		this.animate.animationSpeed = 0.3;
		this.animate.loop = true;
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
		nameuser.x = 280 - (nameuser.width/2);
		nameuser.y = 38;

		var balance:string = document.getElementById('root')?.getAttribute('balance')!;
		this.number = this.cont.addChild(new PIXI.Text(balance, styletext2));
		this.number.x = 320 - (this.number.width/2);
		this.number.y = 73;
	}

	play() {
		this.animate.gotoAndPlay(1);
	}

}

let dwn_factor_color:number = 1;
class DownBack extends PIXI.Sprite{
	cont:PIXI.Sprite;
	back2:PIXI.Sprite;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/down_back1.png")));
		this.back2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/screens/elements/down_back2.png")));
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
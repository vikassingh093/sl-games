import * as PIXI from "pixi.js";
import {EE} from "../../../App";

let jp_factor_back:number = 1;
let jp_factor_color:number = 1;
const styletext = new PIXI.TextStyle({
	fontFamily: "Roboto",
	fontSize: "23px",
	fill: "0xffffff",
	stroke: "#333333",
	strokeThickness: 4,
	align: "center",
	fontWeight: "700"
});


export class JackpotUnit extends PIXI.Sprite{
	cont:PIXI.Sprite;
	back:PIXI.Sprite;
	back_light:PIXI.Sprite;
	color_btn:PIXI.Sprite;
	color_btn_light:PIXI.Sprite;
	number: PIXI.Text;
	constructor(type:string) {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/jackpot/bg_jackpot.png")));
		this.back_light = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images_christmas/screens/elements/jackpot/bg_jackpot_light.png")));
		this.back_light.alpha = 0;
		//
		this.color_btn = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(`/images_christmas/screens/elements/jackpot/bg_${type.toLowerCase()}.png`)));
		this.color_btn_light = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(`/images_christmas/screens/elements/jackpot/bg_${type.toLowerCase()}_light.png`)));
		this.color_btn_light.visible = false;
		this.color_btn_light.x = this.color_btn.x = 0;
		this.color_btn_light.y = this.color_btn.y = 11;


		const txt = this.cont.addChild(new PIXI.Text(type.toUpperCase(), styletext));
		txt.x = 62 - (txt.width/2);
		txt.y = 30;
		//
		const styletextmoney = new PIXI.TextStyle({
			fontFamily: "Roboto",
			fontSize: "32px",
			fill: "0xFFE395",
			fontWeight: "400",
			miterLimit: 2,
			align: "right",
			strokeThickness: 2
		});
		this.number = this.cont.addChild(new PIXI.Text("", styletextmoney));
		this.number.x = 140;
		this.number.y = 23;
		/*switch (type) {
			case "MINI":
				txtmoney.text = "$ " + (User.info as any).content[0].jackpot;
				break;
			case "MINOR":
				txtmoney.text = "$ " + (User.info as any).content[1].jackpot;
				break;
			case "MAJOR":
				txtmoney.text = "$ " + (User.info as any).content[2].jackpot;
				break;
			case "GRAND":
				txtmoney.text = "$ " + (User.info as any).content[3].jackpot;
				break;
		}*/
		//this.onResize = this.onResize.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.flashBack = this.flashBack.bind(this);
		this.colorAnimation = this.colorAnimation.bind(this);


		//EE.addListener("RESIZE", this.onResize);
		EE.addListener("UPDATE", this.onUpdate);
		//this.flashBack();
	}

	onUpdate() {
		this.flashBack();
		this.colorAnimation();
	}

	colorAnimation() {
		jp_factor_color++;
		if(jp_factor_color===30) this.color_btn_light.visible = true;
		if(jp_factor_color===60) {
			this.color_btn_light.visible = false;
			jp_factor_color = 1;
		}
	}

	flashBack() {
		if(this.back_light.alpha>=1) {
			jp_factor_back = -1;
		}
		if(this.back_light.alpha<=0) {
			jp_factor_back = 1;
		}
		this.back_light.alpha += 0.01*jp_factor_back;
	}

	/*onResize(data:any) {
		this.logo.x = (data.w/data.scale) - 1920;
		//this.back1.scale.y = this.back2.scale.y = (data.h/data.scale)/1080;
	}*/

}
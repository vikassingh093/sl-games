import * as PIXI from "pixi.js";
//import { Bubble } from "./Bubble";
//import {Light1} from "./Light1";
//import {Light2} from "./Light2";
import {EE} from "../App";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

/**
 * application background
 */
export class Background extends PIXI.Sprite{
	//fon2mask:PIXI.Graphics;
	cont:PIXI.Sprite;
	back2:PIXI.Sprite;
	back1:PIXI.Sprite;
	constructor() {
		super();
		//
		this.onResize = this.onResize.bind(this);
		EE.addListener("RESIZE", this.onResize);
		this.cont = this.addChild(new PIXI.Sprite());
		//head background
		this.back1 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/back.jpg")));
		//extra background for wide screen
		this.back2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/back2.png")));
		//add panel with animation




		//this.cont.addChild(new Light1());
		//this.cont.addChild(new Light2());
		/*for(let i=0;i<20;i++) {
			this.cont.addChild(new Bubble());
		}*/


	}

	/**
	 * Arranges buttons based on screen size
	 * @param data
	 */
	onResize(data:any) {
		this.back2.x = (data.w/data.scale) - PAGE_SIZE_DEFAULT.width;
		this.back1.scale.y = this.back2.scale.y = (data.h/data.scale)/PAGE_SIZE_DEFAULT.height;
	}


}
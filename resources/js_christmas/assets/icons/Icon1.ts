import * as PIXI from "pixi.js";
import {HotTag} from "./HotTag";
import {NewTag} from "./NewTag";
import {SOUND} from "../../Game";
import {MAX_COUNT_COLUMN, WIDTH_COLUMN} from "../../common/Config";
/**
 * Big game icon
 */
export class Icon1 extends PIXI.Sprite{
	cont:PIXI.Sprite;
	piccont:PIXI.Sprite;
	_page:number = 0;
	_column:number = 0;
	url:string;
	/**
	 * Big game icon
	 * @param data	game data object
	 */
	constructor(data:any) {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.cont.addChild(new PIXI.Graphics()).beginFill(0x2A0D47, 1)
			.moveTo(8,88).lineTo(58,59).lineTo(171,43).lineTo(298,58).lineTo(353,85)
			.lineTo(353,636).lineTo(291,667).lineTo(177,681).lineTo(59,665).lineTo(9,639)
			.lineTo(8,88).endFill();
		//
		this.piccont = this.cont.addChild(new PIXI.Sprite());
		this.piccont.mask =
			this.cont.addChild(new PIXI.Graphics()).beginFill(0x0000ff, 1)
				.moveTo(8,88).lineTo(58,59).lineTo(171,43).lineTo(298,58).lineTo(353,85)
				.lineTo(353,636).lineTo(291,667).lineTo(177,681).lineTo(59,665).lineTo(9,639)
				.lineTo(8,88).endFill();
		const img = PIXI.Sprite.from(data.src);
		img.y = 48;
		img.x = 8;
		this.piccont.addChild(img);

		//
		const json0 = PIXI.Loader.shared.resources["/images_christmas/anim/icon1b.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate0 = new PIXI.AnimatedSprite(array0);
		animate0.animationSpeed = 0.5;
		animate0.loop = true;
		animate0.x = -37;
		animate0.y = -3;
		this.cont.addChild(animate0);
		animate0.play();
		//


		//check hot tag
		if(data.tag==="hot") {
			const hot = this.cont.addChild(new HotTag());
			hot.x = 250;
			hot.y = -10;
		}
		//check new tag
		if(data.tag==="new") {
			const newicon = this.cont.addChild(new NewTag());
			newicon.x = 250;
			newicon.y = -10;
		}

		this.url = data.url;
		//
		this.on('click', this.onClick, this);
		this.on('tap', this.onClick, this);
		//
		this.interactive = true;
		this.buttonMode = true;
	}

	onClick() {
		SOUND.muteSounds();
		window.location.href = this.url!;
	}

	set column(val:number) {
		this._column = val;
		this.page = Math.ceil(val/MAX_COUNT_COLUMN);
		let real_col = val%MAX_COUNT_COLUMN;
		if(real_col===0) real_col = MAX_COUNT_COLUMN;
		this.x = (real_col-1)*WIDTH_COLUMN;
	}

	get column() {
		return this._column;
	}

	set page(val:number) {
		this._page = val;
	}

	get page() {
		return this._page;
	}

}
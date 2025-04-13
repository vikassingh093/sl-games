import * as PIXI from "pixi.js";
import {HotTag} from "./HotTag";
import {NewTag} from "./NewTag";
import {SOUND} from "../../Game";
import { MAX_COUNT_COLUMN, WIDTH_COLUMN } from "../../common/Config";
/**
 * Small game icon
 */
export class Icon2 extends PIXI.Sprite{
	cont:PIXI.Sprite;
	piccont:PIXI.Sprite;
	_page:number = 0;
	_column:number = 0;
	url:string;

	/**
	 * Small game icon
	 * @param data	game data object
	 */
	constructor(data:any) {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.cont.addChild(new PIXI.Graphics()).beginFill(0x2A0D47, 1).moveTo(12,62)
			.lineTo(24,52).lineTo(290,52).lineTo(299,67).lineTo(300,334).lineTo(290,345).lineTo(21,345)
			.lineTo(12,334).lineTo(12,62)
			.endFill();

		this.piccont = this.cont.addChild(new PIXI.Sprite());
		this.piccont.mask = this.cont.addChild(new PIXI.Graphics()).beginFill(0x0000ff, 1).moveTo(12,62)
			.lineTo(24,52).lineTo(290,52).lineTo(299,67).lineTo(300,334).lineTo(290,345).lineTo(21,345)
			.lineTo(12,334).lineTo(12,62)
			.endFill();

		const img = PIXI.Sprite.from(data.src);
		img.y = 51;
		img.x = 14;
		//img.width = 286;
		//img.height = 290;
		//img.scale.set(1.3,1.1);
		this.piccont.addChild(img);
		//
		const json0 = PIXI.Loader.shared.resources["/images/anim/icon2b.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate0 = new PIXI.AnimatedSprite(array0);
		animate0.animationSpeed = 0.5;
		animate0.loop = true;
		this.cont.addChild(animate0);
		animate0.play();
		//


		//check hot tag
		if(data.tag==="hot") {
			const hot = this.cont.addChild(new HotTag());
			hot.x = 208;
			hot.y = 0;
		}
		//check new tag
		if(data.tag==="new") {
			const newicon = this.cont.addChild(new NewTag());
			newicon.x = 208;
			newicon.y = 0;
		}
		//
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
		this.x = (real_col-1)*WIDTH_COLUMN + 30;
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
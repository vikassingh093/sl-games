import * as PIXI from "pixi.js";
import {SELECTED_PART, updateSelectButton, UPDATE_BIG_BUTTONS, SOUND} from "../../../Game";
import {EE} from "../../../App";

/**
 * game list filter button
 */
export class GameButton extends PIXI.Sprite{
	cont:PIXI.Sprite;
	state1:PIXI.Sprite;
	state2:PIXI.Sprite;
	pic:PIXI.Sprite;

	/**
	 * id type button. 1-all 2-fish, 3-clot, 4-firelink
	 */
	ID:number;

	/**
	 * game list filter button
	 * @param idd	1-all 2-fish, 3-clot, 4-firelink
	 */
	constructor(idd:number) {
		super();
		//
		this.ID = idd;
		this.updateState = this.updateState.bind(this);
		this.tapDown = this.tapDown.bind(this);
		this.tapUp = this.tapUp.bind(this);
		this.clickThis = this.clickThis.bind(this);


		//button animation
		this.cont = this.addChild(new PIXI.Sprite());
		this.pic = this.cont.addChild(new PIXI.Sprite());

		this.state1 = this.pic.addChild(new PIXI.Sprite(PIXI.Texture.from(`/images/screens/elements/buttons/g${idd}btn1.png`)));
		this.state2 = this.pic.addChild(new PIXI.Sprite(PIXI.Texture.from(`/images/screens/elements/buttons/g${idd}btn2.png`)));
		this.state2.visible = false;

		this.on('pointerdown', this.tapDown);
		this.on('pointerup', this.tapUp);
		this.on('pointerupoutside', this.tapUp);
		this.on('pointercancel', this.tapUp);

		this.on('click', this.clickThis);
		this.on('tap', this.clickThis);
		//
		EE.addListener(UPDATE_BIG_BUTTONS, this.updateState);
		this.updateState();
		//
		this.interactive = true;
		this.buttonMode = true;

	}

	/**
	 * mouse down
	 */
	tapDown() {
		if(this.ID===SELECTED_PART) return;
		this.pic.x = 8;
		this.pic.y = 8;
		this.pic.scale.set(0.9);
	}

	/**
	 * mouse up
	 */
	tapUp() {
		if(this.ID===SELECTED_PART) return;
		this.pic.x = 0;
		this.pic.y = 0;
		this.pic.scale.set(1);
	}

	/**
	 * click button
	 */
	clickThis() {
		if(this.ID===SELECTED_PART) return;
		SOUND.playSound('click');
		this.tapUp();
		updateSelectButton(this.ID);
		this.updateState();
	}

	/**
	 * updates the state of the button (select/unselect)
	 */
	updateState() {
		this.state2.visible = (this.ID===SELECTED_PART);
	}



}
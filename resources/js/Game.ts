import initRenderer from "./initRenderer";
import * as PIXI from "pixi.js";
//import {loadJsonData} from "./common/Utils";
import {gsap} from "gsap";
import PixiPlugin from "gsap/src/PixiPlugin";
import { Hub } from "./assets/screens/Hub";
import {HubIcons} from "./assets/screens/HubIcons";
import {EE} from "./App";
import Sound from "./sounds/Sound";

/**
 * main stage
 */
export let stage:PIXI.Container;
/**
 * main renderer
 */
export let RENDERER:PIXI.Renderer;
//
export let SOUND:Sound;
/**
 * selected section of games
 */
export let SELECTED_PART:number=1;

/**
 * event name to update the state of large filter buttons for games
 */
export let UPDATE_BIG_BUTTONS:string="UPDATE_BIG_BUTTONS";
/**
 * click on the games section button
 * @param idd	1-fish, 2-clot, 3-firelink
 */
export function updateSelectButton(idd:number) {
	SELECTED_PART = idd;
	EE.emit(UPDATE_BIG_BUTTONS);
}

/**
 * entry point function
 */
 export async function setup() {
	//load config hson
	//await loadJsonData();
	//create renderer
	RENDERER = initRenderer();
	//create stage
	stage = new PIXI.Container();
	//add pixi support
	gsap.registerPlugin(PixiPlugin);
	PixiPlugin.registerPIXI(PIXI);
	//get money and add game
	//getMoney(createHub);
	createHub();
	//
	//redraw(-1, RENDERER);
	//
	let ticker = PIXI.Ticker.shared;
	ticker.autoStart = false;
	ticker.stop();
	function animate(time:any) {
		ticker.update(time);
		RENDERER.render(stage);
		requestAnimationFrame(animate);
	}
	animate(performance.now());
}

function createHub() {
	SOUND = new Sound();
	stage.addChild(new Hub());
	const games = stage.addChild(new HubIcons());
	games.y = 160;
}

/**
 * the function redraws the page to display the content
 * @param _time
 * @param renderer
 */
/*
const redraw = (_time:number, renderer:PIXI.Renderer) => {
	requestAnimationFrame(t => redraw(t, renderer));
	renderer.render(stage);
	EE.emit('UPDATE');
};*/

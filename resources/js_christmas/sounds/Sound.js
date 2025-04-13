/**
 * ...
 * @author ivms-flash
 */

import * as PIXI from "pixi.js";
import { sound } from '@pixi/sound';
let MUTE = false;
export class Sounds
{
	constructor()
	{
		sound.add({
			back: '/sounds/background.mp3',
			swipe: '/sounds/swipe.mp3',
			click: '/sounds/CLICK.mp3'
		});
		//
		sound.play('back', {loop: true});
	}

	playSound(namesound)
	{
		if(MUTE)
		{
		 	sound.muteAll();
			return;
		}
		try {
			sound.play(namesound);
		} catch(e) {

		}
	}

	globalSoundsPause()
	{
		sound.togglePauseAll();
	}

	globalSoundsStop()
	{
		sound.stopAll();
	}

	unmuteSounds() {
		MUTE = false;
		sound.unmuteAll();
	}

	muteSounds()
	{
		//sound.toggleMuteAll();
		MUTE = true;
		sound.muteAll();
	}

	static clear()
	{
		console.log("clear");
		//this.removeAllChildren();
	}
}

export default Sounds;


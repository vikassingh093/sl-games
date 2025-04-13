import './App.css';
import React from 'react';
import TopWindows from "./TopWindows";
import * as PIXI from "pixi.js";
import { listImages } from './common/Config';
import EventEmitter from "eventemitter3";
import ErrorWindow from "./windows/ErrorWindow";
import { setup } from './Game';

/**
 * global Event Emitter
 */
export let EE:EventEmitter = new EventEmitter();
///
export let imagesLoader:PIXI.Loader;

class App extends React.Component {

	componentDidMount() {
		//const preloader = document.getElementsByClassName("preloader-game-bar");
		const preloaderbase = document.getElementsByClassName("preloader-game");
		//
		imagesLoader = PIXI.Loader.shared;
		imagesLoader.add(listImages);
		imagesLoader.onProgress.add(() => {
			/*if(preloader[0]) {
				(preloader[0] as any).style.setProperty("filter", `grayscale(${100 - loader.progress}%)`);
			}*/
		});
		imagesLoader.onError.add((e) => {
			console.log('ERROR LOAD! ', e);
		});
		imagesLoader.onComplete.add(() => {
			//PIXI.utils.clearTextureCache();
			if(preloaderbase[0]) {
				(preloaderbase[0] as any).style.setProperty("opacity", "0");
				setTimeout(()=>{
					(preloaderbase[0] as any).style.setProperty("display", "none");
					(preloaderbase[0] as any).parentNode.removeChild((preloaderbase[0] as any));
					
				}, 1000);
			}			
			EE.emit('CLEAR_TOP_WINDOWS');

			var type:string = document.getElementById('root')?.getAttribute('type')!;
			if(type == 'hub')
				setup();
			else
			{
				EE.emit('SHOW_LOGIN');
				document.getElementById('AppGame')?.style.setProperty("display", "none");
			}			
		});
		
		imagesLoader.load();
		//
		/*EE.once('GO_GAME', ()=>{
			EE.emit('CLEAR_TOP_WINDOWS');
			setup();
		})*/
	}

	render () {
		return (
			<div>
				<ErrorWindow/>
				<TopWindows/>
				<div id="AppGame"/>
			</div>
		)
	}
}

export default App;

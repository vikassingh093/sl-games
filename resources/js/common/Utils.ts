import * as PIXI from "pixi.js";
import { Games } from "./Config";

export let gamesLoader:PIXI.Loader;

/**
 * Load config.json file
 */
export async function loadJsonData(): Promise<[]> {
	return new Promise((resolve) => {
		let jsonPath = 'config.json';
		const jsonLoader = new PIXI.Loader();
		jsonLoader.add('items', jsonPath);
		jsonLoader.onError.add((err: any, _loader: PIXI.Loader, resource: any) => {
			resolve([]);
			console.error('Error loading config.json: ' + err.message + '\nURL : ' + resource.url);
		});
		//add image upload
		jsonLoader.load(async (_loader, resources) => {
			gamesLoader = PIXI.Loader.shared;

			const data = (resources as any).items.data.games;
			if (data) {
				//three sections of the game
				const part1 = data.part1;
				const part2 = data.part2;
				const part3 = data.part3;
				let i=0;
				for (const item of part1) {
					Games.push({ part: "1", img: 'game1'+i, id: item.id, size: item.size, tag: item.tag });
					gamesLoader.add('game1'+i, item.src);
					i++;
				}
				i=0;
				for (const item of part2) {
					Games.push({ part: "2", img: 'game2'+i, id: item.id, size: item.size, tag: item.tag });
					gamesLoader.add('game2'+i, item.src);
					i++;
				}
				i=0;
				for (const item of part3) {
					Games.push({ part: "3", img: 'game3'+i, id: item.id, size: item.size, tag: item.tag });
					gamesLoader.add('game3'+i, item.src);
					i++;
				}
			}

			gamesLoader.onComplete.add(() => {
				PIXI.utils.clearTextureCache();
				resolve([]);
			});
			gamesLoader.load();
		});
	});
}

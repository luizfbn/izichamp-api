import {
	IChampionPrice,
	IReqTranslChampions,
	IReqTranslSkins,
	ISkinPrice,
} from './api';

export function processChampion(
	champion: IChampionPrice,
	translChampions: IReqTranslChampions['data']
) {
	return {
		id: champion.id,
		key: champion.key,
		name: champion.name,
		tilePath: champion.icon,
		title: translChampions[champion.key]
			? translChampions[champion.key].title
			: champion.title,
		cost: {
			rp: champion.price.rp,
			blueEssence: champion.price.blueEssence,
		},
	};
}

export function processSkins(
	skins: ISkinPrice[],
	translSkins: IReqTranslSkins
) {
	const availableSkins = skins.filter((skin) => {
		if (
			skin.name === 'Original' ||
			skin.cost === 'Special' ||
			skin.availability === 'Upcoming'
		) {
			return false;
		}
		return true;
	});
	return availableSkins.map((skin) => {
		const data = translSkins[skin.id]
			? {
					name: translSkins[skin.id].name,
					tilePath: mapImagePath(translSkins[skin.id].tilePath),
					loadScreenPath: mapImagePath(translSkins[skin.id].loadScreenPath),
			  }
			: {
					name: skin.name,
					tilePath: skin.tilePath,
					loadScreenPath: skin.loadScreenPath,
			  };
		return {
			id: skin.id,
			cost: {
				rp: skin.cost as number,
			},
			...data,
		};
	});
}

function mapImagePath(path: string) {
	const newPath = path.toLocaleLowerCase().split('/lol-game-data/assets/')[1];
	return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${newPath}`;
}

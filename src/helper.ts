import { IRequestSkins, ISkinPrice } from './api';

export function processSkins(
	skins: ISkinPrice[],
	translatedSkins: IRequestSkins
) {
	return skins.filter((skin) => {
		if (
			skin.name === 'Original' ||
			skin.cost === 'Special' ||
			skin.availability === 'Upcoming'
		) {
			return false;
		}
		if (translatedSkins[skin.id]) {
			skin.name = translatedSkins[skin.id].name;
			skin.tilePath = mapImagePath(translatedSkins[skin.id].tilePath);
		}
		return true;
	});
}

function mapImagePath(path: string) {
	const newPath = path.toLocaleLowerCase().split('/lol-game-data/assets/')[1];
	return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${newPath}`;
}

import axios from 'axios';
import { IReqTranslSkins, ITranslSkin, ISkinPrice } from './api/types';

export async function getData<T>(url: string) {
	try {
		const { data }: { data: T } = await axios(url);
		return data;
	} catch (error) {
		throw error;
	}
}

export function mapImagePath(path: string) {
	const newPath = path.toLocaleLowerCase().split('/lol-game-data/assets/')[1];
	return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${newPath}`;
}

export function removeTagsFromText(text: string) {
	return text.replace(/<\/?[\w\s]*>|<.+[\W]>/g, ' ');
}

export function getOrangeEssenceValue(rp: number) {
	switch (rp) {
		case 520:
			return 220;
		case 750:
			return 450;
		case 975:
			return 675;
		case 1350:
			return 1050;
		case 1820:
			return 1520;
		default:
			return rp;
	}
}

type IProcessSkinsParams =
	| {
			skins: ISkinPrice[];
			translSkins: IReqTranslSkins;
			type: 'object';
	  }
	| {
			skins: ISkinPrice[];
			translSkins: ITranslSkin[];
			type: 'array';
	  };

export function processSkins({
	skins,
	translSkins,
	type,
}: IProcessSkinsParams) {
	return availableSkins(skins).map((skin) => {
		const translSkin =
			type === 'object'
				? translSkins[skin.id]
				: translSkins.find((elem) => elem.id === skin.id);
		const data = translSkin
			? {
					name: translSkin.name,
					tilePath: mapImagePath(translSkin.tilePath),
					loadScreenPath: mapImagePath(translSkin.loadScreenPath),
			  }
			: {
					name: skin.name,
					tilePath: skin.tilePath,
					loadScreenPath: skin.loadScreenPath,
			  };
		return {
			id: skin.id,
			...data,
			cost: {
				rp: skin.cost as number,
				orangeEssence: getOrangeEssenceValue(skin.cost as number),
			},
		};
	});
}

function availableSkins(skins: ISkinPrice[]) {
	return skins.filter((skin) => {
		if (
			skin.name === 'Original' ||
			skin.cost === 'Special' ||
			skin.availability === 'Upcoming'
		) {
			return false;
		}
		return true;
	});
}

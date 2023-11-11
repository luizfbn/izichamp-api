import axios from 'axios';

type IReqChampionsPrices = { [key: string]: IChampionPrice };
export type IReqTranslChampions = { data: { [key: string]: ITranslChampion } };
export type IReqTranslSkins = { [key: string]: ITranslSkin };

export async function getPrices() {
	try {
		const { data }: { data: IReqChampionsPrices } = await axios(
			'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
		);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getTranslChampions() {
	try {
		const { data }: { data: IReqTranslChampions } = await axios(
			'https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion.json'
		);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getTranslSkins() {
	try {
		const { data }: { data: IReqTranslSkins } = await axios(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/skins.json'
		);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getChampion(id: number) {
	try {
		const { data }: { data: IChampion } = await axios(
			`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champions/${id}.json`
		);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getVersion() {
	try {
		const { data }: { data: string[] } = await axios(
			'https://ddragon.leagueoflegends.com/api/versions.json'
		);
		return data[0];
	} catch (error) {
		console.log(error);
	}
}

export const CHAMPIONS_WITH_PRICES_URL =
	'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json';
export type IChampionPrice = {
	id: number;
	key: string;
	name: string;
	title: string;
	icon: string;
	skins: ISkinPrice[];
	price: {
		blueEssence: number;
		rp: number;
	};
};

export type ISkinPrice = {
	id: number;
	name: string;
	availability: 'Available' | 'Legacy' | 'Upcoming';
	cost: number | 'Special';
	tilePath: string;
	loadScreenPath: string;
};

export const CHAMPION_PT_BR_URL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champions';
export type IChampion = {
	id: number;
	name: string;
	alias: string;
	title: string;
	shortBio: string;
	squarePortraitPath: string;
	passive: {
		name: string;
		abilityIconPath: string;
		description: string;
	};
	spells: {
		spellKey: string;
		name: string;
		abilityIconPath: string;
		description: string;
	}[];
	skins: ITranslSkin[];
};

export const SKINS_PT_BR_URL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/skins.json';
export type ITranslSkin = Omit<ISkinPrice, 'availability' | 'cost'>;

export const CHAMPIONS_URL =
	'https://ddragon.leagueoflegends.com/cdn/{version}/data/pt_BR/champion.json';
export type ITranslChampion = {
	id: string;
	key: string;
	name: string;
	title: string;
};

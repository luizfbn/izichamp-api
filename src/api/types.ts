export type IReqChampionsPrices = { [key: string]: IChampionPrice };
export type IReqTranslChampions = { data: { [key: string]: ITranslChampion } };
export type IReqTranslSkins = { [key: string]: ITranslSkin };

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

export type ITranslChampionById = {
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

export type ITranslSkin = Omit<ISkinPrice, 'availability' | 'cost'>;

export type ITranslChampion = {
	id: string;
	key: string;
	name: string;
	title: string;
};

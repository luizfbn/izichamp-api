import { getData } from '../helper';

export const Patch = getPatch();

export const ApiUrls = {
	TranslChampions: getTranslChampionsUrl(),
	TranslSkins:
		'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/skins.json',
	TranslChampionById:
		'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champions',
	Prices:
		'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json',
};

async function getTranslChampionsUrl() {
	const version = await Patch;
	return `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`;
}

async function getPatch() {
	const defaultVersion = '13.22.1';
	try {
		const versions = await getData<string[]>(
			'https://ddragon.leagueoflegends.com/api/versions.json'
		);
		const version = versions[0] ? versions[0] : defaultVersion;
		return version;
	} catch (error) {
		return defaultVersion;
	}
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { getData, processSkins } from '../helper';
import { ApiUrls } from '../api/config';
import {
	IReqChampionsPrices,
	IReqTranslChampions,
	IReqTranslSkins,
	ITranslChampion,
	IChampionPrice,
} from '../api/types';

type getChampionsAndSkinsResponse = ({
	id: number;
	name: string;
	tilePath: string;
} & (championResponse | skinResponse))[];

type championResponse = {
	key: string;
	title: string;
	cost: {
		rp: number;
		blueEssence: number;
	};
};

type skinResponse = {
	loadScreenPath: string;
	cost: {
		rp: number;
		orangeEssence: number;
	};
};

export async function getChampionsAndSkins(
	req: FastifyRequest,
	res: FastifyReply
) {
	const responseData: getChampionsAndSkinsResponse = [];
	await Promise.all([
		getData<IReqChampionsPrices>(ApiUrls.Prices),
		getData<IReqTranslChampions>(await ApiUrls.TranslChampions),
		getData<IReqTranslSkins>(ApiUrls.TranslSkins),
	])
		.then((response) => {
			const [prices, translChampions, translSkins] = response;
			Object.values(prices).forEach((item) => {
				// if (item.key === 'Briar') return;
				const translChampion = translChampions.data[item.key];
				responseData.push(processChampion(item, translChampion));
				responseData.push(
					...processSkins({
						skins: item.skins,
						translSkins,
						type: 'object',
					})
				);
			});
		})
		.catch((error) => {
			res.code(500).send(error);
		});
	res.send(responseData);
}

function processChampion(
	champion: IChampionPrice,
	translChampions?: ITranslChampion
) {
	return {
		type: 'Champion',
		id: champion.id,
		key: champion.key,
		name: translChampions ? translChampions.name : champion.name,
		tilePath: champion.icon,
		title: translChampions ? translChampions.title : champion.title,
		cost: {
			rp: champion.price.rp,
			blueEssence: champion.price.blueEssence,
		},
	};
}

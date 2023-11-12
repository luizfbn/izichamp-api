import { FastifyReply, FastifyRequest } from 'fastify';
import {
	getTranslChampions,
	getPrices,
	getTranslSkins,
	IChampionPrice,
	IReqTranslChampions,
} from '../api';
import { processSkins } from '../helper';

type championList = ({
	id: number;
	name: string;
	tilePath: string;
} & (responseChampion | responseSkin))[];

type responseChampion = {
	key: string;
	title: string;
	cost: {
		rp: number;
		blueEssence: number;
	};
};

type responseSkin = {
	loadScreenPath: string;
	cost: {
		rp: number;
		orangeEssence: number;
	};
};

export async function championList(req: FastifyRequest, res: FastifyReply) {
	const responseData: championList = [];
	await Promise.all([getPrices(), getTranslChampions(), getTranslSkins()])
		.then((response) => {
			const [prices, translChampions, translSkins] = response;
			Object.values(prices).forEach((item) => {
				if (item.key === 'Briar') return;
				responseData.push(processChampion(item, translChampions.data));
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

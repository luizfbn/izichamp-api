import { FastifyReply, FastifyRequest } from 'fastify';
import {
	getChampion,
	getTranslChampions,
	getPrices,
	getTranslSkins,
} from './api';
import { processChampion, processSkins } from './helper';

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
				responseData.push(...processSkins(item.skins, translSkins));
			});
		})
		.catch((error) => {
			res.code(500).send(error);
		});
	res.send(responseData);
}

export async function champion(
	req: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	res: FastifyReply
) {
	try {
		const prices = await getPrices();
		const paramId = req.params.id.toLowerCase();
		const championKey = Object.keys(prices).find(
			(champion) => champion.toLocaleLowerCase() === paramId
		);
		if (championKey) {
			const champion = await getChampion(prices[championKey].id);
			res.send(champion);
		} else {
			res.code(404).send({
				message: 'Champion not found',
			});
		}
	} catch (error) {
		res.code(500).send(error);
	}
}

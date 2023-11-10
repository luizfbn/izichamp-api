import { FastifyReply, FastifyRequest } from 'fastify';
import {
	IChampionPriceList,
	ISkinPrice,
	getChampion,
	getChampions,
	getPrices,
	getSkins,
} from './api';
import { processSkins } from './helper';

export async function championList(req: FastifyRequest, res: FastifyReply) {
	let procData: (IChampionPriceList | ISkinPrice[])[] = [];
	await Promise.all([getPrices(), getChampions(), getSkins()])
		.then((response) => {
			Object.values(response[0]).forEach((item) => {
				if (item.key === 'Briar') return;
				if (response[1].data[item.key]) {
					item.title = response[1].data[item.key].title;
				}
				item.skins = processSkins(item.skins, response[2]);
				procData.push(item);
				procData.push(item.skins);
			});
		})
		.catch((error) => {});
	res.send(procData);
}

export async function champion(req: FastifyRequest, res: FastifyReply) {
	Promise.all([getPrices(), getChampion(10)])
		.then((response) => {})
		.catch((error) => {});
}

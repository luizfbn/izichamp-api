import { FastifyReply, FastifyRequest } from 'fastify';
import { getPrices, getChampion, IChampion, IChampionPrice } from '../api';
import { mapImagePath, processSkins, removeTagsFromText } from '../helper';

export async function champion(
	req: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	res: FastifyReply
) {
	try {
		const pricesReq = await getPrices();
		const paramId = req.params.id.toLowerCase();
		const championKey = Object.keys(pricesReq).find(
			(champion) => champion.toLocaleLowerCase() === paramId
		);
		if (championKey) {
			const championReq = await getChampion(pricesReq[championKey].id);
			const champion = processChampion(pricesReq[championKey], championReq);
			const skins = processSkins({
				skins: pricesReq[championKey].skins,
				translSkins: championReq.skins,
				type: 'array',
			});
			const responseData = {
				...champion,
				skins,
			};
			res.send(responseData);
		} else {
			res.code(404).send({
				message: 'Champion not found',
			});
		}
	} catch (error) {
		res.code(500).send(error);
	}
}

function processChampion(champion: IChampionPrice, translChampion: IChampion) {
	return {
		id: translChampion.id,
		name: translChampion.name,
		alias: translChampion.alias,
		title: translChampion.title,
		shortBio: translChampion.shortBio,
		squarePortraitPath: mapImagePath(translChampion.squarePortraitPath),
		cost: {
			rp: champion.price.rp,
			blueEssence: champion.price.blueEssence,
		},
		passive: {
			name: translChampion.passive.name,
			abilityIconPath: mapImagePath(translChampion.passive.abilityIconPath),
			description: removeTagsFromText(translChampion.passive.description),
		},
		spells: translChampion.spells.map((spell) => {
			return {
				spellKey: spell.spellKey,
				name: spell.name,
				abilityIconPath: mapImagePath(spell.abilityIconPath),
				description: removeTagsFromText(spell.description),
			};
		}),
	};
}

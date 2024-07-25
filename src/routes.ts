import { FastifyInstance } from 'fastify';
import { getPatch } from './controllers/patchController';
import { getChampionsAndSkins } from './controllers/championsAndSkinsController';
import {
	getChampions,
	getChampionById,
} from './controllers/championController';

export async function routes(app: FastifyInstance) {
	app.get('/', getChampionsAndSkins);
	app.get('/champions', getChampions);
	app.get('/champions/:id', getChampionById);
	app.get('/patch', getPatch);
}

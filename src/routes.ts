import { FastifyInstance } from 'fastify';
import { championList } from './controllers/championListController';
import { champion } from './controllers/championController';

export async function routes(app: FastifyInstance) {
	app.get('/champions', championList);
	app.get('/champion/:id', champion);
}

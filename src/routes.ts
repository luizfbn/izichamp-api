import { FastifyInstance } from 'fastify';
import { champion, championList } from './controller';

export async function routes(app: FastifyInstance) {
	app.get('/champions', championList);
	app.get('/champion/:id', champion);
}

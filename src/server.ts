import fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify();
app.register(cors, {
	origin: true,
});
app.register(routes);

const baseUrl = process.env.BASE_URL
	? process.env.BASE_URL
	: 'http://localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;
app
	.listen({
		port,
	})
	.then(() => {
		console.log(`HTTP server running on ${baseUrl}:${port}`);
	});

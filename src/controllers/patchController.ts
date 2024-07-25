import { FastifyReply, FastifyRequest } from 'fastify';
import { Patch } from '../api/config';

export async function getPatch(req: FastifyRequest, res: FastifyReply) {
	try {
		const responseData = await Patch;
		res.send(responseData);
	} catch (error) {
		res.code(500).send(error);
	}
}

import type { FastifyRequest, FastifyReply } from 'fastify';
import { getAuth } from '@clerk/fastify';

declare module 'fastify' {
    interface FastifyRequest {
        userId?: string;
    }
}

export const shouldBeAuthenticated = async (request: FastifyRequest, reply: FastifyReply) => {
    const auth = getAuth(request) as any
    const userId = auth.userId

    if (!userId) {
        return reply.status(401).send({ message: 'You are not logged in' })
    }

    request.userId = userId;
}
import Fastify from "fastify";
import 'dotenv/config'
import { clerkPlugin } from '@clerk/fastify';
import { shouldBeAuthenticated } from './middleware/auth.middleware.js';

const port = Number(process.env.PORT) || 8001;

const fastify = Fastify();

// Clerk Plugin
fastify.register(clerkPlugin)

// Routes
fastify.get("/health", (req, reply) => {
    reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
        message: 'Order service is running'
    });
});

fastify.get("/test", { preHandler: shouldBeAuthenticated }, (request, reply) => {
    reply.status(200).send({
        message: 'Order service is authenticated',
        userId: request.userId
    });
});

const start = async () => {
    try {
        // Promise.all([
        //   await connectOrderDB(),
        //   await producer.connect(),
        //   await consumer.connect(),
        // ]);
        // await runKafkaSubscriptions();
        await fastify.listen({ port });
        console.log(`Order service is running on http://localhost:${port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();
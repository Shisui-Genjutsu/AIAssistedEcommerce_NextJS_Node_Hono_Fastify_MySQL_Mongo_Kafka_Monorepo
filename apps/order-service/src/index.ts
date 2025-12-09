import Fastify from "fastify";

const port = Number(process.env.PORT) || 8001;

const fastify = Fastify();

fastify.get("/health", (req, reply) => {
    reply.status(200).send({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: 'Order service is running'
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
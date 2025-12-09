import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const port = Number(process.env.PORT) || 8002;

const app = new Hono()

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: 'Payment service is running'
  })
})

const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port
    }, (info) => {
      console.log(`Payment service is running on http://localhost:${info.port}`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start();

import { serve } from '@hono/node-server'
import { type Context, Hono } from 'hono'
import { clerkMiddleware } from '@hono/clerk-auth'
import { shouldBeAuthenticated } from './middleware/auth.middleware.js';

const port = Number(process.env.PORT) || 8002;

const app = new Hono()

// Clerk Middleware
app.use(clerkMiddleware())

// Routes
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: 'Payment service is running'
  })
})

app.get('/test', shouldBeAuthenticated, (c: Context) => {
  return c.json({
    message: 'Payment service is authenticated',
    userId: c.get('userId')
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

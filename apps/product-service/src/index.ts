import express, { type Request, type Response } from "express";
import cors from "cors";
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { shouldBeUser } from './middleware/auth.middleware.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';

const port = process.env.PORT || 8000;

const app = express();

// Middlewares
// Clerk Middleware
app.use(clerkMiddleware());

// CORS Middleware
app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
}));

// Routes
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
        message: 'Product service is running'
    });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
    res.json({
        message: 'Product service is authenticated',
        userId: req.userId
    });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
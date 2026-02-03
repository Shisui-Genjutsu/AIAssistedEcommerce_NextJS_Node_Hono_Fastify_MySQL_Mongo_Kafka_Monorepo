import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { shouldBeUser } from './middleware/auth.middleware.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

const port = process.env.PORT || 8000;

const app = express();

// Middlewares
app.use(express.json());

// Clerk Middleware
app.use(clerkMiddleware());

// CORS Middleware
app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003", "http://localhost:8000"],
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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }'
}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error!" });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
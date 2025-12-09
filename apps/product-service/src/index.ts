import express, { type Request, type Response } from "express";
import cors from "cors";

const port = process.env.PORT || 8000;

const app = express();

app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
}));

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
        message: 'Product service is running'
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
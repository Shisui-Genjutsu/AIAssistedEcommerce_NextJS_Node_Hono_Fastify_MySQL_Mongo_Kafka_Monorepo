import type { Request, Response } from "express";
import { Prisma, prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const data: Prisma.ProductCreateInput = req.body;

        const { colors, images } = data;

        if (!colors || !Array.isArray(colors)) {
            return res.status(400).json({ message: "Colors is required and must be an array" });
        }

        if (!images || typeof images !== "object") {
            return res.status(400).json({ message: "Images is required and must be an object" });
        }

        const missingColors = colors.filter(color => !(color in images));

        if (missingColors.length > 0) {
            return res.status(400).json({ message: `Missing images for colors: ${missingColors.join(", ")}` });
        }

        const product = await prisma.product.create({ data });
        res.status(201).json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data: Prisma.ProductUpdateInput = req.body;
        const product = await prisma.product.update({ where: { id }, data });
        res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await prisma.product.delete({ where: { id } });
        res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const getProducts = async (req: Request, res: Response) => {
    const { sort, category, search, limit } = req.query;

    const orderBy = (() => {
        switch (sort) {
            case "asc":
                return { price: Prisma.SortOrder.asc };
            case "desc":
                return { price: Prisma.SortOrder.desc };
            case "oldest":
                return { createdAt: Prisma.SortOrder.asc };
            default:
                return { createdAt: Prisma.SortOrder.desc };
        }
    })()

    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    slug: {
                        contains: category as string
                    },
                },
                name: {
                    contains: search as string,
                    mode: "insensitive",
                },
            },
            orderBy,
            take: limit ? Number(limit) : undefined
        });
        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
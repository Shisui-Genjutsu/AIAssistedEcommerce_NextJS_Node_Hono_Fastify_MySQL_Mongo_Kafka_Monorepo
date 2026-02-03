import type { Request, Response } from "express";
import { type Prisma, prisma } from "@repo/product-db";

export const createCategory = async (req: Request, res: Response) => {
    const data: Prisma.CategoryCreateInput = req.body;

    if (!data.name || !data.slug) {
        return res.status(400).json({ message: "Name and slug are required" });
    }

    try {
        const category = await prisma.category.create({ data });
        res.status(201).json(category);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data: Prisma.CategoryUpdateInput = req.body;

    try {
        const category = await prisma.category.update({ where: { id }, data });
        res.json(category);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const category = await prisma.category.delete({ where: { id } });
        res.json(category);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const getCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
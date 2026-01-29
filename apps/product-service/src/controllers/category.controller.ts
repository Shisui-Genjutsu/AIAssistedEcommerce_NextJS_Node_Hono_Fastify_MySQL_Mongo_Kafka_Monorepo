import type { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    // const data: Prisma.CategoryCreateInput = req.body;
    res.json({ message: "Category service" });
};

export const updateCategory = async (req: Request, res: Response) => {
    res.json({ message: "Category service" });
};

export const deleteCategory = async (req: Request, res: Response) => {
    res.json({ message: "Category service" });
};

export const getCategories = async (req: Request, res: Response) => {
    res.json({ message: "Category service" });
};

export const getCategory = async (req: Request, res: Response) => {
    res.json({ message: "Category service" });
};
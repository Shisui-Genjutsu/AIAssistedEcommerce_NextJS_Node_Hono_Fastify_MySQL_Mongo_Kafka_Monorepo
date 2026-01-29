import type { Request, Response } from "express";
import { type Prisma, prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
    const data: Prisma.ProductCreateInput = req.body;
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data: Prisma.ProductUpdateInput = req.body;
    const product = await prisma.product.update({ where: { id }, data });
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await prisma.product.delete({ where: { id } });
    res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();
    res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    res.json(product);
};
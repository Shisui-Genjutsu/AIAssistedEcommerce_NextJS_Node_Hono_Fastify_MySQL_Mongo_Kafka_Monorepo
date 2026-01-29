import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory
} from '../controllers/category.controller'

const router: Router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);

export default router;
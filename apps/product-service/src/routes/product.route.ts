import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controllers/product.controller'

const router: Router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "OM" });
});

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

export default router;
import express from "express";
import formidable from "express-formidable";


const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import { create, list, read } from "../controllers/product.js";

router.post('/product', requireSignin, isAdmin, formidable(), create )
router.get("/products", list);
router.get("/product/:slug", read);


export default router;
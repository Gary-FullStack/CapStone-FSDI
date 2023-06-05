import express from "express";


const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import { create, 
    update, 
    remove, 
    list, 
    read,
    productsByCategory, 
} from "../controllers/category.js";


// lets get the entire CRUD involved   
// using value/:parameter and get returns the Id needed
router.post('/category', requireSignin, isAdmin, create);
router.put('/category/:categoryId', requireSignin, isAdmin, update);
router.delete('/category/:categoryId', requireSignin, isAdmin, remove);
router.get('/categories', list);
// this is a non logged in search, so use slug to search as a real name
router.get('/category/:slug', read);
router.get("/products-by-category/:slug", productsByCategory);

export default router; 
import express from "express";

const router = express.Router();


// middleware
import { requireSignin } from "../middlewares/auth.js";

// controllers
import { register, login } from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);

router.get("/secret", requireSignin, (req, res) => {
    res.json({message: " you can see teh secret route"})
});


export default router;
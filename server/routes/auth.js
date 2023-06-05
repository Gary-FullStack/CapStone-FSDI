import express from "express";

const router = express.Router();


// middleware
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import { register, login, secret, updateProfile } from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);

// user protected route
router.get("/auth-check", requireSignin, (req, res) => {
    res.json({ ok: true });
});

// admin protected route
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
    res.json({ ok: true });
});

// user profile updates
router.put("/profile", requireSignin, updateProfile );

router.get("/secret", requireSignin, isAdmin, secret);


export default router; 
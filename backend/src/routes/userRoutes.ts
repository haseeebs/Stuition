// Node modules
import { Router } from "express";

// Controllers
import { login, logout, register } from "controllers/userController";

const router = Router();

// Register a new user
router.post('/register', register);

// User login
router.post("/login", login);

// User logout
router.post("/logout", logout);

export default router;
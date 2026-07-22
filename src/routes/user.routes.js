import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// rotas públicas
router.post("/login", userController.login);

// Rotas protegidas
router.get("/", authMiddleware, userController.getAll);
router.post("/", authMiddleware, userController.create);
router.delete("/:id", authMiddleware, userController.remove);

export default router;

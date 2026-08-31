import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

// rotas públicas
router.post("/login", userController.login);

// Rotas protegidas
router.get("/", authMiddleware, authorize("admin"), userController.getAll);
router.post("/", authMiddleware, authorize("admin"), userController.create);
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  userController.remove,
);
router.get("/me", authMiddleware, userController.getMe);
router.post("/logout", userController.logout);

export default router;

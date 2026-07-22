import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();
// Rotas protegidas
// qualquer usuário autenticado pode ver.
router.get("/", authMiddleware, categoryController.getAll);
// só admin pode criar, editar e deletar.
router.post("/", authMiddleware, authorize("admin"), categoryController.create);
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  categoryController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  categoryController.remove,
);

export default router;

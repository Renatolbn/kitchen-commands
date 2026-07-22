import { Router } from "express";
import menuItemController from "../controllers/menuItem.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();
// Rotas protegidas.
// qualquer usuário autenticado pode ver.
router.get("/", authMiddleware, menuItemController.getAll);
// só admin pode criar, editar e deletar.
router.post("/", authMiddleware, authorize("admin"), menuItemController.create);
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  menuItemController.update,
);
router.patch(
  "/:id/availability",
  authMiddleware,
  authorize("admin"),
  menuItemController.toggleAvailability,
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  menuItemController.remove,
);

export default router;

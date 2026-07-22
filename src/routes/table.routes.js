import { Router } from "express";
import tableController from "../controllers/table.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();
// Rotas protegidas
router.get("/", authMiddleware, tableController.getAll);
router.post("/", authMiddleware, authorize("admin"), tableController.create);
router.put("/:id", authMiddleware, authorize("admin"), tableController.update);
router.patch("/:id/status", authMiddleware, tableController.updateStatus);
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  tableController.remove,
);

export default router;

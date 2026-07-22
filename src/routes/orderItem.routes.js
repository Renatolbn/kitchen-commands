import { Router } from "express";
import orderItemController from "../controllers/orderItem.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();
// Rotas protegidas
router.get("/", authMiddleware, orderItemController.getAll);
router.patch(
  "/:id/status",
  authMiddleware,
  authorize("kitchen"),
  orderItemController.updateStatus,
);
router.delete("/:id", authMiddleware, orderItemController.remove);

export default router;

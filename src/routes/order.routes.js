import { Router } from "express";
import orderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();
// Rotas protegidas
router.get("/", authMiddleware, orderController.getAll);
router.post("/", authMiddleware, authorize("waiter"), orderController.create);
router.put("/:id", authMiddleware,authorize("waiter", "kitchen"), orderController.update);
router.patch(
  "/:id/status",
  authMiddleware,
  authorize("waiter", "kitchen"),
  orderController.updateStatus,
);
router.delete("/:id", authMiddleware, authorize("admin", "waiter"), orderController.remove);

export default router;

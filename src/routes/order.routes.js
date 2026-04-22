import { Router } from "express";
import orderController from "../controllers/order.controller.js";

const router = Router();

router.get("/", orderController.getAll);
router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.patch("/:id/status", orderController.updateStatus);
router.delete("/:id", orderController.remove);

export default router;

import { Router } from "express";
import menuItemController from "../controllers/menuItem.controller.js";

const router = Router();

router.get("/", menuItemController.getAll);
router.post("/", menuItemController.create);
router.put("/:id", menuItemController.update);
router.patch("/:id/availability", menuItemController.toggleAvailability);
router.delete("/:id", menuItemController.remove);

export default router;

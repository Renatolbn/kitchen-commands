import { Router } from 'express'
import orderItemController from '../controllers/orderItem.controller.js'

const router = Router();

router.get("/", orderItemController.getAll);
router.patch("/:id/status", orderItemController.updateStatus);
router.delete("/:id", orderItemController.remove);

export default router;

import { Router } from 'express'
import tableController from '../controllers/table.controller.js'

const router = Router();

router.get("/", tableController.getAll);
router.post("/", tableController.create);
router.put("/:id", tableController.update);
router.patch("/:id/status", tableController.updateStatus);
router.delete("/:id", tableController.remove);

export default router;

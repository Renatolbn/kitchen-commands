import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.post("/login", userController.login);
router.delete("/:id", userController.remove);

export default router;
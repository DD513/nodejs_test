import { Router } from "express";
import userController from '../controller/userController';

const router = Router();

router.use("/", userController.getUser);

export default router;
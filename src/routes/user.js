import { Router } from "express";
import userController from '../controller/userController';

const router = Router();

router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.patch('/', userController.patchUser);
router.delete('/', userController.deleteUser);


export default router;
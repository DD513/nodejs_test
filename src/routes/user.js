import { Router } from "express";
import userController from '../controller/userController';
import UserMiddleware from '../middlewares/user';

const router = Router();

router.get('/',
    UserMiddleware.jwtAuthenticate,
    userController.getUser);
router.post('/',
    UserMiddleware.Authenticate,
    userController.postUser);
router.patch('/', userController.patchUser);
router.delete('/', userController.deleteUser);


export default router;
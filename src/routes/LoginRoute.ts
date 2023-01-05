import LoginController from "../controller/user/LoginController";
import { Router } from "express";

const router = Router();

router.post('/', LoginController.login);

export default router;
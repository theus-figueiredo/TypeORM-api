import { Router } from "express";
import UserController from "../controller/user/UserController";

const router = Router();

router.post('/', UserController.store);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.patch('/:id', UserController.update);
router.post('/:id/role/', UserController.assignRole);
router.post('/:id/cost-center', UserController.addCostCenter);
router.delete('/:id/cost-center', UserController.removeCostCenter);
router.delete('/:id', UserController.delete);

export default router;

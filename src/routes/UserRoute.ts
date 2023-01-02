import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.post('/', UserController.store);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.patch('/:id', UserController.update);
router.patch('/role/:id/', UserController.assignRole);
router.patch('/cost-center/:id/', UserController.addCostCenter);
router.patch('/cost-center/remove/:id', UserController.removeCostCenter);
router.delete('/cost-center/remove/all/:id', UserController.removeAllCostCenters);
router.delete('/delete/:id', UserController.delete);

export default router;

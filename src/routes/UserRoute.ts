import { Router } from "express";
import UserController from "../controller/userController";

const router = Router();

router.post('/', UserController.store);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.patch('/:id', UserController.update);
router.post('/role/:id', UserController.assignRole);
router.post('/cost-center/:id', UserController.addCostCenter);
router.delete('/cost-center/remove/:id', UserController.removeCostCenter);
router.delete('/cost-center/remove/all/:id', UserController.removeAllCostCenters);
router.delete('/:id', UserController.delete);

export default router;

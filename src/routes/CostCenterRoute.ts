import { Router } from "express";
import CostCenterController from "../controller/customer/CostCenterController";

const router = Router();

router.post('/', CostCenterController.store);
router.get('/', CostCenterController.getAll)
router.get('/:id', CostCenterController.getById);
router.patch('/:id', CostCenterController.update);
router.delete('/:id', CostCenterController.delete);

export default router;

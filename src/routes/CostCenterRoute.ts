import { Router } from "express";
import CostCenterController from "../controller/CostCenterController";

const router = Router();

router.post('/', CostCenterController.store);
router.get('/', CostCenterController.getAll)
router.get('/:id', CostCenterController.getById);
router.patch('/update/:id', CostCenterController.update);
router.delete('/delete/:id', CostCenterController.delete);

export default router;

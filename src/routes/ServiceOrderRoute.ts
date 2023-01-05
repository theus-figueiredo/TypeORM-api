import { Router } from 'express';
import ServiceOrderController from '../controller/serviceOrder/ServiceOrderController';

const router = Router();

router.post('/', ServiceOrderController.store);
router.post('/category/:id', ServiceOrderController.addCategory);
router.get('/', ServiceOrderController.getAll);
router.get('/:id', ServiceOrderController.getById)
router.patch('/:id', ServiceOrderController.updateData);
router.patch('/status/:id', ServiceOrderController.updateStatus);
router.patch('/cost-center/:id', ServiceOrderController.updateCostCenter);
router.patch('/category/:id', ServiceOrderController.removeCategory);
router.delete('/:id', ServiceOrderController.delete);

export default router;

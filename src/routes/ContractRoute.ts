import { Router } from 'express';
import ContractController from '../controller/contract/ContractController';

const router = Router();

router.post('/', ContractController.store);
router.get('/', ContractController.getAll);
router.get('/:id', ContractController.getById);
router.patch('/:id', ContractController.update);
router.patch('type/:id', ContractController.assignType);
router.delete('/:id', ContractController.remove);

export default router;

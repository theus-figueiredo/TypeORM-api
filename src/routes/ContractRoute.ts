import { Router } from 'express';
import ContractController from '../controller/contract/ContractController';

const router = Router();

router.post('/', ContractController.store);
router.get('/', ContractController.getAll);
router.get('/:id', ContractController.getById);
router.patch('/update/:id', ContractController.update);
router.patch('/assign/type/:id', ContractController.assignType);
router.patch('/remove/type/:id', ContractController.removeType);
router.delete('/delete/:id', ContractController.remove);

export default router;

import { Router } from 'express';
import ContractController from '../controller/ContractController';

const router = Router();

router.patch('/:id', ContractController.updateContract);

export default router;

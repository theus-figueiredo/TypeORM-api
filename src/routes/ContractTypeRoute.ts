import ContractTypeController from "../controller/ContractTypeController";
import { Router } from "express";

const router = Router();

router.post('/', ContractTypeController.store);
router.get('/', ContractTypeController.getAll);
router.get('/:id', ContractTypeController.getById);
router.patch('/update/:id', ContractTypeController.update);
router.delete('/delete/:id', ContractTypeController.delete);

export default router;

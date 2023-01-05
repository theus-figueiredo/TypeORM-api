import { Router } from "express";
import CategoryController from "../controller/serviceOrder/CategoryController";

const router = Router();

router.post('/', CategoryController.store);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.patch('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;

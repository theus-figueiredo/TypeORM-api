import { Router } from "express";
import StatusController from "../controller/serviceOrder/StatusController";

const router = Router();

router.post('/', StatusController.store);
router.get('/', StatusController.getAll);
router.get('/:id', StatusController.getById);
router.patch('/:id', StatusController.update);
router.delete('/:id', StatusController.delete);

export default router;

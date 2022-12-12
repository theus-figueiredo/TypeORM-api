import { Router } from 'express';
import RoleController from '../controller/RoleController';

const router = Router();

router.post('/', RoleController.add);
router.get('/:id', RoleController.getById);
router.get('/', RoleController.getAll);
router.delete('/delete/:id', RoleController.remove);
router.patch('/update/:id', RoleController.update);

export default router;
import { Router } from 'express';
import RoleController from '../controller/user/RoleController';

const router = Router();

router.post('/', RoleController.add);
router.get('/:id', RoleController.getById);
router.get('/', RoleController.getAll);
router.delete('/delete/:id', RoleController.remove);
router.patch('/:id', RoleController.update);

export default router;

import Router from 'express';
import CommentController from '../controller/serviceOrder/CommentController';

const router = Router();

router.post('/', CommentController.addNew);
router.get('/', CommentController.fetchByOS);
router.patch('/:id', CommentController.updateData);
router.delete('/:id', CommentController.remove);

export default router;

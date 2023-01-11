import {Router} from 'express';
import * as transactionController from '../controllers/transactionController.js';

const router = Router();

router.get('/', transactionController.index);

router.post('/', transactionController.create);

router.delete('/:id', transactionController.remove);

router.patch('/:id', transactionController.update);

export default router;
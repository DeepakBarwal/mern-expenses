import {Router} from 'express';
import passport from 'passport';
import * as transactionController from '../controllers/transactionController.js';

const router = Router();

router.get('/', passport.authenticate('jwt', {session: false}), transactionController.index);

router.post('/', transactionController.create);

router.delete('/:id', transactionController.remove);

router.patch('/:id', transactionController.update);

export default router;
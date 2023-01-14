import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', categoryController.create);
router.delete('/:id', categoryController.destroy);

export default router;
import { Router } from "express";
import transactionRoutes from './transaction.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';

const router = Router();

router.use('/transaction', transactionRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
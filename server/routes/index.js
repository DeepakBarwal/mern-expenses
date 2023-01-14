import { Router } from "express";
import transactionRoutes from './transaction.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import passport from 'passport';
import categoryRoutes from './category.js';

const router = Router();

const auth = passport.authenticate('jwt', {session: false});

router.use('/transaction', auth, transactionRoutes);
router.use('/auth', authRoutes);
router.use('/user', passport.authenticate('jwt', {session: false}), userRoutes);
router.use('/category', auth, categoryRoutes);

export default router;
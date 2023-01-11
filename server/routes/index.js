import { Router } from "express";
import transactionRoutes from './transaction.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import passport from 'passport';

const router = Router();

router.use('/transaction', passport.authenticate('jwt', {session: false}), transactionRoutes);
router.use('/auth', passport.authenticate('jwt', {session: false}), authRoutes);
router.use('/user', passport.authenticate('jwt', {session: false}), userRoutes);

export default router;
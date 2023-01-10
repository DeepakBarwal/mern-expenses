import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), userController.index);

export default router;
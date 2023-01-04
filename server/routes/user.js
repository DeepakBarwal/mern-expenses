import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}) ,(req, res) => {
    return res.json({user: req.user});
});

export default router;
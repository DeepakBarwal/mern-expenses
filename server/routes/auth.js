import {Router} from 'express';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
    // get all form data
    const {firstName, lastName, email, password} = req.body;
    // check if user exists with same email
    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(409).json({message: 'User already exists.'});
        }
        const user = await User({firstName, lastName, email, password});
        const savedUser = await user.save();
        res.json({message: 'user is created', user: savedUser});
    } catch (error) {
        console.error(error.message);
    }
    // hash the password
    // store user in db
});

export default router;
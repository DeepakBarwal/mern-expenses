import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

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
        // hash the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User({firstName, lastName, email, password: hashedPassword});
        // store user in db
        const savedUser = await user.save();
        res.status(201).json({message: 'user is created', user: savedUser});
    } catch (error) {
        console.error(error.message);
    }
});

export default router;
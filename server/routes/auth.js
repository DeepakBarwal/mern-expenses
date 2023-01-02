import {Router} from 'express';

const router = Router();

router.post('/register', async (req, res) => {
    // get all form data
    const formData = req.body;
    console.log(formData);
    // check if user exists with same email
    
    // hash the password
    // store user in db
    res.json({message: 'user is created'});
});

export default router;
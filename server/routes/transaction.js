import {Router} from 'express';
import Transaction from '../models/Transaction.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const transaction = await Transaction.find({}).sort({createdAt: -1});
        res.json({message: 'success', data: transaction});
    } catch (error) {
        console.error(error.message);
        res.json({message: 'failed'});
    }
});

router.post('/', async (req, res) => {
    const {amount, description, date} = req.body;
    try {
        const transaction = new Transaction({
            amount, description, date
        });
        const savedTransaction = await transaction.save();
        res.status(201).json({message: 'success', transaction: savedTransaction });
    } catch (error) {
        console.error(error.message);
        res.status(201).json({message: 'failed'});
    }
});

export default router;
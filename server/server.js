import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import Transaction from './models/Transaction.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connection successful');
    } catch (error) {
        console.log('DB connection unsuccessful');
        console.error(`Error: ${error.message}`);
    }
};
connectDb();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/transaction', async (req, res) => {
    try {
        const transaction = await Transaction.find({});
        res.json({message: 'success', data: transaction});
    } catch (error) {
        console.error(error.message);
        res.json({message: 'failed'});
    }
});

app.post('/transaction', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
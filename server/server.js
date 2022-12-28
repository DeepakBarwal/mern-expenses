import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';

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

app.post('/transaction', (req, res) => {
    const {amount, description, date} = req.body;
    res.json({status: 'ok', amount, description, date});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
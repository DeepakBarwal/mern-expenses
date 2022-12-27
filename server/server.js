import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4000;
const app = express();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connection successful');
    } catch (error) {
        console.log('DB connection unsuccessful');
        console.error(`Error: ${error.message}`);
    }
}
connectDb();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
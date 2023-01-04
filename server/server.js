import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDb from './database/mongodb.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import transactionRoutes from './routes/transaction.js';
import authRoutes from './routes/auth.js';
import passport from 'passport';
import passportConfig from './config/passport.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
passportConfig(passport);

app.use('/transaction', transactionRoutes);
app.use('/auth', authRoutes);

await connectDb();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
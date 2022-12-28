import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connection successful');
    } catch (error) {
        console.log('DB connection unsuccessful');
        console.error(`Error: ${error.message}`);
    }
};

export default connectDb;
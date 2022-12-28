import mongoose from "mongoose";
const {Schema} = mongoose;

const transactionSchema = new Schema({
    amount: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    }
},
    {
        timestamps,
    }
);

export default mongoose.model('transaction', transactionSchema);
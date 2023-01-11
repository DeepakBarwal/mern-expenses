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
    user_id: {
        type: mongoose.Types.ObjectId,
    },
    date: {
        type: Date,
        default: new Date(),
    }
},
    {
        timestamps: true,
    }
);

export default mongoose.model('transaction', transactionSchema);
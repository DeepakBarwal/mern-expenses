import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        reuired: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model('user', userSchema);
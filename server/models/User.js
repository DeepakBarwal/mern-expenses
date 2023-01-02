import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: ['First Name field is required.'],
    },
    lastName: {
        type: String,
        reuired: ['Last Name field is required.'],
    },
    email: {
        type: String,
        required: ['email field is required.'],
    },
    password: {
        type: String,
        required: ['password field is required.'],
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model('user', userSchema);
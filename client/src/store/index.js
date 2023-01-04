import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../store/auth.js';

export default configureStore({
    reducer: {
        auth: authReducer, 
    },
});
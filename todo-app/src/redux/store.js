import { combineReducers, configureStore } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice';
import loginReducer from './slices/loginSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import otpCodeReducer from './slices/otpCodeSlice';

const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
    forgotPasswordReducer,
    otpCodeReducer

});

export const store = configureStore({
    reducer: rootReducer
});
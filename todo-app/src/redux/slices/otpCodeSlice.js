import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/apiUrl";

const initialState = {
    user: null,
    loader: false,
    error: null
};

export const otpCodeHandler = createAsyncThunk(
    "otpCode/otpCodeHandler",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}otp`, data);
            const resData = await response?.data;
            return resData;
        } catch (error) {
            console.log('OTP code error in reducer', error);
            return rejectWithValue(error?.response?.data);
        };
    }
);

export const otpCodeSlice = createSlice({
    name: "otpCode",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(otpCodeHandler.pending, state => {
            state.loader = true;
        });
        builder.addCase(otpCodeHandler.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
        builder.addCase(otpCodeHandler.rejected, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
    }
});

export default otpCodeSlice.reducer;
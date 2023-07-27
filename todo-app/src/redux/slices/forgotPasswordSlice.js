import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/apiUrl";

const initialState = {
    user: null,
    loader: false,
    error: null
};

export const forgotPasswordHandler = createAsyncThunk(
    "forgotPassword/forgotPasswordHandler",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}forgot`, data);
            const resData = await response?.data;
            return resData;
        } catch (error) {
            console.log('Forgot password slice error', error);
            return rejectWithValue(error?.response?.data);
        };
    }
);

export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(forgotPasswordHandler.pending, state => {
            state.loader = true;
        });
        builder.addCase(forgotPasswordHandler.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
        builder.addCase(forgotPasswordHandler.rejected, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
    }
});

export default forgotPasswordSlice.reducer;
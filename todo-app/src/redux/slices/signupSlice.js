import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/apiUrl";

const initialState = {
    user: null,
    loader: false,
    error: null
};

export const signupHandler = createAsyncThunk(
    "signup/signupHandler",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}register`, data);
            const resData = await response?.data;
            return resData;
        } catch (error) {
            console.log('Signup error in reducer', error);
            return rejectWithValue(error?.response?.data)
        };
    }
);

export const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupHandler.pending, state => {
            state.loader = true;
        });
        builder.addCase(signupHandler.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
        builder.addCase(signupHandler.rejected, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
    }
});

export default signupSlice.reducer;
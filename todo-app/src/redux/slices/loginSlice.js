import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../constant/apiUrl';

const initialState = {
    user: null,
    loader: false,
    error: null
}

export const loginHandler = createAsyncThunk(
    "login/loginHandler",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, data);
            const resData = await response?.data;
            return resData;
        } catch (error) {
            console.log('error', error);
            return rejectWithValue(error?.response?.data);
        };
    }
);

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginHandler.pending, state => {
            state.loader = true;
        });
        builder.addCase(loginHandler.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
        builder.addCase(loginHandler.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });
    }
});

export default loginSlice.reducer;
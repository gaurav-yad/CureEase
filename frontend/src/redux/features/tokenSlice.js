import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage.getItem('token') || false,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        unsetToken: (state) => {
            state.token = false;
        },
    },
})

export const {setToken, unsetToken} = tokenSlice.actions;

export default tokenSlice.reducer;
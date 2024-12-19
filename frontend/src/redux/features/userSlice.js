import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        unsetUser: (state) => {
            state.user = null;
        },
    },
})

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
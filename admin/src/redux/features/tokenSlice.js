import {createSlice} from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        adminToken: localStorage.getItem("adminToken"),
        docToken: localStorage.getItem("docToken")
    },
    reducers: {
        setAdminToken: (state, action) => {
            state.adminToken = action.payload;
        },
        setDocToken: (state, action) => {
            state.docToken = action.payload;
        }
    }
});

export const {setAdminToken, setDocToken} = tokenSlice.actions;

export default tokenSlice.reducer;
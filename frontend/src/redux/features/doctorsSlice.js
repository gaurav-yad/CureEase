import { createSlice } from "@reduxjs/toolkit";

export const doctorListSlice = createSlice({
    name: "docList",
    initialState: {
        doctorList: [],
    },
    reducers: {
        setDoctors: (state, action) => {
            state.doctorList = action.payload;
        },
    },
})

export const { setDoctors } = doctorListSlice.actions;

export default doctorListSlice.reducer;
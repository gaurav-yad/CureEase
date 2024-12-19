import { createSlice } from "@reduxjs/toolkit";
import { specialityData } from "../../assets/assets";

export const specialityList = createSlice({
    name: "specialityList",
    initialState: {
        specialityList: specialityData,
    },
    reducers: {
        setSpecialities: (state, action) => {
            state.specialityList = action.payload;
        },
    },
})

export const { setSpecialities } = specialityList.actions;

export default specialityList.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const doctorsSlice = createSlice({
    name: 'doctors',
    initialState: {
        value: []
    },
    reducers:{
        setDoctors: (state, action) => {
            state.value = action.payload
        },
        updateDocAvailability: (state, action) => {
            const { docId, status } = action.payload;
            const docIndex = state.value.findIndex((doc) => doc._id === docId);
            state.value[docIndex].available = status;
        }
    }
})

export const { setDoctors, updateDocAvailability } = doctorsSlice.actions

export default doctorsSlice.reducer;
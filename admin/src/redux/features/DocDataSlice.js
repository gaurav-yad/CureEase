import {createSlice} from '@reduxjs/toolkit'

export const DocDataSlice = createSlice({
    name: 'docData',
    initialState: {
        appointments: false,
        docDashData : false,
        profile: false,
    },
    reducers: {
        setDocAppointments: (state, action) => {
            state.appointments = action.payload;
        },
        setDocDashData: (state, action) => {
            state.docDashData = action.payload;
        },
        setDocProfile: (state, action) => {
            state.profile = action.payload;
        }
    }
});

export const { setDocAppointments, setDocDashData, setDocProfile } = DocDataSlice.actions;

export default DocDataSlice.reducer;
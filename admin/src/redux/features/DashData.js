import {createSlice} from '@reduxjs/toolkit'

export const DashDataSlice = createSlice({
    name: 'dashData',
    initialState: {
        doctors: 0,
        patients: 0,
        appointments: 0,
        latestAppointments: []
    },
    reducers: {
        setData: (state, action) => {
            state.doctors = action.payload.doctors;
            state.patients = action.payload.patients;
            state.appointments = action.payload.appointments;
            state.latestAppointments = action.payload.latestAppointments;
        },

        unsetData: (state) => {
            state.doctors = 0;
            state.patients = 0;
            state.appointments = 0;
            state.latestAppointments = [];
        }
    }
});

export const {setData, unsetData} = DashDataSlice.actions;

export default DashDataSlice.reducer;
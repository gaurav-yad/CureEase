import { createSlice } from '@reduxjs/toolkit'

export const AppointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: []
    },
    reducers: {
        setAppointments: (state, action) => {
            state.appointments = action.payload
        }
    }
})

export const { setAppointments } = AppointmentsSlice.actions

export default AppointmentsSlice.reducer
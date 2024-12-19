import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from './features/DoctorsSlice'
import appointmentsReducer from './features/AppointmentsSlice'
import dashDataReducer from './features/DashData'
import tokenReducer from './features/tokenSlice'
import docDataReducer from './features/DocDataSlice'

export default configureStore({
  reducer: {
    doctors: doctorReducer,
    appointments: appointmentsReducer,
    dashData: dashDataReducer,
    token: tokenReducer,
    docData : docDataReducer
  },
})
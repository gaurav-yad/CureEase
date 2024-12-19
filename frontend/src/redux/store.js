import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from './features/doctorsSlice'
import specialityReducer from './features/specialitySlice'
import userReducer from './features/userSlice'
import tokenReducer from './features/tokenSlice'

export default configureStore({
  reducer: {
    doctors : doctorReducer,
    specialities : specialityReducer,
    user : userReducer,
    token: tokenReducer,
  },
})
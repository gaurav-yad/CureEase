import express from 'express';
import { getDoctors, doctorLogin, doctorAppointments, cancelDocAppointment, markAppointmentCompleted, docDashData, getDocProfile, updateDocProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
import upload from '../middlewares/multer.js'

const DoctorRouter = express.Router();

DoctorRouter.get('/doc-list', getDoctors);

DoctorRouter.post('/login', doctorLogin);

DoctorRouter.get('/appointments', authDoctor, doctorAppointments);

DoctorRouter.post('/cancel-appointment', authDoctor, cancelDocAppointment);

DoctorRouter.post('/mark-app-completed', authDoctor, markAppointmentCompleted);

DoctorRouter.get('/docDashData', authDoctor, docDashData);

DoctorRouter.get('/getDoctorProfile', authDoctor, getDocProfile);

DoctorRouter.post('/updateProfile', upload.single('image'), authDoctor, updateDocProfile)

export default DoctorRouter;
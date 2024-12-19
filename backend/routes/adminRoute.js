import express from 'express';
import { addDoctor, appointmentsAdmin, cancelAppointment, dashboardData, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability, getDoctors } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);

adminRouter.post('/login', loginAdmin);

adminRouter.get('/all-doctors', authAdmin, getDoctors);

adminRouter.post('/change-avl', authAdmin, changeAvailability);

adminRouter.get('/appointments', authAdmin, appointmentsAdmin);

adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment);

adminRouter.get('/dashData', authAdmin, dashboardData);

export default adminRouter;
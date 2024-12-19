import express from 'express';
import { registerUser, loginUser, getUser, updateUserData, updateUserImage, bookAppointment, getUserAppointments, cancelAppointment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/get-user', authUser, getUser);

userRouter.post('/update-user-data', authUser, updateUserData);

userRouter.post('/update-user-img', upload.single('image'), authUser, updateUserImage);

userRouter.post('/book-appointment', authUser, bookAppointment);

userRouter.get('/get-appointments', authUser, getUserAppointments);

userRouter.post('/cancel-appointment', authUser, cancelAppointment);

export default userRouter;
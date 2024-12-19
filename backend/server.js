import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import DoctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(cors({ credentials: true }));
app.use(bodyParser.json({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// api endpoints
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/

app.use('/api/doctor', DoctorRouter);
// localhost:4000/api/doctor/


app.use('/api/user', userRouter);
// localhost:4000/api/user/

// listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
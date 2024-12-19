import validator from 'validator';
import brcypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModej.js';

// API to add doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        const imageFilePath = req.file?.path;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFilePath) {
            return res.status(200).json({ success: false, message: "Please fill all the fields" });
        }

        // checking for valid email
        if (!validator.isEmail(email)) {
            return res.status(200).json({ success: false, message: "Please enter a valid email" });
        }

        // checking for valid password
        if (password.length < 8) {
            return res.status(200).json({ success: false, message: "Password must be atleast 8 characters" });
        }

        const salt = await brcypt.genSalt(10);

        const hashedPassword = await brcypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFilePath, { resource_type: 'image' });

        const imageUrl = imageUpload?.secure_url;

        const doc = await doctorModel.findOne({ email });

        // checking if doctor already exists
        if (doc) {
            return res.status(200).json({ success: false, message: "Doctor already exists" });
        }

        // saving the doctor to the database
        const doctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: {
                line1: address.line1,
                line2: address.line2
            },
            image: imageUrl,
            date: Date.now()
        });

        await doctor.save();

        res.status(200).json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.log("Error in add Doctor API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checking for all data to login
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '6h' });

            res.status(200).json({ success: true, message: "Admin logged in successfully", adminToken: token });

        } else {
            res.status(200).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});

        res.status(200).json({ success: true, message: "Appointments fetched successfully", appointments });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const {appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        const { docId, slotDate, slotTime } = appointment;

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        const doc = await doctorModel.findById(docId);

        let slots_booked = doc.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.log("Error in admin cancel appointment API", error);
        res.status(500).json({ success: false, message: error });
    }   
}


// API for admin dashboard data
const dashboardData = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors : doctors.length,
            patients : users.length,
            appointments : appointments.length,
            latestAppointments : appointments.reverse().slice(0, 5)
        }

        res.status(200).json({ success: true, dashData });

    } catch (error) {
        console.log("Error in admin dashboard API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addDoctor, loginAdmin, appointmentsAdmin, cancelAppointment, dashboardData };
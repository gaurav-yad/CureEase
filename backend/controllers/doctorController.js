import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModej.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const changeAvailability = async (req, res) => {
    try {
        const { docId, status } = req.body;
        const doctor = await doctorModel.findById(docId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        await doctorModel.findByIdAndUpdate(docId, { available: status });

        res.status(200).json({ success: true, message: "Doctor availability changed" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API for doctor Login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.status(200).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, doctor, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get doctor appointments
const doctorAppointments = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor not found" });
        }

        const appointments = await appointmentModel.find({ docId });

        res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to cancel doctor Appointment
const cancelDocAppointment = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        if (appointment.docId.toString() !== docId) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        res.status(200).json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.log("Error in cancel appointment API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to mark Appointment as completed
const markAppointmentCompleted = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        if (appointment.docId.toString() !== docId) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

        res.status(200).json({ success: true, message: "Appointment marked completed!" });

    } catch (error) {
        console.log("Error in cancel appointment API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API to get doctor dashboard data
const docDashData = async (req, res) => {
    try {
        const docId = req.body.docId;

        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        let patients = [];

        appointments.forEach(appointment => {
            if (appointment.isCompleted || appointment.payment) {
                earnings += appointment.amount;
            }
            if (!patients.includes(appointment.userId)) {
                patients.push(appointment.userId);
            }
        });

        const dashData = {
            earnings,
            totalAppointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.status(200).json({ success: true, dashData });

    } catch (error) {
        console.log("Error in doctor dashboard data API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get doctor profile data
const getDocProfile = async (req, res) => {
    try {
        const docId = req.body.docId;

        const doctor = await doctorModel.findById(docId).select('-password');

        res.status(200).json({ success: true, doctor });

    } catch (error) {
        console.log("Error in get doctor profile data API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API to update doctor Profile data
const updateDocProfile = async (req, res) => {
    try {
        const { docId, name, speciality, degree, experience, about, fees, available, address } = req.body;

        const doctor = await doctorModel.findById(docId);

        if (!doctor) {
            return res.status(401).json({ success: false, message: "Doctor not found" });
        }

        await doctorModel.findByIdAndUpdate(docId, { name, speciality, degree, experience, about, available, fees, address });

        const imageFilePath = req.file?.path;

        if (imageFilePath) {
            const imageUpload = await cloudinary.uploader.upload(imageFilePath, { resource_type: 'image' });

            const imageUrl = imageUpload?.secure_url;

            await doctorModel.findByIdAndUpdate(docId, { image: imageUrl });
        }

        const updatedDoctor = await doctorModel.findById(docId).select('-password');
        res.status(200).json({ success: true, message: "Doctor profile updated", doctor: updatedDoctor });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { changeAvailability, getDoctors, doctorLogin, doctorAppointments, cancelDocAppointment, markAppointmentCompleted, docDashData, getDocProfile, updateDocProfile };
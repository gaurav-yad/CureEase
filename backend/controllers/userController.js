import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import validator from 'validator';
import brcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import appointmentModel from '../models/appointmentModej.js';

// api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(200).json({ success: false, message: "Please fill all the fields" });
        }

        if (!validator.isEmail(email)) {
            return res.status(200).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(200).json({ success: false, message: "Password should be atleast 6 characters long" });
        }

        // check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ success: false, message: "User already exists" });
        }

        // hash the password

        const salt = await brcrypt.genSalt(10);

        const hashedPassword = await brcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const user = await userModel.findOne({ email }).select('-password');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ success: true, message: "User registered successfully", token, user });

    } catch (error) {
        console.log("Error in User register API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API for user Login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).json({ success: false, message: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(200).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await brcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(200).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const userData = await userModel.findById(user._id).select('-password');

        res.status(200).json({ success: true, message: "User logged in successfully", token, user: userData });

    } catch (error) {
        console.log("Error in User login API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get user data
const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select('-password');

        if (!user) {
            return res.status(200).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in get user API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API to update user data
const updateUserData = async (req, res) => {
    try {
        const { userId, name, gender, dob, phone, address } = req.body;

        await userModel.findByIdAndUpdate(userId, { name, gender, dob, phone, address });

        const user = await userModel.findById(userId).select('-password');
        res.status(200).json({ success: true, message: "User data updated successfully", user });

    } catch (error) {
        console.log("Error in update user API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


const updateUserImage = async (req, res) => {
    try {
        const { userId } = req.body;

        const imageFilePath = req.file?.path;

        if (!imageFilePath) {
            return res.status(200).json({ success: false, message: "Please upload an image" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFilePath, { resource_type: 'image' });

        const imageUrl = imageUpload?.secure_url;

        await userModel.findByIdAndUpdate(userId, { image: imageUrl });

        return res.status(200).json({ success: true, message: "Image uploaded successfully" });

    } catch (error) {
        console.log("Error in update user image API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.status(200).json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(200).json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointment = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointment);

        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.status(200).json({ success: true, message: "Appointment booked successfully" });

    } catch (error) {
        console.log("Error in book appointment API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get user appointments
const getUserAppointments = async (req, res) => {
    try {
        const userId = req.body.userId;

        const appointments = await appointmentModel.find({ userId });

        res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.log("Error in get user appointments API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        if( appointment.userId.toString() !== userId ){
            return res.status(200).json({ success: false, message: "Unauthorized access" });
        }
        
        // free doctor slot
        const { docId, slotDate, slotTime } = appointment;

        const docData = await doctorModel.findById(docId);

        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        res.status(200).json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.log("Error in cancel appointment API", error);
        res.status(500).json({ success: false, message: error.message });
    }
}



export { registerUser, loginUser, getUser, updateUserData, updateUserImage, bookAppointment, getUserAppointments, cancelAppointment };
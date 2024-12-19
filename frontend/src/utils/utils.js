import axios from 'axios';
import { setDoctors } from '../redux/features/doctorsSlice';
import { message } from 'antd';
import { setUser, unsetUser } from '../redux/features/userSlice';
import { unsetToken } from '../redux/features/tokenSlice';


const backendURL = import.meta.env.VITE_BACKEND_URL;

const getAllDoctors = async (dispatch) => {
    try {
        const response = await axios.get(`${backendURL}/api/doctor/doc-list`);

        if (response.data.success) {
            dispatch(setDoctors(response.data.doctors));
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
}

const registerUser = async (dispatch, user, navigate) => {
    try {
        const response = await axios.post(`${backendURL}/api/user/register`, user);

        if (response.data.success) {
            message.success(response.data.message);
            navigate('/');
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } else {
            message.error(response.data.message);
        }
    } catch (error) {
        message.error('Error! Please try again!');
        console.error('Error registering user:', error);
    }
}

const loginUser = async (dispatch, user, navigate) => {
    try {
        const response = await axios.post(`${backendURL}/api/user/login`, user);

        if (response.data.success) {
            navigate('/');
            message.success(response.data.message);
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } else {
            message.error(response.data.message);
        }
    } catch (error) {
        message.error('Error! Please try again!');
        console.error('Error registering user:', error);
    }
}

const getUser = async (dispatch) => {
    try {
        const response = await axios.get(`${backendURL}/api/user/get-user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.success) {
            dispatch(setUser(response.data.user));
        } else {
            localStorage.removeItem('token');
            console.log(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }

}

const logOut = (dispatch, navigate) => {
    localStorage.removeItem("token");
    dispatch(setDoctors([]));
    dispatch(unsetUser());
    dispatch(unsetToken());
    navigate('/');
}

export { getAllDoctors, registerUser, loginUser, getUser, logOut };
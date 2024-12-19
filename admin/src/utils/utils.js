import axios from "axios";
import { setDoctors, updateDocAvailability } from "../redux/features/DoctorsSlice";
import { message } from 'antd'
import { setAppointments } from "../redux/features/AppointmentsSlice";
import { setData, unsetData } from '../redux/features/DashData';
import { setAdminToken, setDocToken } from '../redux/features/tokenSlice'
import { setDocAppointments, setDocDashData, setDocProfile } from "../redux/features/DocDataSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getAllDoctors = async (dispatch) => {
  try {
    const response = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
      headers: {
        admintoken: `${localStorage.getItem("adminToken")}`,
      }
    });

    if (response.data.success) {
      dispatch(setDoctors(response.data.doctors));
    } else {
      message.error(response.data.message);
      console.log(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);

    if (error.response.status === 401) {  //unauthorized access
      message.error("Unauthorized Access");
      localStorage.removeItem("adminToken");
      dispatch(setAdminToken(null));
    } else {
      message.error("Server error! Please try again");
    }
  }
};

const changeAvailability = async (docId, status, dispatch) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/admin/change-avl`,
      { docId, status }, {
      headers: {
        admintoken: `${localStorage.getItem("adminToken")}`,
      }
    }
    );

    if (response.data.success) {
      message.success("Doc Availability changed!");
      dispatch(updateDocAvailability({ docId, status }));
    } else {
      message.error(response.data.message);
      console.log(response.data.message);
    }
  } catch (error) {
    console.error('Error updating doc availability!', error);

    if (error.response.status === 401) {  //unauthorized access
      message.error("Unauthorized Access");
      localStorage.removeItem("adminToken");
      dispatch(setAdminToken(null));
    } else {
      message.error("Server error! Please try again");
    }
  }
};

const addDoctor = async (formData, dispatch, setAdding, setFormData) => {
  const data = new FormData();
  for (const key in formData) {
    if (key === 'image') {
      data.append(key, formData[key]);
    } else if (key === 'address') {
      data.append('address[line1]', formData.address.line1);
      data.append('address[line2]', formData.address.line2);
    } else {
      data.append(key, formData[key]);
    }
  }

  setAdding(true);

  try {
    const response = await axios.post(
      `${backendUrl}/api/admin/add-doctor`,
      data, {
      headers: {
        admintoken: `${localStorage.getItem("adminToken")}`,
      }
    }
    );

    if (response.data.success) {
      getAllDoctors(dispatch);
      message.success("Doctor added successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        experience: "1 Year",
        fees: "",
        speciality: "General Physician",
        degree: "",
        address: {
          line1: "",
          line2: "",
        },
        about: "",
        image: null,
      })
    } else {
      message.error(response.data.message);
      console.log(response.data.message);
    }
  } catch (error) {
    console.error('Error adding dotor:', error);

    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      dispatch(setAdminToken(null));
      localStorage.removeItem("adminToken");
    } else {
      message.error("Server error! Please try again");

    }
  } finally {
    setAdding(false);
  }
}

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

const getAppointments = async (dispatch) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
      headers: {
        admintoken: `${localStorage.getItem("adminToken")}`,
      },
    });

    if (data.success) {
      dispatch(setAppointments(data.appointments));
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log("Error fetching all appointments", error);
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("adminToken");
      dispatch(setAdminToken(null));
    } else {
      message.error("Server error Fetching appointments");
    }
  }
};

const getDashData = async (dispatch) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/dashData`, {
      headers: {
        admintoken: `${localStorage.getItem("adminToken")}`,
      },
    });

    if (data.success) {
      dispatch(setData(data.dashData));
    } else {
      message.error(data.message);
    }
  } catch (error) {
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("adminToken");
      dispatch(setAdminToken(null));
    } else {
      message.error("Server error Fetching dashboard data");
    }
    console.log(error);
  }
};

const cancelAppointment = async (appointmentId, dispatch) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/cancel-appointment`,
      {
        appointmentId,
      },
      {
        headers: {
          admintoken: `${localStorage.getItem("adminToken")}`,
        },
      }
    );

    if (data.success) {
      message.success(data.message);
      getAppointments(dispatch);
      getDashData(dispatch);
    } else {
      message.error(data.message);
    }
  } catch (error) {
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("adminToken");
      dispatch(setAdminToken(null));
    } else {
      message.error("Server error Cancelling appointment!");
    }
    console.log(error);
  }
};


const slotDateFormat = (slotDate) => {
  const date = slotDate.split("_");
  return `${date[0]} ${months[Number(date[1]) - 1]} ${date[2]}`;
};


const getDoctorAppointments = async (dispatch) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("docToken")}`,
      },
    });

    if (data.success) {
      dispatch(setDocAppointments(data.appointments.reverse()));
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log("Error fetching doctor appointments", error);
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("docToken");
      dispatch(setDocToken(null));
    } else {
      message.error("Server error Fetching appointments");
    }
  }
}

// get doctor dashboard data
const getDocDashData = async (dispatch) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/docDashData`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("docToken")}`,
      },
    });

    if (data.success) {
      dispatch(setDocDashData(data.dashData));
    } else {
      message.error(data.message);
    }
  } catch (error) {
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("docToken");
      dispatch(setDocToken(null));
    } else {
      message.error("Server error Fetching dashboard data");
    }
    console.log(error);
  }
}

// cancel doctor appointment
const cancelDocAppointment = async (appointmentId, dispatch) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/doctor/cancel-appointment`,
      {
        appointmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("docToken")}`,
        }
      });

    if (data.success) {
      message.success(data.message);
      getDoctorAppointments(dispatch);
      getDocDashData(dispatch);
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log("Error cancelling appointment", error);
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("docToken");
      dispatch(setDocToken(null));
    } else {
      message.error("Server error Cancelling appointment!");
    }
  }
}

// mark doctor appointment completed
const markDocAppointmentCompleted = async (appointmentId, dispatch) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/doctor/mark-app-completed`,
      {
        appointmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("docToken")}`,
        }
      });

    if (data.success) {
      message.success(data.message);
      getDoctorAppointments(dispatch);
      getDocDashData(dispatch);
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log("Error marking appointment Completed", error);
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("docToken");
      dispatch(setDocToken(null));
    } else {
      message.error("Server error marking completed!");
    }
  }
}


const getDoctorProfile = async (dispatch) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/getDoctorProfile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("docToken")}`,
      }
    })

    if (data.success) {
      dispatch(setDocProfile(data.doctor));
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log("Error fetching doctor profile", error);
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("docToken");
      dispatch(setDocToken(null));
    } else {
      message.error("Server error Fetching doctor profile");
    }
  }
}


const updateDocProfile = async (docData, dispatch, setEdit, setUpdating, setFormData) => {
  setUpdating(true);
  try {
    const { data } = await axios.post(`${backendUrl}/api/doctor/updateProfile`, docData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("docToken")}`,
      }
    });

    if (data.success) {
      message.success(data.message);
      dispatch(setDocProfile(data.doctor));
      setFormData({
        name: data.doctor.name,
        experience: data.doctor.experience,
        fees: data.doctor.fees,
        speciality: data.doctor.speciality,
        degree: data.doctor.degree,
        address: {
          line1: data.doctor.address?.line1,
          line2: data.doctor.address?.line2,
        },
        available: data.doctor.available,
        about: data.doctor.about,
        image: false,
      })
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log("Error updating doctor profile", error);
    if (error.response.status === 401) {
      message.error("Unauthorized Access");
      localStorage.removeItem("docToken");
      dispatch(setDocToken(null));
    } else {
      message.error("Server error updating doctor profile");
    }
  } finally {
    setUpdating(false);
    setEdit(false);
  }
}


const logOut = (dispatch, navigate) => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("docToken");

  // remove tokens
  dispatch(setDocToken(null));
  dispatch(setAdminToken(null));

  // remove appointments data
  dispatch(setAppointments([]));

  // remove amdmin dashboard data
  dispatch(unsetData());

  // remove doctor dashboard data
  dispatch(setDocProfile(false));
  dispatch(setDocAppointments(false));
  dispatch(setDocDashData(false));

  // remove all doctors data
  dispatch(setDoctors([]));
  navigate('/');
}

export { getAllDoctors, changeAvailability, addDoctor, slotDateFormat, cancelAppointment, getAppointments, getDashData, getDoctorAppointments, calculateAge, cancelDocAppointment, markDocAppointmentCompleted, getDocDashData, getDoctorProfile, updateDocProfile, logOut };
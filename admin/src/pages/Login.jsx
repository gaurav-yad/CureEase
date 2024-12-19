import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { setAdminToken, setDocToken } from "../redux/features/tokenSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (state === "Admin") {
      loginAdmin();
    } else {
      loginDoctor();
    }
  };

  const loginAdmin = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, form);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.adminToken);
        dispatch(setAdminToken(response.data.adminToken));
        message.success(`Welcome Admin!`);
        navigate("/admin");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Server error! Please try again");
      console.error("Error logging in:", error);
    }
  };

  const loginDoctor = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/doctor/login`, form);
      if (response.data.success) {
        localStorage.setItem("docToken", response.data.token);
        dispatch(setDocToken(response.data.token));
        message.success(`Welcome ${response.data.doctor.name}!`);
        navigate("/doctor");
      } else {
        message.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      message.error("Error logging in");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleLogin} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} &nbsp;</span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            name="email"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          type="submit"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-primary cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

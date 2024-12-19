import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/assets";
import {
  cancelAppointment,
  slotDateFormat,
  getDashData,
} from "../utils/utils.js";

const DashBoard = () => {
  const dashData = useSelector((state) => state.dashData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dashData.latestAppointments.length === 0) {
      getDashData(dispatch);
    }
  }, []);

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((appointment, index) => (
            <div
              className="flex items-center px-6 py-3
               gap-3 hover:bg-gray-100"
              key={index}
            >
              <img
                className="rounded-full w-10"
                src={appointment.docData.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {appointment.docData.name}
                </p>
                <p className="text-gray-600">
                  {slotDateFormat(appointment.slotDate)}
                </p>
              </div>

              {appointment.cancelled ? (
                <p className="text-sm text-red-500">Cancelled</p>
              ) : appointment.isCompleted ? <p className="text-sm text-green-500">Completed</p> : (
                <img
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                  onClick={() => cancelAppointment(appointment._id, dispatch)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { assets } from "../assets/assets.js";
import {
  cancelAppointment,
  getAppointments,
  slotDateFormat,
  calculateAge,
} from "../utils/utils.js";

const Appointments = () => {
  const appointments = useSelector((state) => state.appointments.appointments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments(dispatch);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((appointment, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_2fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={appointment._id}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={appointment.userData.image}
                alt=""
              />
              <p>{appointment.userData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userData.dob)}
            </p>

            <p>
              {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={appointment.docData.image}
                alt=""
              />
              <p>{appointment.docData.name}</p>
            </div>
            <p>{"$" + appointment.amount}</p>

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
  );
};

export default Appointments;

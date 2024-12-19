import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorAppointments,
  calculateAge,
  slotDateFormat,
  markDocAppointmentCompleted,
  cancelDocAppointment,
} from "../../utils/utils";
import { assets } from "../../assets/assets";

const DocAppointments = () => {
  const appointments = useSelector((state) => state.docData.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!appointments) {
      getDoctorAppointments(dispatch);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments &&
          appointments.map((appointment, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
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

              <div>
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {appointment.payment ? "Online" : "CASH"}
                </p>
              </div>

              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dob)}
              </p>

              <p>
                {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
              </p>

              <p>
                {"$"}
                {appointment.amount}
              </p>

              {appointment.cancelled ? (
                <p className="text-red-500">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                    onClick={() =>
                      cancelDocAppointment(appointment._id, dispatch)
                    }
                  />
                  <img
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                    onClick={() =>
                      markDocAppointmentCompleted(appointment._id, dispatch)
                    }
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DocAppointments;

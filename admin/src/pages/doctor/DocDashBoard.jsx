import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocDashData, slotDateFormat, cancelDocAppointment, markDocAppointmentCompleted } from "../../utils/utils";
import { assets } from "../../assets/assets";

const DocDashBoard = () => {
  const dashData = useSelector((state) => state.docData.docDashData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dashData) {
      getDocDashData(dispatch);
    }
  }, []);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {"$"}{dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.totalAppointments}
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
                  src={appointment.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {appointment.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(appointment.slotDate)}
                  </p>
                </div>

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
      </div>
    )
  );
};

export default DocDashBoard;

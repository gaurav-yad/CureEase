import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { getAllDoctors } from "../utils/utils";
import { assets } from "../assets/assets";

const MyAppointments = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const date = slotDate.split("_");
    return `${date[0]} ${months[Number(date[1]) - 1]} ${date[2]}`;
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        message.error("Error fetching appointments");
      }
    } catch (error) {
      message.error("Server error fetching appointments");
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        message.success(data.message);
        getAppointments();
        getAllDoctors(dispatch);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Server error cancelling appointment!");
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <h1 className="pb-3 mt-4 font-medium text-zinc-700 border-b">
        My Appointments
      </h1>
      {appointments.length === 0 ? (
        <div className="flex items-center justify-center relative">
          <img
            src={assets.empty_list}
            alt="empty-list"
            className="w-96 opacity-80"
          />
        </div>
      ) : (
        <div className="min-h-[40vh]">
          {appointments.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              >
                <div>
                  <img
                    src={item.docData.image}
                    alt="doc-img"
                    className="w-32 bg-indigo-50"
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {item.docData.name}
                  </p>
                  <p>{item.docData.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address: </p>
                  <p className="text-xs">{item.docData?.address?.line1}</p>
                  <p className="text-xs">{item.docData?.address?.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:{" "}
                    </span>
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  {item.cancelled ? (
                    <p className="sm:min-w-40 rounded text-red-500 border border-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition-all duration-300 mb-2 text-center">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="sm:min-w-40 rounded text-green-500 border border-green-500 px-3 py-1 hover:bg-green-500 hover:text-white transition-all duration-300 mb-2 text-center">
                      Completed
                    </p>
                  ) : (
                    <div className="flex gap-2 flex-col mb-2">
                      <button
                        className="text-sm text-stone-500 text-center sm:min-w-40 py-2
                 border hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Pay Online
                      </button>
                      <button
                        className="text-sm text-stone-500 text-center sm:min-w-40 py-2
                 border hover:bg-red-600 hover:text-white transition-all duration-300"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

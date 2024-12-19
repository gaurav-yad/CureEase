import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const adminToken = useSelector((state) => state.token.adminToken);
  return (
    <div className="min-h-screen border-r bg-white">
      {adminToken ? (
        <ul className="text-[#515151] mt-5 flex flex-col gap-4">
          <NavLink
            to="/admin"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.home_icon} alt="" />
            <span className="hidden md:block">Dashboard</span>
          </NavLink>

          <NavLink
            to="/appointments"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <span className="hidden md:block">Appointments</span>
          </NavLink>

          <NavLink
            to="/add-doc"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.add_icon} alt="" />
            <span className="hidden md:block">Add Doctor</span>
          </NavLink>

          <NavLink
            to="/doc-list"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.people_icon} alt="" />
            <span className="hidden md:block">Doctor List</span>
          </NavLink>
        </ul>
      ) : (
        <ul className="text-[#515151] mt-5 flex flex-col gap-4">
          <NavLink
            to="/doctor"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.home_icon} alt="" />
            <span className="hidden md:block">Dashboard</span>
          </NavLink>

          <NavLink
            to="/my-appointments"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <span className="hidden md:block">My Appointments</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={(e) =>
              `${
                e.isActive && "bg-[#F2F3FF] border-r-4 border-primary"
              } flex items-center gap-3 py-3.5 px-5 md:px-9 md:min-w-72 cursor-pointer`
            }
          >
            <img src={assets.people_icon} alt="" />
            <span className="hidden md:block">Profile</span>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;

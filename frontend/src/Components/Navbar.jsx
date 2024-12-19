import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logOut} from "../utils/utils.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between text-sm py-2 mb-5 border-b-gray-400 border-b">
      <img
        src={assets.logo}
        alt=""
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={user.image} alt="" className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => logOut(dispatch, navigate)}
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => navigate("/login")}
          >
            Login &nbsp; | &nbsp; Sign Up
          </button>
        )}
        <img
          src={assets.menu_icon}
          alt=""
          className="w-6 md:hidden"
          onClick={() => {
            setShowMenu(true);
          }}
        />

        {/* phone menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="" className="w-36" />
            <img
              src={assets.cross_icon}
              alt=""
              onClick={() => setShowMenu(false)}
              className="w-7"
            />
          </div>

          <ul className="flex flex-col items-center gap-8 mt-5 px-5 text-lg font-medium">
            <NavLink
              to={"/"}
              onClick={() => setShowMenu(false)}
            >
              <span>HOME</span>
              <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
            </NavLink>
            <NavLink
              to={"/doctors"}
              onClick={() => setShowMenu(false)}
            >
              <span>ALL DOCTORS</span>
              <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
            </NavLink>
            <NavLink
              to={"/about"}
              onClick={() => setShowMenu(false)}
              >
              <span>ABOUT</span>
              <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
            </NavLink>
            <NavLink
              to={"/contact"}
              onClick={() => setShowMenu(false)}
            >
              <span>CONTACT</span>
              <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

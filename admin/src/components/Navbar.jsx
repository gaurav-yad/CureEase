import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../utils/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between text-sm py-1 border-b-gray-400 border-b px-4 sm:px-10">
      <div className="flex items-center gap-2 text-sm">
        <img
          src={assets.admin_logo}
          alt=""
          className="w-36 sm:w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="mt-2 border-green-600 border rounded-full px-2.5 py-0.5 text-green-600 text-xs">Admin</p>
      </div>

      <button className="bg-primary text-white px-10 py-2 rounded-full text-sm" onClick={() => logOut(dispatch, navigate)}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;

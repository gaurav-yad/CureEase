import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { message } from "antd";
import { assets } from "../assets/assets.js";

const MyProfile = () => {
  const user = useSelector((state) => state.user.user);

  const [userData, setUserData] = useState(false);

  const [newImage, setNewImage] = useState(null);

  const [isEdit, setEdit] = useState(false);

  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(user);
  }, [user])
  

  const handleSubmit = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");

    setUpdating(true);

    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);

      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/update-user-img`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data.success) {
          message.error("Error updating image file!");
        }
      } catch (error) {
        message.error("Server error updating image file!");
        console.log(error);
      }
    }

    const updatedData = {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      gender: userData.gender,
      dob: userData.dob,
    };

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-user-data`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        message.success(data.message);
        setUserData(data.user);
        dispatch(setUser(data.user));
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Server error updating user data!");
      console.log(error);
    }

    setUpdating(false);
    setEdit(false);
    setNewImage(null);
  };

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <label htmlFor="user-img" className={`relative flex ${isEdit && 'cursor-pointer'}`}>
        <img
          className={`w-44 min-h-40 object-cover rounded-3xl ${isEdit && "opacity-70"}`}
          src={newImage ? URL.createObjectURL(newImage) : userData.image}
          alt="user-image"
        />
        {
          isEdit && <img src={assets.upload_icon} alt="" className="w-20 absolute top-12 left-12" />
        }
      </label>
      <input
        type="file"
        id="user-img"
        hidden
        disabled={!isEdit}
        onChange={(e) => setNewImage(e.target.files[0])}
      />
      <input
        type="text"
        value={userData.name}
        onChange={(e) => {
          setUserData({ ...userData, name: e.target.value });
        }}
        disabled={!isEdit}
        className={`${
          isEdit && "bg-gray-50 max-w-60"
        } text-3xl font-medium mt-4 ${!isEdit && "text-neutral-800 bg-white"}`}
      />
      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <h2 className="text-neutral-500 underline mt-3">CONTACT INFORMATION</h2>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>{" "}
          <input
            type="phone"
            value={userData.phone}
            onChange={(e) => {
              setUserData({ ...userData, phone: e.target.value });
            }}
            disabled={!isEdit}
            className={`${isEdit && "bg-gray-50 max-w-52"} ${
              !isEdit && "bg-white text-blue-400"
            }`}
          />
          <p className="font-medium">Address:</p>
          <div className="flex flex-col gap-2 max-w-52">
            <input
              type="text"
              value={userData.address.line1}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  address: { ...userData.address, line1: e.target.value },
                });
              }}
              disabled={!isEdit}
              className={`${isEdit && "bg-gray-50"} ${
                !isEdit && "text-gray-500 bg-white"
              }`}
            />
            <input
              type="text"
              value={userData.address.line2}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  address: { ...userData.address, line2: e.target.value },
                });
              }}
              disabled={!isEdit}
              className={`${isEdit && "bg-gray-50"} ${
                !isEdit && "text-gray-500 bg-white"
              }`}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-neutral-500 underline mt-3">BASIC INFORMATION</h2>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          <select
            name="gender"
            id=""
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            disabled={!isEdit}
            className={`max-w-20 ${isEdit && "bg-gray-50"} ${
              !isEdit && "bg-white text-gray-800"
            }`}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>

          <p className="font-medium">Birthday: </p>
          <input
            type="date"
            value={userData.dob}
            onChange={(e) => {
              setUserData({ ...userData, dob: e.target.value });
            }}
            className={`max-w-28 ${isEdit && "bg-gray-50"} ${
              !isEdit && "bg-white text-gray-500"
            }`}
            disabled={!isEdit}
          />
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={handleSubmit}
            className={`border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 ${
              updating ? "cursor-not-allowed opacity-65" : "cursor-pointer"
            }`}
            disabled={updating}
          >
            {updating ? "Saving..." : "Save Information"}
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

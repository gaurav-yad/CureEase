import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../utils/utils.js";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General Physician",
    degree: "",
    address: {
      line1: "",
      line2: "",
    },
    about: "",
    image: null,
  });

  const [adding, setAdding] = useState(false);
  const adminToken = useSelector((state) => state.token.adminToken);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(adminToken){
      addDoctor(formData, dispatch, setAdding, setFormData);
    }
  };

  return (
    <form className="mt-5 mr-5 ml-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-700">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
          <p>
            Upload Doctor <br />
            Image
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border rounded px-3 py-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <input
                className="border rounded px-3 py-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor password</p>
              <input
                className="border rounded px-3 py-2"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10+ Year">10+ Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Fees</p>
              <input
                className="border rounded px-3 py-2"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className="border rounded px-3 py-2"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
              >
                <option value="General Physician">General Physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border rounded px-3 py-2"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                name="line1"
                value={formData.address.line1}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: {
                      ...formData.address,
                      line1: e.target.value,
                    },
                  });
                }}
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                className="border rounded px-3 py-2"
                name="line2"
                value={formData.address.line2}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: {
                      ...formData.address,
                      line2: e.target.value,
                    },
                  });
                }}
                type="text"
                placeholder="Address 1"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about doctor"
            rows={5}
            name="about"
            required
            value={formData.about}
            onChange={handleChange}
          />
        </div>

        <button
          className={`${adding && 'opacity-75 cursor-not-allowed'} bg-primary px-10 py-3 mt-4 text-white rounded-full`}
          disabled={adding}
          onClick={handleSubmit}
        >
          {adding ? "Adding..." : "Add Doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;

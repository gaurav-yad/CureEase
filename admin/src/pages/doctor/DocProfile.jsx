import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorProfile, updateDocProfile } from "../../utils/utils";
import { useState } from "react";
import { assets } from "../../assets/assets.js";

const DocProfile = () => {
  const doctor = useSelector((state) => state.docData.profile);
  const [edit, setEdit] = useState(false);
  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    experience: doctor?.experience || "1 Year",
    fees: doctor?.fees || "",
    speciality: doctor?.speciality || "General Physician",
    degree: doctor?.degree || "",
    address: {
      line1: doctor?.address?.line1 || "",
      line2: doctor?.address?.line2 || "",
    },
    available: doctor?.available || false,
    about: doctor?.about || "",
    image: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!doctor) {
      getDoctorProfile(dispatch);
    }
  }, [doctor]);

  useEffect(() => {
    setFormData({
      name: doctor.name,
      experience: doctor.experience,
      fees: doctor.fees,
      speciality: doctor.speciality,
      degree: doctor.degree,
      address: {
        line1: doctor.address?.line1,
        line2: doctor.address?.line2,
      },
      about: doctor.about,
      available: doctor.available,
      image: false,
    });
  }, [doctor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const docData = new FormData();

    for (let key in formData) {
      if (key === "address") {
        docData.append("address[line1]", formData.address.line1);
        docData.append("address[line2]", formData.address.line2);
      } else if (key === "image") {
        if (formData.image) {
          docData.append("image", formData.image);
        }
      } else {
        docData.append(key, formData[key]);
      }
    }

    updateDocProfile(docData, dispatch, setEdit, setUpdating, setFormData);
  };

  const onCancel = () => {
    setFormData({
      name: doctor.name,
      experience: doctor.experience,
      fees: doctor.fees,
      speciality: doctor.speciality,
      degree: doctor.degree,
      address: {
        line1: doctor.address?.line1,
        line2: doctor.address?.line2,
      },
      available: doctor.available,
      about: doctor.about,
      image: false,
    });
    setEdit(false);
  };

  return (
    <form className="mt-3 mr-5 ml-5 w-full" onSubmit={handleSubmit}>
      <div className="bg-white px-8 py-6 border rounded w-full max-w-4xl max-h-[88vh] overflow-y-scroll">
        <div className="flex md:flex-row flex-col items-center justify-between mb-4 text-gray-700 pr-4">
          <div className="flex gap-4 items-center">
            <label htmlFor="doc-img" className={edit ? "cursor-pointer relative" : "relative"}>
              <img
                className={`w-16 bg-gray-100 rounded-full ${
                  edit && !formData.image && "opacity-75"
                }`}
                src={
                  formData.image
                    ? URL.createObjectURL(formData.image)
                    : doctor.image
                }
                alt=""
              />
              <img src={assets.upload_icon} alt="doc-img" className={`absolute top-4 left-2 w-12 ${(!edit || formData.image) && 'hidden'}`} />
            </label>
            <input
              type="file"
              id="doc-img"
              accept="image/*"
              hidden
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              disabled={!edit}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="available">Available</label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              className="rounded-full"
              id="available"
              onChange={(e) => {
                setFormData({ ...formData, available: e.target.checked });
              }}
              disabled={!edit}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white"
                }`}
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                disabled={!edit}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <div className="border rounded px-3 py-2">{doctor.email}</div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white text-black"
                }`}
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                disabled={!edit}
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
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white"
                }`}
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                type="number"
                placeholder="Fees"
                required
                disabled={!edit}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white text-black"
                }`}
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                disabled={!edit}
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
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white"
                }`}
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                type="text"
                placeholder="Education"
                required
                disabled={!edit}
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <p>Address</p>
              <input
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white"
                }`}
                name="line1"
                value={formData?.address?.line1}
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
                disabled={!edit}
              />
              <input
                className={`border rounded px-3 py-2 ${
                  edit ? "bg-gray-50" : "bg-white"
                }`}
                name="line2"
                value={formData?.address?.line2}
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
                disabled={!edit}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <p className="mt-3 mb-1">About Doctor</p>
          <textarea
            className={`w-full px-4 pt-2 border rounded ${
              edit ? "bg-gray-50" : "bg-white"
            } overflow-scroll`}
            placeholder="Write about doctor"
            rows={2}
            name="about"
            required
            value={formData.about}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        {edit ? (
          <div className="flex gap-3">
            <button
              className={`bg-primary px-10 py-3 mt-5 text-white rounded-full ${
                updating ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              }`}
              type="submit"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </button>
            <div
              className={`bg-red-500 px-8 py-3 mt-5 text-white rounded-full ${
                updating ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              }`}
              onClick={onCancel}
            >
              Cancel
            </div>
          </div>
        ) : (
          <p
            className={`bg-primary px-10 py-3 mt-4 text-white rounded-full max-w-40 cursor-pointer`}
            onClick={() => setEdit(true)}
          >
            Edit Profile
          </p>
        )}
      </div>
    </form>
  );
};

export default DocProfile;

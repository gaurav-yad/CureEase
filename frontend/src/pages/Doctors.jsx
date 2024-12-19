import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const doctors = useSelector((state) => state.doctors.doctorList);
  const [filteredDocs, setFilteredDocs] = useState([]);

  const specialityList = useSelector(
    (state) => state.specialities.specialityList
  );
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (speciality) {
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.speciality === speciality
      );
      setFilteredDocs(filteredDoctors);
    } else {
      setFilteredDocs(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 transition-all duration-100 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialityList.map((item, index) => {
            return (
              <NavLink
                to={`/doctors/${item.speciality}`}
                className={(e) => {
                  return e.isActive
                    ? "w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer bg-blue-50 border-blue-400 text-black"
                    : "w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-200 cursor-pointer";
                }}
                key={index}
              >
                {item.speciality}
              </NavLink>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filteredDocs.map((item, index) => {
            return (
              <div
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
              >
                <img
                  src={item.image}
                  alt=""
                  className="bg-blue-50 max-h-60 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center">
                    <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}> </p>
                    <p className={`${item.available ? 'text-green-500' : 'text-red-500'}`}>{item.available ? "Available" : "Unavailable"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;

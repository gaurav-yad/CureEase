import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAvailability, getAllDoctors } from '../utils/utils';

const DoctorList = () => {
  const doctors = useSelector((state) => state.doctors.value);
  const dispatch = useDispatch();
  const adminToken = useSelector((state) => state.token.adminToken);

  const handleCheckboxChange = (docId, currStatus) => {
    const newStatus = !currStatus;
    changeAvailability(docId, newStatus, dispatch);
  };

  useEffect(() => {
    if(doctors.length === 0 && adminToken){
      getAllDoctors(dispatch);
    }
  }, [adminToken])
  

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-4">
        {doctors.map((doctor) => (
          <div
            className="border border-indigo-200 rounded-xl w-56 overflow-hidden cursor-pointer group"
            key={doctor._id}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 max-h-60 w-full object-cover"
              src={doctor.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {doctor.name}
              </p>
              <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => handleCheckboxChange(doctor._id, doctor.available)}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import DocAppointments from "./pages/doctor/DocAppointments";
import DashBoard from "./pages/DashBoard";
import Appointments from "./pages/Appointments";
import AddDoctor from "./pages/AddDoctor";
import DoctorList from "./pages/DoctorList";
import DocProfile from "./pages/doctor/DocProfile";
import DocDashBoard from "./pages/doctor/DocDashBoard";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const adminToken = useSelector((state) => state.token.adminToken);
  const docToken = useSelector((state) => state.token.docToken);  

  return adminToken || docToken ? (
    <div>
      <Navbar />
      <div className="flex items-start bg-[#F2F3FF]">
        <SideBar />
        <Routes>
          {adminToken ? (
            <>
              <Route path="/admin" element={<DashBoard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/add-doc" element={<AddDoctor />} />
              <Route path="/doc-list" element={<DoctorList />} />
            </>
          ) : (
            <>
              <Route path="/doctor" element={<DocDashBoard />} />
              <Route path="/my-appointments" element={<DocAppointments />} />
              <Route path="/profile" element={<DocProfile />} />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default App;

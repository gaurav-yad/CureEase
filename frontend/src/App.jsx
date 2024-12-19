import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, getUser } from "./utils/utils.js";
import { useEffect } from "react";
import { message } from "antd";
import ErrorPage from "./pages/ErrorPage.jsx";

const RedirectComp = ({ msg, navigate, redirectUrl }) => {
  useEffect(() => {
    message.info(msg);
    navigate(redirectUrl);
  }, []);

  return <></>;
};

function App() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctorList);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length === 0) {
      getAllDoctors(dispatch);
    }
    
    if (!user && token) {
      getUser(dispatch);
    }
  }, [doctors, user]);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/my-profile"
          element={
            token ? (
              <MyProfile />
            ) : (
              <RedirectComp
                msg={"Please login to continue"}
                navigate={navigate}
                redirectUrl={"/login"}
              />
            )
          }
        />
        <Route
          path="/my-appointments"
          element={
            token ? (
              <MyAppointments />
            ) : (
              <RedirectComp
                msg={"Please login to continue"}
                navigate={navigate}
                redirectUrl={"/login"}
              />
            )
          }
        />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

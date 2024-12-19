import React from "react";
import { assets } from "../assets/assets";

const ErrorPage = () => {
  return (
    <div className="bg-white shadow-lg w-full min-h-[79vh] mx-12 my-10 flex items-center flex-col rounded-lg py-6">
      <h1 className="text-7xl font-semibold text-gray-700">
        Error!! <span className="text-8xl">404</span>{" "}
      </h1>
      <img src={assets.not_found_img} alt="not-found" className="w-80" />
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg">
          Page NOT found! Please try using the Navigation bar to navigate{" "}
        </p>
        <p className="text-gray-500 text-sm">
          Or were you trying to sneak around some page you are not authorised to
          view!!? 😏😏
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logo-Djalsarv.svg";
import { NavLink } from "react-router-dom";
const Addfood = () => {
  return (
    <div className="addfood">
      <div className="register">
        <div className="w-full mx-auto py-[16vh]">
          <form className="ease-in duration-300 w-[80%] mx-auto sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max rounded-md px-8 py-5">
            {/* <label htmlFor="file-upload" className="custom-file-upload">
              <img
                src={images?.url || avata}
                alt=""
                className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
              />
            </label>
            <label className="block text-center text-gray-900 text-base mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              label="Image"
              name="myFile"
              id="file-upload"
              className="hidden"
              accept=".jpeg, .png, .jpg"
              onChange={handleImage}
            /> */}
            <NavLink to="/">
              <img
                src={logo}
                alt="logo...."
                className="logo mx-auto mb-6 cursor-pointer text-center"
              />
            </NavLink>

            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            >
              AddFood
            </button>

            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addfood;

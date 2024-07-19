import { Link, useNavigate } from "react-router-dom";
import avata from "../assets/avata.png";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [images, setImages] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/all/upload-image", // Đảm bảo URL bao gồm giao thức
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploading(false);
      setImages({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("images", images);
  };
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const password = from.password.value;
    const confirmPassword = from.confirmPassword.value;
    const profileImage = images?.url;

    const userData = { name, email, password, confirmPassword, profileImage };

    fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          toast.success(data.message);
          from.reset();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="register">
      <div className="w-full mx-auto pt-[16vh]">
        <form
          className="ease-in duration-300 w-[80%] mx-auto sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max rounded-md px-8 py-5"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="file-upload" className="custom-file-upload">
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
          />

          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
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
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
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
            Register
          </button>
          <Link
            to="/login"
            className="text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded"
          >
            Already have an account?
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;

import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo-Djalsarv.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;

    const userData = { email, password };

    fetch("http://localhost:8000/api/v1/user/login", {
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
    <div className="login">
      <div className="h-screen pt-[16vh]">
        <form
          className="ease-in duration-300 w-[80%] mx-auto sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max flex flex-col items-center rounded-md px-8 py-5 "
          onSubmit={handleOnSubmit}
        >
          <NavLink to="/">
            <img
              src={logo}
              alt=""
              className="logo mb-6 cursor-pointer text-center "
            />
          </NavLink>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
            />
          </div>
          <button
            type="submit"
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center   "
          >
            Sign In
          </button>
          <Link
            to="/register"
            className="text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded "
          >
            Create an Account
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Login;

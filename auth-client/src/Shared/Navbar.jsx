import { useState } from "react";
import logo from "../assets/Logo-Djalsarv.svg";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useCardContext } from "../../context/cardContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const { user, setUser } = useUserContext();
  console.log(user);

  const handleNav = () => {
    setNav(!nav);
  };
  const { cardItems } = useCardContext();
  return (
    <div className="bg-white/80 shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md">
      {user?.user.isVerified === false && (
        <div className="bg-red-500 py-3 px-4 text-white ">
          <Link to="/verifyOtp"> Please verify</Link>
        </div>
      )}

      <div className="py-3 px-10 sm:px-4 md:px-6  lg:px-6 container mx-auto">
        <div className=" flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo" className="h-14 cursor-pointer" />
          </Link>

          <div className="lg:flex hidden gap-8 items-center ">
            <a
              href="#"
              className="text-[#191919] text-xl font-medium hover:text-red-500 "
            >
              Today Special
            </a>
            <a
              href="#"
              className="text-[#191919] text-xl font-medium hover:text-red-500 "
            >
              Why Foodhunt
            </a>
            <Link
              to="/menu"
              className="text-[#191919] text-xl font-medium hover:text-red-500 "
            >
              Our Menu
            </Link>
            {user?.user?.role === "admin" && (
              <Link
                to="/addfood"
                className="text-[#191919] text-xl font-medium hover:text-red-500 "
              >
                Add Food
              </Link>
            )}

            <a
              href=""
              className="text-[#191919] text-xl font-medium  hover:text-red-500"
            >
              Popular food
            </a>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm text-red-500 indicator-item">
                    {cardItems?.length || 0}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-red-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {cardItems?.length || 0} items
                  </span>
                  <div className="card-actions">
                    <Link to="/viewcard">
                      <button
                        type="submit"
                        className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
                      >
                        View Card
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="profile" src={user?.user?.profileImage} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        location.reload();
                        navigate();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                  Login
                </button>
              </Link>
            )}
          </div>

          <div className="block lg:hidden z-40" onClick={handleNav}>
            {nav ? (
              <RxCross2 size={25} className="text-[#191919] cursor-pointer" />
            ) : (
              <TiThMenu size={25} className="text-red-500 cursor-pointer" />
            )}
          </div>
          <div
            className={`lg:hidden absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm backdrop-blur-md bg-white/80 top-0 duration-500 ${
              nav ? "right-0" : "right-[-100%]"
            } pt-24`}
          >
            <div className="flex flex-col  gap-8 items-center ">
              <a
                href="#"
                className="text-[#191919] text-base font-medium hover:text-red-500 "
              >
                Today Special
              </a>
              <a
                href="#"
                className="text-[#191919] text-base font-medium hover:text-red-500 "
              >
                Why Foodhunt
              </a>
              <a
                href="#"
                className="text-[#191919] text-base font-medium hover:text-red-500 "
              >
                Our Menu
              </a>
              <a
                href="#"
                className="text-[#191919] text-base font-medium hover:text-red-500 "
              >
                Add Food
              </a>
              <a
                href="#"
                className="text-[#191919] text-base font-medium  hover:text-red-500"
              >
                Popular food
              </a>
              <Link to="/login">
                <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

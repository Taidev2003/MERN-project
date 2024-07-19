import { useState } from "react";
import logo from "../assets/Logo-Djalsarv.svg";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const { user, setUser } = useUserContext();
  console.log(user);

  const handleNav = () => {
    setNav(!nav);
  };

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
                    <a className="justify-between">Profile</a>
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

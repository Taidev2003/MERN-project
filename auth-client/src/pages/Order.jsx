import { NavLink } from "react-router-dom";

import logo from "../assets/Logo-Djalsarv.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCardContext } from "../../context/cardContext";
import { useUserContext } from "../../context/userContext";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
const Order = () => {
  const { cardItems, addToCard, removeCard } = useCardContext();
  const itemsPrice = cardItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shipingsPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + shipingsPrice + taxPrice;

  const { user } = useUserContext();
  const stripe = useStripe();
  const hanldeFinish = async (event) => {
    event.preventDefault();
    try {
      const orderItems = cardItems.map((item) => ({
        food: item._id,
        qty: item.qty,
      }));
      const res = await axios.post(
        `http://localhost:8000/api/v1/order/order`,
        {
          user: user?.user._id,
          items: orderItems,
          totalAmout: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(cardItems);
      if (res.data.success) {
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.sessionId,
        });
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="h-screen pt-[16vh]">
      <form className="ease-in duration-300 w-[80%] mx-auto sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-[28rem] flex flex-col items-center rounded-md px-8 py-5 ">
        <NavLink to="/">
          <img
            src={logo}
            alt=""
            className="logo mb-6 cursor-pointer text-center "
          />
        </NavLink>

        <div className="text-xl text-[#2e2e2e] mb-3 ">
          Items Price: <span className="text-[#f54748]">${itemsPrice}</span>
        </div>
        <div className="text-xl text-[#2e2e2e] mb-3 ">
          Tax Price: <span className="text-[#f54748]">${taxPrice}</span>
        </div>
        <div className="text-xl text-[#2e2e2e] mb-3 ">
          Shipping Price:
          <span className="text-[#f54748]">${shipingsPrice}</span>
        </div>
        <div className="text-xl text-[#2e2e2e] mb-3 ">
          Total Price: <span className="text-[#f54748]">${totalPrice}</span>
        </div>
        <button
          onClick={hanldeFinish}
          className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center   "
        >
          Pay ${totalPrice}
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default Order;

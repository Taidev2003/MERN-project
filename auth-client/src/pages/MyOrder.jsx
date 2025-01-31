import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCardContext } from "../../context/cardContext";
import { useUserContext } from "../../context/userContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const MyOrder = () => {
  const { cardItems, addToCard, removeCard } = useCardContext();
  const { user, setUser } = useUserContext();
  const [order, setOrder] = useState([]);

  const getMyOrders = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/order/getorder`,
        {
          userId: user?.user._id,
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(cardItems);
      if (res.data.success) {
        setOrder(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);
  console.log(order);
  return (
    <div className="">
      <div className="pt-16">
        <div className=" mx-auto py-6">
          <div className="w-full bg-white px-10 py-5 text-black rounded-md">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">My food Card</h1>
            </div>
            <div className="mt-10 flex mb-5">
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5 ">
                Food details
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5 ">
                Category
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5 ">
                Total Price
              </h3>
            </div>
            {order?.map((food, index) => {
              return <CardFood key={index} food={food} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;

const CardFood = ({ food }) => {
  const { cardItems, addToCard, removeCard } = useCardContext();
  return (
    <div className="flex items-center hover:bg-gray-100  py-5">
      <div className="flex w-2/5">
        <div className="grid grid-cols-3">
          {food?.items?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between ml-4 flex-grow "
            >
              <div>
                <img src={item?.food?.foodImage} alt="" className="h-20" />
              </div>
              <span className="font-bold text-sm">{item?.food?.name}</span>

              <span className="flex items-center space-x-4">
                qty:{" "}
                <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium">
                  {item?.qty}
                </span>
              </span>
            </div>
          ))}
          {/* <img src={food?.foodImage} alt="" className="h-20" /> */}
        </div>
      </div>

      <div className="flex justify-center w-1/4 cursor-pointer">
        {food?.payment === false && (
          <span className="font-bold text-sm ">Not paid</span>
        )}
        {food?.payment && (
          <span className="font-bold text-green-600 text-sm ">Paid</span>
        )}
      </div>

      <div className="flex justify-center w-1/4 cursor-pointer">
        <span className="font-bold text-sm ">{food?.status}</span>
      </div>

      <span className="font-bold text-center w-1/4 text-sm pr-10">
        {food?.createdAt}
      </span>
      <span className="font-bold text-center w-1/4 text-sm">
        {food?.totalAmount}
      </span>
    </div>
  );
};

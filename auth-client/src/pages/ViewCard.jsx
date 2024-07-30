import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCardContext } from "../../context/cardContext";
import { Link } from "react-router-dom";

const ViewCard = () => {
  const { cardItems, addToCard, removeCard } = useCardContext();
  const itemsPrice = cardItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shipingsPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + shipingsPrice + parseInt(taxPrice);

  return (
    <div className="pt-16">
      <div
        className={cardItems?.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"}
      >
        <div className=" mx-auto py-6">
          <div className="w-full bg-white px-10 py-5 text-black rounded-md">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">My food Card</h1>
              <h2 className="font-semibold text-2xl">
                {cardItems?.length || 0}
              </h2>
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
            {cardItems?.map((food, index) => {
              return <CardFood key={index} food={food} />;
            })}
            <div
              className={
                cardItems.length === 0
                  ? "mx-auto hidden items-end justify-center px-6 flex-col"
                  : "mx-auto justify-end items-end px-6 flex-col "
              }
            >
              <div className="text-right mb-2 font-semibold text-red-900">
                Shipping : {shipingsPrice}
              </div>
              <div className="text-right mb-2 font-semibold text-red-900">
                Total Price : {totalPrice}
              </div>
              <Link to="/order">
                <button className="btn text-right items-center ml-auto text-white hover:bg-red-600 hover:border-red-600 btn-sm bg-red-500">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;

const CardFood = ({ food }) => {
  const { cardItems, addToCard, removeCard } = useCardContext();
  return (
    <div className="flex items-center hover:bg-gray-100  py-5">
      <div className="flex ">
        <div className="w-20">
          <img src={food?.foodImage} alt="" className="h-20" />
        </div>
        <div className="flex flex-col justify-between px-4 mx-4 flex-grow ">
          <span className="font-bold text-sm">{food?.name}</span>
          <span className="flex items-center space-x-4">
            <div className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative ">
              <AiOutlineMinus
                size={20}
                className="absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                onClick={() => removeCard(food)}
              />
            </div>
            <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium ">
              {food.qty}
            </span>
            <div className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative ">
              <AiOutlinePlus
                size={20}
                className="absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                onClick={() => addToCard(food)}
              />
            </div>
          </span>
        </div>
      </div>

      <div className="flex justify-center w-1/4 cursor-pointer">
        <span className="font-bold  text-sm">{food?.category}</span>
      </div>
      <span className="font-bold text-center w-1/4 text-sm pr-10">
        {food.price}
      </span>
      <span className="font-bold text-center w-1/4 text-sm">
        {food.price * food.qty}
      </span>
    </div>
  );
};

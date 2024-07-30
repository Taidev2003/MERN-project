import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useFoodContext } from "../../context/foodContext";
import axios from "axios";
import Food from "./Food";

const RecommendedFood = () => {
  const { food, setFood } = useFoodContext();
  const [recommentFood, setRecommentFood] = useState([]);

  const getFoods = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/food/recommentFood`
      );
      // Sửa lỗi tên endpoint
      if (res.data.success) {
        setRecommentFood(res.data.data.food);
      }
    } catch (error) {
      console.error("Error fetching food:", error); // Sử dụng console.error để ghi lỗi chi tiết hơn
    }
  };

  useEffect(() => {
    getFoods();
  }, [recommentFood]);

  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 ">
      <div className="container mx-auto py-[2vh]">
        <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl ">
          Recommendate <span className="text-[#f54748]">Foods</span>
        </div>
        <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {recommentFood?.map((curElm) => (
            <Food key={curElm.id} curElem={curElm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedFood;

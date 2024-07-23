import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logo-Djalsarv.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Addfood = () => {
  const [images, setImages] = useState({});
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
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
      if (uploading === false) {
        toast.success("Successfully uploaded");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("images", images);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const category = form.category.value;
    const weight = form.weight.value;
    const location = form.location.value;
    const description = form.description.value;
    const foodImage = images?.url;
    // const foodData = {
    //   name,
    //   price,
    //   category,
    //   weight,
    //   location,
    //   description,
    //   foodImage,
    // };
    const res = await axios.post(
      "http://localhost:8000/api/v1/food/addfood",
      {
        name,
        price,
        category,
        weight,
        location,
        description,
        foodImage,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      toast.success(res.data.message);
      form.reset();
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div className="addfood">
      <div className="register">
        <div className="w-full mx-auto py-[16vh]">
          <form
            onSubmit={handleSubmit}
            className="ease-in duration-300 w-[80%] mx-auto sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max rounded-md px-8 py-5"
          >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your Food"
                className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <input
                type="file"
                name="myFile"
                className="file-input file-input-bordered file-input-md w-full  max-w-xs"
                accept=".jpeg, .png, .jpg"
                onChange={handleImage}
              />

              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              {/* <select
                name="category"
                className="select select-bordered select-md w-full max-w-xs"
              >
                <option selected>Category</option>
                <option>Rice</option>
                <option>Desert</option>
                <option>Drinks</option>
                <option>Fruits</option>
                <option>Chicken</option>
              </select> */}
              <select
                name="category"
                className="select select-bordered select-md w-full max-w-xs"
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Cập nhật state khi thay đổi giá trị
              >
                <option value="">Category</option>
                <option value="Rice">Rice</option>
                <option value="Desert">Desert</option>
                <option value="Drinks">Drinks</option>
                <option value="Fruits">Fruits</option>
                <option value="Chicken">Chicken</option>
              </select>
              <input
                type="number"
                name="weight"
                placeholder="Enter Weight"
                className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <textarea
                name="description"
                className="textarea textarea-ghost  col-span-2 shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter description"
              ></textarea>
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

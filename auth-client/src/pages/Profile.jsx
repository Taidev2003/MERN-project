import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [images, setImages] = useState({});
  const [uploading, setUploading] = useState(false);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

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
      toast.success("Uploading Imange");
    } catch (error) {
      console.log(error);
    }
    console.log("images", images);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const from = e.target;
    const name = from.name.value;
    const country = from.country.value;
    const city = from.city.value;
    const state = from.state.value;
    const zipcode = from.zipcode.value;
    const profileImage = images?.url;
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/update",
        {
          userId: user.user._id,
          name,
          country,
          city,
          state,
          zipcode,
          profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        from.reset();
        location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  return (
    <div className="Profile">
      <div className="w-full mx-auto py-[16vh]">
        <form
          className="ease-in duration-300 w-[80%] mx-auto sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max rounded-md px-8 py-5"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="file-upload" className="custom-file-upload">
            <img
              src={images?.url || user?.user?.profileImage}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <input
              type="text"
              name="name"
              placeholder={user?.user?.name}
              className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="email"
              name="email"
              disabled
              placeholder={user?.user?.email}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              name="country"
              placeholder={user?.user?.country || "Country"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              name="city"
              placeholder={user?.user?.city || "City"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              name="state"
              placeholder={user?.user?.state || "State"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              name="zipcode"
              placeholder={user?.user?.zipcode || "Zipcode"}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
          >
            Update profile
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { user, updateUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User context:", user); // Kiểm tra giá trị user từ context
  }, [user]);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  const combineOtp = parseInt(otp.join(""));
  const handleOnsubmit = async (e) => {
    e.preventDefault();

    const email = user?.user?.email;

    const dataOtp = { email, combineOtp };
    console.log("Sending data to server:", dataOtp); // Log the data being sent
    fetch("http://localhost:8000/api/v1/user/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOtp),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          updateUser({ ...user, isVerified: true });
          navigate("/");
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        toast.error("An error occurred while verifying OTP.");
      });
  };

  return (
    <div className="relative pt-[15vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto max-w-lg rounded-2xl">
        <div className="max-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              Verification email sent to your email {user?.email}
            </div>
          </div>
          <div>
            <form onSubmit={handleOnsubmit}>
              <div className="flex flex-row space-x-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength="1"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="w-12 h-12 mx-2 border border-gray-300 rounded text-center text-xl"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-red-700 text-white rounded mt-6"
              >
                Verify Account
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

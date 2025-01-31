import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="pt-[8vh] ">
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <div className="text-red-600 text-4xl  pt-10 text-center font-bold">
            404
          </div>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment unsuccessfull
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;

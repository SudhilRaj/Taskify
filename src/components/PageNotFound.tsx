import { Link } from "react-router-dom";
import notFound from "../assets/404.svg";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className=" w-100 px-5 flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-700 to-indigo-500">
      <div>
        <img
          src={notFound}
          alt="404ErrorImg"
          className=" w-[450px] max-sm:w-[290px] m-auto"
        />
        <p className=" text-lg text-gray-100 text-center font-medium mt-3">
          The page you are looking for does not exist <span>&#129300;</span>
        </p>
        <div className=" text-center mt-4">
          <Link to={"/"}>
            <button className="flex group items-center gap-2 m-auto py-3 px-5 text-indigo-500 font-semibold bg-amber-50 rounded-full hover:bg-indigo-900 duration-300 hover:text-white max-sm:text-sm">
            <FaArrowLeft className=" text-lg max-sm:text-base group-hover:-translate-x-1 duration-75"/> Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

import { useNavigate } from "react-router-dom";
import { RxPlus } from "react-icons/rx";
import Greeting from "../components/Greeting";
import DisplayTasks from "../components/DisplayTasks";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full relative min-h-screen pb-36 bg-gradient-to-r from-indigo-700 to-indigo-500">
      <div className="max-w-[1300px] px-3 m-auto">
        <div>
          <Greeting />
          <DisplayTasks/>

          <div
            onClick={() => navigate("/addTask")}
            className="fixed bottom-10 w-16 h-16 max-sm:w-14 max-sm:h-14 cursor-pointer bg-white grid place-items-center rounded-full left-[50%] -translate-x-[50%]"
          >
            <RxPlus className="text-4xl max-sm:text-3xl plusIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

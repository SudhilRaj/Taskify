import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import TaskItem from "./Task";
import CircularProgress from "./CircularProgress";
import { Task } from "../utils/definitions";
import { useData } from "../context/DataContext";

const DisplayTasks =  () => {
  const { data } = useData();
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);

  const completedTask = (): string => {
    const completed = data.filter((task) => task.check);
    if (data.length) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    } else {
      return '0';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterResults = data.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search]);

  const getStatusStyles = () => {
    const parsePercentage = parseFloat(completedTask());
    let statustext = "";
    let statusStyle = ""

    if (parsePercentage === 0) {
      statustext = "No tasks completed yet.";
      statusStyle = "text-red-700";
    } else if (parsePercentage === 100) {
      statustext = "Congratulations! All tasks completed!";
      statusStyle = "text-green-500";
    } else if (parsePercentage > 50) {
      statustext = "More than half of the tasks completed.";
      statusStyle = "text-green-500";
    } else if (parsePercentage === 50) {
      statustext = "Half of the tasks completed.";
      statusStyle = "text-orange-500";
    } else {
      statustext = "Less than half of the tasks completed.";
      statusStyle = "text-orange-500";
    }
    const completed = data.filter((task) => task.check);

    return {statustext, statusStyle, completed}
  }

  const renderTasksStatusText = () => {
    const {statustext, statusStyle, completed} = getStatusStyles();
    return(
      <div className="ms-3 max-sm:text-xs">
        <div className="max-sm:text-sm max-md:text-md text-xl font-semibold">
          You've completed {completed.length} out of {data.length} tasks. 
        </div>
        <div className="max-sm:text-xs max-md:text-sm text-md  font-semibold">
          <span className={`${statusStyle}`}>{statustext}{" "}</span> 
        </div>
      </div>
    )
  };

  return (
    <>
      {data.length ? (
        <div>
          <div className="max-md:container border text-white max-w-[700px] mt-10 max-sm:mt-2 m-auto rounded-3xl bg-gradient-to-r from-indigo-700 to-indigo-500 p-4 max-sm:p-3">
            <div className="flex justify-start items-center">
              <CircularProgress completedTask={completedTask} getStatusStyles={getStatusStyles}/>
              {renderTasksStatusText()}
            </div>
            {/*<h3>{renderTasksStatusText()}</h3>
              <div className="flex flex-col w-[60%] max-sm:w-[100%] mt-5 max-sm:mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">{`${data.length} ${data.length > 1 ? "Tasks" : "Task"}`}</span>
                <p className="text-sm">{completedTask()}%</p>
              </div>

              <div className="bg-indigo-800 w-full h-2 mt-2 rounded-3xl">
                <div
                  className="h-full rounded-3xl transition-all bg-indigo-100"
                  style={{ width: `${completedTask()}%` }}
                ></div>
              </div>
            </div> */}
          </div>

          <div className="max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 relative">
            <input
              type="text"
              placeholder="Search for task."
              value={search}
              onChange={handleSearch}
              className="w-full h-14 max-sm:h-12 rounded-xl pl-11 placeholder:text-sm outline-none"
            />
            <IoMdSearch className="absolute top-[50%] left-3 -translate-y-[50%] text-indigo-600 text-2xl max-sm:text-xl" />
          </div>

          <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5">
            {searchResults.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-white mt-[150px]">
          <h1 className="w-full text-center text-2xl max-md:text-2xl max-sm:text-xl font-bold">
            You don't have any tasks yet
          </h1>
          <p className="w-full text-center">Click on the + button to add one</p>
        </div>
      )}
    </>
  );
};

export default DisplayTasks;

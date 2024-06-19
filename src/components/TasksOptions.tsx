import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useData } from "../context/DataContext";
import { Task, TaskOptionsProps } from "../utils/definitions";
import { currentDateTime } from "../utils/common";

const TasksOptions: React.FC<TaskOptionsProps> =  ({ task, setOpenOptions }) => {
  const {data, setData} = useData();
  const IconDone = task.check ? FaCheck : FaTimes;

  const handleDelete = (isData: Task) => {
    const newData = data.filter((task) => task.id !== isData.id);
    setData(newData);
    localStorage.setItem("taskItems", JSON.stringify(newData));

    setOpenOptions(false)
    toast.error(`Task ${isData.title} Deleted`)
  };

  const handleDone = (task: Task) => {
    const newData = data.map((item) =>
      item.id === task.id ? { ...item, check: !item.check } : item
    );

    setData(newData);
    localStorage.setItem("taskItems", JSON.stringify(newData));
    setOpenOptions(false)

    // toast.success(`Task ${task.title} marked as ${task.check ? "not done" : "done"}`)
  };

  const handleDuplicate = (task: Task) => {
    const {date, month, year, amOrPm, formattedHours, minutes} = currentDateTime();
    const duplicateTask = {
      id: uuidv4(), //Supplying a new id
      title: task.title,
      description: task.description,
      check: false,
      createdTime: `${date}/${month}/${year} ,${formattedHours}:${minutes} ${amOrPm}`,
      category: task.category,
    };

    setData([...data, duplicateTask]);
    localStorage.setItem("taskItems", JSON.stringify([...data, duplicateTask]));
    setOpenOptions(false)
  };

  return (
    <div className="absolute z-10 w-[215px] shadow bg-white top-8 left-0 max-xl:-left-48 p-3 rounded-2xl">
      <ul className="flex flex-col text-black">
        <li
          onClick={() => handleDone(task)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 max-sm:py-2 px-2 rounded-md"
        >
          <IconDone className="text-2xl max-sm:text-xl text-slate-700" />
          {task.check ? "Mark as not done" : "Mark as done"}
        </li>
        <li>
          <Link
            to={`/editTask/${task.id}`}
            className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3  px-2 rounded-md"
          >
            <RiEdit2Fill className="text-2xl max-sm:text-xl text-slate-700" />
              Edit
          </Link>
        </li>
        <li
          onClick={() => handleDuplicate(task)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdContentCopy className="text-2xl max-sm:text-xl text-slate-700" />
            Duplicate
        </li>
        <li
          onClick={() => handleDelete(task)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdDelete className="text-2xl max-sm:text-xl text-slate-700" />
          Delete
        </li>
        <li>
          <Link
            to={`/task/${task.id}`}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
          >
            <BiTask className=" text-2xl max-sm:text-xl text-slate-700" />
              Task details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksOptions;

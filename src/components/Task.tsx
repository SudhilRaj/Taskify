import { useState } from "react";
import { CgMore, CgMoreVertical } from "react-icons/cg";
import { MdOutlinePendingActions, MdCheckCircleOutline  } from "react-icons/md";
import TasksOptions from "./TasksOptions";
import { TaskItemProps } from "../utils/definitions";

const Task: React.FC<TaskItemProps> =  ({ task }) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  return (
    <div className={`flex justify-between gap-4 max-w-full items-center text-[#424242] 
        bg-[#F5F5F5] rounded-2xl px-6 py-5 max-sm:py-4 max-sm:px-4 border-l-8 ${task.check?"border-green-500":"border-orange-500"}`}>
      <div className="bg-amber-300 p-4 max-sm:p-2 rounded-xl">
        {task.check ? <MdCheckCircleOutline className="text-4xl" /> : <MdOutlinePendingActions className="text-4xl" />}
      </div>
      <div className="block w-full">
        <div className={`flex justify-between gap-10 items-center ${task.description ? "mb-3 max-sm:mb-1" : "mb-0"}`}>
          <h2 className={`${task.check ? "line-through" : null} font-bold text-lg display-input max-sm:text-sm`}>
            {task.title}
          </h2>
          <p className={`${task.check ? "line-through" : null} min-w-[110px] max-sm:text-xs text-sm font-light text-[#333]`}>
            {task.createdTime}
          </p>
        </div>
        {!!task.description && (
          <p className={`${task.check ? "line-through" : null} text-base max-sm:text-sm`}>
            {task.description}
          </p>
        )}

        {!!task?.category?.length && (
          <div className={`flex gap-2 items-center flex-wrap mt-3`}>
            {task.category.map((c, index) => (
              <h4
                key={index}
                className="bg-[#EEE] rounded-2xl text-sm max-sm:text-xs px-3 flex items-center font-medium gap-1 py-1 max-sm:py-0"
              >
                <span className=" text-xl max-sm:text-lg">{c.emoji}</span> {c.category}
              </h4>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        {openOptions ? (
          <CgMore
            onClick={() => setOpenOptions(!openOptions)}
            className="text-xl cursor-pointer"
          />
        ) : (
          <CgMoreVertical
            onClick={() => setOpenOptions(!openOptions)}
            className="text-xl cursor-pointer"
          />
        )}

        <div className={`${openOptions ? "animation-active" : "animation-inactive"}`}>
          {openOptions && (
            <TasksOptions
              task={task}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;

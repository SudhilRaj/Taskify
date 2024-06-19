import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import PageNotFound from "../components/PageNotFound";
import { Category, Task } from "../utils/definitions";

const TaskDetails = () => {
  const { id } = useParams();
  const itemsString = localStorage.getItem("taskItems");
  const items = itemsString ? JSON.parse(itemsString) : [];

  const details = items.find((task: Task) => task.id.toString() === id);

  if(!details){
    return <PageNotFound />
  }
  
  return (
    <div className=" w-full relative min-h-screen bg-indigo-600">
      <div className=" max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={"Task Details"} />

          <div className=" rounded-2xl bg-indigo-700 max-w-[600px] m-auto mt-16 py-10 px-8 max-sm:p-5 text-white">
            <h1 className=" text-center text-4xl max-sm:text-2xl font-bold">
              Task - {details?.title ?? ""}
            </h1>

            <div className=" mt-8">
              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Task Name:
                </h2>
                <p className=" text-left text-base max-sm:text-sm font-normal">
                  {details?.title || "-"}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Description:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details?.description || "-"}
                </p>
              </div>

              <div className="text-xl max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className=" text-left text-lg max-sm:text-sm min-w-28">
                  Created:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details?.createdTime || ""}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Status:
                </h2>
                <p className=" text-left text-base max-sm:text-sm font-normal">
                  {details?.check ? "Completed" : "Not completed"}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Category:
                </h2>
                <div className="flex flex-wrap gap-3 max-sm:gap-2">
                  {details?.category && details.category.map((cat: Category, index: number) => (
                    <p
                      className="text-left text-base bg-indigo-600 border-indigo-300 border-2 flex items-center gap-1 font-medium rounded-2xl px-3 py-1 max-sm:text-xs max-sm:py-0"
                      key={index}
                    >
                       <span className=" text-xl max-sm:text-lg">{cat.emoji}</span> {cat.category}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

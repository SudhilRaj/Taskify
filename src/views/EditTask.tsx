import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import TopNav from "../components/TopNav";
import EditCategoryBtn from "../components/EditCategoryBtn";
import { category } from "../constants/Data";
import { useData } from "../context/DataContext";
import { Category, Task } from "../utils/definitions";
import { currentDateTime } from "../utils/common";
// import PageNotFound from "../components/PageNotFound";

const EditTask = () => {
  const {data, setData} = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formObj, setFormObj] = useState<Task>({
    id: '',
    title: '',
    description: '',
    createdTime: '',
    check: false,
    category: [],
  })
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isFieldsChanged, setFieldsChanged] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

  useEffect(() => {
    id ? setEditMode(true) : setEditMode(false);
    if (id) {
      const itemsString = localStorage.getItem("taskItems");
      const items = itemsString ? JSON.parse(itemsString) : [];
      const details = items.find((task: Task) => task.id.toString() === id);
      setFormObj({
        ...formObj,
        id: details?.id || '',
        title: details?.title || '',
        description: details?.description || '',
        createdTime: details?.createdTime || '',
        check: details?.check || false,
        category: details?.category || [],
      })
    } 
    return () => {
      // component unmount events
    };
  }, [id]);

  // if(!details){
  //   return <PageNotFound />
  // }

  const clearFormObj = () => {
    setFormObj({
      id: '',
      title: '',
      description: '',
      createdTime: '',
      check: false,
      category: [],
    })
  }

  const setInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormObj({ 
      ...formObj, 
      [name]: value 
    });

    setFieldsChanged(true);
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //   }
  // };

  const handleSelected = (categoryObj: Category) => {
    const isCategorySelected = formObj?.category && formObj.category.filter(
      (cat) => cat.id === categoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = formObj.category.filter(
        (cat) => cat.id !== categoryObj.id
      );
      setFormObj({
        ...formObj,
        category: updatedCatagories
      });
    } else {
      if (formObj.category.length < 3) {
        setFormObj({
          ...formObj,
          category: [...formObj.category, categoryObj],
        })
      } else {
        toast.error("You cannot add more than 3 catagories");
        setFormObj({
          ...formObj,
          category: [...formObj.category],
        })
      }
    }
    setFieldsChanged(true);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formObj.title === "") {
      toast.error("Please enter a task name");
    } else {
      // This can be done by map and find based on the id
      const editIndex = [...data];
      const itemIndex = editIndex.findIndex((item) => item.id === formObj.id);
      editIndex[itemIndex] = formObj as Task;

      setData(editIndex);
      localStorage.setItem("taskItems", JSON.stringify(editIndex));

      navigate("/");
      toast.success(`Task ${formObj.title} updated`);
    }
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {date, month, year, amOrPm, formattedHours, minutes} = currentDateTime();
    const id = uuidv4();
    const createdTime = `${date}/${month}/${year} ,${formattedHours}:${minutes} ${amOrPm}`;

    if (formObj.title === "") {
      toast.error("Please enter a task name");
    } else {
      const newTask = {
        id: id,
        title: formObj.title,
        description: formObj.description,
        createdTime: createdTime,
        check: false,
        category: formObj.category,
      };

      setData([...data, newTask]);
      localStorage.setItem("taskItems", JSON.stringify([...data, newTask]));
      clearFormObj();

      navigate("/");
      toast.success(`Added Task - ${formObj.title}`)
    }
  }

  const handleCancel = () => {
    navigate("/");
    setFieldsChanged(false);
  };

  return (
    <div className="w-full relative min-h-screen bg-indigo-600">
      <div className="max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={editMode ? "Edit Task" : "Add New Task"} />
          <div>

            <form className="max-w-[600px] m-auto" onSubmit={editMode ? (e) => handleEditSubmit(e) : (e) => handleAddSubmit(e)}>
              <div>
                <label
                  className={`text-sm max-sm:text-xs ${
                    formObj.title.length > 30 ? "text-red-700" : "text-indigo-200"
                  } text-indigo-200`}
                  htmlFor="task-name"
                >
                  Task Name *
                </label>
                <input
                  type="text"
                  id="task-name"
                  name="title"
                  value={formObj.title}
                  onChange={(e) => setInput(e)}
                  placeholder="Enter task name"
                  className={`w-full h-12 ${
                    formObj.title.length > 30 ? "border-red-700 border-2" : "border-none"
                  } rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
                />
                {formObj.title.length > 30 && (
                  <p className="text-red-700 text-base max-sm:text-xs mt-1">
                    Name should be less than or equal to 30 characters
                  </p>
                )}
              </div>

              <div className="mt-7 max-sm:mt-4">
                <label
                  className={`text-sm max-sm:text-xs ${
                    formObj.description.length > 150 ? "text-red-700" : "text-indigo-200"
                  } text-indigo-200`}
                  htmlFor="task-description"
                >
                  Task Description
                </label>
                <textarea
                  id="task-description"
                  name="description"
                  value={formObj.description}
                  onChange={(e) => setInput(e)}
                  placeholder="Enter task description"
                  className={`resize-none ${
                    formObj.description.length > 150
                      ? "border-red-700 border-2"
                      : "border-none"
                  }  w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-36 outline-none`}
                ></textarea>
                {formObj.description.length > 150 && (
                  <p className="text-red-700 text-base max-sm:text-xs mt-1">
                    Description should be less than or equal to 150 characters
                  </p>
                )}
              </div>

              <div className="mt-7 max-sm:mt-4">
                <label className="text-sm text-indigo-200">Category</label>
                <div
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="bg-white flex gap-7 cursor-pointer justify-between min-h-12 px-3 py-3 max-sm:px-2 max-sm:py-2 items-center max-sm:text-xs rounded-xl w-full mt-1"
                >
                  {formObj.id && (
                    <div className="flex gap-2 flex-wrap items-center">
                      {formObj?.category && formObj.category.map((cat, index) => (
                        <div
                          key={index}
                          className="bg-indigo-500 text-white text-sm max-sm:text-xs flex items-center gap-1 px-3 py-2 max-sm:py-2 font-medium rounded-lg"
                        >
                          <span className="text-md max-sm:text-sm">
                            {cat.emoji}
                          </span>
                          {cat.category}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="ms-auto">
                    {categoryOpen ? (
                      <IoIosArrowUp className="text-2xl max-sm:text-xl" />
                    ) : (
                      <IoIosArrowDown className="text-2xl max-sm:text-xl" />
                    )}
                  </div>
                </div>
                {categoryOpen ? (
                  <div className="mt-3">
                    <ul className="p-2 bg-indigo-400 flex flex-col gap-2 max-sm:gap-1 rounded-xl">
                    <li className="my-2 px-3 text-white max-sm:text-sm">Select max (3 Categories)</li>
                      {category.map((cat, index) => (
                        <EditCategoryBtn
                          key={index}
                          cat={cat}
                          handleSelected={handleSelected}
                          selectedCategory={formObj.category}
                        />
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="text-center flex gap-4 max-sm:flex-col mt-4">
                {editMode && (
                  <button
                    onClick={handleCancel}
                    className="bg-indigo-400 hover:bg-indigo-500 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className={`
                    ${formObj.title.length > 30 || formObj.description.length > 150 || !isFieldsChanged
                      ? "bg-amber-300 cursor-not-allowed text-indigo-400"
                      : "hover:bg-amber-500 text-white"
                      }transition text-xl font-bold bg-amber-400  p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
                    disabled={formObj.title.length > 30 || formObj.description.length > 150 || !isFieldsChanged ? true : false}
                >
                  {editMode ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;

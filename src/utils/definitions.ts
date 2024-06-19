   // type definitions
   export type Category = {
      id: number;
      category: string;
      emoji: string;
   }
    
   export type Task = {
      id: string;
      title: string;
      description: string;
      createdTime: string;
      check: boolean;
      category: Category[]
   }

   // export type EditState = Task | Partial<Task>;

   export type DataContextType = {
      data: Task[];
      setData: React.Dispatch<React.SetStateAction<Task[]>>;
      // edit: Task;
      // setEdit: React.Dispatch<React.SetStateAction<Task>>;
      // addNotificationTitle: string;
      // addNotification: boolean;
      // setAddNotificationTitle: React.Dispatch<React.SetStateAction<string>>;
      // setAddNotification: React.Dispatch<React.SetStateAction<boolean>>;
   }

   export type TaskItemProps = {
      task: Task;
   }

   export type TaskOptionsProps = {
      task: Task;
      setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>;
   }

   export type CategoryBtnProps = {
      val: Category;
      selectedCategory: Category[];
      handleSelected: (category: Category) => void;
   }
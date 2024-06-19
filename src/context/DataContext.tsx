import React, { createContext, useContext, useEffect, useState } from "react";
import { DataContextType, Task } from "../utils/definitions";

const DataContext = createContext<DataContextType  | undefined>(undefined);

export const DataProvider = ({ children }: {children: React.ReactNode}) => {
  const [data, setData] = useState<Task[]>([]);

  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem("taskItems") || '[]')
    setData(items)
  },[])

  return (
    <DataContext.Provider value={{data,setData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useContext must be used within a DataProvider");
  }

  return context;
}




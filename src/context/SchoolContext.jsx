import { useEffect, useState } from "react";
import { initialData } from "../data/initialData";
import { SchoolContext } from "./schoolContextValue";

const STORAGE_KEY = "scholardesk-data";

function readSavedData() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialData;
}

export function SchoolProvider({ children }) {
  const [data, setData] = useState(readSavedData);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <SchoolContext.Provider value={{ data, setData }}>
      {children}
    </SchoolContext.Provider>
  );
}

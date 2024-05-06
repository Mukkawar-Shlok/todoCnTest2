import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  return (
    <DataContext.Provider value={{ todos, setTodos }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data
export const useData = () => useContext(DataContext);

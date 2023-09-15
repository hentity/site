import React, { createContext, useState, useContext } from 'react';

const SelectedCategoryContext = createContext();

export function SelectedCategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
}

export function useSelectedCategory() {
  return useContext(SelectedCategoryContext);
}
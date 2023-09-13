"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context to store the category colours
const CategoryColoursContext = createContext();

export function CategoryColoursProvider({ children }) {
  const [categoryColours, setCategoryColours] = useState({});
  
  useEffect(()=>{
    setCategoryColours({
        Tech: "red-700",
        Books: "green-800",
        History: "blue-800",
        Media: "yellow-800",
        Random: "black",
      });
}, [])

  return (
    <CategoryColoursContext.Provider value={categoryColours}>
      {children}
    </CategoryColoursContext.Provider>
  );
}

export function useCategoryColours() {
  return useContext(CategoryColoursContext);
}
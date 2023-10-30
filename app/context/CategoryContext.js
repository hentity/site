"use client";

import React, { createContext, useContext } from 'react';

// Create a context to store the category colours
const CategoryColoursContext = createContext();

const categoryColours1 = {
  All: "#000000",
  Tech: "#5F0F40", 
  Books: "#9A031E",
  Music: "#E36414", 
  // Media: "#0F4C5C",
  Fitness: "#0A590E", 
  Random: "#e14d61",
};

const categoryColours2 = {
  All: "#000000",
  Tech: "#ef7f7a", 
  Books: "#4b73b1",
  Music: "#e14d61", 
  Fitness: "#e99a53", 
  Random: "#6457ae",
  // Other: "#e14d61",
};

export function CategoryColoursProvider({ children }) {
  return (
    <CategoryColoursContext.Provider value={categoryColours2}>
      {children}
    </CategoryColoursContext.Provider>
  );
}

export function useCategoryColours() {
  return useContext(CategoryColoursContext);
}

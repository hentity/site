"use client";

import React, { createContext, useContext } from 'react';

// Create a context to store the category colours
const CategoryColoursContext = createContext();

const categoryColours = {
  All: "#000000",
  Tech: "#5F0F40", 
  Books: "#9A031E",
  Music: "#E36414", 
  // Media: "#0F4C5C",
  Fitness: "#0A590E", 
  Random: "#000000",
};

export function CategoryColoursProvider({ children }) {
  return (
    <CategoryColoursContext.Provider value={categoryColours}>
      {children}
    </CategoryColoursContext.Provider>
  );
}

export function useCategoryColours() {
  return useContext(CategoryColoursContext);
}

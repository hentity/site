"use client";

import "./globals.css";
import NavBar from "components/navbar";
import { CategoryColoursProvider } from "@/app/context/CategoryContext";
import { useState } from "react";
import Home from "./page";

export default function RootLayout({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <html lang="en">
      <head>
        <meta name="description" content="Description" />
      </head>
      <body className="">
        <CategoryColoursProvider>
          <NavBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Home selectedCategory={selectedCategory} />
        </CategoryColoursProvider>
      </body>
    </html>
  );
}

"use client";

import "./globals.css";
import NavBar from "components/navbar";
import { CategoryColoursProvider } from "@/app/context/CategoryContext";
import { SelectedCategoryProvider } from "@/app/context/SelectedCategoryContext";
import { useState } from "react";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

export default function RootLayout({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <html lang="en" className={`${mulish.variable}`}>
      <head>
        <meta name="description" content="Description" />
      </head>
      <body className="">
        <SelectedCategoryProvider>
          <CategoryColoursProvider>
            <NavBar />
            {children}
          </CategoryColoursProvider>
        </SelectedCategoryProvider>
      </body>
    </html>
  );
}

"use client";

import "./globals.css";
import NavBar from "components/navbar";
import { CategoryColoursProvider } from "@/app/context/CategoryContext";
import { SelectedCategoryProvider } from "@/app/context/SelectedCategoryContext";
import { useState } from "react";
import { Mulish, EB_Garamond } from "next/font/google";

const sans = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export default function RootLayout({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
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

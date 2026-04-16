"use client";

import "./globals.css";
import NavBar from "components/navbar";
import { CategoryColoursProvider } from "@/app/context/CategoryContext";
import { SelectedCategoryProvider } from "@/app/context/SelectedCategoryContext";
import { Mulish, EB_Garamond } from "next/font/google";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const showNav = !pathname.startsWith("/pojagi");

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <meta name="description" content="Description" />
        <link rel="icon" href="/img/henlightened.png" type="image/png" />
      </head>
      <body className="">
        <SelectedCategoryProvider>
          <CategoryColoursProvider>
            {showNav && <NavBar />}
            {children}
          </CategoryColoursProvider>
        </SelectedCategoryProvider>
      </body>
    </html>
  );
}

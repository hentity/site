"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryColours } from "@/app/context/CategoryContext";
import { useSelectedCategory } from "@/app/context/SelectedCategoryContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/logo";

export default function Navbar() {
  const categoryColours = useCategoryColours();
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex px-4 items-center relative bg-navBackground">
        <div className="text-xl font-bold py-2 w-1/6">
          <Link
            onClick={() => setSelectedCategory("All")}
            href="/"
            className="flex items-center group w-fit"
          >
            <div className="font-sans lowercase transition ease-in-out text-textPrimary">
              Henlightened
            </div>
            <Logo className="bg-textPrimary" />
          </Link>
        </div>

        <div className="hidden md:flex md:justify-center md:space-x-4 md:items-center md:w-3/4 ">
          {Object.keys(categoryColours).map((category, index, arr) => (
            <React.Fragment key={category}>
              <Link
                href={"/"}
                onClick={() => {
                  setSelectedCategory(category);
                }}
                className="group inline-block relative"
              >
                {/* OTHER STYLING OPTIONS FOR CATEGORY LINKS */}

                {/* <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 bottom-0 h-1 bg-black transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                ></div>
                <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 top-0 h-1 bg-black transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-right"
                ></div> */}

                {/* <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 top-0 h-1 bg-black transition-all ease-in-out duration-300 opacity-0 group-hover:opacity-100"
                ></div> */}

                {selectedCategory === category && pathname === "/" ? (
                  <div
                    style={{
                      background:
                        selectedCategory != "All" && categoryColours[category],
                    }}
                    className="absolute inset-x-0 bottom-0 h-1 opacity-100 bg-gradient-to-r from-gradientStart to-gradientEnd"
                  ></div>
                ) : (
                  <div
                    style={{
                      background:
                        category === "All"
                          ? "linear-gradient(to right, #0F4C5C, #E36414)"
                          : categoryColours[category],
                    }}
                    className="absolute inset-x-0 bottom-0 h-1 transition ease-in-out opacity-0 duration-200 group-hover:opacity-100"
                  ></div>
                )}

                <div className="cursor-pointer font-sans lowercase text-xl py-1 text-textPrimary">
                  {category}
                </div>
              </Link>
              {index < arr.length - 1 && (
                <span className="font-sans text-textPrimary text-sm cursor-default">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="hidden md:flex md:absolute md:right-4 md:w-1/6 md:justify-end md:justify-end">
          <Link
            href="/about"
            className="font-sans text-xl font-bold lowercase text-textPrimary transition ease-in-out duration-300"
          >
            About
          </Link>
        </div>

        <div className="md:hidden flex absolute right-4 w-1/12 justify-end">
          <button onClick={toggleMenu} className="text-xl font-bold">
            ☰
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col space-y-6 p-8">
          <button onClick={toggleMenu} className="self-end font-sans text-3xl">
            &times;
          </button>
          <div className="flex flex-col items-start space-y-4">
            {Object.keys(categoryColours).map((category) => (
              <Link
                key={category}
                href="/"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsMenuOpen(false);
                }}
                className="flex w-full p-1 items-center lowercase space-x-2 font-sans text-2xl focus:bg-postBackgroundHover"
              >
                <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="w-1 h-full mr-1"
                ></div>
                {category}
              </Link>
            ))}
          </div>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="p-1 pt-4 border-t-2 lowercase w-full font-sans text-2xl focus:bg-postBackgroundHover"
          >
            About
          </Link>
        </div>
      )}
    </>
  );
}

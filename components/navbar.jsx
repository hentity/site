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
      <nav className="flex px-4 items-center sticky top-0 bg-navBackground z-50 fffborder-b-2 fffborder-borders">
        {/* border-b border-b-borders border-b-1 */}
        <div className="text-xl font-bold py-2 w-1/6">
          <Link
            onClick={() => setSelectedCategory("All")}
            href="/"
            className="flex items-center group w-fit"
          >
            <div className="relative font-sans transition ease-in-out text-textPrimary">
              <div className="align-middle">Henlightened</div>
            </div>
            <Logo className="bg-textPrimary" />
          </Link>
        </div>

        <div className="hidden md:flex md:justify-end md:space-x-1.5 lg:space-x-4 md:items-center w-5/6">
          {Object.keys(categoryColours).map((category, index, arr) => (
            <React.Fragment key={category}>
              <Link
                href={"/"}
                onClick={() => {
                  setSelectedCategory(category);
                }}
                className="group inline-block relative font-bold"
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
                    className="absolute inset-x-0 bottom-0 h-1 opacity-100 bg-shadows"
                  ></div>
                ) : (
                  <div
                    style={{
                      background:
                        category === "All"
                          ? "#000000"
                          : categoryColours[category],
                    }}
                    className="absolute inset-x-0 bottom-0 h-1 transition ease-in-out opacity-30 duration-200 group-hover:opacity-100"
                  ></div>
                )}

                <div className="cursor-pointer font-sans text-xl py-1 text-textPrimary transition duration-200 group-hover:-translate-y-0.5">
                  {category}
                </div>
              </Link>
              {index < arr.length - 1 && (
                <span className="font-sans text-2xl font-bold text-textPrimary cursor-default"></span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* <div className="hidden md:flex md:absolute md:right-4 md:w-1/12 lg:w-1/6 md:justify-end md:justify-end">
          <Link
            href="/"
            className="font-sans text-xl font-bold text-textPrimary transition ease-in-out duration-300"
          >
            About
          </Link>
        </div> */}

        <div className="md:hidden flex absolute right-4 w-1/12 justify-end">
          <button onClick={toggleMenu} className="text-3xl font-bold">
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
                className="flex w-full p-1 items-center space-x-2 font-sans font-bold text-2xl focus:bg-postBackgroundHover"
              >
                {selectedCategory === category && pathname === "/" ? (
                  <div
                    style={{ backgroundColor: categoryColours[category] }}
                    className="w-1 h-full mr-1"
                  ></div>
                ) : (
                  <div
                    style={{ backgroundColor: categoryColours[category] }}
                    className="w-1 h-full mr-1 opacity-50 hover:opacity-100 focus:opacity-100"
                  ></div>
                )}
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryColours } from "@/app/context/CategoryContext";
import { useSelectedCategory } from "@/app/context/SelectedCategoryContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const categoryColours = useCategoryColours();
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      <nav className="flex px-4 items-center relative ">
        <div className="text-xl font-bold md:py-0 py-4 w-1/6">
          <Link href="/" className="flex items-center group">
            <div className="font-mulish lowercase transition ease-in-out bg-black bg-clip-text duration-300 bg-gradient-to-r from-[#0F4C5C] to-[#E36414] group-hover:text-transparent">
              Henlightened
            </div>
            <Image
              src="/img/henlightened.png"
              width={50}
              height={50}
              alt="Henlightened Logo"
            />
          </Link>
        </div>

        <div className="flex-grow flex justify-center space-x-4 items-center w-2/3">
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

                {selectedCategory === category ? (
                  <div
                    style={{
                      background:
                        selectedCategory === "All"
                          ? "linear-gradient(to right, #0F4C5C, #E36414)"
                          : categoryColours[category],
                    }}
                    className="absolute inset-x-0 bottom-0 h-1 opacity-100"
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

                <div className="cursor-pointer font-mulish lowercase text-xl py-1 text-black ">
                  {category}
                </div>
              </Link>
              {index < arr.length - 1 && <span className="text-xl">•</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex w-1/6 justify-end">
          <Link
            href="/about"
            className="text-xl font-bold font-mulish lowercase transition ease-in-out bg-black bg-clip-text duration-300 bg-gradient-to-r from-[#0F4C5C] to-[#E36414] hover:text-transparent"
          >
            About
          </Link>
        </div>
      </nav>
    </>
  );
}

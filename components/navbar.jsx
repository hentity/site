"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryColours } from "@/app/context/CategoryContext";

export default function Navbar() {
  const categoryColours = useCategoryColours();

  const linkStyles =
    "relative font-mulish lowercase font-bold text-xl block w-fit after:block after:content-[''] after:absolute after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300";

  return (
    <>
      <nav className="flex px-4 items-center relative ">
        <div className="text-xl font-bold md:py-0 py-4 w-1/6">
          <Link href="/" className="flex items-center group">
            <div className="font-mulish lowercase transition ease-in-out bg-black bg-clip-text duration-500 bg-gradient-to-r from-[#0F4C5C] to-[#E36414] group-hover:text-transparent">
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
              <div className="group inline-block relative">
                {/* <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 bottom-0 h-1 bg-black transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                ></div>
                <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 top-0 h-1 bg-black transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-right"
                ></div> */}

                {/* OTHER STYLING OPTIONS FOR CATEGORY LINKS */}

                {/* <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 top-0 h-1 bg-black transition-all ease-in-out duration-300 opacity-0 group-hover:opacity-100"
                ></div> */}
                <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="absolute inset-x-0 bottom-0 h-1 bg-black transition-all ease-in-out opacity-0 duration-500 group-hover:opacity-100"
                ></div>

                <div
                  style={{ backgroundColor: categoryColours[category] }}
                  className="cursor-pointer font-mulish lowercase text-xl py-1 bg-clip-text text-black transition ease-in-out duration-500 dhover:text-transparent"
                >
                  {category}
                </div>
              </div>
              {index < arr.length - 1 && <span className="text-xl">•</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex w-1/6 justify-end">
          <div className="font-mulish font-bold text-xl lowercase text-black p-2">
            Subscribe
          </div>
        </div>
      </nav>
    </>
  );
}

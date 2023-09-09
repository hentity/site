import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="flex px-4 items-center relative">
        <div className="text-xl font-bold md:py-0 py-4">
          <Link href="/">
            <span className="relative text-xl font-mulish w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              henlightened
            </span>
          </Link>
        </div>
        <ul className="md:px-2 ml-auto md:flex absolute md:relative top-full left-0 right-0">
          <li>
            <a
              href="#"
              className="flex md:inline-flex p-4 items-center rounded-md"
            >
              <span className="relative lowercase font-mulish font-bold text-xl font-mulish w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                Archive
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="flex md:inline-flex p-4 items-center">
              <span className="relative lowercase font-mulish font-bold text-xl font-mulish w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                About
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

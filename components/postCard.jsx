"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryColours } from "@/app/context/CategoryContext";
import { useSelectedCategory } from "@/app/context/SelectedCategoryContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PostCard({
  id,
  date,
  title,
  category,
  coverImage,
  description,
  isNew,
}) {
  const categoryColours = useCategoryColours();

  return (
    <>
      <Link
        key={id}
        href={`/posts/${id}`}
        className={
          "transition flex max-md:flex-col group duration-300 h-full ease-in-out rounded-custom bg-postBackground border-2 border-borders shadow-xl shadow-shadows lg:border-2 lg:border-textPrimary lg:shadow-shadows lg:shadow-lg lg:hover:shadow-xl lg:hover:shadow-shadows lg:hover:-translate-y-1.5"
        }
      >
        <div className="w-full md:w-5/12 lg:w-1/2 p-2">
          <div className="relative w-full" style={{ paddingTop: "66.66%" }}>
            <Image
              className="object-cover rounded-custom absolute inset-0 w-full h-full"
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-top md:w-7/12 lg:w-1/2 p-2">
          <div className="flex">
            <div className="relative text-textPrimary font-sans font-bold text-xl xl:text-2xl w-fit">
              {title}
            </div>
          </div>
          <div className="text-textMuted text-md font-semibold font-light font-sans ">
            {new Date(date)
              .toLocaleDateString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/\//g, " ")}
          </div>
          {/* <div className="flex h-full py-1">
            <div
              style={{
                backgroundColor: categoryColours[category],
              }}
              className="px-2 my-1 rounded-custom h-fit w-fit py-0.5 font-sans font-semibold text-textCategoryLabel"
            >
              {category}
            </div>
          </div> */}
          {/* <p className="max-2xl:hidden text-lg font-serif mt-2">
            {description}
          </p> */}
          <div className="flex h-full items-end self-end">
            <div className="text-textMuted text-md h-fit font-semibold font-light font-sans">
              <div
                style={{
                  backgroundColor: categoryColours[category],
                }}
                className="px-2 m-2 rounded-custom w-fit py-0.5 font-sans font-semibold text-textCategoryLabel"
              >
                {category}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

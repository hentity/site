"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryColours } from "@/app/context/CategoryContext";
import { useSelectedCategory } from "@/app/context/SelectedCategoryContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function HeroPostCard({
  id,
  date,
  title,
  category,
  coverImage,
  description,
  isNew,
}) {
  const categoryColours = useCategoryColours();
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();

  return (
    <>
      <Link
        key={id}
        href={`/posts/${id}`}
        className="relative transition p-0 md:p-2 md:mb-3 lg:mb-0 flex max-lg:flex-col group duration-50 focus:duration-100 lg:duration-300 h-full ease-in-out bg-postBackground rounded-custom border-2 border-borders shadow-xl shadow-shadows focus:shadow-none focus:translate-y-1.5 focus:border-postBackground lg:border-2 lg:border-borders lg:shadow-shadows lg:shadow-lg lg:hover:border-borders lg:hover:shadow-xl lg:hover:shadow-shadows lg:hover:-translate-y-1.5 lg:focus:shadow-none lg:focus:translate-y-1.5 lg:focus:border-postBackground"
      >
        <div className="w-full lg:w-1/2 p-2">
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

        <div className="flex flex-col w-full lg:w-1/2 p-2 md:p-0 md:px-6 md:pt-4 h-fill">
          <div className="flex">
            <div className="relative text-textPrimary font-sans font-bold text-2xl md:text-3xl xl:text-4xl w-fit ">
              {title}
            </div>
          </div>
          <div className="text-textMuted text-md h-fit font-semibold font-light font-sans">
            {new Date(date)
              .toLocaleDateString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/\//g, " ")}
          </div>
          <p className="max-lg:hidden text-lg font-sans text-textPrimary mt-2">
            {description}
          </p>
          {/* <div className="relative font-sans font-bold text-lg">Read more</div> */}
          <div
            style={{
              backgroundColor: categoryColours[category],
            }}
            className="px-2 my-1 lowercase rounded-md rounded-custom w-fit py-0.5 font-sans font-semibold text-textCategoryLabel"
          >
            #{category}
          </div>
          {/* <div className="flex h-full items-end self-end">
            <div className="text-textMuted text-md h-fit font-semibold font-light font-sans">
              {new Date(date)
                .toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, ".")}
            </div>
          </div> */}
        </div>
        {isNew == "True" && (
          <div className="absolute py-0.5 px-4 font-sans border-2 border-borders border-dashed font-bold text-xl bottom-4 right-4">
            New
          </div>
        )}
      </Link>
    </>
  );
}

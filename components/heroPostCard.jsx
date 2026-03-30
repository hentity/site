"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryColours } from "@/app/context/CategoryContext";

export default function HeroPostCard({
  id,
  date,
  title,
  category,
  coverImage,
  description,
  isNew,
  series,
  seriesPart,
}) {
  const categoryColours = useCategoryColours();

  return (
    <>
      <Link
        key={id}
        href={`/posts/${id}`}
        className="relative transition p-0 md:p-2 md:mb-3 lg:mb-0 flex max-lg:flex-col group duration-50 lg:duration-300 h-full ease-in-out bg-postBackground rounded-custom border-2 border-borders shadow-xl shadow-shadows lg:border-2 lg:border-textPrimary lg:shadow-shadows lg:shadow-lg lg:hover:shadow-xl lg:hover:shadow-shadows lg:hover:-translate-y-1.5"
      >
        <div className="w-full lg:w-1/2 p-2">
          <div className="relative w-full" style={{ paddingTop: "66.66%" }}>
            <Image
              className="object-contain rounded-custom absolute inset-0 w-full h-full"
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 p-2 md:p-0 md:pt-4 h-fill">
          <div className="flex">
            <div className="relative text-textPrimary font-sans md:px-6 font-bold text-2xl md:text-3xl xl:text-4xl w-fit ">
              {title}
            </div>
          </div>
          <div className="text-textMuted text-md h-fit md:px-6 font-semibold font-light font-sans">
            {new Date(date)
              .toLocaleDateString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/\//g, " ")}
          </div>
          <p className="max-lg:hidden text-xl md:px-6 font-serif text-textPrimary mt-2">
            {description}
          </p>
          {series && (
            <div className="text-textMuted text-sm font-sans font-semibold md:px-6 mt-1">
              {series} · Part {seriesPart}
            </div>
          )}
          <div className="max-lg:hidden md:mx-6 my-2 w-fit relative font-sans font-bold text-lg hover:underline">
            Read more
          </div>
          {/* <div
            style={{
              backgroundColor: categoryColours[category],
            }}
            className="px-2 my-1 rounded-custom w-fit py-0.5 font-sans font-semibold text-textCategoryLabel"
          >
            {category}
          </div> */}
          <div className="flex h-full items-end self-end">
            {isNew == "True" && (
              <div className="rounded-custom py-0.5 px-4 m-3 font-sans ring-2 ring-inset ring-borders font-bold text-xl">
                New
              </div>
            )}
            <div className="text-textMuted text-xl h-fit font-semibold font-light font-sans">
              <div
                style={{
                  backgroundColor: categoryColours[category],
                }}
                className="px-2 m-3 rounded-custom w-fit py-0.5 font-sans font-semibold text-textCategoryLabel"
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

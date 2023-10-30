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
}) {
  const categoryColours = useCategoryColours();

  return (
    <>
      <Link
        key={id}
        href={`/posts/${id}`}
        className={
          "transition flex max-md:flex-col group duration-300 h-full ease-in-out rounded-custom bg-postBackground border-2 border-postBackground hover:border-shadows hover:shadow-xl hover:shadow-shadows hover:-translate-y-1.5 hover:fscale-[103%]"
        }
      >
        <div className="w-full md:w-5/12 p-2">
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
        <div className="w-full flex flex-col justify-top md:w-7/12 p-2">
          <div className="flex">
            <div className="relative text-textPrimary font-sans font-bold text-2xl w-fit">
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
          <div className="flex h-full py-1">
            <div
              style={{
                backgroundColor: categoryColours[category],
              }}
              className="h-fit px-2 rounded-custom py-0.5 font-sans font-semibold text-textCategoryLabel"
            >
              {category}
            </div>
          </div>
          {/* <p className="text-lg font-sans text-textMuted mt-2">{description}</p> */}
        </div>
      </Link>
    </>
  );
}

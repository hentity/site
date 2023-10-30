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
          "transition flex group duration-300 h-full ease-in-out rounded-custom bg-postBackground border-2 border-postBackground hover:border-shadows hover:shadow-xl hover:shadow-shadows hover:-translate-y-1.5 hover:fscale-[103%]"
        }
      >
        <div className="w-5/12 p-2">
          <Image
            className="object-cover aspect-[3/2] rounded-custom "
            src={coverImage}
            alt={title}
            width={288}
            height={216}
          />
        </div>
        <div className="flex flex-col justify-top w-7/12 p-2 h-full">
          <div className="flex">
            <div className="relative text-textPrimary font-sans font-bold text-2xl w-fit">
              {title}
            </div>
          </div>
          <div className="text-textMuted text-md font-semibold font-light font-sans ">
            {new Date(date)
              .toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, ".")}
          </div>
          <div className="flex h-fit">
            <div
              style={{
                backgroundColor: categoryColours[category],
              }}
              className="px-2 rounded-custom py-0.5 font-sans font-semibold text-textCategoryLabel"
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

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
}) {
  const categoryColours = useCategoryColours();

  return (
    <>
      <Link
        key={id}
        href={`/posts/${id}`}
        className="transition p-2 flex group duration-300 h-full ease-in-out bg-postBackground rounded-custom border border-2 border-postBackground hover:border-shadows hover:bg-fpostBackgroundHover hover:shadow-xl hover:shadow-shadows hover:-translate-y-1.5"
      >
        <div className="w-1/2 p-2">
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

        <div className="flex flex-col justify-top w-1/2 px-6 py-4">
          <div className="flex">
            <div className="relative text-textPrimary font-sans font-bold text-4xl w-fit ">
              {title}
            </div>
          </div>
          <p className="text-textMuted text-md font-semibold font-light font-sans">
            {new Date(date)
              .toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, ".")}
          </p>
          <p className="text-lg font-sans text-textMuted mt-2">{description}</p>
          <div className="flex">
            <div
              style={{
                backgroundColor: categoryColours[category],
              }}
              className="px-2 rounded-custom py-0.5 font-sans font-semibold text-textCategoryLabel"
            >
              {category}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

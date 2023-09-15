"use client";

import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchSortedPostsData } from "@/lib/clientPosts";
import { useCategoryColours } from "./context/CategoryContext";
import { useSelectedCategory } from "@/app/context/SelectedCategoryContext";

export default function Home() {
  const [allPostsData, setAllPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const { selectedCategory } = useSelectedCategory();

  const categoryColours = useCategoryColours();

  useEffect(() => {
    setAllPostsData([]);
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSortedPostsData(page, selectedCategory);
      if (Array.isArray(data)) {
        setAllPostsData((prevData) => [...prevData, ...data]);
      }
    };

    fetchData();
  }, [page, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1); // increase page number to fetch the next set of posts
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center py-4 ">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center max-w-screen-xl mx-auto">
            {allPostsData.map(
              ({ id, date, title, category, coverImage, description }) => (
                <Link
                  key={id}
                  href={`/posts/${id}`}
                  className={
                    "transition group duration-500 p-4 w-72 h-128 ease-in-out items-top justify-items-stretch hover:bg-zinc-200"
                  }
                >
                  <div className="">
                    <Image
                      className="object-cover aspect-[4/3]"
                      src={coverImage}
                      alt={title}
                      width={288}
                      height={216}
                    />
                  </div>
                  <div className="flex flex-col justify-top">
                    <p className=" text-medgrey text-md font-light font-mulish">
                      {new Date(date)
                        .toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\//g, ".")}
                    </p>
                    <div className="flex">
                      <div className="w-2/3 text-lg font-bold text-black ">
                        <div className="relative font-mulish font-bold text-xl font-mulish w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:group-hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                          {title}
                        </div>
                      </div>
                      <div className="flex w-1/3 justify-end">
                        <div
                          style={{
                            backgroundColor: categoryColours[category],
                          }}
                          className="px-2 font-mulish text-right justify-self-end text-white"
                        >
                          {category}
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-mulish text-grey mt-2">
                      {description}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

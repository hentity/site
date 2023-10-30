"use client";

import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import PostCard from "components/postCard";
import HeroPostCard from "components/heroPostCard";
import { useState, useEffect } from "react";
import { fetchSortedPostsData } from "@/lib/clientPosts";
import { useCategoryColours } from "./context/CategoryContext";
import { useSelectedCategory } from "@/app/context/SelectedCategoryContext";

export default function Home() {
  const [allPostsData, setAllPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();

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
      <div className="px-4 md:px-8">
        {allPostsData.length > 0 && (
          <div className="max-w-screen-2xl mx-auto p-4 pt-0 md:border-b md:border-b-borders">
            <HeroPostCard {...allPostsData[0]} />
          </div>
        )}
        <div className="mx-auto p-2 max-w-screen-2xl bg-boardBackground rounded-custom">
          <div className="w-full flex flex-wrap">
            {allPostsData.length == 0 && selectedCategory != "All" ? (
              <div className="absolute text-textPrimary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-sans text-xl">
                Nothing to see here...yet.
              </div>
            ) : (
              allPostsData
                .slice(1)
                .map(
                  ({ id, date, title, category, coverImage, description }) => (
                    <div key={id} className="w-full lg:w-1/2 p-4">
                      <PostCard
                        id={id}
                        date={date}
                        category={category}
                        title={title}
                        coverImage={coverImage}
                        description={description}
                      />
                    </div>
                  )
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

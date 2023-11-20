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
  const [heroPost, setHeroPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
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
    if (allPostsData.length > 0) {
      setHeroPost(allPostsData[0]);
      setOtherPosts(allPostsData.slice(1));
    }
  }, [allPostsData, selectedCategory, page]);

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
        {heroPost && (
          <div className="max-w-screen-2xl mx-auto w-full p-6 pt-2">
            <HeroPostCard
              id={heroPost.id}
              date={heroPost.date}
              category={heroPost.category}
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              description={heroPost.description}
              isNew={heroPost.isNew}
            />
          </div>
        )}
        {otherPosts.length > 0 && (
          <div className="mx-auto max-w-screen-2xl bg-boardBackground md:border-t-2 md:border-borders">
            <div className="w-full flex flex-wrap">
              {otherPosts.length == 0 && selectedCategory != "All" ? (
                <div className="absolute text-textPrimary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-sans text-xl"></div>
              ) : (
                otherPosts.map(
                  ({
                    id,
                    date,
                    title,
                    category,
                    coverImage,
                    description,
                    isNew,
                  }) => (
                    <div key={id} className="w-full lg:w-1/2 p-6">
                      <PostCard
                        id={id}
                        date={date}
                        category={category}
                        title={title}
                        coverImage={coverImage}
                        description={description}
                        isNew={isNew}
                      />
                    </div>
                  )
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

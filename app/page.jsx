import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import "@/app/globals.css";
import Image from "next/image";

export default async function Home({ params }) {
  const allPostsData = await getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 4);

  function getColourFromCategory(category) {
    switch (category) {
      case "Tech":
        return "bg-blue-800";
      case "Media":
        return "bg-red-800";
      case "History":
        return "bg-green-800";
      default:
        return "bg-black";
    }
  }

  return (
    <>
      <div className="flex place-center ">
        <div className="m-2 grid gap-4 grid-cols-4 grid-rows-3">
          {recentPosts.map(
            ({ id, date, title, category, coverImage, description }) => (
              <Link
                key={id}
                href={`/posts/${id}`}
                className={
                  "transition duration-500 m-4 p-4 h-128 ease-in-out items-top justify-items-stretch hover:bg-zinc-200"
                }
              >
                <div className="">
                  <Image
                    className="py-2 group/image"
                    src={coverImage}
                    alt={title}
                    width={1280}
                    height={960}
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
                    <div className="w-2/3 text-lg font-mulish font-bold text-black">
                      {title}
                    </div>
                    <div className="flex w-1/3 justify-end">
                      <div
                        className={
                          "px-2 rounded-md font-mulish text-right justify-self-end text-site-background" +
                          " " +
                          getColourFromCategory(category)
                        }
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
    </>
  );
}

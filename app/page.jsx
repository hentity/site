import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import "@/app/globals.css";
import Image from "next/image";

export default async function Home({ params }) {
  const allPostsData = await getSortedPostsData();
  const heroPost = allPostsData[0];
  const recentPosts = allPostsData.slice(1, 4);

  return (
    <>
      <div className="flex">
        <div className="w-3/5 m-8">
          <div key={heroPost.id} className="p-4">
            <Image
              src={heroPost.coverImage}
              alt={heroPost.title}
              width={1920}
              height={1080}
            />
            <h3 className="text-5xl mt-2 font-mulish font-bold text-darkgrey">
              <Link href={`/posts/${heroPost.id}`} className="">
                {heroPost.title}
              </Link>
            </h3>
            <p className="text-medgrey text-m">
              {new Date(heroPost.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="w-2/5 m-8">
          {recentPosts.map(({ id, date, title, coverImage }) => (
            <div key={id} className="p-4 flex">
              <div className="w-2/5">
                <Image
                  src={coverImage}
                  alt={title}
                  width={1920}
                  height={1080}
                />
              </div>
              <div className="ml-3 w-3/5">
                <h3 className="text-4xl mt-2 font-mulish font-bold text-darkgrey">
                  <Link href={`/posts/${id}`}>{title}</Link>
                </h3>
                <p className="text-medgrey text-m uppercase text-sm">
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

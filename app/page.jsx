import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import "@/app/globals.css";
import Image from "next/image";

export default async function Home({ params }) {
  const allPostsData = await getSortedPostsData();
  const heroPost = allPostsData[0];
  const morePosts = allPostsData.slice(1, 4);

  return (
    <div className="container mx-auto px-4 md:px-0 mt-10">
      {/* Hero Post */}
      <div className="flex">
        <div className="w-2/3 mr-8">
          <section className="mb-16">
            <h2 className="mb-4 text-3xl">{heroPost.title}</h2>
            <div className="mb-4 text-gray-600">{heroPost.date}</div>
            <div className="mb-8">
              <Image
                src={heroPost.coverImage}
                alt={heroPost.title}
                width={1920}
                height={1080}
              />
            </div>
            <Link
              href={`/posts/${heroPost.id}`}
              className="text-blue-600 hover:underline"
            >
              Read more
            </Link>
          </section>
        </div>

        {/* More Posts */}
        <div className="w-1/3">
          <section className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:mr-8">
              <h2 className="text-2xl mb-8">More Posts</h2>
              <ul className="space-y-4">
                {morePosts.map(({ id, date, title, coverImage }) => (
                  <li key={id} className="border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-20">
                        <Image
                          src={coverImage}
                          alt={title}
                          width={1920}
                          height={1080}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl">
                          <Link
                            href={`/posts/${id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {title}
                          </Link>
                        </h3>
                        <p className="text-gray-600">{date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <Link href="/archive" className="text-blue-600 hover:underline">
                See More
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

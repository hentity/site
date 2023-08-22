import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <h2>Blog</h2>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <div>
              <Link href={`/posts/${id}`}>{title}</Link>
            </div>
            <p>{date}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

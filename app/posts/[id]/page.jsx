import { getAllPostIds, getPostData } from "@/lib/serverPosts";
import "@/app/globals.css";
import Image from "next/image";
import "highlight.js/styles/github.css";

// Define the loader function for server-side data fetching
export async function loader({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

// -< Post >-
export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <div className="flex flex-col mx-auto w-full px-4 md:px-8">
      <article className="prose prose-p:text-[1.4rem]/[1.75rem] prose-ol:text-[1.4rem]/[1.75rem] prose-pre:text-[1.4rem]/[1.75rem] prose-li:text-[1.4rem]/[1.75rem] prose-h3:text-3xl prose-pre:p-0 prose-ol:text-textPrimary prose-xl prose-headings:font-sans prose-h3:font-bold w-full prose-ol:font-serif prose-p:font-serif prose-ul:font-serif prose-h1:text-4xl prose-p:text-textPrimary prose-ul:text-textPrimary prose-ul:list-disc prose-li:text-textPrimary mx-auto mt-4 mb-20">
        <div className="w-full">
          <Image
            className="rounded-custom object-contain w-full bg-background mt-2"
            src={postData.coverImage}
            alt={postData.title}
            width={1280}
            height={800}
          />
        </div>
        <div className="font-sans text-textPrimary font-semibold">
          {new Date(postData.date)
            .toLocaleDateString("default", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
            .replace(/\//g, " ")}
        </div>

        <h1 className="font-sans">{postData.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}

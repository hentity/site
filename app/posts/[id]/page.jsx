import { getAllPostIds, getPostData } from "@/lib/serverPosts";
import "@/app/globals.css";

// -< Post >-
export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <div className="container mx-auto px-4 md:px-0">
      <article className="prose prose-lg prose-headings:text-textPrimary prose-h1:text-4xl prose-p:text-textPrimary prose-li:text-textMuted mx-auto mt-4 mb-20">
        {/* Post Title */}
        <h1 className="mb-4 font-sans">{postData.title}</h1>

        <div className="mb-8 font-sans text-textPrimary font-semibold">
          {new Date(postData.date)
            .toLocaleDateString("default", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
            .replace(/\//g, " ")}
        </div>

        {/* Post Content */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}

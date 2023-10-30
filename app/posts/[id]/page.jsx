import { getAllPostIds, getPostData } from "@/lib/serverPosts";
import "@/app/globals.css";

// -< Post >-
export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <div className="container mx-auto px-4 md:px-0">
      <article className="prose prose-lg prose-headings:text-textPrimary prose-p:text-textMuted prose-li:text-textMuted mx-auto mt-4 mb-20">
        {/* Post Title */}
        <h1 className="mb-4 font-sans">{postData.title}</h1>

        <div className="mb-8 font-sans text-textMuted">
          {new Date(postData.date)
            .toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, ".")}
        </div>

        {/* Post Content */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}

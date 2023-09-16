import { getAllPostIds, getPostData } from "@/lib/serverPosts";
import "@/app/globals.css";

// -< Post >-
export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <div className="container mx-auto px-4 md:px-0">
      <article className="prose prose-lg mx-auto mt-10 mb-20">
        {/* Post Title */}
        <h1 className="mb-4">{postData.title}</h1>

        <div className="mb-8 font-sans text-gray-600">{postData.date}</div>

        {/* Post Content */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}

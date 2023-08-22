import { getAllPostIds, getPostData } from "@/lib/posts";

export async function generateMetadata({ params }) {
  const postData = await getPostData(params.id);

  return {
    title: postData.title,
  };
}

// -< Post >-
export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <>
      <article className="prose prose-lightgrey">
        {/* Post Title */}
        <h1>{postData.title}</h1>

        <div>{postData.date}</div>

        {/* Post Content */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}

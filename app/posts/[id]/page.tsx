import { getAllPostIds, getPostData } from '@/lib/posts'

type Params = {
  id: string
}

type Props = {
  params: Params
}

type PostData = {
  title: string
  date: string
  contentHtml: string
}

export async function generateMetadata({ params }: Props) {
  const postData: PostData = await getPostData(params.id)

  return {
    title: postData.title,
  }
}

// -< Post >-
export default async function Post({ params }: Props) {
  const postData: PostData = await getPostData(params.id)

  return (
    <>
    <article className="prose prose-lightgrey">

      {/* Post Title */}
      <h1>{postData.title}</h1>

      <div>
        {postData.date}
      </div>

      {/* Post Content */}
      <div
         dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
    </>

    
  )
}
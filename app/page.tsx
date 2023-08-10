import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

type AllPostsData = {
  date: string
  title: string
  id: string
}[]

export default function Home() {
  const allPostsData: AllPostsData = getSortedPostsData()

  return (
    <>
        <h2 >Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <div>
                <Link href={`/posts/${id}`}>{title}</Link>
              </div>
              <p>
                {date}
              </p>
            </li>
          ))}
        </ul>
    </>
  )
}

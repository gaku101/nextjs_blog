import Link from "next/link"
import { Fragment } from "react"
import { CustomImage } from "../components/CustomImage"
import { client } from "../libs/client"

export default function Home({ blog }) {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <Fragment key={blog.id}>
            <article>
              <Link href={`/blog/${blog.id}`} passHref>
                <a href={`/blog/${blog.id}`}>
                  <div>
                    <CustomImage
                      baseImageUrl={blog.image.url}
                      width={600}
                      height={315}
                      title={blog?.title}
                    />
                  </div>
                  <h3>{blog.title}</h3>
                </a>
              </Link>
            </article>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" })

  return {
    props: {
      blog: data.contents,
    },
  }
}

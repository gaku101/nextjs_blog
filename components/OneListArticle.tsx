import Link from "next/link"
import { Fragment } from "react"
import { CustomImage } from "./CustomImage"

export const OneListArticle = ({ article }) => {
  console.debug("article", article)
  return (
    <>
      <article>
        <div className='sm:grid sm:grid-cols-2 py-4'>
          <Link href={`/blog/${article.id}`} passHref>
            <a href={`/blog/${article.id}`}>
              <CustomImage
                baseImageUrl={article.image.url}
                width={640}
                height={400}
                title={article?.title}
                className='rounded-2xl'
              />
            </a>
          </Link>
          <div className='py-4 px-6'>
            <h3 className='font-bold text-xl'>{article.title}</h3>
            {article.category && <p>{article.category.name}</p>}
            <p>{article.createdAt}</p>
          </div>
        </div>
      </article>
    </>
  )
}

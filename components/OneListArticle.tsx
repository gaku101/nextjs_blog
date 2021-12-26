import Link from "next/link"
import { Fragment } from "react"
import { CustomImage } from "./CustomImage"

export const OneListArticle = ({ article }) => {
  console.debug("article", article)
  return (
    <>
      <article>
        <div className='sm:flex'>
          <Link href={`/blog/${article.id}`} passHref>
            <a href={`/blog/${article.id}`}>
              <CustomImage
                baseImageUrl={article.image.url}
                width={450}
                height={300}
                title={article?.title}
                className='rounded-2xl'
              />
            </a>
          </Link>
          <div className='p-4'>
            <h3 className='font-bold text-xl'>{article.title}</h3>
            {article.category && <p>{article.category.name}</p>}
            <p>{article.createdAt}</p>
          </div>
        </div>
      </article>
    </>
  )
}

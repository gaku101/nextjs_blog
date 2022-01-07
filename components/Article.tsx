import Link from "next/link"
import { Category } from "./Category"
import { CustomImage } from "./CustomImage"
import { Date } from "./Date"
import { Tag } from "./Tag"

type Props = {
  article: Blog
}

export const Article: React.VFC<Props> = ({ article }) => {
  return (
    <>
      <article>
        <div className='sm:grid sm:grid-cols-3 py-4'>
          <div className='col-span-1'>
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
          </div>
          <div className='py-1 px-2 sm:px-0 sm:pl-6 col-span-2'>
            <h3 className='font-bold text-xl lg:text-lg xl:text-3xl'>
              {article.title}
            </h3>
            <div className='flex mt-1 xl:mt-2'>
              {article.category && (
                <Category
                  category={article.category}
                  className='border-cyan-700 mr-2 text-cyan-700'
                />
              )}
              {article.tags &&
                !!article.tags.length &&
                article.tags.map((tag) => (
                  <Tag tag={tag} key={tag.id} className='mr-1 text-cyan-700' />
                ))}
            </div>
            <Date dateString={article.createdAt} className='mt-2' />
          </div>
        </div>
      </article>
    </>
  )
}

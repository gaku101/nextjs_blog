import { NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { Date } from "../../components/Date"
import { Category } from "../../components/Category"
import { Tag } from "../../components/Tag"
import { ErrorPage } from "../../components/error-page"
import { HeadTemplate } from "../../components/HeadTemplate"
import { Layout } from "../../components/Layout"
import { Preview } from "../../components/preview"
import { client } from "../../libs/client"
import { createOgImage } from "../../libs/createOgImage"
import styles from "../../styles/Home.module.scss"
import { useEffect } from "react"
import { CustomImage } from "../../components/CustomImage"
import cheerio from "cheerio"
import hljs from "highlight.js"
import "highlight.js/styles/night-owl.css"

type Props = {
  blog: Blog
  draftKey: string
  tags: Tag[]
  highlightedBody: string
}

const BlogId: NextPage<Props> = ({ blog, draftKey, tags, highlightedBody }) => {
  useEffect(() => {
    console.debug("blog", blog)
  })
  if (!blog) {
    return <ErrorPage />
  }
  const { ogImageUrl } = createOgImage(blog?.image?.url, blog.title)
  return (
    <Layout tags={tags}>
      <HeadTemplate
        pagetitle={blog.title}
        pagedescription={blog.title}
        pagepath='blogs'
        postimg={ogImageUrl}
      />
      <Preview draftKey={draftKey} />
      <main className=' bg-white p-4 sm:p-10 lg:p-12 xl:p-16 rounded-lg'>
        <CustomImage
          baseImageUrl={blog.image.url}
          width={640}
          height={400}
          title={blog?.title}
          className='w-full mb-10'
        />
        <h1 className='text-3xl xl:text-4xl font-bold mb-4'>{blog.title}</h1>
        <Date dateString={blog.publishedAt} className='mb-2' />
        <div className='flex mb-10'>
          {blog.category && (
            <Category
              category={blog.category}
              className='border-cyan-700 mr-2 text-cyan-700'
            />
          )}
          {blog.tags &&
            !!blog.tags.length &&
            blog.tags.map((tag) => (
              <Tag tag={tag} key={tag.id} className='mr-1 text-cyan-700' />
            ))}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: highlightedBody,
          }}
          className={styles.post}
        />
      </main>
    </Layout>
  )
}

export default BlogId

// ???????????????????????????????????????
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" })
  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`)
  return { paths, fallback: true }
}

type GetStaticPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  params?: Q | undefined
  preview?: boolean | undefined
  previewData?: {
    draftKey: string
  }
  locale?: string | undefined
  locales?: string[] | undefined
  defaultLocale?: string | undefined
}
// ????????????????????????????????????????????????????????????
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params ? context.params.id : ""
  // draftKey???????????????????????????????????????
  const draftKey = context.previewData?.draftKey
    ? { draftKey: context.previewData.draftKey }
    : {}
  const data = await client.get({
    endpoint: "blog",
    contentId: id as string,
    queries: draftKey,
  })
  const tags = await client.get({ endpoint: "tags" })

  const $ = cheerio.load(data.body)

  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass("hljs")
  })

  return {
    props: {
      blog: data,
      tags: tags ? tags.contents : [],
      ...draftKey,
      highlightedBody: $.html(),
    },
  }
}

import { NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { ErrorPage } from "../../components/error-page"
import { HeadTemplate } from "../../components/HeadTemplate"
import { Preview } from "../../components/preview"
import { client } from "../../libs/client"
import { createOgImage } from "../../libs/createOgImage"
import styles from "../../styles/Home.module.scss"

type Props = {
  blog: Blog
  draftKey: string
}

const BlogId: NextPage<Props> = ({ blog, draftKey }) => {
  if (!blog) {
    return <ErrorPage />
  }
  const { ogImageUrl } = createOgImage(blog?.image?.url, blog.title)
  return (
    <main className={styles.main}>
      <HeadTemplate
        pagetitle={blog.title}
        pagedescription={blog.title}
        pagepath='blogs'
        postimg={ogImageUrl}
      />
      <Preview draftKey={draftKey} />
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className='category'>{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  )
}

export default BlogId

// 静的生成のためのパスを指定
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
// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params ? context.params.id : ""
  // draftKeyを取得し、クエリを作成する
  const draftKey = context.previewData?.draftKey
    ? { draftKey: context.previewData.draftKey }
    : {}
  const data = await client.get({
    endpoint: "blog",
    contentId: id as string,
    queries: draftKey,
  })

  return {
    props: {
      blog: data,
      ...draftKey,
    },
  }
}

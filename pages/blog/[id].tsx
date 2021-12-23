import ErrorPage from "../../components/error-page"
import { Preview } from "../../components/preview"
import { client } from "../../libs/client"
import styles from "../../styles/Home.module.scss"

export default function BlogId({ blog, draftKey }) {
  if (!blog) {
    return <ErrorPage />
  }
  return (
    <main className={styles.main}>
      <Preview draftKey={draftKey} />
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  )
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" })
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: true }
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context) => {
  const id = context.params.id
  // draftKeyを取得し、クエリを作成する
  const draftKey = context.previewData?.draftKey
    ? { draftKey: context.previewData.draftKey }
    : {}
  const data = await client.get({
    endpoint: "blog",
    contentId: id,
    queries: draftKey,
  })

  return {
    props: {
      blog: data,
      ...draftKey,
    },
  }
}

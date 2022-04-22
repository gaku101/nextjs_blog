import { NextPage } from "next"
import { useEffect } from "react"
import { ArticleList } from "../../../components/ArticleList"
import { Layout } from "../../../components/Layout"
import { client } from "../../../libs/client"
import { Pagination } from "../../../components/Pagination"

const PER_PAGE = 5

type Props = {
  blog: Blog[]
  tags: Tag[]
  totalCount: number
}

const Home: NextPage<Props> = ({ blog, tags, totalCount }) => {
  useEffect(() => {
    console.debug("tags", tags)
  })
  return (
    <Layout tags={tags}>
      <ArticleList articles={blog} />
      <Pagination totalCount={totalCount} />
    </Layout>
  )
}

export default Home

export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" })

  const pageNumbers = []

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  )

  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: 5 },
  })
  const tags = await client.get({ endpoint: "tags" })

  return {
    props: {
      blog: blog ? blog.contents : [],
      tags: tags ? tags.contents : [],
      totalCount: blog.totalCount,
    },
  }
}

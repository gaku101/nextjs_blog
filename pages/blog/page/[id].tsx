import { GetStaticPropsContext, NextPage } from "next"
import { useEffect } from "react"
import { ArticleList } from "../../../components/ArticleList"
import { Layout } from "../../../components/Layout"
import { client } from "../../../libs/client"
import { Pagination } from "../../../components/Pagination"
import { useRouter } from "next/router"

const PER_PAGE = 5

type Props = {
  blog: Blog[]
  tags: Tag[]
  totalCount: number
}

const Home: NextPage<Props> = ({ blog, tags, totalCount }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout tags={tags}>
      <ArticleList articles={blog} />
      <Pagination totalCount={totalCount} currentPage={Number(id)} />
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
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params ? context.params.id : ""
  const blog = await client.get({
    endpoint: "blog",
    queries: { offset: (Number(id) - 1) * 5, limit: 5 },
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

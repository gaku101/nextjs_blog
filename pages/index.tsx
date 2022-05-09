import { NextPage } from "next"
import { ArticleList } from "../components/ArticleList"
import { Layout } from "../components/Layout"
import { client } from "../libs/client"
import { PER_PAGE } from "../libs/pagination"
import { Pagination } from "../components/Pagination"

type Props = {
  blog: Blog[]
  tags: Tag[]
  totalCount: number
}

const Home: NextPage<Props> = ({ blog, tags, totalCount }) => {
  return (
    <Layout tags={tags}>
      <ArticleList articles={blog} />
      <Pagination totalCount={totalCount} currentPage={1} url='/blog/page' />
    </Layout>
  )
}

export default Home

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: PER_PAGE },
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

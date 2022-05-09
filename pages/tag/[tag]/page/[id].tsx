import { GetStaticPropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import { ArticleList } from "../../../../components/ArticleList"
import { Layout } from "../../../../components/Layout"
import { Pagination } from "../../../../components/Pagination"
import { client } from "../../../../libs/client"
import { PER_PAGE } from "../../../../libs/pagination"

type Props = {
  tagId: string
  blog: Blog[]
  tags: Tag[]
  totalCount: number
}

const TagId: NextPage<Props> = ({ tagId, blog, tags, totalCount }) => {
  const router = useRouter()
  const { tag, id } = router.query
  return (
    <Layout tags={tags} searchedBy={tagId}>
      <ArticleList articles={blog} />
      <Pagination
        totalCount={totalCount}
        currentPage={Number(id)}
        url={`/tag/${tag}/page`}
      />
    </Layout>
  )
}

export default TagId

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" })
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = []
  for (let item of data.contents) {
    const blog = await client.get({
      endpoint: "blog",
      queries: {
        filters: `tags[contains]${item.id}`,
      },
    })
    const path = range(1, Math.ceil(blog.totalCount / PER_PAGE)).map(
      (page) => `/tag/${item.id}/page/${page}`
    )
    paths.push(...path)
  }
  console.log("paths", paths)
  return { paths, fallback: true }
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params ? context.params.id : ""
  const tagId = context.params ? context.params.tag : ""
  const blog = await client.get({
    endpoint: "blog",
    queries: {
      filters: `tags[contains]${tagId}`,
      offset: (Number(id) - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  })
  console.log('totalCount', blog.totalCount)
  const tags = await client.get({ endpoint: "tags" })

  return {
    props: {
      tagId: tagId,
      blog: blog ? blog.contents : [],
      tags: tags ? tags.contents : [],
      totalCount: blog ? blog.totalCount : 0,
    },
  }
}

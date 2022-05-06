import { GetStaticPropsContext, NextPage } from "next"
import { useEffect } from "react"
import { ArticleList } from "../../../../components/ArticleList"
import { Layout } from "../../../../components/Layout"
import { client } from "../../../../libs/client"

const PER_PAGE = 5

type Props = {
  tagId: string
  blog: Blog[]
  tags: Tag[]
}

const TagId: NextPage<Props> = ({ tagId, blog, tags }) => {
  useEffect(() => {
    console.debug("tags", tags)
  })
  return (
    <Layout tags={tags} searchedBy={tagId}>
      <ArticleList articles={blog} />
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
    console.log("path", path)
    paths.push(...path)
  }
  return { paths, fallback: true }
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const tagId = context.params ? context.params.tag : ""
  console.log("context.params", context.params)
  const blog = await client.get({
    endpoint: "blog",
    queries: {
      filters: `tags[contains]${tagId}`,
    },
  })
  const tags = await client.get({ endpoint: "tags" })

  return {
    props: {
      tagId: tagId,
      blog: blog ? blog.contents : [],
      tags: tags ? tags.contents : [],
    },
  }
}

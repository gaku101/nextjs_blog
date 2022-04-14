import { GetStaticPropsContext, NextPage } from "next"
import { useEffect } from "react"
import { ArticleList } from "../components/ArticleList"
import { Layout } from "../components/Layout"
import { client } from "../libs/client"

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
  const paths = data.contents.map((content: Blog) => `/${content.id}`)
  return { paths, fallback: true }
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const tagId = context.params ? context.params.tag : ""
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

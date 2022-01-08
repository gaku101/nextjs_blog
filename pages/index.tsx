import { NextPage } from "next"
import { useEffect } from "react"
import { ArticleList } from "../components/ArticleList"
import { Layout } from "../components/Layout"
import { client } from "../libs/client"

type Props = {
  blog: Blog[]
  tags: Tag[]
}

const Home: NextPage<Props> = ({ blog, tags }) => {
  useEffect(() => {
    console.debug("tags", tags)
  })
  return (
    <Layout tags={tags}>
      <ArticleList articles={blog} />
    </Layout>
  )
}

export default Home

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" })
  const tags = await client.get({ endpoint: "tags" })

  return {
    props: {
      blog: blog ? blog.contents : [],
      tags: tags ? tags.contents : [],
    },
  }
}

import { NextPage } from "next"
import { useEffect } from "react"
import { ArticleList } from "../components/ArticleList"
import { Layout } from "../components/Layout"
import { SideNav } from "../components/SideNav"
import { client } from "../libs/client"

type Props = {
  blog: Blog[]
  tags: Tag[]
}

const Home: NextPage<Props> = ({ blog, tags }) => {
  useEffect(() => {
    console.debug("tags", tags)
  }, [])
  return (
    <Layout>
      <div className='grid grid-cols-4'>
        <ArticleList className='col-span-4 lg:col-span-3' articles={blog} />
        <SideNav className='hidden lg:block' tags={tags} />
      </div>
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

import { GetStaticPropsContext, NextPage } from "next"
import Link from "next/link"
import { useEffect } from "react"
import { ArticleList } from "../components/ArticleList"
import { Layout } from "../components/Layout"
import { SideNav } from "../components/SideNav"
import { client } from "../libs/client"

type Props = {
  tagId: string
  blog: Blog[]
  tags: Tag[]
}

const TagId: NextPage<Props> = ({ tagId, blog, tags }) => {
  useEffect(() => {
    console.debug("tags", tags)
  }, [])
  return (
    <Layout>
      <div className='text-2xl mb-4'>
        <Link href='/' passHref>
          <a href='/' className="text-cyan-700">記事一覧</a>
        </Link>
        &nbsp;&gt;&nbsp;{tagId}&nbsp;
      </div>
      <div className='grid grid-cols-4'>
        <ArticleList className='col-span-4 lg:col-span-3' articles={blog} />
        <SideNav className='hidden lg:block' tags={tags} />
      </div>
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

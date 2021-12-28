import { ArticleList } from "../components/ArticleList"
import { Layout } from "../components/Layout"
import { SideNav } from "../components/SideNav"
import { client } from "../libs/client"

export default function Home({ blog }) {
  return (
    <Layout>
      <div className='grid grid-cols-4'>
        <ArticleList className="col-span-4 lg:col-span-3" articles={blog} />
        <SideNav className="hidden lg:block" />
      </div>
    </Layout>
  )
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" })

  return {
    props: {
      blog: data.contents,
    },
  }
}

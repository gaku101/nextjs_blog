import { NextPage } from "next"
import { ArticleList } from "../../components/ArticleList"
import { Layout } from "../../components/Layout"
import { client } from "../../libs/client"
import useSWR from "swr"
import { useRouter } from "next/router"

type Props = {
  tags: Tag[]
}

const Search: NextPage<Props> = ({ tags }) => {
  const router = useRouter()
  const { q } = router.query
  const { data, error } = useSWR<BlogsApiResponse, Error>(
    `/api/search?q=${q}`,
    fetcher
  )
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>

  return (
    <Layout tags={tags}>
      <ArticleList articles={data ? data.contents : []} />
    </Layout>
  )
}

export default Search
const fetcher = (url: string) => fetch(url).then((r) => r.json())

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const tags = await client.get({ endpoint: "tags" })

  return {
    props: {
      tags: tags ? tags.contents : [],
    },
  }
}

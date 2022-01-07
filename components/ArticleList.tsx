import { useEffect } from "react"
import { Article } from "./Article"

type Props = {
  articles: Blog[]
  className: string
}

export const ArticleList: React.VFC<Props> = ({ articles, className }) => {
  useEffect(() => {
    console.debug("articles", articles)
  }, [])
  return (
    <>
      <div className={className}>
        {articles && articles.length ? (
          articles.map((article) => (
            <Article article={article} key={article.id} />
          ))
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
    </>
  )
}

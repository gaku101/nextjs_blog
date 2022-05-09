import { useEffect } from "react"
import { Article } from "./Article"

type Props = {
  articles: Blog[]
}

export const ArticleList: React.VFC<Props> = ({ articles }) => {
  return (
    <div className="bg-white p-4">
      {articles && articles.length ? (
        articles.map((article) => (
          <Article article={article} key={article.id} />
        ))
      ) : (
        <p>None are present. Why not add one?</p>
      )}
    </div>
  )
}

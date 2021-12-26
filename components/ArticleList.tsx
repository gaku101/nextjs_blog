import { OneListArticle } from "./OneListArticle"

export const ArticleList = ({ className, articles }) => {
  console.debug("articles", articles)
  return (
    <>
      <div className={className}>
        {articles && articles.length ? (
          articles.map((article) => (
            <OneListArticle article={article} key={article.id} />
          ))
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
    </>
  )
}

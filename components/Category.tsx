type Props = {
  category: Category
  className: string
}

export const Category: React.VFC<Props> = ({ category, className }) => {
  return (
    <>
      <div
        className={`border rounded py-1 px-2 text-sm xl:text-base ${className}`}
      >
        {category.name}
      </div>
    </>
  )
}

export const Category = ({ category, className }) => {
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

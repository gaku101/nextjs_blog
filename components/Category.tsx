export const Category = ({ category }) => {
  return (
    <>
      <div className='border border-cyan-700 rounded py-1 px-2 text-sm xl:text-base mr-2'>
        {category.name}
      </div>
    </>
  )
}

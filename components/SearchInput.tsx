import { useRouter } from "next/router"
import { useCallback, useState } from "react"

export const SearchInput = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget
      setKeyword(value)
    },
    [setKeyword]
  )
  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        void router.push(`search/?q=${keyword}`)
      }
    },
    [keyword, router]
  )
  const handleClickSearchButton = useCallback(() => {
    void router.push(`search/?q=${keyword}`)
  }, [keyword, router])

  return (
    <div className='relative inline-block text-gray-600 w-full mb-4'>
      <input
        className='
        border-2 border-gray-300
        bg-white
        h-10
        w-full
        px-5
        rounded-lg
        text-sm
        focus:outline-none
      '
        type='search'
        name='search'
        placeholder='Search keyword'
        value={keyword}
        onChange={handleChangeKeyword}
        onKeyDown={handleKeyDownSearch}
      />
      <button
        type='submit'
        className='absolute right-0 top-0 mt-2 mr-4'
        onClick={handleClickSearchButton}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </button>
    </div>
  )
}

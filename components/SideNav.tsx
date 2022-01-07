import { Tag } from "./Tag"

type Props = {
  tags: Tag[]
  className: string
}

export const SideNav: React.VFC<Props> = ({ tags, className }) => {
  return (
    <>
      <div className={`${className} pt-5 pb-4 pl-6`}>
        <div className='text-2xl font-bold bg-slate-100 rounded p-2'>タグ</div>
        <div className='flex mt-2 px-2'>
          {tags &&
            !!tags.length &&
            tags.map((tag) => (
              <Tag tag={tag} key={tag.id} className='mr-1 text-cyan-700' />
            ))}
        </div>
      </div>
    </>
  )
}

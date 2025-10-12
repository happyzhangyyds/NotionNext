import { HashTag } from '@/components/HeroIcons'
<<<<<<< HEAD
import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={'cursor-pointer inline-block hover:text-white hover:bg-indigo-600 dark:hover:bg-yellow-600 px-2 py-1 rounded-2xl dark:text-white duration-200 text-sm whitespace-nowrap ' }>
      <div className='font-light flex items-center'><HashTag className='text-gray-500 stroke-2 mr-0.5 w-3 h-3'/> {tag.name + (tag.count ? `(${tag.count})` : '')} </div>
    </Link>
=======
import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={
        'cursor-pointer inline-block hover:text-white hover:bg-indigo-600 dark:hover:bg-yellow-600 px-2 py-1 rounded-2xl dark:text-white duration-200 text-sm whitespace-nowrap '
      }>
      <div className='font-light flex items-center'>
        <HashTag className='stroke-2 mr-0.5 w-3 h-3' />{' '}
        {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
      </div>
    </SmartLink>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  )
}

export default TagItemMini

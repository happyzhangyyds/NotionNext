<<<<<<< HEAD
import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
=======
import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block rounded hover:bg-indigo-400 dark:hover:text-white  hover:text-white duration-200
        mr-2 py-0.5 px-1 text-xs whitespace-nowrap 
         ${selected
        ? 'text-white dark:text-gray-300 bg-black dark:bg-black dark:hover:bg-indigo-900'
        : `text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background `}` }>

      <div className='font-light'>{selected && <i className='mr-1 fa-tag'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} </div>

<<<<<<< HEAD
    </Link>
=======
    </SmartLink>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  );
}

export default TagItemMini

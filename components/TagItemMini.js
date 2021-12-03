import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return <Link key={tag} href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`} passHref>
    <div className={`cursor-pointer inline-block rounded hover:bg-gray-500 duration-200
      mr-2 my-1 py-1 px-2 font-medium font-light text-xs whitespace-nowrap dark:hover:text-white
       ${selected
      ? 'text-white dark:text-gray-300 bg-black dark:bg-black dark:hover:bg-gray-900'
      : `text-gray-600 dark:text-gray-600 hover:shadow-xl hover:text-white dark:hover:bg-gray-600 dark:border-gray-600 notion-${tag.color}_background `}` }>
    <div>{selected && <FontAwesomeIcon icon={faTag} className='mr-1'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} </div>
    </div>
  </Link>
}

export default TagItemMini

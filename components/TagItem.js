import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`}>
    <a>
      <p className="hover:shadow hover:scale-105 hover:bg-gray-500 bg-gray-200 hover:text-white duration-200 mr-1 p-2 leading-none text-sm
      dark:bg-gray-500 dark:text-gray-100 dark:hover:bg-black">
        {tag}
      </p>
    </a>
  </Link>
)

export default TagItem

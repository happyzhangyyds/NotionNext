import NotionIcon from '@/components/NotionIcon'

/**
 * 文章详情页介绍
 * @param {*} props
 * @returns
 */
export default function ArticleInfo(props) {
  const { post } = props

  return (<>
        {/* title */}
        <h1 className="text-3xl pt-12  dark:text-gray-300"><NotionIcon icon={post?.pageIcon} />{post?.title}</h1>

        {/* meta */}
        <section className="py-2 text-sm px-1">
         <div className="flex flex-wrap text-gray-500 dark:text-gray-600">
         <span><i className="far fa-calendar mr-2" />{post?.publishDay}</span>
         <span className="mx-1">|</span>
          <span><i className="far fa-calendar-check mr-2" />{post?.lastEditedDay}</span>
         </div>
        </section>

    </>)
}

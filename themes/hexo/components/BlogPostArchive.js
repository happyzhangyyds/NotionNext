<<<<<<< HEAD
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'
=======
import SmartLink from '@/components/SmartLink'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 博客归档列表
 * @param posts 所有文章
 * @param archiveTitle 归档标题
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostArchive = ({ posts = [], archiveTitle }) => {
  if (!posts || posts.length === 0) {
    return <></>
  } else {
    return (
      <div>
        <div
<<<<<<< HEAD
          className="pt-16 pb-4 text-3xl dark:text-gray-300"
          id={archiveTitle}
        >
=======
          className='pt-16 pb-4 text-3xl dark:text-gray-300'
          id={archiveTitle}>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          {archiveTitle}
        </div>
        <ul>
          {posts?.map(post => {
<<<<<<< HEAD
            const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`
            return <li
              key={post.id}
              className="border-l-2 p-1 text-xs md:text-base items-center  hover:scale-x-105 hover:border-indigo-500 dark:hover:border-indigo-300 dark:border-indigo-400 transform duration-500"
            >
              <div id={post?.publishDay}>
                <span className="text-gray-400">{post.date?.start_date}</span>{' '}
                &nbsp;
                <Link
                  href={url}
                  passHref
                  className="dark:text-gray-400  dark:hover:text-indigo-300 overflow-x-hidden hover:underline cursor-pointer text-gray-600">

                  {post.title}

                </Link>
              </div>
            </li>
=======
            return (
              <li
                key={post.id}
                className='border-l-2 p-1 text-xs md:text-base items-center  hover:scale-x-105 hover:border-indigo-500 dark:hover:border-indigo-300 dark:border-indigo-400 transform duration-500'>
                <div id={post?.publishDay}>
                  <span className='text-gray-400'>{post.date?.start_date}</span>{' '}
                  &nbsp;
                  <SmartLink
                    href={post?.href}
                    passHref
                    className='dark:text-gray-400  dark:hover:text-indigo-300 overflow-x-hidden hover:underline cursor-pointer text-gray-600'>
                    {post.title}
                  </SmartLink>
                </div>
              </li>
            )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          })}
        </ul>
      </div>
    )
  }
}

export default BlogPostArchive

<<<<<<< HEAD
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { getListByPage } from '@/lib/utils'
import { siteConfig } from '@/lib/config'
=======
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { getListByPage } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 博客列表滚动分页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
<<<<<<< HEAD
const BlogPostListScroll = ({ posts = [], currentSearch, showSummary = siteConfig('HEO_POST_LIST_SUMMARY', null, CONFIG), siteInfo }) => {
  const postsPerPage = parseInt(siteConfig('POSTS_PER_PAGE'))
  const [page, updatePage] = useState(1)
  const postsToShow = getListByPage(posts, page, postsPerPage)
=======
const BlogPostListScroll = ({
  posts = [],
  currentSearch,
  showSummary = siteConfig('HEO_POST_LIST_SUMMARY', null, CONFIG),
  siteInfo
}) => {
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const postsToShow = getListByPage(posts, page, POSTS_PER_PAGE)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  let hasMore = false
  if (posts) {
    const totalCount = posts.length
<<<<<<< HEAD
    hasMore = page * postsPerPage < totalCount
=======
    hasMore = page * POSTS_PER_PAGE < totalCount
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // 监听滚动自动分页加载
  const scrollTrigger = () => {
    requestAnimationFrame(() => {
      const scrollS = window.scrollY + window.outerHeight
<<<<<<< HEAD
      const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
=======
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    })
  }

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  const targetRef = useRef(null)
<<<<<<< HEAD
  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return <div id='container' ref={targetRef} className='w-full'>

      {/* 文章列表 */}
      <div className="2xl:grid 2xl:grid-cols-2 grid-cols-1 gap-5">
        {postsToShow.map(post => (
          <BlogPostCard key={post.id} post={post} showSummary={showSummary} siteInfo={siteInfo}/>
        ))}
      </div>

      {/* 更多按钮 */}
      <div>
        <div onClick={() => { handleGetMore() }}
             className='w-full my-4 py-4 text-center cursor-pointer rounded-xl dark:text-gray-200'
        > {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE}`} </div>
      </div>
    </div>
=======
  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG)
  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div id='container' ref={targetRef} className='w-full'>
        {/* 文章列表 */}
        <div
          className={`${POST_TWO_COLS && '2xl:grid 2xl:grid-cols-2'} grid-cols-1 gap-5`}>
          {' '}
          {postsToShow.map(post => (
            <BlogPostCard
              key={post.id}
              post={post}
              showSummary={showSummary}
              siteInfo={siteInfo}
            />
          ))}
        </div>

        {/* 更多按钮 */}
        <div>
          <div
            onClick={() => {
              handleGetMore()
            }}
            className='w-full my-4 py-4 text-center cursor-pointer rounded-xl dark:text-gray-200'>
            {' '}
            {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE}`}{' '}
          </div>
        </div>
      </div>
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }
}

export default BlogPostListScroll

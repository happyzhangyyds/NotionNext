<<<<<<< HEAD
import BlogPostCard from './BlogPostCard'
import PaginationNumber from './PaginationNumber'
import { siteConfig } from '@/lib/config'
import BlogPostListEmpty from './BlogPostListEmpty'
=======
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationNumber from './PaginationNumber'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
<<<<<<< HEAD
  const totalPage = Math.ceil(postCount / parseInt(siteConfig('POSTS_PER_PAGE')))
  const showPagination = postCount >= parseInt(siteConfig('POSTS_PER_PAGE'))
=======
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
<<<<<<< HEAD
      <div id="container" className='w-full'>
        {/* 文章列表 */}
        <div className="space-y-6 px-2">
          {posts?.map(post => (
            <BlogPostCard index={posts.indexOf(post)} key={post.id} post={post} siteInfo={siteInfo}/>
          ))}
        </div>
        {showPagination && <PaginationNumber page={page} totalPage={totalPage} />}
=======
      <div id='container' className='w-full'>
        {/* 文章列表 */}
        <div className='space-y-6 px-2'>
          {posts?.map(post => (
            <BlogPostCard
              index={posts.indexOf(post)}
              key={post.id}
              post={post}
              siteInfo={siteInfo}
            />
          ))}
        </div>
        {showPagination && (
          <PaginationNumber page={page} totalPage={totalPage} />
        )}
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      </div>
    )
  }
}

export default BlogPostListPage

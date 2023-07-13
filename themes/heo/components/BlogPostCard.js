import Link from 'next/link'
import CONFIG from '../config'
import BLOG from '@/blog.config'
import TagItemMini from './TagItemMini'
// import Image from 'next/image'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview = CONFIG.POST_LIST_PREVIEW && post.blockMap
  if (post && !post.pageCoverThumbnail && CONFIG.POST_LIST_COVER_DEFAULT) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover = CONFIG.POST_LIST_COVER && post?.pageCoverThumbnail && !showPreview
  return (
        <div className={` ${CONFIG.POST_LIST_COVER_HOVER_ENLARGE ? ' hover:scale-110 transition-all duration-150' : ''}`} >
            <div className={'group w-full hover:border-indigo-600 duration-300 transition-colors border justify-between flex flex-col lg:h-96 overflow-hidden  rounded-xl bg-white '}>

                {/* 图片封面 */}
                {showPageCover && (
                    <div className="flex-1 h-60 md:w-5/12 lg:w-full overflow-hidden">
                        <Link href={`${BLOG.SUB_PATH}/${post.slug}`} passHref legacyBehavior>
                            <div className={'h-60 bg-center bg-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-300'} style={{ backgroundImage: `url('${post?.pageCoverThumbnail}')` }} />
                        </Link>
                    </div>
                )}

                {/* 文字区块 */}
                {/* <BlogPostCardInfo index={index} post={post} onHover={onHover} showPageCover={showPageCover} showPreview={showPreview} showSummary={showSummary} /> */}
                <div className={'flex flex-col justify-between lg:p-6 p-4 w-full'}>
                    <div>
                        {/* 分类 */}
                        {post?.category && <div className={`flex mb-1 items-center ${showPreview ? 'justify-center' : 'justify-start'} flex-wrap dark:text-gray-500 text-gray-600 `}>
                            <Link passHref href={`/category/${post.category}`}
                                className="cursor-pointer text-xs font-normal menu-link hover:text-indigo-700 dark:hover:text-indigo-400 transform">
                                {post.category}
                            </Link>
                        </div>}

                        {/* 标题 */}
                        <Link
                            href={`${BLOG.SUB_PATH}/${post.slug}`}
                            passHref
                            className={' group-hover:text-indigo-700 group-hover:dark:text-indigo-400 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer text-2xl font-extrabold leading-tight'}>

                            <span className='menu-link '>{post.title}</span>

                        </Link>

                        {/* 摘要 */}
                        {(!showPreview || showSummary) && !post.results && (
                            <p className="line-clamp-2 replace my-3 text-gray-700  dark:text-gray-300 text-sm font-light leading-tight">
                                {post.summary}
                            </p>
                        )}

                        {/* 搜索结果 */}
                        {post.results && (
                            <p className="line-clamp-2 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7">
                                {post.results.map(r => (
                                    <span key={r}>{r}</span>
                                ))}
                            </p>
                        )}

                        <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
                            <div>
                                {' '}
                                {post.tagItems?.map(tag => (
                                    <TagItemMini key={tag.name} tag={tag} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

  )
}

export default BlogPostCard

import BLOG from '@/blog.config'
import Link from 'next/link'
import TagItemMini from './TagItemMini'
import React from 'react'
import CONFIG_FUKA from '../config'

const BlogCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview = CONFIG_FUKA.POST_LIST_PREVIEW && post.blockMap
  // fukasawa 强制显示图片
  if (CONFIG_FUKA.POST_LIST_COVER_FORCE && post && !post.pageCover) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover = CONFIG_FUKA.POST_LIST_COVER && post?.pageCoverThumbnail

  return (
        <div
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-once="true"
            style={{ maxHeight: '60rem' }}
            className="w-full lg:max-w-sm p-3 shadow mb-4 mx-2 bg-white dark:bg-hexo-black-gray hover:shadow-lg duration-200"
        >
            <div className="flex flex-col justify-between h-full">
                {/* 封面图 */}
                {showPageCover && (
                    <div className="flex-grow mb-3 w-full duration-200 cursor-pointer transform overflow-hidden">
                        <Link href={`${BLOG.SUB_PATH}/${post.slug}`} passHref legacyBehavior>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post?.pageCoverThumbnail}
                                alt={post.title}
                                className="object-cover w-full h-full hover:scale-125 transform duration-500"
                            ></img>
                        </Link>
                    </div>
                )}

                {/* 文字部分 */}
                <div className="flex flex-col w-full">
                    <Link passHref href={`${BLOG.SUB_PATH}/${post.slug}`}
                         className={`break-words cursor-pointer font-bold hover:underline text-xl ${showPreview ? 'justify-center' : 'justify-start'} leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400`}
                    >
                        {post.title}
                    </Link>

                    {(!showPreview || showSummary) && (
                        <p className="my-2 tracking-wide line-clamp-3 text-gray-700 dark:text-gray-300 text-sm font-light leading-5">
                            {post.summary}
                        </p>
                    )}

                    {/* 分类标签 */}
                    <div className="mt-auto text-gray-400 justify-between flex">
                        {post.category && <Link
                            href={`/category/${post.category}`}
                            passHref
                            className="cursor-pointer font-light text-sm hover:underline hover:text-indigo-700 dark:hover:text-indigo-400 transform"
                        >
                            <i className="mr-1 far fa-folder" />
                            {post.category}
                        </Link>}
                        <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
                            <div>

                                {post.tagItems.map((tag) => (
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

export default BlogCard

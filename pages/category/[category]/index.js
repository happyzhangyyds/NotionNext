<<<<<<< HEAD
import { getGlobalData } from '@/lib/notion/getNotionData'
import React from 'react'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
=======
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 分类页
 * @param {*} props
 * @returns
 */
export default function Category(props) {
<<<<<<< HEAD
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })

  return <Layout {...props} />
}

export async function getStaticProps({ params: { category } }) {
  const from = 'category-props'
  let props = await getGlobalData({ from })

  // 过滤状态
  props.posts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
  // 处理过滤
  props.posts = props.posts.filter(post => post && post.category && post.category.includes(category))
  // 处理文章页数
  props.postCount = props.posts.length
  // 处理分页
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // 滚动列表 给前端返回所有数据
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
=======
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ params: { category }, locale }) {
  const from = 'category-props'
  let props = await getGlobalData({ from, locale })

  // 过滤状态
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  // 处理过滤
  props.posts = props.posts.filter(
    post => post && post.category && post.category.includes(category)
  )
  // 处理文章页数
  props.postCount = props.posts.length
  // 处理分页
  if (siteConfig('POST_LIST_STYLE') === 'scroll') {
    // 滚动列表 给前端返回所有数据
  } else if (siteConfig('POST_LIST_STYLE') === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }

  delete props.allPages

  props = { ...props, category }

  return {
    props,
<<<<<<< HEAD
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
=======
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }
}

export async function getStaticPaths() {
  const from = 'category-paths'
  const { categoryOptions } = await getGlobalData({ from })
  return {
    paths: Object.keys(categoryOptions).map(category => ({
      params: { category: categoryOptions[category]?.name }
    })),
    fallback: true
  }
}

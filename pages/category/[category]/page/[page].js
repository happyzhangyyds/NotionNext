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
=======
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

export async function getStaticProps({ params: { category, page } }) {
  const from = 'category-page-props'
  let props = await getGlobalData({ from })

  // 过滤状态类型
<<<<<<< HEAD
  props.posts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published').filter(post => post && post.category && post.category.includes(category))
  // 处理文章页数
  props.postCount = props.posts.length
  // 处理分页
  props.posts = props.posts.slice(BLOG.POSTS_PER_PAGE * (page - 1), BLOG.POSTS_PER_PAGE * page)
=======
  props.posts = props.allPages
    ?.filter(page => page.type === 'Post' && page.status === 'Published')
    .filter(post => post && post.category && post.category.includes(category))
  // 处理文章页数
  props.postCount = props.posts.length
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  // 处理分页
  props.posts = props.posts.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  delete props.allPages
  props.page = page

  props = { ...props, category, page }

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
<<<<<<< HEAD
  const { categoryOptions, allPages } = await getGlobalData({ from })
=======
  const { categoryOptions, allPages, NOTION_CONFIG } = await getGlobalData({
    from
  })
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const paths = []

  categoryOptions?.forEach(category => {
    // 过滤状态类型
<<<<<<< HEAD
    const categoryPosts = allPages?.filter(page => page.type === 'Post' && page.status === 'Published').filter(post => post && post.category && post.category.includes(category.name))
    // 处理文章页数
    const postCount = categoryPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
=======
    const categoryPosts = allPages
      ?.filter(page => page.type === 'Post' && page.status === 'Published')
      .filter(
        post => post && post.category && post.category.includes(category.name)
      )
    // 处理文章页数
    const postCount = categoryPosts.length
    const totalPages = Math.ceil(
      postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { category: category.name, page: '' + i } })
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

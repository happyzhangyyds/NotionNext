import { getGlobalData } from '@/lib/notion/getNotionData'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
import React from 'react'

/**
 * 标签分页页面
 */
const Tag = (props) => {
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  return <Layout {...props} />
}

export default Tag

/**
 * 获取静态属性
 */
export async function getStaticProps({ params: { tag, page } }) {
  const from = 'tag-page-props'
  let props = {}

  try {
    props = await getGlobalData({ from })
  } catch (err) {
    console.error('❌ [getStaticProps] 获取 Notion 数据失败:', err)
    return {
      notFound: true
    }
  }

  // 过滤已发布的文章
  const allPosts = props.allPages?.filter(
    post => post?.type === 'Post' && post?.status === 'Published'
  ) || []

  // 根据标签过滤
  props.posts = allPosts.filter(
    post => post?.tags?.includes(tag)
  )

  // 文章总数
  props.postCount = props.posts.length

  // 分页处理
  const pageNumber = parseInt(page) || 1
  props.posts = props.posts.slice(
    BLOG.POSTS_PER_PAGE * (pageNumber - 1),
    BLOG.POSTS_PER_PAGE * pageNumber
  )

  props.tag = tag
  props.page = pageNumber
  delete props.allPages

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

/**
 * 获取静态路径
 */
export async function getStaticPaths() {
  const from = 'tag-page-static-path'
  let tagOptions = []
  let allPages = []

  try {
    const data = await getGlobalData({ from })
    tagOptions = data?.tagOptions || []
    allPages = data?.allPages || []
  } catch (err) {
    console.error('❌ [getStaticPaths] 获取 Notion 数据失败:', err)
    return {
      paths: [],
      fallback: true
    }
  }

  const paths = []

  tagOptions.forEach(tag => {
    const tagPosts = allPages
      .filter(post => post?.type === 'Post' && post?.status === 'Published')
      .filter(post => post?.tags?.includes(tag.name))

    const postCount = tagPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)

    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        params: {
          tag: tag.name,
          page: i.toString()
        }
      })
    }
  })

  return {
    paths,
    fallback: true
  }
}

import { getGlobalData } from '@/lib/notion/getNotionData'
import React from 'react'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'

/**
 * 分类页
 * @param {*} props
 * @returns
 */
export default function Category(props) {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })

  return <Layout {...props} />
}

export async function getStaticProps({ params: { category, page } }) {
  const from = 'category-page-props'
  let props = {}

  try {
    props = await getGlobalData({ from })
  } catch (err) {
    console.error('❌ 获取 Notion 数据失败（getStaticProps）:', err)
    return {
      notFound: true
    }
  }

  // 容错处理：确保 allPages 存在
  const allPosts = props.allPages?.filter(
    page => page?.type === 'Post' && page?.status === 'Published'
  ) || []

  // 筛选符合分类的文章
  props.posts = allPosts.filter(
    post => post?.category?.includes(category)
  )

  // 文章总数
  props.postCount = props.posts.length

  // 分页处理
  const pageNum = parseInt(page) || 1
  props.posts = props.posts.slice(
    BLOG.POSTS_PER_PAGE * (pageNum - 1),
    BLOG.POSTS_PER_PAGE * pageNum
  )

  delete props.allPages
  props.page = pageNum
  props = { ...props, category, page: pageNum }

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'category-paths'
  let categoryOptions = []
  let allPages = []

  try {
    const data = await getGlobalData({ from })
    categoryOptions = data?.categoryOptions || []
    allPages = data?.allPages || []
  } catch (err) {
    console.error('❌ 获取 Notion 数据失败（getStaticPaths）:', err)
    // 返回空路径，避免构建失败
    return {
      paths: [],
      fallback: true
    }
  }

  const paths = []

  categoryOptions.forEach(category => {
    const categoryPosts = allPages
      .filter(page => page?.type === 'Post' && page?.status === 'Published')
      .filter(post => post?.category?.includes(category.name))

    const postCount = categoryPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)

    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        params: {
          category: category.name,
          page: '' + i
        }
      })
    }
  })

  return {
    paths,
    fallback: true
  }
}

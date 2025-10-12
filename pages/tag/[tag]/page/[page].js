<<<<<<< HEAD
import { getGlobalData } from '@/lib/notion/getNotionData'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'

const Tag = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  return <Layout {...props} />
}

export async function getStaticProps({ params: { tag, page } }) {
  const from = 'tag-page-props'
  const props = await getGlobalData({ from })
  // 过滤状态、标签
  props.posts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published').filter(post => post && post?.tags && post?.tags.includes(tag))
  // 处理文章数
  props.postCount = props.posts.length
  // 处理分页
  props.posts = props.posts.slice(BLOG.POSTS_PER_PAGE * (page - 1), BLOG.POSTS_PER_PAGE * page)
=======
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

const Tag = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ params: { tag, page }, locale }) {
  const from = 'tag-page-props'
  const props = await getGlobalData({ from, locale })
  // 过滤状态、标签
  props.posts = props.allPages
    ?.filter(page => page.type === 'Post' && page.status === 'Published')
    .filter(post => post && post?.tags && post?.tags.includes(tag))
  // 处理文章数
  props.postCount = props.posts.length
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  // 处理分页
  props.posts = props.posts.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  props.tag = tag
  props.page = page
  delete props.allPages
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
  const from = 'tag-page-static-path'
<<<<<<< HEAD
  const { tagOptions, allPages } = await getGlobalData({ from })
  const paths = []
  tagOptions?.forEach(tag => {
    // 过滤状态类型
    const tagPosts = allPages?.filter(page => page.type === 'Post' && page.status === 'Published').filter(post => post && post?.tags && post?.tags.includes(tag.name))
    // 处理文章页数
    const postCount = tagPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
=======
  const { tagOptions, allPages, NOTION_CONFIG } = await getGlobalData({ from })
  const paths = []
  tagOptions?.forEach(tag => {
    // 过滤状态类型
    const tagPosts = allPages
      ?.filter(page => page.type === 'Post' && page.status === 'Published')
      .filter(post => post && post?.tags && post?.tags.includes(tag.name))
    // 处理文章页数
    const postCount = tagPosts.length
    const totalPages = Math.ceil(
      postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { tag: tag.name, page: '' + i } })
      }
    }
  })
  return {
    paths: paths,
    fallback: true
  }
}

export default Tag

import BLOG from '@/blog.config'
<<<<<<< HEAD
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
=======
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPostBlocks } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 文章列表分页
 * @param {*} props
 * @returns
 */
const Page = props => {
<<<<<<< HEAD
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })

  return <Layout {...props} />
}

export async function getStaticPaths() {
  const from = 'page-paths'
  const { postCount } = await getGlobalData({ from })
  const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
=======
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticPaths({ locale }) {
  const from = 'page-paths'
  const { postCount, NOTION_CONFIG } = await getGlobalData({ from, locale })
  const totalPages = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) }
    })),
    fallback: true
  }
}

<<<<<<< HEAD
export async function getStaticProps({ params: { page } }) {
  const from = `page-${page}`
  const props = await getGlobalData({ from })
  const { allPages } = props
  const allPosts = allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
  // 处理分页
  props.posts = allPosts.slice(BLOG.POSTS_PER_PAGE * (page - 1), BLOG.POSTS_PER_PAGE * page)
  props.page = page

  // 处理预览
  if (BLOG.POST_LIST_PREVIEW === 'true') {
=======
export async function getStaticProps({ params: { page }, locale }) {
  const from = `page-${page}`
  const props = await getGlobalData({ from, locale })
  const { allPages } = props
  const POST_PREVIEW_LINES = siteConfig(
    'POST_PREVIEW_LINES',
    12,
    props?.NOTION_CONFIG
  )

  const allPosts = allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  // 处理分页
  props.posts = allPosts.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  )
  props.page = page

  // 处理预览
  if (siteConfig('POST_LIST_PREVIEW', false, props?.NOTION_CONFIG)) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    for (const i in props.posts) {
      const post = props.posts[i]
      if (post.password && post.password !== '') {
        continue
      }
<<<<<<< HEAD
      post.blockMap = await getPostBlocks(post.id, 'slug', BLOG.POST_PREVIEW_LINES)
=======
      post.blockMap = await getPostBlocks(post.id, 'slug', POST_PREVIEW_LINES)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    }
  }

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

export default Page

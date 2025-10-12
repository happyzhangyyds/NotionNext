import BLOG from '@/blog.config'
<<<<<<< HEAD
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { generateRss } from '@/lib/rss'
import { generateRobotsTxt } from '@/lib/robots.txt'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
=======
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPostBlocks } from '@/lib/db/getSiteData'
import { generateRobotsTxt } from '@/lib/robots.txt'
import { generateRss } from '@/lib/rss'
import { generateSitemapXml } from '@/lib/sitemap.xml'
import { DynamicLayout } from '@/themes/theme'
import { generateRedirectJson } from '@/lib/redirect'
import { checkDataFromAlgolia } from '@/lib/plugins/algolia'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const Index = props => {
<<<<<<< HEAD
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  return <Layout {...props} />
=======
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutIndex' {...props} />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

/**
 * SSG 获取数据
 * @returns
 */
<<<<<<< HEAD
export async function getStaticProps() {
  const from = 'index'
  const props = await getGlobalData({ from })

  props.posts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published')

  // 处理分页
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // 滚动列表默认给前端返回所有数据
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  // 预览文章内容
  if (BLOG.POST_LIST_PREVIEW === 'true') {
=======
export async function getStaticProps(req) {
  const { locale } = req
  const from = 'index'
  const props = await getGlobalData({ from, locale })
  const POST_PREVIEW_LINES = siteConfig(
    'POST_PREVIEW_LINES',
    12,
    props?.NOTION_CONFIG
  )
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )

  // 处理分页
  if (siteConfig('POST_LIST_STYLE') === 'scroll') {
    // 滚动列表默认给前端返回所有数据
  } else if (siteConfig('POST_LIST_STYLE') === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
  }

  // 预览文章内容
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

  // 生成robotTxt
<<<<<<< HEAD
  generateRobotsTxt()
  // 生成Feed订阅
  if (JSON.parse(BLOG.ENABLE_RSS)) {
    generateRss(props?.latestPosts || [])
=======
  generateRobotsTxt(props)
  // 生成Feed订阅
  generateRss(props)
  // 生成
  generateSitemapXml(props)
  // 检查数据是否需要从algolia删除
  checkDataFromAlgolia(props)
  if (siteConfig('UUID_REDIRECT', false, props?.NOTION_CONFIG)) {
    // 生成重定向 JSON
    generateRedirectJson(props)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }

  // 生成全文索引 - 仅在 yarn build 时执行 && process.env.npm_lifecycle_event === 'build'

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

export default Index

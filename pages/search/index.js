<<<<<<< HEAD
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import { getLayoutByTheme } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
=======
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'
import { useRouter } from 'next/router'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 搜索路由
 * @param {*} props
 * @returns
 */
const Search = props => {
  const { posts } = props

<<<<<<< HEAD
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })

=======
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const router = useRouter()
  const keyword = router?.query?.s

  let filteredPosts
  // 静态过滤
  if (keyword) {
    filteredPosts = posts.filter(post => {
      const tagContent = post?.tags ? post?.tags.join(' ') : ''
      const categoryContent = post.category ? post.category.join(' ') : ''
      const searchContent =
<<<<<<< HEAD
                post.title + post.summary + tagContent + categoryContent
=======
        post.title + post.summary + tagContent + categoryContent
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      return searchContent.toLowerCase().includes(keyword.toLowerCase())
    })
  } else {
    filteredPosts = []
  }

  props = { ...props, posts: filteredPosts }

<<<<<<< HEAD
  return <Layout {...props} />
=======
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutSearch' {...props} />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

/**
 * 浏览器前端搜索
 */
<<<<<<< HEAD
export async function getStaticProps() {
  const props = await getGlobalData({
    from: 'search-props',
    pageType: ['Post']
  })
  const { allPages } = props
  props.posts = allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
=======
export async function getStaticProps({ locale }) {
  const props = await getGlobalData({
    from: 'search-props',
    locale
  })
  const { allPages } = props
  props.posts = allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  return {
    props,
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

export default Search

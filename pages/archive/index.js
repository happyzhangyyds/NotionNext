<<<<<<< HEAD
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/formatDate'
import { siteConfig } from '@/lib/config'

const ArchiveIndex = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })

=======
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/utils/formatDate'
import { DynamicLayout } from '@/themes/theme'
import { useEffect } from 'react'

/**
 * 归档首页
 * @param {*} props
 * @returns
 */
const ArchiveIndex = props => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  useEffect(() => {
    if (isBrowser) {
      const anchor = window.location.hash
      if (anchor) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchor.substring(1))
          if (anchorElement) {
            anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
        }, 300)
      }
    }
  }, [])

<<<<<<< HEAD
  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'archive-index' })
  // 处理分页
  props.posts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
=======
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutArchive' {...props} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'archive-index', locale })
  // 处理分页
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  delete props.allPages

  const postsSortByDate = Object.create(props.posts)

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  const archivePosts = {}

  postsSortByDate.forEach(post => {
    const date = formatDateFmt(post.publishDate, 'yyyy-MM')
    if (archivePosts[date]) {
      archivePosts[date].push(post)
    } else {
      archivePosts[date] = [post]
    }
  })

  props.archivePosts = archivePosts
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

export default ArchiveIndex

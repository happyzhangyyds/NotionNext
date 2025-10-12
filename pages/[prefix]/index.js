import BLOG from '@/blog.config'
<<<<<<< HEAD
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect, useState } from 'react'
import { idToUuid } from 'notion-utils'
import { useRouter } from 'next/router'
import { getNotion } from '@/lib/notion/getNotion'
import { getPageTableOfContents } from '@/lib/notion/getPageTableOfContents'
import { getLayoutByTheme } from '@/themes/theme'
import md5 from 'js-md5'
import { checkContainHttp } from '@/lib/utils'
import { uploadDataToAlgolia } from '@/lib/algolia'
import { siteConfig } from '@/lib/config'
=======
import useNotification from '@/components/Notification'
import OpenWrite from '@/components/OpenWrite'
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPost } from '@/lib/db/getSiteData'
import { useGlobal } from '@/lib/global'
import { getPageTableOfContents } from '@/lib/notion/getPageTableOfContents'
import { getPasswordQuery } from '@/lib/password'
import { checkSlugHasNoSlash, processPostData } from '@/lib/utils/post'
import { DynamicLayout } from '@/themes/theme'
import md5 from 'js-md5'
import { useRouter } from 'next/router'
import { idToUuid } from 'notion-utils'
import { useEffect, useState } from 'react'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 根据notion的slug访问页面
 * 只解析一级目录例如 /about
 * @param {*} props
 * @returns
 */
const Slug = props => {
  const { post } = props
<<<<<<< HEAD

  // 文章锁🔐
  const [lock, setLock] = useState(post?.password && post?.password !== '')

  /**
   * 验证文章密码
   * @param {*} result
  */
  const validPassword = passInput => {
    const encrypt = md5(post.slug + passInput)
    if (passInput && encrypt === post.password) {
      setLock(false)
=======
  const router = useRouter()
  const { locale } = useGlobal()

  // 文章锁🔐
  const [lock, setLock] = useState(post?.password && post?.password !== '')
  const { showNotification, Notification } = useNotification()

  /**
   * 验证文章密码
   * @param {*} passInput
   */
  const validPassword = passInput => {
    if (!post) {
      return false
    }
    const encrypt = md5(post?.slug + passInput)
    if (passInput && encrypt === post?.password) {
      setLock(false)
      // 输入密码存入localStorage，下次自动提交
      localStorage.setItem('password_' + router.asPath, passInput)
      showNotification(locale.COMMON.ARTICLE_UNLOCK_TIPS) // 设置解锁成功提示显示
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      return true
    }
    return false
  }

  // 文章加载
  useEffect(() => {
    // 文章加密
    if (post?.password && post?.password !== '') {
      setLock(true)
    } else {
      setLock(false)
<<<<<<< HEAD
      if (!lock && post?.blockMap?.block) {
        post.content = Object.keys(post.blockMap.block).filter(key => post.blockMap.block[key]?.value?.parent_id === post.id)
        post.toc = getPageTableOfContents(post, post.blockMap)
=======
    }

    // 读取上次记录 自动提交密码
    const passInputs = getPasswordQuery(router.asPath)
    if (passInputs.length > 0) {
      for (const passInput of passInputs) {
        if (validPassword(passInput)) {
          break // 密码验证成功，停止尝试
        }
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      }
    }
  }, [post])

<<<<<<< HEAD
  props = { ...props, lock, setLock, validPassword }
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  return <Layout {...props} />
=======
  // 文章加载
  useEffect(() => {
    if (lock) {
      return
    }
    // 文章解锁后生成目录与内容
    if (post?.blockMap?.block) {
      post.content = Object.keys(post.blockMap.block).filter(
        key => post.blockMap.block[key]?.value?.parent_id === post.id
      )
      post.toc = getPageTableOfContents(post, post.blockMap)
    }
  }, [router, lock])

  props = { ...props, lock, validPassword }
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return (
    <>
      {/* 文章布局 */}
      <DynamicLayout theme={theme} layoutName='LayoutSlug' {...props} />
      {/* 解锁密码提示框 */}
      {post?.password && post?.password !== '' && !lock && <Notification />}
      {/* 导流工具 */}
      <OpenWrite />
    </>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

export async function getStaticPaths() {
  if (!BLOG.isProd) {
    return {
      paths: [],
      fallback: true
    }
  }

  const from = 'slug-paths'
  const { allPages } = await getGlobalData({ from })
<<<<<<< HEAD
  const paths = allPages?.filter(row => checkSlug(row))
=======
  const paths = allPages
    ?.filter(row => checkSlugHasNoSlash(row))
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    .map(row => ({ params: { prefix: row.slug } }))
  return {
    paths: paths,
    fallback: true
  }
}

<<<<<<< HEAD
export async function getStaticProps({ params: { prefix } }) {
  let fullSlug = prefix
  if (JSON.parse(BLOG.PSEUDO_STATIC)) {
=======
export async function getStaticProps({ params: { prefix }, locale }) {
  let fullSlug = prefix
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from, locale })
  if (siteConfig('PSEUDO_STATIC', false, props.NOTION_CONFIG)) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    if (!fullSlug.endsWith('.html')) {
      fullSlug += '.html'
    }
  }
<<<<<<< HEAD
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from })
  // 在列表内查找文章
  props.post = props?.allPages?.find((p) => {
    return (p.type.indexOf('Menu') < 0) && (p.slug === fullSlug || p.id === idToUuid(fullSlug))
=======

  // 在列表内查找文章
  props.post = props?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.slug === prefix || p.id === idToUuid(prefix))
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  })

  // 处理非列表内文章的内信息
  if (!props?.post) {
    const pageId = prefix
    if (pageId.length >= 32) {
<<<<<<< HEAD
      const post = await getNotion(pageId)
      props.post = post
    }
  }
  // 无法获取文章
  if (!props?.post) {
    props.post = null
    return { props, revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND) }
  }

  // 文章内容加载
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, from)
  }

  // 生成全文索引 && process.env.npm_lifecycle_event === 'build' && JSON.parse(BLOG.ALGOLIA_RECREATE_DATA)
  if (BLOG.ALGOLIA_APP_ID) {
    uploadDataToAlgolia(props?.post)
  }

  // 推荐关联文章处理
  const allPosts = props.allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
  if (allPosts && allPosts.length > 0) {
    const index = allPosts.indexOf(props.post)
    props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0]
    props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0]
    props.recommendPosts = getRecommendPost(props.post, allPosts, BLOG.POST_RECOMMEND_COUNT)
  } else {
    props.prev = null
    props.next = null
    props.recommendPosts = []
  }

  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

/**
 * 获取文章的关联推荐文章列表，目前根据标签关联性筛选
 * @param post
 * @param {*} allPosts
 * @param {*} count
 * @returns
 */
export function getRecommendPost(post, allPosts, count = 6) {
  let recommendPosts = []
  const postIds = []
  const currentTags = post?.tags || []
  for (let i = 0; i < allPosts.length; i++) {
    const p = allPosts[i]
    if (p.id === post.id || p.type.indexOf('Post') < 0) {
      continue
    }

    for (let j = 0; j < currentTags.length; j++) {
      const t = currentTags[j]
      if (postIds.indexOf(p.id) > -1) {
        continue
      }
      if (p.tags && p.tags.indexOf(t) > -1) {
        recommendPosts.push(p)
        postIds.push(p.id)
      }
    }
  }

  if (recommendPosts.length > count) {
    recommendPosts = recommendPosts.slice(0, count)
  }
  return recommendPosts
}

function checkSlug(row) {
  let slug = row.slug
  if (slug.startsWith('/')) {
    slug = slug.substring(1)
  }
  return ((slug.match(/\//g) || []).length === 0 && !checkContainHttp(slug)) && row.type.indexOf('Menu') < 0
}

=======
      const post = await getPost(pageId)
      props.post = post
    }
  }
  if (!props?.post) {
    // 无法获取文章
    props.post = null
  } else {
    await processPostData(props, from)
  }
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
export default Slug

import BLOG from '@/blog.config'
<<<<<<< HEAD
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { idToUuid } from 'notion-utils'
import { getNotion } from '@/lib/notion/getNotion'
import Slug, { getRecommendPost } from '..'
import { uploadDataToAlgolia } from '@/lib/algolia'
import { checkContainHttp } from '@/lib/utils'
=======
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPost } from '@/lib/db/getSiteData'
import { checkSlugHasMorThanTwoSlash, processPostData } from '@/lib/utils/post'
import { idToUuid } from 'notion-utils'
import Slug from '..'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 根据notion的slug访问页面
 * 解析三级以上目录 /article/2023/10/29/test
 * @param {*} props
 * @returns
 */
const PrefixSlug = props => {
<<<<<<< HEAD
  return <Slug {...props}/>
=======
  return <Slug {...props} />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

/**
 * 编译渲染页面路径
 * @returns
 */
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

  return {
    paths: allPages?.filter(row => checkSlug(row))
      .map(row => ({ params: { prefix: row.slug.split('/')[0], slug: row.slug.split('/')[1], suffix: row.slug.split('/').slice(1) } })),
=======
  const paths = allPages
    ?.filter(row => checkSlugHasMorThanTwoSlash(row))
    .map(row => ({
      params: {
        prefix: row.slug.split('/')[0],
        slug: row.slug.split('/')[1],
        suffix: row.slug.split('/').slice(2)
      }
    }))
  return {
    paths: paths,
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    fallback: true
  }
}

/**
 * 抓取页面数据
 * @param {*} param0
 * @returns
 */
<<<<<<< HEAD
export async function getStaticProps({ params: { prefix, slug, suffix } }) {
  let fullSlug = prefix + '/' + slug + '/' + suffix.join('/')
  if (JSON.parse(BLOG.PSEUDO_STATIC)) {
    if (!fullSlug.endsWith('.html')) {
      fullSlug += '.html'
    }
  }
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from })
  // 在列表内查找文章
  props.post = props?.allPages?.find((p) => {
    return (p.type.indexOf('Menu') < 0) && (p.slug === fullSlug || p.id === idToUuid(fullSlug))
=======
export async function getStaticProps({
  params: { prefix, slug, suffix },
  locale
}) {
  const fullSlug = prefix + '/' + slug + '/' + suffix.join('/')
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from, locale })

  // 在列表内查找文章
  props.post = props?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.slug === suffix ||
        p.slug === fullSlug.substring(fullSlug.lastIndexOf('/') + 1) ||
        p.slug === fullSlug ||
        p.id === idToUuid(fullSlug))
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  })

  // 处理非列表内文章的内信息
  if (!props?.post) {
    const pageId = fullSlug.slice(-1)[0]
    if (pageId.length >= 32) {
<<<<<<< HEAD
      const post = await getNotion(pageId)
=======
      const post = await getPost(pageId)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      props.post = post
    }
  }

<<<<<<< HEAD
  // 无法获取文章
  if (!props?.post) {
    props.post = null
    return { props, revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND) }
  }

  // 文章内容加载
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, from)
  }
  // 生成全文索引 && JSON.parse(BLOG.ALGOLIA_RECREATE_DATA)
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

function checkSlug(row) {
  let slug = row.slug
  if (slug.startsWith('/')) {
    slug = slug.substring(1)
  }
  return (slug.match(/\//g) || []).length >= 2 && row.type.indexOf('Menu') < 0 && !checkContainHttp(slug)
}

=======
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
export default PrefixSlug

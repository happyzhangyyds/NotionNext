import BLOG from '@/blog.config'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { getPostBlocks } from '@/lib/notion/getPostBlocks'
import { idToUuid } from 'notion-utils'
import { getAllCategories } from './getAllCategories'
import { getAllPosts, getAllPostCount } from './getAllPosts'
import { getAllTags } from './getAllTags'

/**
 * 获取博客数据
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount 截取最新文章数量
 * @param tagsCount 截取标签数量
 * @param pageType 过滤的文章类型，数组格式 ['Page','Post']
 * @returns {
    allPosts,   所有博客
    latestPosts,
    categories, 所有分类
    postCount,
    customNav, 自定义导航菜单
    tags 所有标签
  }
 *
 */
export async function getGlobalNotionData ({
  pageId = BLOG.NOTION_PAGE_ID,
  from,
  latestPostCount = 5,
  tagsCount = 16,
  pageType = ['Post']
}) {
  const notionPageData = await getNotionPageData({ pageId, from })
  const tagOptions = notionPageData.tagOptions
  const allPosts = await getAllPosts({ notionPageData, from, pageType })
  const postCount = await getAllPostCount({ notionPageData, from })
  const customNav = await getCustomNav({ notionPageData })
  const categories = await getAllCategories(allPosts)
  const tags = await getAllTags({ allPosts, tagOptions, sliceCount: tagsCount })
  // 深拷贝
  let latestPosts = Object.create(allPosts)
  // 时间排序
  latestPosts.sort((a, b) => {
    const dateA = new Date(a?.lastEditedTime || a.createdTime)
    const dateB = new Date(b?.lastEditedTime || b.createdTime)
    return dateB - dateA
  })

  // 只取前五
  latestPosts = latestPosts.slice(0, latestPostCount)
  return {
    allPosts,
    latestPosts,
    categories,
    postCount,
    customNav,
    tags
  }
}

/**
 * 获取指定notion的collection数据
 * @param pageId
 * @param from 请求来源
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getNotionPageData ({ pageId, from }) {
  // 尝试从缓存获取
  const cacheKey = 'page_block_' + pageId
  const data = await getDataFromCache(cacheKey)
  if (data) {
    console.log('[请求缓存]:', `from:${from}`, `id:${pageId}`)
    return data
  }
  const pageRecordMap = await getPageRecordMapByNotionAPI({ pageId, from })
  // 存入缓存
  if (pageRecordMap) {
    await setDataToCache(cacheKey, pageRecordMap)
  }
  return pageRecordMap
}

async function getCustomNav ({ notionPageData }) {
  if (!notionPageData) {
    notionPageData = await getNotionPageData({ from: 'custom-nav' })
  }
  if (!notionPageData) {
    return []
  }
  const allPage = await getAllPosts({ notionPageData, from: 'custom-nav', pageType: ['Page'] })
  const customNav = []
  if (allPage && allPage.length > 0) {
    allPage.forEach(p => {
      customNav.push({ icon: p.icon || null, name: p.title, to: '/' + p.slug, show: true })
    })
  }
  return customNav
}

/**
 * 获取标签选项
 * @param schema
 * @returns {undefined}
 */
function getTagOptions (schema) {
  const tagSchema = Object.values(schema).find(e => e.name === 'tags')
  return tagSchema?.options || {}
}

/**
 * 调用NotionAPI获取Page数据
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getPageRecordMapByNotionAPI ({ pageId, from }) {
  const pageRecordMap = await getPostBlocks(pageId, from)
  if (!pageRecordMap) {
    return []
  }

  pageId = idToUuid(pageId)
  const collection = Object.values(pageRecordMap.collection)[0]?.value
  const collectionQuery = pageRecordMap.collection_query
  const block = pageRecordMap.block
  const schema = collection?.schema
  const rawMetadata = block[pageId].value
  const tagOptions = getTagOptions(schema)

  // Check Type Page-Database和Inline-Database
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.warn(`pageId "${pageId}" is not a database`)
    return null
  }

  return {
    collection,
    collectionQuery,
    block,
    schema,
    tagOptions,
    rawMetadata
  }
}

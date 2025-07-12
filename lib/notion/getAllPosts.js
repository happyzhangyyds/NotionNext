import BLOG from '@/blog.config'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import { getNotionPageData } from '@/lib/notion/getNotionData'
import { delCacheData } from '@/lib/cache/cache_manager'

/**
 * 获取所有文章或页面数据
 * @param {Object} params
 * @param {Object} [params.notionPageData] - 可选，预获取的 Notion 数据
 * @param {string} params.from - 来源标识（用于日志）
 * @param {string[]} params.pageType - 页面类型（如 ['Post', 'Page']）
 * @returns {Promise<Array>} 文章数组
 */
export async function getAllPosts({ notionPageData, from, pageType = ['Post'] }) {
  // 1. 获取 Notion 数据
  if (!notionPageData) {
    notionPageData = await getNotionPageData({ from })
  }
  if (!notionPageData) return []

  const { block, schema, tagOptions, collectionQuery, collectionId, viewIds } = notionPageData

  // 2. 获取所有页面 ID
  const pageIds = getAllPageIds(collectionQuery, collectionId, viewIds)
  if (!pageIds || pageIds.length === 0) return []

  // 3. 并发提取页面属性
  const data = await Promise.all(
    pageIds.map(async id => {
      const pageBlock = block[id]?.value
      if (!pageBlock) return null

      try {
        const properties = await getPageProperties(id, pageBlock, schema, null, tagOptions)
        return properties || null
      } catch (err) {
        console.warn('[getAllPosts] Failed to parse page properties:', id, err)
        return null
      }
    })
  )

  // 4. 过滤有效文章
  const posts = data.filter(post =>
    post?.title &&
    post?.status?.[0] === 'Published' &&
    pageType.includes(post?.type?.[0])
  )

  // 5. 如果没有文章，清除缓存
  if (posts.length === 0) {
    const cacheKey = 'page_block_' + BLOG.NOTION_PAGE_ID
    await delCacheData(cacheKey)
  }

  // 6. 按发布时间排序
  if (BLOG.POSTS_SORT_BY === 'date') {
    posts.sort((a, b) => (b?.publishDate || 0) - (a?.publishDate || 0))
  }

  return posts
}

/**
 * 获取某个 Notion 数据库中所有页面的 ID（blockIds）
 * 优先使用第一个视图的排序结果，若无则合并所有视图的 blockIds
 *
 * @param {Object} collectionQuery - Notion 返回的集合查询结果
 * @param {string} collectionId - 当前集合的 ID
 * @param {string[]} viewIds - 当前集合的视图 ID 列表
 * @returns {string[]} 页面 ID 列表
 */
export default function getAllPageIds(collectionQuery, collectionId, viewIds = []) {
  if (!collectionQuery || !collectionId) return []

  let pageIds = []

  // 1. 优先使用第一个视图的排序结果
  try {
    const firstViewId = viewIds[0]
    const firstViewData = collectionQuery[collectionId]?.[firstViewId]
    const blockIds = firstViewData?.collection_group_results?.blockIds
    if (Array.isArray(blockIds)) {
      pageIds = [...blockIds]
    }
  } catch (error) {
    console.warn('[getAllPageIds] Failed to get blockIds from first view:', error)
  }

  // 2. 如果未获取到，则 fallback 到合并所有视图的 blockIds
  if (pageIds.length === 0) {
    const views = collectionQuery[collectionId]
    if (views && typeof views === 'object') {
      const pageSet = new Set()
      for (const view of Object.values(views)) {
        view?.blockIds?.forEach(id => pageSet.add(id))
        view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id))
      }
      pageIds = [...pageSet]
    }
  }

  return pageIds
}

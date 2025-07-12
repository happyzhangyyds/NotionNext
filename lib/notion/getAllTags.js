/**
 * 提取所有标签及其出现次数
 * @param {Object} params
 * @param {Array} params.allPages - 所有页面数据
 * @param {number} [params.sliceCount=0] - 限制返回前 N 个标签（0 表示返回全部）
 * @param {Array} [params.tagOptions=[]] - Notion 提供的标签选项
 * @returns {Array} 标签数组 [{ id, name, color, count }]
 */
export function getAllTags({ allPages = [], sliceCount = 0, tagOptions = [] }) {
  // 1. 过滤出已发布的文章
  const allPosts = allPages.filter(page => page.type === 'Post' && page.status === 'Published')
  if (allPosts.length === 0 || tagOptions.length === 0) return []

  // 2. 提取标签并统计出现次数
  const tagCountMap = {}
  for (const post of allPosts) {
    const tags = Array.isArray(post.tags) ? post.tags : []
    for (const tag of tags) {
      tagCountMap[tag] = (tagCountMap[tag] || 0) + 1
    }
  }

  // 3. 构建标签对象数组（带颜色、id）
  const tagList = tagOptions
    .map(option => {
      const count = tagCountMap[option.value]
      if (!count) return null
      return {
        id: option.id,
        name: option.value,
        color: option.color,
        count
      }
    })
    .filter(Boolean) // 移除 null

  // 4. 可选：排序（按出现次数降序）
  tagList.sort((a, b) => b.count - a.count)

  // 5. 可选：截取前 N 个
  return sliceCount > 0 ? tagList.slice(0, sliceCount) : tagList
}

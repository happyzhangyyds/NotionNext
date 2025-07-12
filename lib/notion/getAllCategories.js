/**
 * 获取所有文章的分类
 * @param {Object} params
 * @param {Array} params.allPages 所有页面数据
 * @param {Array} params.categoryOptions 分类选项，如 [{ id, value, color }]
 * @param {number} params.sliceCount 返回前 N 个分类，0 表示全部
 * @returns {Array<{ id: string, name: string, color: string, count: number }>}
 */
export function getAllCategories({ allPages = [], categoryOptions = [], sliceCount = 0 }) {
  if (!Array.isArray(allPages) || !Array.isArray(categoryOptions)) {
    return []
  }

  // 1. 过滤出已发布的文章
  const allPosts = allPages.filter(page => page.type === 'Post' && page.status === 'Published')

  // 2. 提取所有分类字段（支持字符串或数组）
  const categoryCountMap = {}
  for (const post of allPosts) {
    const categories = Array.isArray(post.category)
      ? post.category
      : typeof post.category === 'string'
        ? [post.category]
        : []

    for (const cat of categories) {
      if (cat) {
        categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1
      }
    }
  }

  // 3. 构建分类列表（仅包含存在于 categoryOptions 中的）
  const result = categoryOptions
    .map(opt => {
      const count = categoryCountMap[opt.value]
      return count ? { id: opt.id, name: opt.value, color: opt.color, count } : null
    })
    .filter(Boolean)

  // 4. 按数量排序（从多到少）
  result.sort((a, b) => b.count - a.count)

  // 5. 返回前 N 个（可选）
  return sliceCount > 0 ? result.slice(0, sliceCount) : result
}

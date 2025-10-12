<<<<<<< HEAD
=======
import { siteConfig } from '../config'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import { isIterable } from '../utils'

/**
 * 获取所有文章的标签
 * @param allPosts
 * @param sliceCount 默认截取数量为12，若为0则返回全部
 * @param tagOptions tags的下拉选项
 * @returns {Promise<{}|*[]>}
 */
<<<<<<< HEAD
export function getAllTags({ allPages, sliceCount = 0, tagOptions }) {
  const allPosts = allPages?.filter(page => page.type === 'Post' && page.status === 'Published')
=======
export function getAllTags({
  allPages,
  sliceCount = 0,
  tagOptions,
  NOTION_CONFIG
}) {
  // 保留Invisible的Page中的Tags，最后再过滤掉
  const allPosts = allPages?.filter(
    page =>
      page.type === 'Post' &&
      (page.status === 'Published' || page.status === 'Invisible')
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  if (!allPosts || !tagOptions) {
    return []
  }
<<<<<<< HEAD
  // 计数
  let tags = allPosts?.map(p => p.tags)
  tags = [...tags.flat()]
  const tagObj = {}
  tags.forEach(tag => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  const list = []
  if (isIterable(tagOptions)) {
    tagOptions.forEach(c => {
      const count = tagObj[c.value]
      if (count) {
        list.push({ id: c.id, name: c.value, color: c.color, count })
      }
    })
  }

  // 按照数量排序
  // list.sort((a, b) => b.count - a.count)
=======
  // Tag数据统计
  const AllTagInfos = {}
  // 遍历所有文章
  allPosts.forEach(post => {
    post?.tags?.forEach(tag => {
      // 如果标签已经存在
      if (AllTagInfos[tag]) {
        if (
          AllTagInfos[tag].source === 'Invisible' &&
          post.status === 'Published'
        ) {
          AllTagInfos[tag].source = post.status
        }
        AllTagInfos[tag].count++
      } else {
        // 如果标签不存在，创建一个新的标签对象
        AllTagInfos[tag] = {
          count: 1,
          source: post.status
        }
      }
    })
  })

  const list = []
  const IS_TAG_COLOR_DISTINGUISHED = siteConfig(
    'IS_TAG_COLOR_DISTINGUISHED',
    false,
    NOTION_CONFIG
  )
  const TAG_SORT_BY_COUNT = siteConfig('TAG_SORT_BY_COUNT', true, NOTION_CONFIG)
  if (isIterable(tagOptions)) {
    if (!IS_TAG_COLOR_DISTINGUISHED) {
      // 如果不区分颜色, 那么不同颜色相同名称的tag当做同一种tag
      const savedTagNames = new Set()
      tagOptions.forEach(c => {
        if (!savedTagNames.has(c.value)) {
          const tagInfo = AllTagInfos[c.value]
          if (tagInfo) {
            list.push({ id: c.id, name: c.value, color: c.color, ...tagInfo })
          }
          savedTagNames.add(c.value)
        }
      })
    } else {
      tagOptions.forEach(c => {
        const tagInfo = AllTagInfos[c.value]
        if (tagInfo) {
          list.push({ id: c.id, name: c.value, color: c.color, ...tagInfo })
        }
      })
    }
  }

  // 按照数量排序
  if (TAG_SORT_BY_COUNT) {
    list.sort((a, b) => b.count - a.count)
  }

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  if (sliceCount && sliceCount > 0) {
    return list.slice(0, sliceCount)
  } else {
    return list
  }
}

import BLOG from '@/blog.config'
import { idToUuid } from 'notion-utils'
import formatDate from '../formatDate'
import { getPostBlocks } from './getPostBlocks'
import { defaultMapImageUrl } from 'react-notion-x'

function getPageCover(postInfo) {
  const pageCover = postInfo?.format?.page_cover
  if (!pageCover) return null

  if (pageCover.startsWith('/')) {
    return BLOG.NOTION_HOST + pageCover
  }

  if (pageCover.startsWith('http')) {
    return defaultMapImageUrl(pageCover, postInfo)
  }

  return null
}

export async function getNotion(pageId) {
  try {
    const blockMap = await getPostBlocks(pageId, 'slug')
    if (!blockMap) return null

    const block = blockMap.block || {}
    const uuid = idToUuid(pageId)
    const postInfo = block[uuid]?.value

    if (!postInfo) return null

    const titleArray = postInfo?.properties?.title || []
    const title = Array.isArray(titleArray) ? titleArray[0] : 'Untitled'

    const createdTime = formatDate(new Date(postInfo.created_time).toString(), BLOG.LANG)
    const lastEditedTime = formatDate(new Date(postInfo.last_edited_time).toString(), BLOG.LANG)

    return {
      id: pageId,
      title,
      status: 'Published',
      category: '',
      tags: [],
      createdTime,
      lastEditedDay: lastEditedTime,
      fullWidth: postInfo?.format?.page_full_width || false,
      pageCover: getPageCover(postInfo), // camelCase 命名
      date: {
        start_date: lastEditedTime
      },
      blockMap
    }
  } catch (err) {
    console.error('[getNotion] Failed to get Notion page:', err)
    return null
  }
}

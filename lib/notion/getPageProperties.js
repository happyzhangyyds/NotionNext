import { getTextContent, getDateValue } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import BLOG from '@/blog.config'
import formatDate from '../formatDate'
import { mapImgUrl } from './mapImage'

/**
 * 获取页面元素成员属性
 */
export default async function getPageProperties(id, value, schema, authToken, tagOptions) {
  const rawProperties = Object.entries(value?.properties || {})
  const excludeProperties = ['date', 'select', 'multi_select', 'person']
  const properties = { id }

  for (const [key, val] of rawProperties) {
    const type = schema[key]?.type
    const name = schema[key]?.name

    if (!type || !name) continue

    if (!excludeProperties.includes(type)) {
      properties[name] = getTextContent(val)
      continue
    }

    switch (type) {
      case 'date': {
        const dateProperty = getDateValue(val)
        delete dateProperty.type
        properties[name] = dateProperty
        break
      }
      case 'select':
      case 'multi_select': {
        const selects = getTextContent(val)
        if (selects?.length) {
          properties[name] = selects.split(',').map(s => s.trim())
        }
        break
      }
      case 'person': {
        const rawUsers = val.flat()
        const api = new NotionAPI({ authToken })
        const users = await Promise.all(
          rawUsers.map(async user => {
            if (!user?.[0]?.[1]) return null
            const userId = user[0]
            const res = await api.getUsers(userId)
            const resValue = res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
            return resValue
              ? {
                  id: resValue.id,
                  first_name: resValue.given_name,
                  last_name: resValue.family_name,
                  profile_photo: resValue.profile_photo
                }
              : null
          })
        )
        properties[name] = users.filter(Boolean)
        break
      }
    }
  }

  // 单选字段取第一个
  properties.type = properties.type?.[0] || ''
  properties.status = properties.status?.[0] || ''
  properties.category = properties.category?.[0] || ''

  const publishDate = new Date(properties?.date?.start_date || value.created_time)
  const lastEditedDate = new Date(value?.last_edited_time)

  properties.publishDate = publishDate.getTime()
  properties.publishDay = formatDate(publishDate, BLOG.LANG)
  properties.lastEditedDate = lastEditedDate
  properties.lastEditedDay = formatDate(lastEditedDate, BLOG.LANG)

  properties.fullWidth = value.format?.page_full_width ?? false
  properties.pageIcon = mapImgUrl(value?.format?.page_icon, value) ?? ''
  properties.pageCover = mapImgUrl(value?.format?.page_cover, value) ?? ''
  properties.pageCoverThumbnail = mapImgUrl(value?.format?.page_cover, value, 'block', 'pageCoverThumbnail') ?? ''

  // 标签颜色
  properties.tagItems = properties?.tags?.map(tag => ({
    name: tag,
    color: tagOptions?.find(t => t.value === tag)?.color || 'gray'
  })) || []

  // URL 路径处理
  if (properties.type === 'Post') {
    properties.slug = BLOG.POST_URL_PREFIX
      ? generateCustomizeUrl(properties)
      : (properties.slug ?? properties.id)
  } else if (properties.type === 'Page') {
    properties.slug = properties.slug ?? properties.id
  } else if (['Menu', 'SubMenu'].includes(properties.type)) {
    properties.to = properties.slug ?? '#'
    properties.name = properties.title ?? ''
  }

  // 伪静态处理
  const isPseudoStatic = BLOG.PSEUDO_STATIC === 'true' || BLOG.PSEUDO_STATIC === true
  if (isPseudoStatic && !properties.slug?.endsWith('.html') && !properties.slug?.startsWith('http')) {
    properties.slug += '.html'
  }

  return properties
}

/**
 * 根据用户定义的 URL 模板生成 slug
 */
function generateCustomizeUrl(postProperties) {
  const { publishDay, slug = postProperties.id } = postProperties
  const date = new Date(publishDay)
  const patterns = BLOG.POST_URL_PREFIX.split('/')

  const path = patterns.map(pattern => {
    switch (pattern) {
      case '%year%': return date.getUTCFullYear()
      case '%month%': return String(date.getUTCMonth() + 1).padStart(2, '0')
      case '%day%': return String(date.getUTCDate()).padStart(2, '0')
      case '%slug%': return slug
      default: return pattern
    }
  }).join('/')

  return `${path}/${slug}`
}

'use client'

import BLOG from '@/blog.config'
import { deepClone } from './utils'
import { useGlobal } from './global'

/**
 * 获取最终配置项（客户端专用）
 * @param {string} key 配置项名称
 * @param {*} defaultVal 默认值
 * @param {*} extendConfig 可选的外部配置对象
 * @returns {*} 最终配置值
 */
export const siteConfig = (key, defaultVal = null, extendConfig = null) => {
  let global = null

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    global = useGlobal()
  } catch (error) {
    console.warn('useGlobal 调用失败，可能在服务端。')
  }

  const notionConfig = global?.NOTION_CONFIG || {}
  const siteInfo = global?.siteInfo || {}

  // 优先级：NotionConfig > siteInfo > extendConfig > BLOG
  const val =
    notionConfig[key] ??
    getFallbackFromSiteInfo(key, siteInfo) ??
    extendConfig?.[key] ??
    BLOG[key] ??
    defaultVal

  return parseConfigValue(val)
}

/**
 * 根据 key 从 siteInfo 获取兼容字段
 */
function getFallbackFromSiteInfo(key, siteInfo) {
  switch (key) {
    case 'HOME_BANNER_IMAGE':
      return siteInfo.pageCover
    case 'AVATAR':
      return siteInfo.icon
    case 'TITLE':
      return siteInfo.title
    case 'DESCRIPTION':
      return siteInfo.description
    default:
      return null
  }
}

/**
 * 解析配置值：处理布尔和 JSON 字符串
 */
function parseConfigValue(val) {
  if (typeof val === 'string') {
    if (val === 'true' || val === 'false') {
      return val === 'true'
    }
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }
  return val
}

/**
 * 获取全部配置项（客户端专用）
 * @returns {object}
 */
export const siteConfigMap = () => {
  const config = deepClone(BLOG)
  const result = {}

  for (const key in config) {
    result[key] = siteConfig(key)
  }

  return result
}

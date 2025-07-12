import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { deepClone, delay } from '../utils'

/**
 * 获取文章内容（带缓存、重试、清洗）
 * @param {string} id Notion 页面 ID
 * @param {string} from 来源标识（用于日志）
 * @param {number} slice 截取 block 数量（可选）
 * @returns {Promise<object|null>}
 */
export async function getPostBlocks(id, from = 'unknown', slice = 0) {
  const cacheKey = `block:${id}`
  let pageBlock = await getDataFromCache(cacheKey)

  if (pageBlock) {
    console.log('[CACHE HIT]', `from:${from}`, cacheKey)
  } else {
    pageBlock = await getPageWithRetry(id, from)
    if (pageBlock) {
      await setDataToCache(cacheKey, pageBlock)
    }
  }

  return pageBlock ? sanitizePageBlocks(id, pageBlock, slice) : null
}

/**
 * 获取单个 Block（带缓存）
 * @param {string} id Block ID
 * @param {string} from 来源标识
 * @returns {Promise<object|null>}
 */
export async function getSingleBlock(id, from = 'unknown') {
  const cacheKey = `block:single:${id}`
  let block = await getDataFromCache(cacheKey)

  if (block) {
    console.log('[CACHE HIT]', `from:${from}`, cacheKey)
  } else {
    block = await getPageWithRetry(id, from)
    if (block) {
      await setDataToCache(cacheKey, block)
    }
  }

  return block
}

/**
 * 获取 Notion 页面（失败自动重试）
 * @param {string} id 页面 ID
 * @param {string} from 来源标识
 * @param {number} retryAttempts 重试次数（默认 3 次）
 * @returns {Promise<object|null>}
 */
export async function getPageWithRetry(id, from = 'unknown', retryAttempts = 3) {
  if (retryAttempts <= 0) {
    console.error('[NOTION ERROR] 请求失败，已无重试机会:', `from:${from}`, `id:${id}`)
    return null
  }

  console.log('[NOTION FETCH]', `from:${from}`, `id:${id}`, retryAttempts < 3 ? `剩余重试:${retryAttempts}` : '')

  try {
    const authToken = BLOG.NOTION_ACCESS_TOKEN || null
    const api = new NotionAPI({
      authToken,
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })

    const start = Date.now()
    const pageData = await api.getPage(id)
    const duration = Date.now() - start

    console.log('[NOTION SUCCESS]', `耗时:${duration}ms`, `from:${from}`, `id:${id}`)
    return pageData
  } catch (err) {
    console.warn('[NOTION RETRY]', `from:${from}`, `id:${id}`, err?.message)
    await delay(1000)

    // 再尝试读取缓存（可能是前一次失败后已写入）
    const fallbackCache = await getDataFromCache(`block:${id}`)
    if (fallbackCache) {
      console.log('[FALLBACK CACHE]', `from:${from}`, `id:${id}`)
      return fallbackCache
    }

    return await getPageWithRetry(id, from, retryAttempts - 1)
  }
}

/**
 * 清洗页面 Block 数据
 * @param {string} id 页面 ID
 * @param {object} blockMap 页面数据
 * @param {number} slice 截取数量（可选）
 * @returns {object} 清洗后的数据
 */
function sanitizePageBlocks(id, blockMap, slice = 0) {
  const cleaned = deepClone(blockMap)
  let count = 0

  for (const key in cleaned?.block) {
    const block = cleaned.block[key]
    const value = block?.value
    if (!value) continue

    // 截断 block 数量
    if (slice > 0 && count > slice) {
      delete cleaned.block[key]
      continue
    }

    // 移除页面主 block 的 properties（含敏感信息）
    if (value.id === id) {
      delete value.properties
      continue
    }

    count++

    // 标准化代码语言
    normalizeCodeLanguage(value)
  }

  return cleaned
}

/**
 * 标准化代码块语言（将 C++ → cpp，C# → csharp 等）
 * @param {object} value Block 的 value 对象
 */
function normalizeCodeLanguage(value) {
  if (value?.type !== 'code') return

  const lang = value?.properties?.language?.[0]?.[0]
  if (!lang) return

  const langMap = {
    'C++': 'cpp',
    'C#': 'csharp',
    Assembly: 'asm6502'
  }

  if (langMap[lang]) {
    value.properties.language[0][0] = langMap[lang]
  }
}

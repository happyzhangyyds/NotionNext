import MemoryCache from './memory_cache'
import FileCache from './local_file_cache'
import MongoCache from './mongo_db_cache'
import BLOG from '@/blog.config'

let cacheApi = null

/**
 * 获取当前缓存 API 实现（Memory/File/Mongo）
 */
function getApi() {
  if (!cacheApi) {
    if (process.env.MONGO_DB_URL && process.env.MONGO_DB_NAME) {
      cacheApi = MongoCache
    } else if (process.env.ENABLE_FILE_CACHE === 'true') {
      cacheApi = FileCache
    } else {
      cacheApi = MemoryCache
    }
  }
  return cacheApi
}

/**
 * 从缓存中获取数据
 * @param {string} key 缓存键
 * @param {boolean} force 是否强制启用缓存（即便未启用全局开关）
 * @returns {Promise<any>}
 */
export async function getDataFromCache(key, force = false) {
  try {
    if (BLOG.ENABLE_CACHE || force) {
      const api = getApi()
      const data = await api.getCache(key)

      if (process.env.DEBUG_CACHE === 'true') {
        console.log(`[CACHE] GET ${key} =>`, data ? 'HIT' : 'MISS')
      }

      if (!data || (Array.isArray(data) && data.length === 0)) {
        return null
      }

      return data
    }
  } catch (err) {
    console.error(`[CACHE] 读取缓存失败: ${key}`, err)
  }
  return null
}

/**
 * 写入缓存
 * @param {string} key 缓存键
 * @param {any} data 缓存数据
 * @param {number} ttl 缓存有效时间（秒），可选
 */
export async function setDataToCache(key, data, ttl = null) {
  if (!data || !BLOG.ENABLE_CACHE) return
  try {
    const api = getApi()
    if (typeof api.setCache === 'function') {
      await api.setCache(key, data, ttl)

      if (process.env.DEBUG_CACHE === 'true') {
        console.log(`[CACHE] SET ${key} (ttl=${ttl || '∞'})`)
      }
    }
  } catch (err) {
    console.error(`[CACHE] 写入缓存失败: ${key}`, err)
  }
}

/**
 * 删除缓存
 * @param {string} key 缓存键
 */
export async function delCacheData(key) {
  if (!BLOG.ENABLE_CACHE) return
  try {
    const api = getApi()
    if (typeof api.delCache === 'function') {
      await api.delCache(key)

      if (process.env.DEBUG_CACHE === 'true') {
        console.log(`[CACHE] DELETE ${key}`)
      }
    }
  } catch (err) {
    console.error(`[CACHE] 删除缓存失败: ${key}`, err)
  }
}

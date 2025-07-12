import cache from 'memory-cache'
import BLOG from 'blog.config'

const CACHE_TTL_SECONDS = BLOG.isProd ? 600 : 7200 // 秒
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000 // 毫秒

export function getCache(key) {
  return cache.get(key)
}

export function setCache(key, data) {
  cache.put(key, data, CACHE_TTL_MS)
}

export function delCache(key) {
  cache.del(key)
}

export default { getCache, setCache, delCache }

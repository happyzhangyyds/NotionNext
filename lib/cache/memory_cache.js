import cache from 'memory-cache'
<<<<<<< HEAD
import BLOG from 'blog.config'
=======
import BLOG from '@/blog.config'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

const cacheTime = BLOG.isProd ? 10 * 60 : 120 * 60 // 120 minutes for dev,10 minutes for prod

export async function getCache(key, options) {
  return await cache.get(key)
}

<<<<<<< HEAD
export async function setCache(key, data) {
  await cache.put(key, data, cacheTime * 1000)
=======
export async function setCache(key, data, customCacheTime) {
  await cache.put(key, data, (customCacheTime || cacheTime) * 1000)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

export async function delCache(key) {
  await cache.del(key)
}

export default { getCache, setCache, delCache }

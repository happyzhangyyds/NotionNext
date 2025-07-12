import fs from 'fs/promises'
import path from 'path'

const CACHE_TTL_MS = 10 * 60 * 1000 // 缓存有效期：10分钟
const jsonFile = path.resolve('./data.json')

async function readCacheFile() {
  try {
    const data = await fs.readFile(jsonFile, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return {} // 文件不存在或 JSON 无效
  }
}

async function writeCacheFile(json) {
  try {
    await fs.writeFile(jsonFile, JSON.stringify(json, null, 2))
  } catch (err) {
    console.error('[FileCache] 写入缓存文件失败:', err)
  }
}

export async function getCache(key) {
  const json = await readCacheFile()
  const expireTime = json[`${key}_expire_time`]
  if (!expireTime || Date.now() > expireTime + CACHE_TTL_MS) {
    return null
  }
  return json[key] ?? null
}

export async function setCache(key, data) {
  if (!data) return
  const json = await readCacheFile()
  json[key] = data
  json[`${key}_expire_time`] = Date.now()
  await writeCacheFile(json)
}

export async function delCache(key) {
  const json = await readCacheFile()
  delete json[key]
  delete json[`${key}_expire_time`]
  await writeCacheFile(json)
}

export async function cleanCache() {
  await writeCacheFile({})
}

export default { getCache, setCache, delCache, cleanCache }

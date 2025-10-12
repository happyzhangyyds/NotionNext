import fs from 'fs'

const path = require('path')
// 文件缓存持续10秒
const cacheInvalidSeconds = 1000000000 * 1000
// 文件名
const jsonFile = path.resolve('./data.json')

<<<<<<< HEAD
export async function getCache (key) {
  const exist = await fs.existsSync(jsonFile)
  if (!exist) return null
  const data = await fs.readFileSync(jsonFile)
=======
export function getCache(key) {
  const exist = fs.existsSync(jsonFile)
  if (!exist) return null
  const data = fs.readFileSync(jsonFile)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  let json = null
  if (!data) return null
  try {
    json = JSON.parse(data)
  } catch (error) {
    console.error('读取JSON缓存文件失败', data)
    return null
  }
  // 缓存超过有效期就作废
<<<<<<< HEAD
  const cacheValidTime = new Date(parseInt(json[key + '_expire_time']) + cacheInvalidSeconds)
=======
  const cacheValidTime = new Date(
    parseInt(json[key + '_expire_time']) + cacheInvalidSeconds
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const currentTime = new Date()
  if (!cacheValidTime || cacheValidTime < currentTime) {
    return null
  }
  return json[key]
}

/**
 * 并发请求写文件异常； Vercel生产环境不支持写文件。
 * @param key
 * @param data
 * @returns {Promise<null>}
 */
<<<<<<< HEAD
export async function setCache (key, data) {
  const exist = await fs.existsSync(jsonFile)
  const json = exist ? JSON.parse(await fs.readFileSync(jsonFile)) : {}
=======
export function setCache(key, data) {
  const exist = fs.existsSync(jsonFile)
  const json = exist ? JSON.parse(fs.readFileSync(jsonFile)) : {}
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  json[key] = data
  json[key + '_expire_time'] = new Date().getTime()
  fs.writeFileSync(jsonFile, JSON.stringify(json))
}

<<<<<<< HEAD
export async function delCache (key) {
  const exist = await fs.existsSync(jsonFile)
  const json = exist ? JSON.parse(await fs.readFileSync(jsonFile)) : {}
=======
export function delCache(key) {
  const exist = fs.existsSync(jsonFile)
  const json = exist ? JSON.parse(fs.readFileSync(jsonFile)) : {}
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  delete json.key
  json[key + '_expire_time'] = new Date().getTime()
  fs.writeFileSync(jsonFile, JSON.stringify(json))
}

/**
 * 清理缓存
 */
<<<<<<< HEAD
export async function cleanCache() {
=======
export function cleanCache() {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const json = {}
  fs.writeFileSync(jsonFile, JSON.stringify(json))
}

export default { getCache, setCache, delCache }

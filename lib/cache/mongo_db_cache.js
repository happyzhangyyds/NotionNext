import { MongoClient } from 'mongodb'

const DB_URL = process.env.MONGO_DB_URL
const DB_NAME = process.env.MONGO_DB_NAME
const DB_COLLECTION = 'posts'

let cachedClient = null

async function getCollection() {
  if (!DB_URL || !DB_NAME) {
    throw new Error('MongoDB 环境变量未配置')
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(DB_URL)
    await cachedClient.connect()
  }

  const db = cachedClient.db(DB_NAME)
  return db.collection(DB_COLLECTION)
}

export async function getCache(key) {
  try {
    const collection = await getCollection()
    return await collection.findOne({ block_id: key })
  } catch (err) {
    console.error('[MongoCache] getCache error:', err)
    return null
  }
}

export async function setCache(key, data) {
  try {
    const collection = await getCollection()
    const now = new Date()

    const doc = {
      ...JSON.parse(JSON.stringify(data)), // 深拷贝，避免原对象污染
      block_id: key,
      createdAt: now
    }

    await collection.updateOne(
      { block_id: key },
      { $set: doc },
      { upsert: true }
    )

    return doc
  } catch (err) {
    console.error('[MongoCache] setCache error:', err)
    return null
  }
}

export async function delCache(key) {
  try {
    const collection = await getCollection()
    await collection.deleteOne({ block_id: key })
    return true
  } catch (err) {
    console.error('[MongoCache] delCache error:', err)
    return false
  }
}

export default { getCache, setCache, delCache }

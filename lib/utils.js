import { memo } from 'react'

/** 判断是否客户端环境 */
export const isBrowser = typeof window !== 'undefined'

/** 判断是否搜索引擎爬虫 */
let _isBot
export const isSearchEngineBot = () => {
  if (_isBot !== undefined) return _isBot
  if (typeof navigator === 'undefined') return false
  _isBot = /Googlebot|bingbot|Baidu/.test(navigator.userAgent)
  return _isBot
}

/** React 组件记忆化封装（直接使用 memo） */
export const memorize = memo

/** 检查字符串是否包含 http 或 https 前缀 */
export const checkContainHttp = str => /^https?:\/\//.test(str)

/** 检查字符串中是否包含 http/https（宽松判断） */
export const hasHttp = str => str.includes('http')

/** 提取字符串中以 http 开头的部分 */
export const sliceUrlFromHttp = str =>
  str.includes('http') ? str.slice(str.indexOf('http')) : str

/**
 * 异步加载外部资源（JS、CSS、Font）
 * @param {string} url
 * @param {'js'|'css'|'font'} type
 */
export const loadExternalResource = (url, type) => {
  const elements = type === 'js'
    ? document.querySelectorAll(`[src='${url}']`)
    : document.querySelectorAll(`[href='${url}']`)

  return new Promise((resolve, reject) => {
    if (elements.length > 0 || !url) {
      resolve(url)
      return
    }

    let tag
    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'font') {
      tag = document.createElement('link')
      tag.rel = 'preload'
      tag.as = 'font'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
    }

    if (tag) {
      tag.onload = () => resolve(url)
      tag.onerror = () => reject(url)
      document.head.appendChild(tag)
    }
  })
}

/** 获取当前 URL 中指定 query 参数 */
export const getQueryVariable = key => {
  if (!isBrowser) return null
  return new URLSearchParams(window.location.search).get(key)
}

/** 获取指定 URL 中的 query 参数 */
export const getQueryParam = (url, param) => {
  const urlWithoutHash = url.split('#')[0]
  const queryString = urlWithoutHash.split('?')[1]
  if (!queryString) return null
  const searchParams = new URLSearchParams(queryString)
  return searchParams.get(param)
}

/** 深度合并对象（不处理数组） */
export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

/** 判断是否为对象（不包含数组） */
export const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item)

/** 判断对象是否可迭代 */
export const isIterable = obj =>
  obj != null && typeof obj[Symbol.iterator] === 'function'

/** 深拷贝对象或数组 */
export const deepClone = obj => {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  } else if (obj && typeof obj === 'object') {
    const newObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] instanceof Date) {
          newObj[key] = new Date(obj[key].getTime()).toISOString()
        } else {
          newObj[key] = deepClone(obj[key])
        }
      }
    }
    return newObj
  } else {
    return obj
  }
}

/** 延迟执行 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 获取从第 1 页到 pageIndex 页的分页数据
 * @param {Array} list 所有数据
 * @param {number} pageIndex 当前页码（从 1 开始）
 * @param {number} pageSize 每页数量
 */
export const getListByPage = (list, pageIndex, pageSize) => {
  const start = 0
  const end = pageIndex * pageSize
  return list.slice(start, end)
}

/** 判断是否为移动端设备 */
export const isMobile = () => {
  if (!isBrowser) return false
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
         typeof window.orientation !== 'undefined'
}

/**
 * 扫描页面文本节点，将 URL 文本转换为点击链接
 * @param {Node} node
 */
export const scanAndConvertToLinks = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    const urlRegex = /https?:\/\/[^\s]+/g
    let lastIndex = 0
    let match
    const newNode = document.createElement('span')

    while ((match = urlRegex.exec(text)) !== null) {
      const beforeText = text.substring(lastIndex, match.index)
      const url = match[0]

      if (beforeText) {
        newNode.appendChild(document.createTextNode(beforeText))
      }

      const link = document.createElement('a')
      link.href = url
      link.target = '_blank'
      link.textContent = url
      newNode.appendChild(link)

      lastIndex = urlRegex.lastIndex
    }

    if (lastIndex < text.length) {
      newNode.appendChild(document.createTextNode(text.substring(lastIndex)))
    }

    node.parentNode.replaceChild(newNode, node)
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      // 可加入排除标签判断，如 script/style
      scanAndConvertToLinks(childNode)
    }
  }
}

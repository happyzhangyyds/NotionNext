import { getTextContent } from 'notion-utils'

const indentLevels = {
  header: 0,
  sub_header: 1,
  sub_sub_header: 2
}

/**
 * 获取页面目录结构（Table of Contents）
 * @param page Notion 页对象
 * @param recordMap Notion 数据块映射
 * @returns TOC 项数组
 */
export const getPageTableOfContents = (page, recordMap) => {
  const contents = page.content ?? []
  const rawToc = extractHeadersFromBlocks(contents, recordMap)

  const indentLevelStack = [{ actual: -1, effective: -1 }]

  for (const tocItem of rawToc) {
    const actual = tocItem.indentLevel

    while (true) {
      const prev = indentLevelStack[indentLevelStack.length - 1]
      const { actual: prevActual, effective: prevEffective } = prev

      if (actual > prevActual) {
        tocItem.indentLevel = prevEffective + 1
        indentLevelStack.push({ actual, effective: tocItem.indentLevel })
        break
      } else if (actual === prevActual) {
        tocItem.indentLevel = prevEffective
        break
      } else {
        indentLevelStack.pop()
      }
    }
  }

  return rawToc
}

/**
 * 递归提取标题块（header, sub_header, sub_sub_header）
 * @param contents 块 ID 数组
 * @param recordMap Notion 数据块映射
 * @param toc 当前 TOC 列表（递归用）
 * @param seen 已处理的块 ID（防止重复）
 */
function extractHeadersFromBlocks(contents, recordMap, toc = [], seen = new Set()) {
  if (!Array.isArray(contents)) return toc

  for (const blockId of contents) {
    if (seen.has(blockId)) continue
    seen.add(blockId)

    const block = recordMap.block?.[blockId]?.value
    if (!block) continue

    const { type, properties, content } = block

    if (type in indentLevels) {
      toc.push({
        id: blockId,
        type,
        text: getTextContent(properties?.title),
        indentLevel: indentLevels[type]
      })
    }

    if (Array.isArray(content) && content.length > 0) {
      extractHeadersFromBlocks(content, recordMap, toc, seen)
    }
  }

  return toc
}

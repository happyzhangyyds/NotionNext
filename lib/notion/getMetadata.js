/**
 * 提取 Notion 页面元信息
 * @param {Object} rawMetadata - 原始 Notion 页面数据
 * @returns {Object} metadata 对象
 */
export default function getMetadata(rawMetadata = {}) {
  const format = rawMetadata.format || {}

  return {
    locked: format.block_locked ?? false,
    fullWidth: format.page_full_width ?? false,
    font: format.page_font || 'default',
    smallText: format.page_small_text ?? false,
    createdTime: rawMetadata.created_time || null,
    lastEditedTime: rawMetadata.last_edited_time || null
  }
}

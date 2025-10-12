<<<<<<< HEAD

import fs from 'fs'
import BLOG from '@/blog.config'

export async function generateRobotsTxt() {
=======
import fs from 'fs'

export function generateRobotsTxt(props) {
  const { siteInfo } = props
  const LINK = siteInfo?.link
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const content = `
    # *
    User-agent: *
    Allow: /
  
    # Host
<<<<<<< HEAD
    Host: ${BLOG.LINK}
  
    # Sitemaps
    Sitemap: ${BLOG.LINK}/sitemap.xml
=======
    Host: ${LINK}
  
    # Sitemaps
    Sitemap: ${LINK}/sitemap.xml
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  
    `
  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
  }
}

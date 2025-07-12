import fs from 'fs'
import { Feed } from 'feed'
import BLOG from '@/blog.config'
import ReactDOMServer from 'react-dom/server'
import { getPostBlocks } from './notion'
import NotionPage from '@/components/NotionPage'

const createFeedContent = async post => {
  const blockMap = await getPostBlocks(post.id)
  if (!blockMap) return post.summary

  post.blockMap = blockMap
  const html = ReactDOMServer.renderToString(<NotionPage post={post} />)
  return html.replace(
    /<div class="notion-collection-row">[\s\S]*?<\/div><\/div><\/div><\/div>/g,
    ''
  )
}

export async function generateRss(posts) {
  const year = new Date().getFullYear()
  const feed = new Feed({
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    link: `${BLOG.LINK}/${BLOG.SUB_PATH}`,
    language: BLOG.LANG,
    favicon: `${BLOG.LINK}/favicon.png`,
    copyright: `All rights reserved ${year}, ${BLOG.AUTHOR}`,
    author: {
      name: BLOG.AUTHOR,
      email: BLOG.CONTACT_EMAIL,
      link: BLOG.LINK
    }
  })

  const validPosts = posts.filter(post => post?.slug && post?.publishDay)
  for (const post of validPosts) {
    feed.addItem({
      title: post.title,
      link: `${BLOG.LINK}/${post.slug}`,
      description: post.summary,
      content: await createFeedContent(post),
      date: new Date(post.publishDay)
    })
  }

  try {
    fs.mkdirSync('./public/rss', { recursive: true })
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
    fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
    fs.writeFileSync('./public/rss/feed.json', feed.json1())
    console.log(`✅ RSS generated: ${validPosts.length} posts`)
  } catch (error) {
    console.warn('⚠️ RSS write failed (possibly on Vercel runtime)')
  }
}

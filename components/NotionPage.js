import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'
import 'katex/dist/katex.min.css'
import { mapImgUrl } from '@/lib/notion/mapImage'

/**
 * 动态加载代码块组件
 */
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(m => m.Code),
{ ssr: false }
)

/**
 * 动态加载公式组件（支持 mhchem 化学公式）
 */
const Equation = dynamic(() =>
  import('@/components/Equation').then(async m => {
    await import('@/lib/mhchem') // 可选
    return m.Equation
  }),
{ ssr: false }
)

/**
 * 渲染 Notion 页面内容
 */
const NotionPage = ({ post, className }) => {
  if (!post || !post.blockMap) {
    return <>{post?.summary || ''}</>
  }

  return (
    <div id="notion-article" className={`mx-auto overflow-hidden ${className || ''}`}>
      <NotionRenderer
        recordMap={post.blockMap}
        mapPageUrl={id => '/' + id.replace(/-/g, '')}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Equation
        }}
      />
    </div>
  )
}

export default NotionPage

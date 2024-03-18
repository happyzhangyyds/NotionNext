import dynamic from 'next/dynamic'
import Tabs from '@/components/Tabs'
import { siteConfig } from '@/lib/config'

const TwikooCompenent = dynamic(
  () => {
    return import('@/components/Twikoo')
  },
  { ssr: false }
)

/**
 * 评论组件
 * @param {*} param0
 * @returns
 */
const Comment = ({ siteInfo, frontMatter, className }) => {
  const COMMENT_TWIKOO_ENV_ID = siteConfig('COMMENT_TWIKOO_ENV_ID')

  if (!frontMatter) {
    return <>Loading...</>
  }

  return (
        <div key={frontMatter?.id} id='comment' className={`comment mt-5 text-gray-800 dark:text-gray-300 ${className || ''}`}>
            <Tabs>
                {COMMENT_TWIKOO_ENV_ID && (<div key='Twikoo'>
                    <TwikooCompenent />
                </div>)}
            </Tabs>
        </div>
  )
}

export default Comment

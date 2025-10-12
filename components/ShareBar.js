import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'

<<<<<<< HEAD
const ShareButtons = dynamic(() => import('@/components/ShareButtons'), { ssr: false })
=======
const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 分享栏
 * @param {} param0
 * @returns
 */
const ShareBar = ({ post }) => {
<<<<<<< HEAD
  if (!JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE')) || !post || post?.type !== 'Post') {
    return <></>
  }

  return <div className='m-1 overflow-x-auto'>
        <div className='flex w-full md:justify-end'>
            <ShareButtons post={post} />
        </div>
    </div>
=======
  if (
    !JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE')) ||
    !post ||
    post?.type !== 'Post'
  ) {
    return <></>
  }

  return (
    <div className='m-1 overflow-x-auto'>
      <div className='flex w-full md:justify-end'>
        <ShareButtons post={post} />
      </div>
    </div>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}
export default ShareBar

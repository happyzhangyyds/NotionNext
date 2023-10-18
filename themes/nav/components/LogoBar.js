import BLOG from '@/blog.config'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * Logo区域
 * @param {*} props
 * @returns
 */
export default function LogoBar(props) {
  const { siteInfo } = props

  return (
        <div id='top-wrapper' className='w-full flex items-center'>
                <Link href='/' className='md:w-48 grid justify-items-center text-md md:text-xl dark:text-gray-200'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={siteInfo?.icon?.replaceAll('width=400', 'width=280')}
                        height='44px' alt={BLOG.AUTHOR + ' - ' + BLOG.NEXT_PUBLIC_BIO} className='md:block' placeholderSrc='' />
                    {CONFIG.SHOW_TITLE_TEXT && siteInfo?.title}
                </Link>
        </div>
  )
}

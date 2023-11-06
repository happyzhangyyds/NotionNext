import BLOG from '@/blog.config'
import Link from 'next/link'

import { siteConfig } from '@/lib/config'

const Logo = props => {
  return (
    <Link href='/' passHref legacyBehavior>
      <div className='flex flex-col justify-center items-center cursor-pointer space-y-3'>
        <div className=' text-lg p-1.5 rounded dark:border-white hover:scale-110 transform duration-200'> {siteConfig('TITLE') || BLOG.TITLE}</div>
      </div>
    </Link>
  )
}
export default Logo

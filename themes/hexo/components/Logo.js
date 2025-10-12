import { siteConfig } from '@/lib/config'
<<<<<<< HEAD
import Link from 'next/link'

const Logo = props => {
  return (
    <Link href='/' passHref legacyBehavior>
      <div className='flex flex-col justify-center items-center cursor-pointer space-y-3'>
        <div className='font-medium text-lg p-1.5 rounded dark:border-white dark:text-white menu-link transform duration-200'> {siteConfig('TITLE') }</div>
      </div>
    </Link>
=======
import SmartLink from '@/components/SmartLink'
/**
 * Logo
 * 实际值支持文字
 * @param {*} props
 * @returns
 */
const Logo = props => {
  const { siteInfo } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div className='flex flex-col justify-center items-center cursor-pointer space-y-3'>
        <div className='font-medium text-lg p-1.5 rounded dark:border-white dark:text-white menu-link transform duration-200'>
          {' '}
          {siteInfo?.title || siteConfig('TITLE')}
        </div>
      </div>
    </SmartLink>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  )
}
export default Logo

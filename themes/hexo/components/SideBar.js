<<<<<<< HEAD
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
=======
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import { useRouter } from 'next/router'
import MenuGroupCard from './MenuGroupCard'
import { MenuListSide } from './MenuListSide'

/**
 * 侧边抽屉
 * @param tags
 * @param currentTag
 * @returns {JSX.Element}
 * @constructor
 */
<<<<<<< HEAD
const SideBar = (props) => {
  const { siteInfo } = props
  const router = useRouter()
  return (
        <div id='side-bar'>
            <div className="h-52 w-full flex justify-center">
                <div>
                    <div onClick={() => { router.push('/') }}
                        className='justify-center items-center flex hover:rotate-45 py-6 hover:scale-105 dark:text-gray-100  transform duration-200 cursor-pointer'>
                        <LazyImage src={siteInfo?.icon} className='rounded-full' width={80} alt={siteConfig('AUTHOR')} />
                    </div>
                    <MenuGroupCard {...props} />
                </div>
            </div>
            <MenuListSide {...props} />
        </div>
=======
const SideBar = props => {
  const { siteInfo } = props
  const router = useRouter()
  return (
    <div id='side-bar'>
      <div className='h-52 w-full flex justify-center'>
        <div>
          <div
            onClick={() => {
              router.push('/')
            }}
            className='justify-center items-center flex hover:rotate-45 py-6 hover:scale-105 dark:text-gray-100  transform duration-200 cursor-pointer'>
            {/* 头像 */}
            <LazyImage
              src={siteInfo?.icon}
              className='rounded-full'
              width={80}
              alt={siteConfig('AUTHOR')}
            />
          </div>
          {/* 总览 */}
          <MenuGroupCard {...props} />
        </div>
      </div>
      {/* 侧拉抽屉的菜单 */}
      <MenuListSide {...props} />
    </div>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  )
}

export default SideBar

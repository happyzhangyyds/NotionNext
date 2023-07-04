import Logo from './Logo'
import GroupCategory from './GroupCategory'
import { MenuList } from './MenuList'
import GroupTag from './GroupTag'
import SearchInput from './SearchInput'
import SiteInfo from './SiteInfo'
import Catalog from './Catalog'
import Announcement from './Announcement'
import { useRouter } from 'next/router'
import DarkModeButton from '@/components/DarkModeButton'
import SocialButton from './SocialButton'
import { useState } from 'react'

function AsideLeft(props) {
  const { tagOptions, currentTag, categoryOptions, currentCategory, post, slot, siteInfo, notice } = props
  const router = useRouter()
  const [open, setOpen] = useState(true)
  // 折叠侧边栏
  const toggleOpen = () => {
    setOpen(!open)
  }
  return <div className={`sideLeft relative ${open ? 'w-80' : 'w-0'} duration-150 transition-all bg-white dark:bg-hexo-black-gray min-h-screen hidden lg:block z-20`}>
        {/* 折叠按钮 */}
        <div className={`${open ? 'ml-80' : ''} hidden lg:block sticky top-0 mx-2 cursor-pointer hover:scale-110 duration-150 px-3 py-2`} onClick={toggleOpen}>
            {open ? <i className='fas fa-bars text-xl'></i> : <i className="fa-solid fa-indent text-xl"></i>}
        </div>

        <div className={` ${open ? 'px-10' : 'hidden'}`}>

            <Logo {...props} />

            <section className='siteInfo flex flex-col dark:text-gray-300 pt-8'>
                {siteInfo?.description}
            </section>

            <section className='flex flex-col text-gray-600'>
                <div className='w-12 my-4' />
                <MenuList {...props} />
            </section>

            <section className='flex flex-col text-gray-600'>
                <div className='w-12 my-4' />
                <SearchInput {...props} />
            </section>

            <section className='flex flex-col dark:text-gray-300'>
                <div className='w-12 my-4' />
                <Announcement post={notice} />
            </section>

            {router.asPath !== '/tag' && <section className='flex flex-col'>
                <div className='w-12 my-4' />
                <GroupTag tags={tagOptions} currentTag={currentTag} />
            </section>}

            {router.asPath !== '/category' && <section className='flex flex-col'>
                <div className='w-12 my-4' />
                <GroupCategory categories={categoryOptions} currentCategory={currentCategory} />
            </section>}

            <section className='flex flex-col'>
                <div className='w-12 my-4' />
                <SocialButton />
                <SiteInfo />
            </section>

            <section className='flex justify-center dark:text-gray-200 pt-4'>
                <DarkModeButton />
            </section>

            <section className='sticky top-0 pt-12'>
                <Catalog toc={post?.toc} />
                <div className='flex justify-center'>
                    <div>{slot}</div>
                </div>
            </section>

        </div>
    </div>
}

export default AsideLeft

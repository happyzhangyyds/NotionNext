import Link from 'next/link'
import BLOG from '@/blog.config'
import { useState } from 'react'
import { useLocale } from '@/lib/locale'
import Router, { useRouter } from 'next/router'
import DarkModeButton from '@/components/DarkModeButton'
import SocialButton from '@/components/SocialButton'

const TopNav = ({ tags, currentTag }) => {
  const locale = useLocale()
  const [hiddenMenu, switchHiddenMenu] = useState(!currentTag)
  // 点击按钮更改菜单状态
  const handleMenuClick = () => {
    switchHiddenMenu(!hiddenMenu)
  }
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      Router.push({ pathname: '/', query: { s: searchValue } })
    }
  }

  return (
    <div className='bg-white dark:bg-gray-600'>
      {/* 隐藏的顶部菜单 */}
      <nav
        className={(hiddenMenu ? '-mt-10' : ' ') + ' py-1 overflow-hidden bg-gray-800 text-xl text-gray-200 w-full ease-in-out duration-500'}>
        <ul className='mx-5 duration-300'>
          <li>
            <SocialButton/>
          </li>
        </ul>
      </nav>

      {/* 导航栏 */}
      <div
        id='sticky-nav'
        className='text-sm ticky-nav m-auto w-full flex flex-row justify-between items-center px-5 '
      >
        <div>
          <Link href='/'>
            <a
              className='flex justify-center border-black border-2 bg-whitefont-semibold hover:bg-gray-800 hover:text-white p-2 duration-200
              dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:text-black
              '>{BLOG.title}</a>
          </Link>
        </div>

        <div>
          {/* 搜索框 */}
          <div className='px-4 flex w-20'>
            <i className='py-3 fa fa-search text-gray-400 absolute cursor-pointer px-2' />
            <input
              type='text'
              placeholder={currentTag ? `${locale.SEARCH.TAGS} #${currentTag}` : `${locale.SEARCH.ARTICLES}`}
              className={'transition duration-200 leading-10 pl-8 block border-gray-300 dark:border-gray-600 bg-white text-black dark:bg-gray-800 dark:text-white'}
              onKeyUp={handleKeyUp}
              onChange={e => setSearchValue(e.target.value)}
              defaultValue={router.query.s ?? ''}
            />
          </div>
        </div>

        <div className='flex flex-nowrap space-x-1'>
          <div className='z-10 p-1 border hover:shadow-xl duration-200 dark:border-gray-500 mr-2 h-12 my-2 bg-white dark:bg-gray-600 dark:bg-opacity-70 bg-opacity-70 dark:hover:bg-gray-100 text-xl cursor-pointer dark:text-gray-300 dark:hover:text-black'>
            <i className={'fa p-2.5 hover:scale-125 transform duration-200 ' + (hiddenMenu ? ' fa-bars ' : ' fa-times') } onClick={handleMenuClick} />
          </div>
          <DarkModeButton/>
        </div>
      </div>
    </div>
  )
}

export default TopNav

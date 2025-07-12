import { useState } from 'react'
import SearchButton from './SearchButton'
import DarkModeButton from './DarkModeButton'
import Logo from './Logo'
import Link from 'next/link'

/**
 * 顶部导航
 * @param {*} props
 * @returns
 */
const NavBar = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [textWhite, setTextWhite] = useState(false)
  const [navBgWhite, setBgWhite] = useState(false)

  // ✅ 中间菜单配置数组（全部默认显示）
  const centerMenu = [
    {
      text: '说说',
      href: '/memos'
    },
    {
      text: '归档',
      href: '/archive'
    },

    {
      text: '自习室',
      href: 'https://www.tomatolist.com/show_group.html?group_id=27f2b200-d549-4ba9-a2cc-1b6025be2c7b',
      external: true
    },
    {
      text: '朋友圈',
      href: 'https://moments.matrixcore.love/',
      external: true
    },
    {
      text: '音乐馆',
      href: 'https://music.matrixcore.love/',
      external: true
    },
    {
      text: '关于我',
      href: '/about'
    },
    {
      text: '友链',
      href: '/links'
    }
  ]

  return (
    <>
      {/* 顶部导航菜单栏 */}
      <nav
        id='nav'
        className={`z-20 h-16 top-0 w-full 
          ${fixedNav ? 'fixed' : 'relative bg-transparent'} 
          ${textWhite ? 'text-white' : 'text-black dark:text-white'}  
          ${navBgWhite ? 'bg-white dark:bg-[#18171d]' : 'bg-transparent'}`}
      >
        <div className='flex h-full mx-auto justify-between items-center max-w-[86rem] px-8'>
          {/* 左侧logo */}
          <div className='flex'>
            <Logo {...props} />
          </div>

          {/* ✅ 中间菜单（全部默认显示） */}
          <div
            id='nav-bar-swipe'
            className='hidden lg:flex flex-grow items-center justify-center h-full space-x-6'
          >
            {centerMenu.map((item, index) =>
              item.external ? (
                <a
                  key={index}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-1 hover:underline'
                >
                  <span>{item.text}</span>
                </a>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className='flex items-center space-x-1 hover:underline'
                >
                  <span>{item.text}</span>
                </Link>
              )
            )}
          </div>

          {/* 右侧固定 */}
          <div className='flex flex-shrink-0 justify-end items-center'>
            <SearchButton {...props} />
            <DarkModeButton {...props} />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar

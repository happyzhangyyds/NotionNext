import { useCallback, useEffect, useRef, useState } from 'react'
import SearchButton from './SearchButton'
import DarkModeButton from './DarkModeButton'
import { MenuListTop } from './MenuListTop'
import { siteConfig } from '@/lib/config'
import Logo from './Logo'

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const NavBar = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [textWhite, setTextWhite] = useState(false)
  const [navBgWhite, setBgWhite] = useState(false)

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

          {/* 中间菜单 */}
          <div
            id='nav-bar-swipe'
            className={`hidden lg:flex flex-grow flex-col items-center justify-center h-full relative w-full`}
          >
            {<MenuListTop {...props} />}
          </div>

          {/* 右侧固定 */}
          <div className='flex flex-shrink-0 justify-end items-center'>
            <SearchButton {...props} />
            {/* 主题切换按钮：根据配置和屏幕尺寸决定是否显示 */}
            {!JSON.parse(siteConfig('THEME_SWITCH')) && (
              <div>
                <DarkModeButton {...props} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar

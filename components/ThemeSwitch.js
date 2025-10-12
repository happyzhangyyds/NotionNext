import { useGlobal } from '@/lib/global'
<<<<<<< HEAD
import { useState } from 'react'
import { Draggable } from './Draggable'
import { THEMES } from '@/themes/theme'
import { useRouter } from 'next/router'
import DarkModeButton from './DarkModeButton'
import { getQueryParam } from '@/lib/utils'
import LANGS from '@/lib/lang'
=======
import { getQueryParam } from '@/lib/utils'
import { THEMES } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useState } from 'react'
import DarkModeButton from './DarkModeButton'
import { Draggable } from './Draggable'
import LazyImage from './LazyImage'
import SideBarDrawer from './SideBarDrawer'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
/**
 *
 * @returns 主题切换
 */
const ThemeSwitch = () => {
<<<<<<< HEAD
  const { theme, lang, changeLang, locale, isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const currentTheme = getQueryParam(router.asPath, 'theme') || theme
  //   const currentLang = getQueryParam(router.asPath, 'lang') || lang
  const [isLoading, setIsLoading] = useState(false)

  // 修改当前路径url中的 theme 参数
  // 例如 http://localhost?theme=hexo 跳转到 http://localhost?theme=newTheme
  const onThemeSelectChange = (e) => {
    setIsLoading(true)
    const newTheme = e.target.value
    const query = router.query
    query.theme = newTheme
    router.push({ pathname: router.pathname, query }).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    })
  }

  const onLangSelectChange = (e) => {
    const newLang = e.target.value
    changeLang(newLang)
  }

  return (<>
        <Draggable>
            <div id="draggableBox" style={{ left: '0px', top: '80vh' }} className="fixed group space-y-2 overflow-hidden z-50 p-3 flex flex-col items-start dark:text-white bg-white dark:bg-black rounded-xl shadow-lg ">
                {/* 深色按钮 */}
                <div className="text-sm flex items-center w-0 group-hover:w-32 transition-all duration-200">
                    <DarkModeButton />
                    <div onClick={toggleDarkMode} className='cursor-pointer w-0 group-hover:w-24 transition-all duration-200 overflow-hidden whitespace-nowrap pl-1 h-auto'>{isDarkMode ? locale.MENU.DARK_MODE : locale.MENU.LIGHT_MODE}</div>
                </div>

                {/* 翻译按钮 */}
                <div className="text-sm flex items-center group-hover:w-32 transition-all duration-200">
                    <i className="fa-solid fa-language w-5" />
                    <div className='w-0 group-hover:w-24 transition-all duration-200 overflow-hidden'>
                        <label htmlFor="langSelect" className="sr-only">选择语言：</label>
                        <select id="langSelect" value={lang} onChange={onLangSelectChange} name="themes" className='pl-1 bg-gray-50 dark:bg-black appearance-none outline-none dark:text-white uppercase cursor-pointer'>
                            {Object.keys(LANGS)?.map(t => {
                              return <option key={t} value={t}>{LANGS[t].LOCALE}</option>
                            })}
                        </select>
                    </div>
                </div>

                {/* 主题切换按钮 */}
                <div className="text-sm flex items-center group-hover:w-32 transition-all duration-200">
                    <i className="fa-solid fa-palette w-5" />
                    <div className='w-0 group-hover:w-24 transition-all duration-200 overflow-hidden'>
                        <label htmlFor="themeSelect" className="sr-only">选择主题：</label>
                        <select id="themeSelect" value={currentTheme} onChange={onThemeSelectChange} name="themes" className='pl-1 bg-gray-50 dark:bg-black appearance-none outline-none dark:text-white uppercase cursor-pointer'>
                            {THEMES?.map(t => {
                              return <option key={t} value={t}>{t}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </Draggable>

        {/* 切换主题加载时的全屏遮罩 */}
        <div className={`${isLoading ? 'opacity-90 ' : 'opacity-0'} 
            w-screen h-screen glassmorphism bg-black text-white shadow-text flex justify-center items-center
            transition-all fixed top-0 left-0 pointer-events-none duration-1000 z-50 shadow-inner`}>
            <i className='text-3xl mr-5 fas fa-spinner animate-spin' />
        </div>
=======
  const { theme, locale, isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const currentTheme = getQueryParam(router.asPath, 'theme') || theme
  const [sideBarVisible, setSideBarVisible] = useState(false)

  const changeTheme = newTheme => {
    const query = router.query
    query.theme = newTheme
    router.push({ pathname: router.pathname, query }).then(() => {})
  }

  return (
    <>
      {/* 悬浮的主题切换按钮 */}
      <Draggable stick={true}>
        <div
          id='draggableBox'
          style={{ left: '0px', top: '80vh' }}
          className='border dark:border-gray-600 fixed group flex flex-col items-start space-y-2 overflow-hidden z-20 p-3
                    dark:text-white bg-white dark:bg-black 
                      rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl   '>
          {/* 主题切换按钮 */}
          <div className='text-sm flex items-center group-hover:w-44 h-4 text-center duration-200'>
            <i
              className='cursor-pointer fa-solid fa-palette w-5 '
              onClick={() => {
                setSideBarVisible(true)
              }}
              onTouchStart={() => {
                setSideBarVisible(true)
              }}
            />
            <div className='w-0 group-hover:w-32 duration-200 overflow-hidden'>
              <label htmlFor='themeSelect' className='sr-only'>
                {locale.COMMON.THEME}
              </label>
              {/* 点击弹出主题切换面板 */}
              <div
                onClick={() => {
                  setSideBarVisible(true)
                }}
                className='uppercase cursor-pointer'
                title='Click To Switch Theme'
                alt='Click To Switch Theme'>
                {currentTheme}
              </div>
            </div>
          </div>
        </div>
      </Draggable>

      <SideBarDrawer
        className='p-10 max-w-3xl 2xl:max-w-5xl dark:text-white bg-white dark:bg-black '
        isOpen={sideBarVisible}
        showOnPC={true}
        onClose={() => {
          setSideBarVisible(false)
        }}>
        {/* 开关 */}
        <div className='flex items-center justify-between font-bold'>
          {/* 深色模式切换 */}
          <div className='border dark:border-gray-60 text-sm flex items-center w-32 duration-200 hover:bg-green-500 p-2'>
            <DarkModeButton />
            <div
              onClick={toggleDarkMode}
              className='cursor-pointer w-24 duration-200 overflow-hidden whitespace-nowrap pl-1 h-auto'>
              {isDarkMode ? locale.MENU.DARK_MODE : locale.MENU.LIGHT_MODE}
            </div>
          </div>

          {/* 关闭 */}
          <div
            className='hover:bg-green-500 px-2 py-1 duration-200 cursor-pointer'
            onClick={() => {
              setSideBarVisible(false)
            }}>
            <i className='fas fa-times' />
          </div>
        </div>

        <hr className='my-4 dark:border-gray-600' />

        <div>点击下方主题进行切换.</div>
        <div> Click below to switch the theme.</div>

        {/* 陈列所有主题 */}
        <div className='grid lg:grid-cols-2 gap-6'>
          {THEMES?.map(t => {
            return (
              <div
                className='my-6'
                key={t}
                onClick={() => {
                  changeTheme(t)
                }}>
                <div className='text-lg dark:text-white font-bold uppercase mb-4'>
                  {t}
                </div>
                <LazyImage
                  src={`/images/themes-preview/${t}.png`}
                  className='cursor-pointer shadow-lg rounded-xl hover:scale-110 duration-200'
                />
              </div>
            )
          })}
        </div>
      </SideBarDrawer>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    </>
  )
}

export default ThemeSwitch

import { useEffect, useImperativeHandle, useState } from 'react'
import { saveDarkModeToLocalStorage } from '@/themes/theme'
import { Moon, Sun } from '@/components/HeroIcons'

/**
 * 深色模式按钮（不依赖 useGlobal，全本地实现）
 */
const DarkModeButton = (props) => {
  const { cRef, className } = props
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 初始化：从 localStorage 读取
  useEffect(() => {
    const dark = localStorage.getItem('dark-mode') === 'true'
    setIsDarkMode(dark)

    const html = document.documentElement
    html.classList.remove(dark ? 'light' : 'dark')
    html.classList.add(dark ? 'dark' : 'light')
  }, [])

  // 点击切换暗黑模式
  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode
    setIsDarkMode(newStatus)
    saveDarkModeToLocalStorage(newStatus)

    const html = document.documentElement
    html.classList.remove(newStatus ? 'light' : 'dark')
    html.classList.add(newStatus ? 'dark' : 'light')
  }

  // 对外暴露方法
  useImperativeHandle(cRef, () => ({
    handleChangeDarkMode
  }))

  return (
    <div
      onClick={handleChangeDarkMode}
      className={`${className || ''} cursor-pointer hover:scale-100 hover:bg-black hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all`}
    >
      <div id="darkModeButton" className="w-6 h-6">
        {isDarkMode ? <Sun /> : <Moon />}
      </div>
    </div>
  )
}

export default DarkModeButton

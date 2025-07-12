import { useEffect, useState } from 'react'
import { Moon, Sun } from '@/components/HeroIcons'

const DarkModeButton = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 初始化从 localStorage 读取
  useEffect(() => {
    const dark = localStorage.getItem('dark-mode') === 'true'
    setIsDarkMode(dark)
    document.documentElement.classList.add(dark ? 'dark' : 'light')
  }, [])

  const handleToggleDarkMode = () => {
    const newStatus = !isDarkMode
    setIsDarkMode(newStatus)
    localStorage.setItem('dark-mode', newStatus)

    const html = document.documentElement
    html.classList.remove(newStatus ? 'light' : 'dark')
    html.classList.add(newStatus ? 'dark' : 'light')
  }

  return (
    <div
      onClick={handleToggleDarkMode}
      className={`${className || ''} cursor-pointer hover:scale-100 hover:bg-black hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all`}
    >
      <div id="darkModeButton" className="w-6 h-6">
        {isDarkMode ? <Sun /> : <Moon />}
      </div>
    </div>
  )
}

export default DarkModeButton

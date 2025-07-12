'use client'

import {
  generateLocaleDict,
  initLocale,
  saveLangToLocalStorage
} from './lang'
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
// import { useRouter } from 'next/router' // ❌ 未使用，已删除
import {
  initDarkMode,
  saveDarkModeToLocalStorage
} from '@/themes/theme'
import { APPEARANCE, LANG as DEFAULT_LANG, THEME } from 'blog.config'

const GlobalContext = createContext()

/**
 * 全局上下文 Provider
 */
export function GlobalContextProvider(props) {
  const {
    post,
    children,
    siteInfo,
    categoryOptions,
    tagOptions
  } = props

  // 初始化语言、主题、深色模式
  const [lang, setLang] = useState(DEFAULT_LANG)
  const [locale, setLocale] = useState(generateLocaleDict(DEFAULT_LANG))
  const [theme, setTheme] = useState(THEME)
  const [isDarkMode, setDarkMode] = useState(APPEARANCE === 'dark')

  // const router = useRouter() // ❌ 未使用，删掉避免 ESLint 报错

  const fullWidth = post?.fullWidth ?? false

  /**
   * 切换深色模式
   */
  const toggleDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToLocalStorage(newStatus)
    setDarkMode(newStatus)
    const html = document.documentElement
    html.classList.remove(newStatus ? 'light' : 'dark')
    html.classList.add(newStatus ? 'dark' : 'light')
  }

  /**
   * 切换语言
   */
  const changeLang = (newLang) => {
    if (newLang) {
      saveLangToLocalStorage(newLang)
      setLang(newLang)
      setLocale(generateLocaleDict(newLang))
    }
  }

  /**
   * 初始化深色模式和语言
   */
  useEffect(() => {
    initDarkMode(setDarkMode)
    initLocale(lang, locale, setLang, setLocale)
  }, []) // ✅ 空依赖表示仅在组件挂载时执行一次

  return (
    <GlobalContext.Provider
      value={{
        fullWidth,
        toggleDarkMode,
        lang,
        changeLang,
        locale,
        setLocale,
        isDarkMode,
        setDarkMode,
        theme,
        setTheme,
        siteInfo,
        categoryOptions,
        tagOptions
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)

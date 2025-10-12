<<<<<<< HEAD
import { generateLocaleDict, initLocale, saveLangToLocalStorage } from './lang'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { THEMES, initDarkMode, saveDarkModeToLocalStorage } from '@/themes/theme'
import { APPEARANCE, LANG, THEME } from 'blog.config'
const GlobalContext = createContext()

/**
 * 定义全局变量，包括语言、主题、深色模式、加载状态
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function GlobalContextProvider(props) {
  const { post, children, siteInfo, categoryOptions, tagOptions, NOTION_CONFIG } = props
  const [lang, updateLang] = useState(NOTION_CONFIG?.LANG || LANG) // 默认语言
  const [locale, updateLocale] = useState(generateLocaleDict(NOTION_CONFIG?.LANG || LANG)) // 默认语言
  const [theme, setTheme] = useState(NOTION_CONFIG?.THEME || THEME) // 默认博客主题
  const [isDarkMode, updateDarkMode] = useState(NOTION_CONFIG?.APPEARANCE || APPEARANCE === 'dark') // 默认深色模式
  const [onLoading, setOnLoading] = useState(false) // 抓取文章数据
  const router = useRouter()

=======
import { APPEARANCE, LANG, NOTION_PAGE_ID, THEME } from '@/blog.config'
import {
  THEMES,
  getThemeConfig,
  initDarkMode,
  saveDarkModeToLocalStorage
} from '@/themes/theme'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { generateLocaleDict, initLocale, redirectUserLang } from './lang'

/**
 * 全局上下文
 */
const GlobalContext = createContext()

export function GlobalContextProvider(props) {
  const {
    post,
    children,
    siteInfo,
    categoryOptions,
    tagOptions,
    NOTION_CONFIG
  } = props

  const [lang, updateLang] = useState(NOTION_CONFIG?.LANG || LANG) // 默认语言
  const [locale, updateLocale] = useState(
    generateLocaleDict(NOTION_CONFIG?.LANG || LANG)
  ) // 默认语言
  const [theme, setTheme] = useState(NOTION_CONFIG?.THEME || THEME) // 默认博客主题
  const [THEME_CONFIG, SET_THEME_CONFIG] = useState(null) // 主题配置
  const [isLiteMode,setLiteMode] = useState(false)

  const defaultDarkMode = NOTION_CONFIG?.APPEARANCE || APPEARANCE
  const [isDarkMode, updateDarkMode] = useState(defaultDarkMode === 'dark') // 默认深色模式
  const [onLoading, setOnLoading] = useState(false) // 抓取文章数据
  const router = useRouter()

  // 登录验证相关
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const { isLoaded, isSignedIn, user } = enableClerk
    ? /* eslint-disable-next-line react-hooks/rules-of-hooks */
      useUser()
    : { isLoaded: true, isSignedIn: false, user: false }

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  // 是否全屏
  const fullWidth = post?.fullWidth ?? false

  // 切换主题
  function switchTheme() {
    const query = router.query
    const currentTheme = query.theme || theme
    const currentIndex = THEMES.indexOf(currentTheme)
    const newIndex = currentIndex < THEMES.length - 1 ? currentIndex + 1 : 0
    const newTheme = THEMES[newIndex]
    query.theme = newTheme
    router.push({ pathname: router.pathname, query })
    return newTheme
  }

<<<<<<< HEAD
=======
  // 抓取主题配置
  const updateThemeConfig = async theme => {
    const config = await getThemeConfig(theme)
    SET_THEME_CONFIG(config)
  }

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  // 切换深色模式
  const toggleDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToLocalStorage(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

<<<<<<< HEAD
  /**
   * 更新语言
   */
  function changeLang(lang) {
    if (lang) {
      saveLangToLocalStorage(lang)
=======
  function changeLang(lang) {
    if (lang) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      updateLang(lang)
      updateLocale(generateLocaleDict(lang))
    }
  }

<<<<<<< HEAD
  useEffect(() => {
    initDarkMode(updateDarkMode)
    initLocale(lang, locale, updateLang, updateLocale)
  }, [])

  // 加载进度条
  useEffect(() => {
    const handleStart = (url) => {
      const { theme } = router.query
      if (theme && !url.includes(`theme=${theme}`)) {
        const newUrl = `${url}${url.includes('?') ? '&' : '?'}theme=${theme}`
        router.push(newUrl)
      }
      setOnLoading(true)
    }
    const handleStop = () => {
      setOnLoading(false)
    }

=======
  // 添加路由变化时的语言处理
  useEffect(() => {
    initLocale(router.locale, changeLang, updateLocale)
    // 处理极简模式
    if (router.query.lite && router.query.lite==='true') {
      setLiteMode(true)
    }
}, [router])


  // 首次加载成功
  useEffect(() => {
    initDarkMode(updateDarkMode, defaultDarkMode)
    // 处理多语言自动重定向
    if (
      NOTION_CONFIG?.REDIRECT_LANG &&
      JSON.parse(NOTION_CONFIG?.REDIRECT_LANG)
    ) {
      redirectUserLang(NOTION_PAGE_ID)
    }
    setOnLoading(false)
  }, [])

  useEffect(() => {
    const handleStart = url => {
      const themeValue = router.query.theme
      const themeStr = Array.isArray(themeValue) ? themeValue[0] : themeValue

      if (themeStr && !url.includes(`theme=${themeStr}`)) {
        const newUrl = `${url}${url.includes('?') ? '&' : '?'}theme=${themeStr}`
        router.push(newUrl)
      }

      if (!onLoading) {
        setOnLoading(true)
      }
    }

    const handleStop = () => {
      if (onLoading) {
        setOnLoading(false)
      }
    }

    const currentTheme = router?.query?.theme || theme
    updateThemeConfig(currentTheme)

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeError', handleStop)
    router.events.on('routeChangeComplete', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
<<<<<<< HEAD
  }, [router])

  return (
        <GlobalContext.Provider value={{
          fullWidth,
          NOTION_CONFIG,
          toggleDarkMode,
          onLoading,
          setOnLoading,
          lang,
          changeLang,
          locale,
          updateLocale,
          isDarkMode,
          updateDarkMode,
          theme,
          setTheme,
          switchTheme,
          siteInfo,
          categoryOptions,
          tagOptions
        }}>
            {children}
        </GlobalContext.Provider>
=======
  }, [router, onLoading])

  return (
    <GlobalContext.Provider
      value={{
        isLiteMode,
        isLoaded,
        isSignedIn,
        user,
        fullWidth,
        NOTION_CONFIG,
        THEME_CONFIG,
        toggleDarkMode,
        onLoading,
        setOnLoading,
        lang,
        changeLang,
        locale,
        updateLocale,
        isDarkMode,
        updateDarkMode,
        theme,
        setTheme,
        switchTheme,
        siteInfo,
        categoryOptions,
        tagOptions
      }}>
      {children}
    </GlobalContext.Provider>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  )
}

export const useGlobal = () => useContext(GlobalContext)

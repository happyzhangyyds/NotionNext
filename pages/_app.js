<<<<<<< HEAD
import '@/styles/animate.css' // @see https://animate.style/
import '@/styles/globals.css'
import '@/styles/nprogress.css'
import '@/styles/utility-patterns.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import '@/styles/notion.css' //  重写部分样式
import 'aos/dist/aos.css' // You can also use <link> for styles

import { GlobalContextProvider } from '@/lib/global'
import { getGlobalLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'
import useAdjustStyle from '@/hooks/useAdjustStyle'

// 各种扩展插件 这个要阻塞引入
import ExternalPlugins from '@/components/ExternalPlugins'
import GlobalHead from '@/components/GlobalHead'
import BLOG from '@/blog.config'
=======
// import '@/styles/animate.css' // @see https://animate.style/
import '@/styles/globals.css'
import '@/styles/utility-patterns.css'

// core styles shared by all of react-notion-x (required)
import '@/styles/notion.css' //  重写部分notion样式
import 'react-notion-x/src/styles.css' // 原版的react-notion-x

import useAdjustStyle from '@/hooks/useAdjustStyle'
import { GlobalContextProvider } from '@/lib/global'
import { getBaseLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'

// 各种扩展插件 这个要阻塞引入
import BLOG from '@/blog.config'
import ExternalPlugins from '@/components/ExternalPlugins'
import SEO from '@/components/SEO'
import { zhCN } from '@clerk/localizations'
import dynamic from 'next/dynamic'
// import { ClerkProvider } from '@clerk/nextjs'
const ClerkProvider = dynamic(() =>
  import('@clerk/nextjs').then(m => m.ClerkProvider)
)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * App挂载DOM 入口文件
 * @param {*} param0
 * @returns
 */
const MyApp = ({ Component, pageProps }) => {
  // 一些可能出现 bug 的样式，可以统一放入该钩子进行调整
<<<<<<< HEAD
  useAdjustStyle();

  const route = useRouter()
  const queryParam = useMemo(() => {
    return getQueryParam(route.asPath, 'theme') || pageProps?.NOTION_CONFIG?.THEME || BLOG.THEME
=======
  useAdjustStyle()

  const route = useRouter()
  const theme = useMemo(() => {
    return (
      getQueryParam(route.asPath, 'theme') ||
      pageProps?.NOTION_CONFIG?.THEME ||
      BLOG.THEME
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }, [route])

  // 整体布局
  const GLayout = useCallback(
    props => {
<<<<<<< HEAD
      // 根据页面路径加载不同Layout文件
      const Layout = getGlobalLayoutByTheme(queryParam)
      return <Layout {...props} />
    },
    [queryParam]
  )

  return (
    <GlobalContextProvider {...pageProps}>
      <GLayout {...pageProps}>
        <GlobalHead {...pageProps}/>
=======
      const Layout = getBaseLayoutByTheme(theme)
      return <Layout {...props} />
    },
    [theme]
  )

  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const content = (
    <GlobalContextProvider {...pageProps}>
      <GLayout {...pageProps}>
        <SEO {...pageProps} />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        <Component {...pageProps} />
      </GLayout>
      <ExternalPlugins {...pageProps} />
    </GlobalContextProvider>
  )
<<<<<<< HEAD
=======
  return (
    <>
      {enableClerk ? (
        <ClerkProvider localization={zhCN}>{content}</ClerkProvider>
      ) : (
        content
      )}
    </>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

export default MyApp

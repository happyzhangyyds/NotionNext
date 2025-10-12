import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * Artalk 自托管评论系统 @see https://artalk.js.org/
 * @returns {JSX.Element}
 * @constructor
 */

const Artalk = ({ siteInfo }) => {
  const artalkCss = siteConfig('COMMENT_ARTALK_CSS')
  const artalkServer = siteConfig('COMMENT_ARTALK_SERVER')
  const artalkLocale = siteConfig('LANG')
  const site = siteConfig('TITLE')

  useEffect(() => {
    initArtalk()
  }, [])

  const initArtalk = async () => {
    await loadExternalResource(artalkCss, 'css')
<<<<<<< HEAD
    window?.Artalk?.init({
      server: artalkServer, // 后端地址
      el: '#artalk', // 容器元素
      locale: artalkLocale,
      //   pageKey: '/post/1', // 固定链接 (留空自动获取)
      //   pageTitle: '关于引入 Artalk 的这档子事', // 页面标题 (留空自动获取)
      site: site // 你的站点名
    })
  }
  return (
        <div id="artalk"></div>
  )
=======
    const artalk = window?.Artalk?.init({
      server: artalkServer,
      el: '#artalk',
      locale: artalkLocale,
      site: site,
      darkMode: document.documentElement.classList.contains('dark')
    })

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          artalk?.setDarkMode(isDark)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }

  return <div id="artalk"></div>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

export default Artalk

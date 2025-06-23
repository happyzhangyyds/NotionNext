import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'
import { GlobalStyle } from './GlobalStyle'

import { CUSTOM_EXTERNAL_CSS, CUSTOM_EXTERNAL_JS, IMG_SHADOW } from '@/blog.config'
import { isBrowser, loadExternalResource } from '@/lib/utils'

const TwikooCommentCounter = dynamic(() => import('@/components/TwikooCommentCounter'), { ssr: false })
const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), { ssr: false })
const AosAnimation = dynamic(() => import('@/components/AOSAnimation'), { ssr: false })
const ThemeSwitch = dynamic(() => import('@/components/ThemeSwitch'), { ssr: false })

const ExternalPlugin = (props) => {
  const DISABLE_PLUGIN = siteConfig('DISABLE_PLUGIN')
  const THEME_SWITCH = siteConfig('THEME_SWITCH')
  const COMMENT_TWIKOO_COUNT_ENABLE = siteConfig('COMMENT_TWIKOO_COUNT_ENABLE')

  // 加载自定义资源
  if (isBrowser) {
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    if (IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    if (CUSTOM_EXTERNAL_JS?.length > 0) {
      for (const url of CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    if (CUSTOM_EXTERNAL_CSS?.length > 0) {
      for (const url of CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }

  if (DISABLE_PLUGIN) return null

  return <>
    <GlobalStyle />
    {THEME_SWITCH && <ThemeSwitch />}
    {COMMENT_TWIKOO_COUNT_ENABLE && <TwikooCommentCounter {...props} />}
    <LoadingProgress />
    <AosAnimation />
  </>
}

export default ExternalPlugin

import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'
import 'animate.css'
import '@/styles/notion.css'
import '@/styles/globals.css'
import BLOG from 'blog.config'
import dynamic from 'next/dynamic'
import { GlobalContextProvider } from '@/lib/global'
// 解决React-FontAwesome图标问题
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalContextProvider>
        {BLOG.isProd && BLOG?.analytics?.provider === 'ackee' && (
          <Ackee
            ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
            ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
          />
        )}
        {BLOG.isProd && BLOG?.analytics?.provider === 'ga' && <Gtag />}
        <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp

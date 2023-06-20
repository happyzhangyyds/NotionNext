import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function GoogleAdsense() {
  const initGoogleAdsense = () => {
    const ads = document.getElementsByClassName('adsbygoogle').length
    const newAdsCount = ads
    if (newAdsCount > 0) {
      for (let i = 0; i <= newAdsCount; i++) {
        try {
          // eslint-disable-next-line no-undef
          (adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {

        }
      }
    }
  }

  const router = useRouter()
  useEffect(() => {
    initGoogleAdsense()
    router.events.on('routeChangeComplete', initGoogleAdsense)
    return () => {
      router.events.off('routeChangeComplete', initGoogleAdsense)
    }
  }, [router.events])
  return null
}

/**
 * 文章内嵌广告单元
 * 请在GoogleAdsense后台配置创建对应广告，并且获取相应代码
 * 修改下面广告单元中的 data-ad-slot data-ad-format data-ad-layout-key(如果有)
 */
const AdSlot = ({ type = 'show' }) => {
  if (!BLOG.ADSENSE_GOOGLE_ID) {
    return null
  }
  // 文章内嵌广告
  if (type === 'in-article') {
    return <ins className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
            data-ad-slot="3806269138" data-adtest="on"></ins>
  }

  //   信息流广告
  if (type === 'flow') {
    return <ins className="adsbygoogle"
            data-ad-format="fluid"
            data-ad-layout-key="-5j+cz+30-f7+bf"
            style={{ display: 'block' }}
            data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
            data-ad-slot="1510444138" data-adtest="on"></ins>
  }

  // 原生广告
  if (type === 'native') {
    return <ins className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-format="autorelaxed"
            data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
            data-ad-slot="4980048999" data-adtest="on"></ins>
  }

  //  展示广告
  return <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
        data-ad-slot="8807314373"
        data-ad-format="auto"
        data-full-width-responsive="true" data-adtest="on"></ins>
}

export { AdSlot }

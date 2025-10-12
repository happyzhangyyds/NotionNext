<<<<<<< HEAD
import busuanzi from '@/lib/busuanzi'
=======
import busuanzi from '@/lib/plugins/busuanzi'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
// import { useRouter } from 'next/router'
import { useEffect } from 'react'

let path = ''

export default function Busuanzi () {
  const { theme } = useGlobal()
  const router = useRouter()
  router.events.on('routeChangeComplete', (url, option) => {
    if (url !== path) {
      path = url
      busuanzi.fetch()
    }
  })

  // 更换主题时更新
  useEffect(() => {
    if (theme) {
      busuanzi.fetch()
    }
  }, [theme])
  return null
}

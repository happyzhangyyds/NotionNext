/* eslint-disable react/no-unknown-property */

import { siteConfig } from '@/lib/config'

/**
 * 这里的css样式对全局生效
 * 主题客制化css
 * @returns
 */
const GlobalStyle = () => {
  // 从NotionConfig中读取样式
  const GLOBAL_CSS = siteConfig('GLOBAL_CSS')
<<<<<<< HEAD
=======
  // 如果这个字符串不为空，则打印显示
  if (GLOBAL_CSS && GLOBAL_CSS.trim() !== '') {
    console.log('Inject CSS:', GLOBAL_CSS);
  }
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  return (<style jsx global>{`

    ${GLOBAL_CSS}

  `}</style>)
}

export { GlobalStyle }

'use client'

import { isBrowser } from '@/lib/utils'

/**
 * 自定义外部 script
 * 传入参数将转为 <script>标签。
 * @returns
 */
<<<<<<< HEAD
const ExternalScript = (props) => {
=======
const ExternalScript = props => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const { src } = props
  if (!isBrowser || !src) {
    return null
  }

  const element = document.querySelector(`script[src="${src}"]`)
  if (element) {
    return null
  }
  const script = document.createElement('script')
  Object.entries(props).forEach(([key, value]) => {
    script.setAttribute(key, value)
  })
  document.head.appendChild(script)
<<<<<<< HEAD
  console.log('加载外部脚本', props, script)
=======
  // console.log('加载外部脚本', props, script)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  return null
}

export default ExternalScript

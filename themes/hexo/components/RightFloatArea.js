<<<<<<< HEAD
import throttle from 'lodash.throttle'
import { useCallback, useEffect, useState } from 'react'
import FloatDarkModeButton from './FloatDarkModeButton'
import JumpToTopButton from './JumpToTopButton'

/**
 * 悬浮在右下角的按钮，当页面向下滚动100px时会出现
=======
import { useCallback, useEffect, useState } from 'react'
import ButtonDarkModeFloat from './ButtonFloatDarkMode'
import ButtonJumpToTop from './ButtonJumpToTop'

/**
 * 悬浮在右下角的按钮，当页面向下滚动100px时会出现
 * 当页面回到顶部时会隐藏
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
 * @param {*} param0
 * @returns
 */
export default function RightFloatArea({ floatSlot }) {
  const [showFloatButton, switchShow] = useState(false)
<<<<<<< HEAD
  const scrollListener = useCallback(throttle(() => {
    const targetRef = document.getElementById('wrapper')
    const clientHeight = targetRef?.clientHeight
    const scrollY = window.pageYOffset
    const fullHeight = clientHeight - window.outerHeight
    let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
    if (per > 100) per = 100
=======

  const scrollListener = useCallback(() => {
    const targetRef =
      document.getElementById('wrapper') || document.documentElement
    const clientHeight = targetRef?.clientHeight || 0
    const scrollY =
      window.pageYOffset || document.documentElement.scrollTop || 0
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || 0

    const fullHeight = Math.max(1, clientHeight - viewportHeight)

    let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))

    // 完整的边界处理
    if (isNaN(per) || per < 0) per = 0
    if (per > 100) per = 100

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    const shouldShow = scrollY > 100 && per > 0

    // 右下角显示悬浮按钮
    if (shouldShow !== showFloatButton) {
      switchShow(shouldShow)
    }
<<<<<<< HEAD
  }, 200))

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
        <div className={(showFloatButton ? 'opacity-100 ' : 'invisible opacity-0') + '  duration-300 transition-all bottom-12 right-1 fixed justify-end z-20  text-white bg-indigo-500 dark:bg-hexo-black-gray rounded-sm'}>
                <div className={'justify-center  flex flex-col items-center cursor-pointer'}>
                    <FloatDarkModeButton />
                    {floatSlot}
                    <JumpToTopButton />
                </div>
            </div>
=======
  }, [showFloatButton])

  useEffect(() => {
    const throttledScroll = () => {
      window.requestAnimationFrame(() => {
        scrollListener()
      })
    }

    window.addEventListener('scroll', throttledScroll)

    // 初始调用一次检查初始状态
    scrollListener()

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [scrollListener])

  return (
    <div
      className={
        (showFloatButton ? 'opacity-100 ' : 'invisible opacity-0') +
        '  duration-300 transition-all bottom-12 right-1 fixed justify-end z-20  text-white bg-indigo-500 dark:bg-hexo-black-gray rounded-sm'
      }>
      <div
        className={'justify-center flex flex-col items-center cursor-pointer'}>
        <ButtonDarkModeFloat />
        {floatSlot}
        <ButtonJumpToTop />
      </div>
    </div>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  )
}

import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Typed from 'typed.js'

/**
 *
 * @returns 头图
 */
export default function Header () {
  const [typed, changeType] = useState()
  useEffect(() => {
    if (!typed && window && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: BLOG.headerStrings,
          typeSpeed: 200,
          backSpeed: 100,
          backDelay: 400,
          showCursor: true,
          smartBackspace: true
        })
      )
    }
  })
  const { theme } = useGlobal()
  // 监听滚动
  let windowTop = 0
  let autoScroll = false

  const autoScrollEnd = () => {
    if (autoScroll) {
      console.log('结束自动滚动')
      windowTop = window.scrollY
      autoScroll = false
    }
  }

  const scrollTrigger = () => {
    if (
      (window.scrollY > windowTop) &
      (window.scrollY < window.innerHeight) &
      !autoScroll
    ) {
      console.log('自动滚下', window.scrollY, windowTop)
      autoScroll = true
      window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
      setTimeout(autoScrollEnd, 500)
    }
    if (
      (window.scrollY < windowTop) &
      (window.scrollY < window.innerHeight) &
      !autoScroll
    ) {
      console.log('自动滚上')
      autoScroll = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(autoScrollEnd, 500)
    }
    windowTop = window.scrollY

    updateTopNav()
  }

  const updateTopNav = () => {
    if (theme !== 'dark') {
      const stickyNavElement = document.getElementById('sticky-nav')
      if (window.scrollY < window.innerHeight) {
        stickyNavElement.classList.add('dark')
      } else {
        stickyNavElement.classList.remove('dark')
      }
    }
  }

  let wrapperTop = 0
  function updateHeaderHeight () {
    if (window) {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement.offsetTop
    }
  }

  useEffect(() => {
    updateHeaderHeight()
    updateTopNav()
    window.addEventListener('scroll', scrollTrigger)
    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  return (
    <header
      id="header"
      className="duration-500 w-full bg-cover bg-center lg:-mt-14 bg-black"
      style={{
        height: 'calc(100vh + 1px)',
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.2), rgba(0, 0, 0, 0.8) ),url("${BLOG.bannerImage}")`
      }}
    >
      <div className="absolute flex h-full items-center lg:-mt-14 justify-center w-full text-4xl md:text-7xl text-white">
        <div id='typed' className='flex text-center font-serif'/>
      </div>
      <div
        onClick={() => {
          window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
        }}
        className="cursor-pointer w-full text-center py-4 text-5xl animate-bounce absolute bottom-10 text-white"
      >
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </header>
  )
}

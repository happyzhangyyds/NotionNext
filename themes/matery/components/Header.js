// import Image from 'next/image'
import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import CONFIG_MATERY from '../config_matery'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'

let wrapperTop = 0

/**
 *
 * @returns 头图
 */
const Header = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()

  useEffect(() => {
    updateHeaderHeight()
    if (!typed && window && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: BLOG.GREETING_WORDS.split(','),
          typeSpeed: 200,
          backSpeed: 100,
          backDelay: 400,
          showCursor: true,
          smartBackspace: true
        })
      )
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
        <header
            id="header" style={{ zIndex: 1 }}
            className=" w-full h-screen relative bg-black"
        >

            <div className="text-white absolute flex flex-col h-full items-center justify-center w-full ">
                <div className='text-4xl md:text-5xl shadow-text'>{siteInfo?.title}</div>
                <div className='mt-2 h-12 items-center text-center shadow-text text-white text-lg'>
                    <span id='typed' />
                </div>
                <div onClick={() => { window.scrollTo({ top: wrapperTop, behavior: 'smooth' }) }}
                    className="mt-12 border cursor-pointer w-40 text-center pt-4 pb-3 text-md text-white hover:bg-orange-600 duration-300 rounded-3xl z-40">
                    <i className='animate-bounce fas fa-angle-double-down' /> <span>{locale.COMMON.START_READING}</span>
                </div>
            </div>

            <div id='header-cover' style={{ backgroundImage: `url('${siteInfo.pageCover}')` }}
                className={`header-cover bg-center w-full h-screen bg-cover ${CONFIG_MATERY.HOME_NAV_BACKGROUND_IMG_FIXED ? 'bg-fixed' : ''}`}/>

        </header>
  )
}

export default Header

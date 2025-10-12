/* eslint-disable no-undef */
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isMobile, loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  const { theme, switchTheme } = useGlobal()
  const showPet = JSON.parse(siteConfig('WIDGET_PET'))
  const petLink = siteConfig('WIDGET_PET_LINK')
<<<<<<< HEAD
=======
  const petSwitchTheme = siteConfig('WIDGET_PET_SWITCH_THEME')
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  useEffect(() => {
    if (showPet && !isMobile()) {
      Promise.all([
<<<<<<< HEAD
        loadExternalResource('https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js', 'js')
      ]).then((e) => {
=======
        loadExternalResource(
          'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js',
          'js'
        )
      ]).then(e => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        if (typeof window?.loadlive2d !== 'undefined') {
          // https://github.com/xiazeyu/live2d-widget-models
          try {
            loadlive2d('live2d', petLink)
          } catch (error) {
            console.error('读取PET模型', error)
          }
        }
      })
    }
  }, [theme])

  function handleClick() {
<<<<<<< HEAD
    if (JSON.parse(siteConfig('WIDGET_PET_SWITCH_THEME'))) {
=======
    if (petSwitchTheme) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      switchTheme()
    }
  }

  if (!showPet) {
    return <></>
  }

<<<<<<< HEAD
  return <canvas id="live2d" width="280" height="250" onClick={handleClick}
        className="cursor-grab"
        onMouseDown={(e) => e.target.classList.add('cursor-grabbing')}
        onMouseUp={(e) => e.target.classList.remove('cursor-grabbing')}
    />
=======
  return (
    <canvas
      id='live2d'
      width='280'
      height='250'
      onClick={handleClick}
      className='cursor-grab'
      onMouseDown={e => e.target.classList.add('cursor-grabbing')}
      onMouseUp={e => e.target.classList.remove('cursor-grabbing')}
    />
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

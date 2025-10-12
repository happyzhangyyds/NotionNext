import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

/**
 * 音乐播放器
 * @returns
 */
const Player = () => {
  const [player, setPlayer] = useState()
  const ref = useRef(null)
  const lrcType = JSON.parse(siteConfig('MUSIC_PLAYER_LRC_TYPE'))
  const playerVisible = JSON.parse(siteConfig('MUSIC_PLAYER_VISIBLE'))
  const autoPlay = JSON.parse(siteConfig('MUSIC_PLAYER_AUTO_PLAY'))
  const meting = JSON.parse(siteConfig('MUSIC_PLAYER_METING'))
  const order = siteConfig('MUSIC_PLAYER_ORDER')
  const audio = siteConfig('MUSIC_PLAYER_AUDIO_LIST')

  const musicPlayerEnable = siteConfig('MUSIC_PLAYER')
  const musicPlayerCDN = siteConfig('MUSIC_PLAYER_CDN_URL')
  const musicMetingEnable = siteConfig('MUSIC_PLAYER_METING')
<<<<<<< HEAD
  const musicMetingCDNUrl = siteConfig('MUSIC_PLAYER_METING_CDN_URL', 'https://cdnjs.cloudflare.com/ajax/libs/meting/2.0.1/Meting.min.js')
=======
  const musicMetingCDNUrl = siteConfig(
    'MUSIC_PLAYER_METING_CDN_URL',
    'https://cdnjs.cloudflare.com/ajax/libs/meting/2.0.1/Meting.min.js'
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  const initMusicPlayer = async () => {
    if (!musicPlayerEnable) {
      return
    }
    try {
      await loadExternalResource(musicPlayerCDN, 'js')
    } catch (error) {
      console.error('音乐组件异常', error)
    }

    if (musicMetingEnable) {
      await loadExternalResource(musicMetingCDNUrl, 'js')
    }

    if (!meting && window.APlayer) {
<<<<<<< HEAD
      setPlayer(new window.APlayer({
        container: ref.current,
        fixed: true,
        lrcType: lrcType,
        autoplay: autoPlay,
        order: order,
        audio: audio
      }))
=======
      setPlayer(
        new window.APlayer({
          container: ref.current,
          fixed: true,
          lrcType: lrcType,
          autoplay: autoPlay,
          order: order,
          audio: audio
        })
      )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    }
  }

  useEffect(() => {
    initMusicPlayer()
    return () => {
      setPlayer(undefined)
    }
  }, [])

  return (
    <div className={playerVisible ? 'visible' : 'invisible'}>
      <link
<<<<<<< HEAD
        rel="stylesheet"
        type="text/css"
        href="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.css"
      />
      {meting
        ? <meting-js
            fixed="true"
            type="playlist"
            preload="auto"
            lrc-type={siteConfig('MUSIC_PLAYER_METING_LRC_TYPE')}
            autoplay={autoPlay}
            order={siteConfig('MUSIC_PLAYER_ORDER')}
            server={siteConfig('MUSIC_PLAYER_METING_SERVER')}
            id={siteConfig('MUSIC_PLAYER_METING_ID')}
          />
        : <div ref={ref} data-player={player} />
      }
=======
        rel='stylesheet'
        type='text/css'
        href='https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css'
      />
      {meting ? (
        <meting-js
          fixed='true'
          type='playlist'
          preload='auto'
          api={siteConfig(
            'MUSIC_PLAYER_METING_API',
            'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r'
          )}
          autoplay={autoPlay}
          order={siteConfig('MUSIC_PLAYER_ORDER')}
          server={siteConfig('MUSIC_PLAYER_METING_SERVER')}
          id={siteConfig('MUSIC_PLAYER_METING_ID')}
        />
      ) : (
        <div ref={ref} data-player={player} />
      )}
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    </div>
  )
}

export default Player

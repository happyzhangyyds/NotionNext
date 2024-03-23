import SocialButton from './SocialButton'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate = parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
        <footer
            className='relative z-10 flex-shrink-0 bg-white dark:bg-[#1a191d] justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm'
        >
            {/* 颜色过度区 */}
            <div id='color-transition' className='h-32 bg-gradient-to-b from-[#f7f9fe] to-white  dark:bg-[#1a191d] dark:from-inherit dark:to-inherit'>
            </div>
            {/* 社交按钮 */}
            <div className='w-full h-24'>
                <SocialButton />
            </div>
            <br />
            {/* 底部页面信息 */}
            <div id='footer-bottom' className='w-full h-20 flex flex-col p-1 lg:flex-row justify-between px-5 items-center bg-[#f1f3f7] dark:bg-[#30343f]'>
                <div id='footer-bottom-left'>
                   NotionNext {siteConfig('VERSION')} <i className='fas fa-copyright' /> {`${copyrightDate}`} <i className='mx-1 animate-pulse fas fa-heart text-pink-200' /> 
                   <a href={siteConfig('LINK')} style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300 '>{siteConfig('AUTHOR')}</a>
                   <a href='http://www.andawell.com' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>Andawell</a>
                   <a href='https://blog.tangly1024.com/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>Tangly</a>
                   <a href='https://blog.1874.cool/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>1874</a>
                   <a href='https://www.wys.me/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>王语双</a>
                   <a href='https://dusays.com/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>杜老师</a>
                   <a href='https://chenge.ink/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>尘歌</a>
                   <a href='https://shiyu.dev/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>时雨</a>
                   <a href='https://yayu.net/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>雅余</a>
                   <a href='https://veryjack.com/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>Jack</a>
                   <a href='https://www.hsuyeung.com' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>Hsu Yeung</a>
                   <a href='https://kuangyichen.com/' style={{ marginRight: '10px' }} className='underline font-bold  dark:text-gray-300'>易浅</a>
                </div>
                <div id='footer-bottom'>
                   {siteConfig('BEI_AN') && <><i className='fa-solid fa-train' /> <span className='mr-2'>{siteConfig('BEI_AN')}</span></>}
                </div>
          </div>
        </footer >
  )
}

export default Footer






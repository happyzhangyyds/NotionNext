import LogoBar from '@/themes/Medium/components/LogoBar'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 顶部导航栏 + 菜单
 * @param {} param0
 * @returns
 */
export default function TopNavBar (props) {
  const { className, customNav } = props
  const router = useRouter()

  return <div id='top-nav' className={'sticky top-0 lg:relative w-full z-50 ' + className}>
    <div className='flex w-full h-12 shadow bg-white px-5 items-between'>
      <LogoBar />

      {/* 顶部菜单 */}
      <div className='flex'>
        {customNav && customNav.map(link => {
          if (link.show) {
            const selected = (router.pathname === link.to) || (router.asPath === link.to)
            return <Link key={`${link.id}-${link.to}`} title={link.to} href={link.to} >
            <a className={'px-5 duration-300 text-base justify-between hover:text-green-600 hover:underline cursor-pointer flex flex-nowrap items-center ' +
                (selected ? 'bg-green-600 text-white' : ' ')} >
                <div className='items-center justify-center flex '>
                  <i className={link.icon} />
                  <div className='ml-4 whitespace-nowrap'>{link.name}</div>
                </div>
                {link.slot}
              </a>
            </Link>
          } else {
            return null
          }
        })}
      </div>
    </div>
  </div>
}

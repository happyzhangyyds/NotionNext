import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  //   const show = true
  //   const changeShow = () => {}
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = (router.pathname === link.to) || (router.asPath === link.to)

  return <li className='cursor-pointer list-none items-center flex mx-2' onMouseOver={() => changeShow(true)} onMouseOut={() => changeShow(false)} >

        {hasSubMenu &&
            <div className={'px-3 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
                (selected ? 'bg-orange-300 text-white hover:text-white' : 'hover:text-orange-400')}>
                <div>
                    {link?.icon && <i className={link?.icon} />} {link?.name}
                    {hasSubMenu && <i className={`px-2 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>}
                </div>
            </div>
        }

        {!hasSubMenu &&
            <div className={'px-3 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
                (selected ? 'bg-transparent text-orange-500 hover:text-orange-500' : 'hover:text-orange-400')}>
                    {/* bg-gray-500是调节选中的背景色的，比如友情链接 */}
                <Link href={link?.to}>
                    {link?.icon && <i className={link?.icon} />} {link?.name}
                </Link>
            </div>
        }

        {/* 子菜单 */}
        {hasSubMenu && <ul className={`${show ? 'visible opacity-100 top-12 ' : 'invisible opacity-0 top-10 '} border-gray-300  bg-orange-100  dark:bg-black dark:border-gray-800 transition-all duration-300 z-20 absolute block drop-shadow-lg `}>
            {link?.subMenus?.map(sLink => {
              return <li key={sLink.id} className='not:last-child:border-b-0 border-b text-white-500 dark:text-gray-300  hover:bg-orange-200 dark:hover:bg-gray-900 tracking-widest transition-all duration-200  dark:border-gray-800 py-3 pr-6 pl-3'>
                    {/* text-white-500是子菜单的字体颜色 */}
                    <Link href={sLink.to}>
                        <span className='text-xs font-extralight'>{link?.icon && <i className={sLink?.icon} > &nbsp; </i>}{sLink.title}</span>
                    </Link>
                </li>
            })}
        </ul>}

    </li>
}

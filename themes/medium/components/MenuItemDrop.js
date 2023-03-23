import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = (router.pathname === link.to) || (router.asPath === link.to)

  return <li className='cursor-pointer list-none items-center flex' onMouseOver={() => changeShow(true)} onMouseOut={() => changeShow(false)} >

        {hasSubMenu &&
            <div className={'h-full whitespace-nowrap px-2 duration-300 text-sm justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
            (selected ? 'bg-green-600 text-white hover:text-white' : 'hover:text-green-600')}>
                <div className='px-1'>
                    {link?.name}
                    {hasSubMenu && <i className='px-2 fa fa-angle-down'></i>}
                </div>
            </div>
        }

        {!hasSubMenu &&
           <div className={'h-full whitespace-nowrap px-2 duration-300 text-sm justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
           (selected ? 'bg-green-600 text-white hover:text-white' : 'hover:text-green-600')}>
               <Link href={link?.to} className='px-1'>
                   {link?.name}
               </Link>
           </div>
         }

        {/* 子菜单 */}
        {hasSubMenu && <ul className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} border-gray-100  bg-white  dark:bg-black dark:border-gray-800 transition-all duration-300 z-20 top-12 absolute block drop-shadow-lg `}>
            {link.subMenus.map(sLink => {
              return <li key={sLink.id} className='not:last-child:border-b-0 border-b text-gray-700 dark:text-gray-200  hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200  dark:border-gray-800 py-3 pr-6 pl-2'>
                    <Link href={sLink.to}>
                        <span className='text-xs font-extralight'>{sLink.title}</span>
                    </Link>
                </li>
            })}
        </ul>}

    </li>
}

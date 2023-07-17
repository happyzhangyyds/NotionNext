import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return <div onMouseOver={() => changeShow(true)} onMouseOut={() => changeShow(false)} >

        {/* 不含子菜单 */}
        {!hasSubMenu &&
            <Link
                href={link?.to}
                className="font-sans hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest">
                {link?.icon && <i className={link?.icon} />} {link?.name}
                {hasSubMenu && <i className='px-2 fa fa-angle-down'></i>}
            </Link>}

        {/* 含子菜单的按钮 */}
        {hasSubMenu && <>
            <div className='cursor-pointer font-sans hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest'>
                {link?.icon && <i className={link?.icon} />} {link?.name}
            </div>
        </>}

        {/* 子菜单 */}
        {hasSubMenu && <ul style={{ backdropFilter: 'blur(3px)' }} className={`${show ? 'visible opacity-100 top-12' : 'invisible opacity-0 top-20'} drop-shadow-md overflow-hidden rounded-md bg-white transition-all duration-300 z-20 absolute block  `}>
            {link.subMenus.map((sLink, index) => {
              return <li key={index} className='cursor-pointer hover:bg-indigo-300 text-gray-900 hover:text-black tracking-widest transition-all duration-200 dark:border-gray-700  py-1 pr-6 pl-3'>
                    <Link href={sLink.to}>
                        <span className='text-sm text-nowrap font-extralight'>{link?.icon && <i className={sLink?.icon} > &nbsp; </i>}{sLink.title}</span>
                    </Link>
                </li>
            })}
        </ul>}

    </div>
}

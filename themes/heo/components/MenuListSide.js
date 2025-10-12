<<<<<<< HEAD
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { MenuItemCollapse } from './MenuItemCollapse'
import CONFIG from '../config'

export const MenuListSide = (props) => {
=======
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'

export const MenuListSide = props => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  let links = [
<<<<<<< HEAD
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: siteConfig('HEO_MENU_ARCHIVE', null, CONFIG) },
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: siteConfig('HEO_MENU_SEARCH', null, CONFIG) },
    { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: siteConfig('HEO_MENU_CATEGORY', null, CONFIG) },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: siteConfig('HEO_MENU_TAG', null, CONFIG) }
=======
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('HEO_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('HEO_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('HEO_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('HEO_MENU_TAG', null, CONFIG)
    }
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  ]

  if (customNav) {
    links = customNav.concat(links)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
<<<<<<< HEAD
        <nav className='flex-col space-y-2'>
            {links?.map((link, index) => <MenuItemCollapse key={index} link={link} />)}
        </nav>
=======
    <nav className='flex-col space-y-1'>
      {links?.map((link, index) => (
        <MenuItemCollapse key={index} link={link} />
      ))}
    </nav>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  )
}

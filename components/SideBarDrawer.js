import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 侧边栏抽屉面板，可以从侧面拉出
 * @returns {JSX.Element}
 * @constructor
 */
<<<<<<< HEAD
const SideBarDrawer = ({ children, isOpen, onOpen, onClose, className }) => {
  const router = useRouter()
=======
const SideBarDrawer = ({
  children,
  isOpen,
  onOpen,
  onClose,
  className,
  showOnPC = false
}) => {
  const router = useRouter()

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  useEffect(() => {
    const sideBarDrawerRouteListener = () => {
      switchSideDrawerVisible(false)
    }
    router.events.on('routeChangeComplete', sideBarDrawerRouteListener)
    return () => {
      router.events.off('routeChangeComplete', sideBarDrawerRouteListener)
    }
  }, [router.events])

  // 点击按钮更改侧边抽屉状态
<<<<<<< HEAD
  const switchSideDrawerVisible = (showStatus) => {
=======
  const switchSideDrawerVisible = showStatus => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    if (showStatus) {
      onOpen && onOpen()
    } else {
      onClose && onClose()
    }
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
<<<<<<< HEAD
    const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')

    if (showStatus) {
      sideBarDrawer?.classList.replace('-ml-60', 'ml-0')
      sideBarDrawerBackground?.classList.replace('hidden', 'block')
    } else {
      sideBarDrawer?.classList.replace('ml-0', '-ml-60')
=======
    const sideBarDrawerBackground = window.document.getElementById(
      'sidebar-drawer-background'
    )

    if (showStatus) {
      sideBarDrawer?.classList.replace('translate-x-[-100%]', 'translate-x-0')
      sideBarDrawerBackground?.classList.replace('hidden', 'block')
    } else {
      sideBarDrawer?.classList.replace('translate-x-0', 'translate-x-[-100%]')
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      sideBarDrawerBackground?.classList.replace('block', 'hidden')
    }
  }

<<<<<<< HEAD
  return <div id='sidebar-wrapper' className={' block lg:hidden top-0 ' + className }>
    <div id="sidebar-drawer" className={`${isOpen ? 'ml-0 w-60 visible' : '-ml-60 max-w-side invisible'} bg-white dark:bg-gray-900 shadow-black shadow-lg flex flex-col duration-300 fixed h-full left-0 overflow-y-scroll scroll-hidden top-0 z-30`}>
      {children}
    </div>

    {/* 背景蒙版 */}
    <div id='sidebar-drawer-background' onClick={() => { switchSideDrawerVisible(false) }}
      className={`${isOpen ? 'block' : 'hidden'} animate__animated animate__fadeIn fixed top-0 duration-300 left-0 z-20 w-full h-full bg-black/70`}/>
  </div>
}
=======
  return (
    <div
      id='sidebar-wrapper'
      className={`block ${showOnPC ? '' : 'lg:hidden'} top-0`}>
      <div
        id='sidebar-drawer'
        className={`z-50 ${className} ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'} transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900 flex flex-col fixed h-full left-0 overflow-y-scroll top-0`}>
        {children}
      </div>

      {/* 背景蒙版 */}
      <div
        id='sidebar-drawer-background'
        onClick={() => switchSideDrawerVisible(false)}
        className={`${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 z-20 w-full h-full bg-black/70 transition-opacity duration-300`}
      />
    </div>
  )
}

>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
export default SideBarDrawer

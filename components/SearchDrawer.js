import { Router } from 'next/router'
import { useImperativeHandle, useRef } from 'react'
import SearchInput from './SearchInput'
const SearchDrawer = ({ cRef }) => {
  const searchDrawer = useRef()
  const searchInputRef = useRef()
  useImperativeHandle(cRef, () => {
    return {
      show: () => {
        searchDrawer?.current?.classList?.remove('hidden')
        searchInputRef?.current?.focus()
      }
    }
  })
  const hidden = () => {
    searchDrawer?.current?.classList?.add('hidden')
  }
  Router.events.on('routeChangeComplete', (...args) => {
    hidden()
  })
  return (
    <div id='search-drawer-wrapper' ref={searchDrawer} className='hidden'>
      <div className='flex absolute px-5 w-full h-full left-0 top-14 z-50 justify-center'>
          <div className='md:max-w-3xl w-full mx-auto animate__animated animate__faster animate__fadeIn'>
          <SearchInput cRef={searchInputRef} />
          </div>
      </div>

      {/* 背景蒙版 */}
      <div id='search-drawer-background' onClick={hidden} className='animate__animated animate__faster animate__fadeIn fixed glassmorphism top-0 left-0 z-30 w-full h-full' />
    </div>
  )
}

export default SearchDrawer

import { useGlobal } from '@/lib/global'
<<<<<<< HEAD
import { Moon, Sun } from './HeroIcons'
import { useImperativeHandle } from 'react'
=======
import { useImperativeHandle } from 'react'
import { Moon, Sun } from './HeroIcons'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 深色模式按钮
 */
<<<<<<< HEAD
const DarkModeButton = (props) => {
=======
const DarkModeButton = props => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const { cRef, className } = props
  const { isDarkMode, toggleDarkMode } = useGlobal()

  /**
   * 对外暴露方法
   */
  useImperativeHandle(cRef, () => {
    return {
      handleChangeDarkMode: () => {
        toggleDarkMode()
      }
    }
  })

<<<<<<< HEAD
  return <div onClick={toggleDarkMode} className={`${className || ''} flex justify-center dark:text-gray-200 text-gray-800`}>
        <div id='darkModeButton' className=' hover:scale-110 cursor-pointer transform duration-200 w-5 h-5'> {isDarkMode ? <Sun /> : <Moon />}</div>
    </div>
=======
  return (
    <div
      className={`${className || ''} flex justify-center dark:text-gray-200 text-gray-800`}>
      <div
        onClick={toggleDarkMode}
        id='darkModeButton'
        className=' hover:scale-110 cursor-pointer transform duration-200 w-5 h-5'>
        {' '}
        {isDarkMode ? <Sun /> : <Moon />}
      </div>
    </div>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}
export default DarkModeButton

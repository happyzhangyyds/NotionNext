import { useEffect, useImperativeHandle, useRef } from 'react'

/**
 * 折叠面板组件，支持水平折叠、垂直折叠
<<<<<<< HEAD
 * @param {type:['horizontal','vertical'],isOpen} props
 * @returns
 */
const Collapse = props => {
  const { collapseRef } = props
  const ref = useRef(null)
  const type = props.type || 'vertical'
=======
 * @param {type:['horizontal','vertical'], isOpen} props
 * @returns
 */
const Collapse = ({
  type = 'vertical',
  isOpen = false,
  children,
  onHeightChange,
  className,
  collapseRef
}) => {
  const ref = useRef(null)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  useImperativeHandle(collapseRef, () => {
    return {
      /**
       * 当子元素高度变化时，可调用此方法更新折叠组件的高度
       * @param {*} param0
       */
      updateCollapseHeight: ({ height, increase }) => {
<<<<<<< HEAD
        if (props.isOpen) {
=======
        if (isOpen) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          ref.current.style.height = ref.current.scrollHeight
          ref.current.style.height = 'auto'
        }
      }
    }
  })

  /**
<<<<<<< HEAD
     * 折叠
     * @param {*} element
     */
=======
   * 折叠
   * @param {*} element
   */
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const collapseSection = element => {
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth

    requestAnimationFrame(function () {
      switch (type) {
        case 'horizontal':
          element.style.width = sectionWidth + 'px'
          requestAnimationFrame(function () {
            element.style.width = 0 + 'px'
          })
          break
        case 'vertical':
          element.style.height = sectionHeight + 'px'
          requestAnimationFrame(function () {
            element.style.height = 0 + 'px'
          })
      }
    })
  }

  /**
<<<<<<< HEAD
     * 展开
     * @param {*} element
     */
=======
   * 展开
   * @param {*} element
   */
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const expandSection = element => {
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth
    let clearTime = 0
    switch (type) {
      case 'horizontal':
        element.style.width = sectionWidth + 'px'
        clearTime = setTimeout(() => {
          element.style.width = 'auto'
        }, 400)
        break
      case 'vertical':
        element.style.height = sectionHeight + 'px'
        clearTime = setTimeout(() => {
          element.style.height = 'auto'
        }, 400)
    }

    clearTimeout(clearTime)
  }

  useEffect(() => {
<<<<<<< HEAD
    if (props.isOpen) {
=======
    if (isOpen) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      expandSection(ref.current)
    } else {
      collapseSection(ref.current)
    }
    // 通知父组件高度变化
<<<<<<< HEAD
    props?.onHeightChange && props.onHeightChange({ height: ref.current.scrollHeight, increase: props.isOpen })
  }, [props.isOpen])

  return (
        <div ref={ref} style={type === 'vertical' ? { height: '0px', willChange: 'height' } : { width: '0px', willChange: 'width' }} className={`${props.className || ''} overflow-hidden duration-200 `}>
            {props.children}
        </div>
  )
}
Collapse.defaultProps = { isOpen: false }
=======
    onHeightChange &&
      onHeightChange({
        height: ref.current.scrollHeight,
        increase: isOpen
      })
  }, [isOpen])

  return (
    <div
      ref={ref}
      style={
        type === 'vertical'
          ? { height: '0px', willChange: 'height' }
          : { width: '0px', willChange: 'width' }
      }
      className={`${className || ''} overflow-hidden duration-300`}>
      {children}
    </div>
  )
}
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

export default Collapse

<<<<<<< HEAD
import { useRef, useEffect, useState } from 'react'
/**
 * 可拖拽组件
 */

export const Draggable = (props) => {
  const { children } = props
=======
import { useEffect, useRef, useState } from 'react'

/**
 * 可拖拽组件
 * @param {children} 渲染的子元素
 * @param {stick} 是否要吸附
 * @returns
 */
export const Draggable = ({ children, stick }) => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const draggableRef = useRef(null)
  const rafRef = useRef(null)
  const [moving, setMoving] = useState(false)
  let currentObj, offsetX, offsetY

  useEffect(() => {
    const draggableElements = document.getElementsByClassName('draggable')

<<<<<<< HEAD
    // 标准化鼠标事件对象
    function e(event) { // 定义事件对象标准化函数
      if (!event) { // 兼容IE浏览器
=======
    function e(event) {
      if (!event) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        event = window.event
        event.target = event.srcElement
        event.layerX = event.offsetX
        event.layerY = event.offsetY
      }
<<<<<<< HEAD
      // 移动端
=======
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      if (event.type === 'touchstart' || event.type === 'touchmove') {
        event.clientX = event.touches[0].clientX
        event.clientY = event.touches[0].clientY
      }
<<<<<<< HEAD

      event.mx = event.pageX || event.clientX + document.body.scrollLeft
      // 计算鼠标指针的x轴距离
      event.my = event.pageY || event.clientY + document.body.scrollTop
      // 计算鼠标指针的y轴距离

      return event // 返回标准化的事件对象
    }

    // 定义鼠标事件处理函数
    // document.pointerdown = start
    document.onmousedown = start
    document.ontouchstart = start

    function start (event) { // 按下鼠标时，初始化处理
      if (!draggableElements) return
      event = e(event)// 获取标准事件对象

      for (const drag of draggableElements) {
        // 判断鼠标点击的区域是否是拖拽框内
=======
      event.mx = event.pageX || event.clientX + document.body.scrollLeft
      event.my = event.pageY || event.clientY + document.body.scrollTop
      return event
    }

    document.onmousedown = start
    document.ontouchstart = start

    function start(event) {
      if (!draggableElements) return
      event = e(event)

      for (const drag of draggableElements) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        if (inDragBox(event, drag)) {
          currentObj = drag.firstElementChild
        }
      }
      if (currentObj) {
        if (event.type === 'touchstart') {
<<<<<<< HEAD
          event.preventDefault() // 阻止默认的滚动行为
          document.documentElement.style.overflow = 'hidden' // 防止页面一起滚动
=======
          event.preventDefault()
          document.documentElement.style.overflow = 'hidden'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        }

        setMoving(true)
        offsetX = event.mx - currentObj.offsetLeft
        offsetY = event.my - currentObj.offsetTop

<<<<<<< HEAD
        document.onmousemove = move// 注册鼠标移动事件处理函数
        document.ontouchmove = move
        document.onmouseup = stop// 注册松开鼠标事件处理函数
=======
        document.onmousemove = move
        document.ontouchmove = move
        document.onmouseup = stop
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        document.ontouchend = stop
      }
    }

<<<<<<< HEAD
    function move(event) { // 鼠标移动处理函数
=======
    function move(event) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      event = e(event)
      rafRef.current = requestAnimationFrame(() => updatePosition(event))
    }

<<<<<<< HEAD
    const stop = (event) => {
      event = e(event)
      document.documentElement.style.overflow = 'auto' // 恢复默认的滚动行为
      cancelAnimationFrame(rafRef.current)
      setMoving(false)
      currentObj = document.ontouchmove = document.ontouchend = document.onmousemove = document.onmouseup = null
    }

    const updatePosition = (event) => {
=======
    const stop = event => {
      event = e(event)
      document.documentElement.style.overflow = 'auto'
      cancelAnimationFrame(rafRef.current)
      setMoving(false)
      if (stick) {
        checkInWindow() // 吸附逻辑
      }
      currentObj =
        document.ontouchmove =
        document.ontouchend =
        document.onmousemove =
        document.onmouseup =
          null
    }

    const updatePosition = event => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      if (currentObj) {
        const left = event.mx - offsetX
        const top = event.my - offsetY
        currentObj.style.left = left + 'px'
        currentObj.style.top = top + 'px'
<<<<<<< HEAD
        checkInWindow()
      }
    }

    /**
     * 鼠标是否在可拖拽区域内
     * @param {*} event
     * @returns
     */
    function inDragBox(event, drag) {
      const { clientX, clientY } = event // 鼠标位置
      const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = drag.firstElementChild // 窗口位置
      const horizontal = clientX > offsetLeft && clientX < offsetLeft + offsetWidth
      const vertical = clientY > offsetTop && clientY < offsetTop + offsetHeight

      if (horizontal && vertical) {
        return true
      }

      return false
    }

    /**
     * 若超出窗口则吸附。
     */
    function checkInWindow() {
      // 检查是否悬浮在窗口内
      for (const drag of draggableElements) {
        // 判断鼠标点击的区域是否是拖拽框内
        const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = drag.firstElementChild
        const { clientHeight, clientWidth } = document.documentElement
        if (offsetTop < 0) {
          drag.firstElementChild.style.top = 0
        }
        if (offsetTop > (clientHeight - offsetHeight)) {
          drag.firstElementChild.style.top = clientHeight - offsetHeight + 'px'
        }
        if (offsetLeft < 0) {
          drag.firstElementChild.style.left = 0
        }
        if (offsetLeft > (clientWidth - offsetWidth)) {
=======
      }
    }

    function inDragBox(event, drag) {
      const { clientX, clientY } = event
      const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
        drag.firstElementChild
      const horizontal =
        clientX > offsetLeft && clientX < offsetLeft + offsetWidth
      const vertical = clientY > offsetTop && clientY < offsetTop + offsetHeight

      return horizontal && vertical
    }

    function checkInWindow() {
      for (const drag of draggableElements) {
        const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
          drag.firstElementChild
        const { clientHeight, clientWidth } = document.documentElement
        if (offsetTop < 0) {
          drag.firstElementChild.style.top = '0px'
        }
        if (offsetTop > clientHeight - offsetHeight) {
          drag.firstElementChild.style.top = clientHeight - offsetHeight + 'px'
        }
        if (offsetLeft < 0) {
          drag.firstElementChild.style.left = '0px'
        }
        if (offsetLeft > clientWidth - offsetWidth) {
          drag.firstElementChild.style.left = clientWidth - offsetWidth + 'px'
        }
        if (stick === 'left') {
          drag.firstElementChild.style.left = '0px'
        } else if (stick === 'right') {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          drag.firstElementChild.style.left = clientWidth - offsetWidth + 'px'
        }
      }
    }

    window.addEventListener('resize', checkInWindow)

    return () => {
<<<<<<< HEAD
      return () => {
        window.removeEventListener('resize', checkInWindow)
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return <div className={`draggable ${moving ? 'cursor-grabbing' : 'cursor-grab'} select-none`} ref={draggableRef}>
     {children}
  </div>
}

Draggable.defaultProps = { left: 0, top: 0 }
=======
      window.removeEventListener('resize', checkInWindow)
      cancelAnimationFrame(rafRef.current)
    }
  }, [stick])

  return (
    <div
      className={`draggable ${moving ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
      ref={draggableRef}>
      {children}
    </div>
  )
}
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

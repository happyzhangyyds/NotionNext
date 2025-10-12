<<<<<<< HEAD
import { useState, useImperativeHandle, useRef } from 'react'
import algoliasearch from 'algoliasearch'
import replaceSearchResult from '@/components/Mark'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash/throttle'
import { siteConfig } from '@/lib/config'
=======
import replaceSearchResult from '@/components/Mark'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import algoliasearch from 'algoliasearch'
import throttle from 'lodash/throttle'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import {
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const ShortCutActions = [
  {
    key: '↑ ↓',
    action: '选择'
  },
  {
    key: 'Enter',
    action: '跳转'
  },
  {
    key: 'Esc',
    action: '关闭'
  }
]
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

/**
 * 结合 Algolia 实现的弹出式搜索框
 * 打开方式 cRef.current.openSearch()
 * https://www.algolia.com/doc/api-reference/search-api-parameters/
 */
export default function AlgoliaSearchModal({ cRef }) {
  const [searchResults, setSearchResults] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  const [totalHit, setTotalHit] = useState(0)
  const [useTime, setUseTime] = useState(0)
<<<<<<< HEAD

  /**
     * 对外暴露方法
     */
=======
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const inputRef = useRef(null)
  const router = useRouter()

  /**
   * 快捷键设置
   */
  useHotkeys('ctrl+k', e => {
    e.preventDefault()
    setIsModalOpen(true)
  })
  // 修改快捷键的使用逻辑
  useHotkeys(
    'down',
    e => {
      if (isInputFocused) {
        // 只有在聚焦时才触发
        e.preventDefault()
        if (activeIndex < searchResults.length - 1) {
          setActiveIndex(activeIndex + 1)
        }
      }
    },
    { enableOnFormTags: true }
  )
  useHotkeys(
    'up',
    e => {
      if (isInputFocused) {
        e.preventDefault()
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
        }
      }
    },
    { enableOnFormTags: true }
  )
  useHotkeys(
    'esc',
    e => {
      if (isInputFocused) {
        e.preventDefault()
        setIsModalOpen(false)
      }
    },
    { enableOnFormTags: true }
  )
  useHotkeys(
    'enter',
    e => {
      if (isInputFocused && searchResults.length > 0) {
        onJumpSearchResult(index)
      }
    },
    { enableOnFormTags: true }
  )
  // 跳转Search结果
  const onJumpSearchResult = () => {
    if (searchResults.length > 0) {
      const searchResult = searchResults[activeIndex]
      window.location.href = `${siteConfig('SUB_PATH', '')}/${searchResult.slug || searchResult.objectID}`
    }
  }

  const resetSearch = () => {
    setActiveIndex(0)
    setKeyword('')
    setSearchResults([])
    setUseTime(0)
    setTotalPage(0)
    setTotalHit(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  /**
   * 页面路径变化后，自动关闭此modal
   */
  useEffect(() => {
    setIsModalOpen(false)
  }, [router])

  /**
   * 自动聚焦搜索框
   */
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      resetSearch()
    }
  }, [isModalOpen])

  /**
   * 对外暴露方法
   **/
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  useImperativeHandle(cRef, () => {
    return {
      openSearch: () => {
        setIsModalOpen(true)
      }
    }
  })

<<<<<<< HEAD
  const client = algoliasearch(siteConfig('ALGOLIA_APP_ID'), siteConfig('ALGOLIA_SEARCH_ONLY_APP_KEY'))
=======
  const client = algoliasearch(
    siteConfig('ALGOLIA_APP_ID'),
    siteConfig('ALGOLIA_SEARCH_ONLY_APP_KEY')
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const index = client.initIndex(siteConfig('ALGOLIA_INDEX'))

  /**
   * 搜索
   * @param {*} query
   */
  const handleSearch = async (query, page) => {
    setKeyword(query)
    setPage(page)
    setSearchResults([])
    setUseTime(0)
    setTotalPage(0)
    setTotalHit(0)
<<<<<<< HEAD
    if (!query || query === '') {
      return
    }

=======
    setActiveIndex(0)
    if (!query || query === '') {
      return
    }
    setIsLoading(true)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    try {
      const res = await index.search(query, { page, hitsPerPage: 10 })
      const { hits, nbHits, nbPages, processingTimeMS } = res
      setUseTime(processingTimeMS)
      setTotalPage(nbPages)
      setTotalHit(nbHits)
      setSearchResults(hits)
<<<<<<< HEAD

      const doms = document.getElementById('search-wrapper').getElementsByClassName('replace')
=======
      setIsLoading(false)
      const doms = document
        .getElementById('search-wrapper')
        .getElementsByClassName('replace')
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

      setTimeout(() => {
        replaceSearchResult({
          doms,
          search: query,
          target: {
            element: 'span',
<<<<<<< HEAD
            className: 'text-blue-600 border-b border-dashed'
=======
            className: 'font-bold border-b border-dashed'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          }
        })
      }, 200) // 延时高亮
    } catch (error) {
      console.error('Algolia search error:', error)
    }
  }

  // 定义节流函数，确保在用户停止输入一段时间后才会调用处理搜索的方法
<<<<<<< HEAD
  const throttledHandleInputChange = useRef(throttle((query) => {
    handleSearch(query, 0);
  }, 1000));

  // 用于存储搜索延迟的计时器
  const searchTimer = useRef(null);

  // 修改input的onChange事件处理函数
  const handleInputChange = (e) => {
    const query = e.target.value;

    // 如果已经有计时器在等待搜索，先清除之前的计时器
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
=======
  const throttledHandleInputChange = useRef(
    throttle((query, page = 0) => {
      handleSearch(query, page)
    }, 1000)
  )

  // 用于存储搜索延迟的计时器
  const searchTimer = useRef(null)

  // 修改input的onChange事件处理函数
  const handleInputChange = e => {
    const query = e.target.value

    // 如果已经有计时器在等待搜索，先清除之前的计时器
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    }

    // 设置新的计时器，在用户停止输入一段时间后触发搜索
    searchTimer.current = setTimeout(() => {
<<<<<<< HEAD
      throttledHandleInputChange.current(query);
    }, 800);
  };
=======
      throttledHandleInputChange.current(query)
    }, 800)
  }
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  /**
   * 切换页码
   * @param {*} page
   */
<<<<<<< HEAD
  const switchPage = (page) => {
=======
  const switchPage = page => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    throttledHandleInputChange.current(keyword, page)
  }

  /**
   * 关闭弹窗
   */
  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (!siteConfig('ALGOLIA_APP_ID')) {
    return <></>
  }
<<<<<<< HEAD

  return (
    <div
      id="search-wrapper"
      className={`${
        isModalOpen ? 'opacity-100' : 'invisible opacity-0 pointer-events-none'
      } z-30 fixed h-screen w-screen left-0 top-0 mt-12 flex items-start justify-center`}
    >
=======
  return (
    <div
      id='search-wrapper'
      className={`${
        isModalOpen ? 'opacity-100' : 'invisible opacity-0 pointer-events-none'
      } z-30 fixed h-screen w-screen left-0 top-0 sm:mt-[10vh] flex items-start justify-center mt-0`}>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      {/* 模态框 */}
      <div
        className={`${
          isModalOpen ? 'opacity-100' : 'invisible opacity-0 translate-y-10'
<<<<<<< HEAD
        } flex flex-col justify-between w-full min-h-[10rem] max-w-xl dark:bg-hexo-black-gray dark:border-gray-800 bg-white dark:bg- p-5 rounded-lg z-50 shadow border hover:border-blue-600 duration-300 transition-all `}
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl text-blue-600 font-bold">搜索</div>
          <div>
            <i
              className="text-gray-600 fa-solid fa-xmark p-1 cursor-pointer hover:text-blue-600"
              onClick={closeModal}
            ></i>
=======
        } max-h-[80vh] flex flex-col justify-between w-full min-h-[10rem] h-full md:h-fit max-w-xl dark:bg-hexo-black-gray dark:border-gray-800 bg-white dark:bg- p-5 rounded-lg z-50 shadow border hover:border-blue-600 duration-300 transition-all `}>
        <div className='flex justify-between items-center'>
          <div className='text-2xl text-blue-600 dark:text-yellow-600 font-bold'>
            搜索
          </div>
          <div>
            <i
              className='text-gray-600 fa-solid fa-xmark p-1 cursor-pointer hover:text-blue-600'
              onClick={closeModal}></i>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          </div>
        </div>

        <input
<<<<<<< HEAD
          type="text"
          placeholder="在这里输入搜索关键词..."
          onChange={e => handleInputChange(e)}
          className="text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-600 outline-blue-500 w-full px-4 my-2 py-1 mb-4 border rounded-md"
        />

        {/* 标签组 */}
        <div className="mb-4">
          <TagGroups />
        </div>

        <ul>
          {searchResults.map(result => (
            <li key={result.objectID} className="replace my-2">
              <a
                href={`${siteConfig('SUB_PATH', '')}/${result.slug}`}
                className="font-bold hover:text-blue-600 text-black dark:text-gray-200"
              >
=======
          type='text'
          placeholder='在这里输入搜索关键词...'
          onChange={e => handleInputChange(e)}
          onFocus={() => setIsInputFocused(true)} // 聚焦时
          onBlur={() => setIsInputFocused(false)} // 失去焦点时
          className='text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-600 outline-blue-500 w-full px-4 my-2 py-1 mb-4 border rounded-md'
          ref={inputRef}
        />

        {/* 标签组 */}
        <div className='mb-4'>
          <TagGroups />
        </div>
        {searchResults.length === 0 && keyword && !isLoading && (
          <div>
            <p className=' text-slate-600 text-center my-4 text-base'>
              {' '}
              无法找到相关结果
              <span className='font-semibold'>&quot;{keyword}&quot;</span>
            </p>
          </div>
        )}
        <ul className='flex-1 overflow-auto'>
          {searchResults.map((result, index) => (
            <li
              key={result.objectID}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => onJumpSearchResult(index)}
              className={`cursor-pointer replace my-2 p-2 duration-100 
              rounded-lg
              ${activeIndex === index ? 'bg-blue-600 dark:bg-yellow-600' : ''}`}>
              <a
                className={`${activeIndex === index ? ' text-white' : ' text-black dark:text-gray-300 '}`}>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
                {result.title}
              </a>
            </li>
          ))}
        </ul>
<<<<<<< HEAD

        <Pagination totalPage={totalPage} page={page} switchPage={switchPage} />
        <div>
          {totalHit > 0 && (
            <div>
              共搜索到 {totalHit} 条结果，用时 {useTime} 毫秒
            </div>
          )}
        </div>
        <div className="text-gray-600 mt-2">
          <span>
            <i className="fa-brands fa-algolia"></i> Algolia 提供搜索服务
          </span>{' '}
=======
        <Pagination totalPage={totalPage} page={page} switchPage={switchPage} />
        <div className='flex items-center justify-between mt-2 sm:text-sm text-xs dark:text-gray-300'>
          {totalHit === 0 && (
            <div className='flex items-center'>
              {ShortCutActions.map((action, index) => {
                return (
                  <Fragment key={index}>
                    <div className='border-gray-300 dark:text-gray-300 text-gray-600 px-2 rounded border inline-block'>
                      {action.key}
                    </div>
                    <span className='ml-2 mr-4  text-gray-600 dark:text-gray-300'>
                      {action.action}
                    </span>
                  </Fragment>
                )
              })}
            </div>
          )}
          <div>
            {totalHit > 0 && (
              <p>
                共搜索到 {totalHit} 条结果，用时 {useTime} 毫秒
              </p>
            )}
          </div>
          <div className='text-gray-600 dark:text-gray-300  text-right'>
            <span>
              <i className='fa-brands fa-algolia'></i> Algolia 提供搜索服务
            </span>
          </div>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        </div>
      </div>

      {/* 遮罩 */}
      <div
        onClick={closeModal}
<<<<<<< HEAD
        className="z-30 fixed top-0 left-0 w-full h-full flex items-center justify-center glassmorphism"
=======
        className='z-30 fixed top-0 left-0 w-full h-full flex items-center justify-center glassmorphism'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      />
    </div>
  )
}

/**
 * 标签组
 */
<<<<<<< HEAD
function TagGroups(props) {
=======
function TagGroups() {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const { tagOptions } = useGlobal()
  //  获取tagOptions数组前十个
  const firstTenTags = tagOptions?.slice(0, 10)

<<<<<<< HEAD
  return <div id='tags-group' className='dark:border-gray-700 space-y-2'>
            {
                firstTenTags?.map((tag, index) => {
                  return <Link passHref
                        key={index}
                        href={`/tag/${encodeURIComponent(tag.name)}`}
                        className={'cursor-pointer inline-block whitespace-nowrap'}>
                        <div className={' flex items-center text-black dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-yellow-600 hover:scale-110 hover:text-white rounded-lg px-2 py-0.5 duration-150 transition-all'}>
                            <div className='text-lg'>{tag.name} </div>{tag.count ? <sup className='relative ml-1'>{tag.count}</sup> : <></>}
                        </div>

                    </Link>
                })
            }
        </div>
=======
  return (
    <div id='tags-group' className='dark:border-gray-700 space-y-2'>
      {firstTenTags?.map((tag, index) => {
        return (
          <SmartLink
            passHref
            key={index}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className={'cursor-pointer inline-block whitespace-nowrap'}>
            <div
              className={
                'flex items-center text-black dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-yellow-600 hover:scale-110 hover:text-white rounded-lg px-2 py-0.5 duration-150 transition-all'
              }>
              <div className='text-lg'>{tag.name} </div>
              {tag.count ? (
                <sup className='relative ml-1'>{tag.count}</sup>
              ) : (
                <></>
              )}
            </div>
          </SmartLink>
        )
      })}
    </div>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

/**
 * 分页
 * @param {*} param0
 */
function Pagination(props) {
  const { totalPage, page, switchPage } = props
  if (totalPage <= 0) {
    return <></>
  }
<<<<<<< HEAD
  const pagesElement = []

  for (let i = 0; i < totalPage; i++) {
    const selected = page === i
    pagesElement.push(getPageElement(i, selected, switchPage))
  }
  return <div className='flex space-x-1 w-full justify-center py-1'>
        {pagesElement.map(p => p)}
  </div>
}

/**
 * 获取分页按钮
 * @param {*} i
 * @param {*} selected
 */
function getPageElement(i, selected, switchPage) {
  return <div onClick={() => switchPage(i)} className={`${selected ? 'font-bold text-white bg-blue-600 rounded' : 'hover:text-blue-600 hover:font-bold'} text-center cursor-pointer  w-6 h-6 `}>
    {i + 1}
  </div>
=======
  return (
    <div className='flex space-x-1 w-full justify-center py-1'>
      {Array.from({ length: totalPage }, (_, i) => {
        const classNames =
          page === i
            ? 'font-bold text-white bg-blue-600 dark:bg-yellow-600 rounded'
            : 'hover:text-blue-600 hover:font-bold dark:text-gray-300'

        return (
          <div
            onClick={() => switchPage(i)}
            className={`text-center cursor-pointer w-6 h-6 ${classNames}`}
            key={i}>
            {i + 1}
          </div>
        )
      })}
    </div>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}

'use client'
//这行指示这是一个客户端组件，通常用于Next.js 13及以上版本中。

import CONFIG from './config'
import { useRouter } from 'next/router'
import { useEffect, useState, createContext, useContext, useRef } from 'react'
import { isBrowser } from '@/lib/utils'
import Footer from './components/Footer'
import InfoCard from './components/InfoCard'
import RevolverMaps from './components/RevolverMaps'
import TopNavBar from './components/TopNavBar'
import SearchInput from './components/SearchInput'
import { useGlobal } from '@/lib/global'
import NavPostList from './components/NavPostList'
import ArticleInfo from './components/ArticleInfo'
import Catalog from './components/Catalog'
import Announcement from './components/Announcement'
import PageNavDrawer from './components/PageNavDrawer'
import FloatTocButton from './components/FloatTocButton'
import JumpToTopButton from './components/JumpToTopButton'
import ShareBar from '@/components/ShareBar'
import CategoryItem from './components/CategoryItem'
import TagItemMini from './components/TagItemMini'
import ArticleAround from './components/ArticleAround'
import Comment from '@/components/Comment'
import TocDrawer from './components/TocDrawer'
import NotionPage from '@/components/NotionPage'
import { ArticleLock } from './components/ArticleLock'
import { Transition } from '@headlessui/react'
import { Style } from './style'
import BlogArchiveItem from './components/BlogArchiveItem'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/config'
import NotionIcon from '@/components/NotionIcon'
import AlgoliaSearchModal from '@/components/AlgoliaSearchModal'

//这些是导入的模块和组件。包括配置、路由、React Hooks、自定义组件、样式和动态加载等。

// 主题全局变量，创建了一个全局上下文ThemeGlobalGitbook，并导出一个钩子useGitBookGlobal用于访问这个上下文。
const ThemeGlobalGitbook = createContext()
export const useGitBookGlobal = () => useContext(ThemeGlobalGitbook)

/**
 * 基础布局
 * 采用左右两侧布局，移动端使用顶部导航栏，定义一个名为LayoutBase的函数组件，接收props作为参数。
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = (props) => {
  const { children, post, allNavPages, slotLeft, slotRight, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const [tocVisible, changeTocVisible] = useState(false)
  const [pageNavVisible, changePageNavVisible] = useState(false)
  const [filteredNavPages, setFilteredNavPages] = useState(allNavPages)
//使用解构赋值提取props中的属性。使用useGlobal钩子获取全局状态。使用useState定义状态变量。useRouter钩子用于访问路由。
  const showTocButton = post?.toc?.length > 1
  const searchModal = useRef(null)
//定义一个布尔值showTocButton用于决定是否显示目录按钮。使用useRef创建一个引用searchModal。
  useEffect(() => {
    setFilteredNavPages(allNavPages)
  }, [post])
//使用useEffect在post变化时更新filteredNavPages。
//返回JSX结构，使用ThemeGlobalGitbook.Provider提供上下文值。渲染样式组件Style。
  return (
        <ThemeGlobalGitbook.Provider value={{ searchModal, tocVisible, changeTocVisible, filteredNavPages, setFilteredNavPages, allNavPages, pageNavVisible, changePageNavVisible }}>
            <Style/>

            <div id='theme-gitbook' className={`${siteConfig('FONT_STYLE')} scroll-smooth bg-white dark:bg-hexo-black-gray w-full h-full min-h-screen justify-center dark:text-gray-300`}>
                <AlgoliaSearchModal cRef={searchModal} {...props}/>

                {/* 顶部导航栏，渲染一个包含全局样式的div，并使用AlgoliaSearchModal组件。 */}
                <TopNavBar {...props} />
                {/* 渲染顶部导航栏。 */}
                <main id='wrapper' className={(JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE')) ? 'flex-row-reverse' : '') + 'relative flex justify-between w-full h-full mx-auto'}>

                    {/* 左侧推拉抽屉,渲染主内容区域，根据配置决定布局方向。 */}
                    {fullWidth
                      ? null
                      : (<div className={'hidden md:block border-r dark:border-transparent relative z-10 '}>
                        <div className='w-72 py-14 px-6 sticky top-0 overflow-y-scroll h-screen scroll-hidden'>
                            {slotLeft}
                            <SearchInput className='my-3 rounded-md' />
                            <div className='mb-20'>
                                {/* 所有文章列表 */}
                                <NavPostList filteredNavPages={filteredNavPages} />
                            </div>

                        </div>

                        <div className='w-72 fixed left-0 bottom-0 z-20 bg-white'>
                            <Footer {...props} />
                        </div>
                    </div>) }
                    {/* 如果不是全宽布局，显示左侧边栏，包含slotLeft、搜索输入和导航文章列表，底部是Footer。 */}
                    <div id='center-wrapper' className='flex flex-col justify-between w-full relative z-10 pt-14 min-h-screen'>
                    {/* 渲染中心内容区域。 */}
                        <div id='container-inner' className={`w-full px-7 ${fullWidth ? 'px-10' : 'max-w-3xl'} justify-center mx-auto`}>
                            {slotTop}

                    {/* 渲染内层容器，包含slotTop。 */}
                            <Transition
                                show={!onLoading}
                                appear={true}
                                enter="transition ease-in-out duration-700 transform order-first"
                                enterFrom="opacity-0 translate-y-16"
                                enterTo="opacity-100"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-16"
                                unmount={false}
                            >
                                {children}
                            </Transition>

                            {/* 回顶按钮 */}
                            <JumpToTopButton />
                        </div>

                        {/* 底部 */}
                        <div className='md:hidden'>
                            <Footer {...props} />
                        </div>
                    </div>

                    {/*  右侧侧推拉抽屉,如果不是全宽布局，显示右侧边栏，包含文章信息、目录、slotRight和公告。 */}
                    {fullWidth
                      ? null
                      : <div style={{ width: '32rem' }} className={'hidden xl:block dark:border-transparent relative z-10 '}>
                      <div className='py-14 px-6 sticky top-0'>
                          <ArticleInfo post={props?.post ? props?.post : props.notice} />

                          <div className='py-4'>
                              <Catalog {...props} />
                              {slotRight}
                              {router.route === '/' && <>
                                  <InfoCard {...props} />
                                  {siteConfig('GITBOOK_WIDGET_REVOLVER_MAPS', null, CONFIG) === 'true' && <RevolverMaps />}
                              </>}
                              {/* gitbook主题首页只显示公告 */}
                              <Announcement {...props} />
                          </div>

 
                      </div>
                  </div>}

                </main>

                {/* 移动端悬浮目录按钮 */}
                {showTocButton && !tocVisible && <div className='md:hidden fixed right-0 bottom-52 z-30 bg-white border-l border-t border-b dark:border-gray-800 rounded'>
                    <FloatTocButton {...props} />
                </div>}

                {/* 移动端导航抽屉 */}
                <PageNavDrawer {...props} filteredNavPages={filteredNavPages} />

                {/* 移动端底部导航栏 */}
                {/* <BottomMenuBar {...props} className='block md:hidden' /> */}

            </div>
        </ThemeGlobalGitbook.Provider>
  )
}

/**
 * 首页
 * 重定向到某个文章详情页
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  const router = useRouter()
  useEffect(() => {
    router.push(siteConfig('GITBOOK_INDEX_PAGE', null, CONFIG)).then(() => {
      // console.log('跳转到指定首页', siteConfig('INDEX_PAGE', null, CONFIG))
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById('notion-article')
          if (!article) {
            console.log('请检查您的Notion数据库中是否包含此slug页面： ', siteConfig('GITBOOK_INDEX_PAGE', null, CONFIG))
            const containerInner = document.querySelector('#theme-gitbook #container-inner')
            const newHTML = `<h1 class="text-3xl pt-12  dark:text-gray-300">配置有误</h1><blockquote class="notion-quote notion-block-ce76391f3f2842d386468ff1eb705b92"><div>请在您的notion中添加一个slug为${siteConfig('GITBOOK_INDEX_PAGE', null, CONFIG)}的文章</div></blockquote>`
            containerInner?.insertAdjacentHTML('afterbegin', newHTML)
          }
        }
      }, 7 * 1000)
    })
  }, [])

  return <></>
}

/**
 * 文章列表 无
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutPostList = (props) => {
  return <></>
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = (props) => {
  const { post, prev, next, lock, validPassword } = props
  const router = useRouter()
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById('notion-article')
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, siteConfig('POST_WAITING_TIME_FOR_404') * 1000)
    }
  }, [post])
  return (
        <>
            {/* 文章锁 */}
            {lock && <ArticleLock validPassword={validPassword} />}

            {!lock && <div id='container'>

                {/* title */}
                <h1 className="text-3xl pt-12  dark:text-gray-300"><NotionIcon icon={post?.pageIcon} />{post?.title}</h1>

                {/* Notion文章主体 */}
                {post && (<section id="article-wrapper" className="px-1">
                    <NotionPage post={post} />

                    {/* 分享 */}
                    <ShareBar post={post} />
                    {/* 文章分类和标签信息 */}
                    <div className='flex justify-between'>
                        {siteConfig('POST_DETAIL_CATEGORY', null, CONFIG) && post?.category && <CategoryItem category={post.category} />}
                        <div>
                            {siteConfig('POST_DETAIL_TAG', null, CONFIG) && post?.tagItems?.map(tag => <TagItemMini key={tag.name} tag={tag} />)}
                        </div>
                    </div>

                    {post?.type === 'Post' && <ArticleAround prev={prev} next={next} />}

                    <Comment frontMatter={post} />
                </section>)}

                <TocDrawer {...props} />
            </div>}
        </>
  )
}

/**
 * 没有搜索
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutSearch = (props) => {
  return <></>
}

/**
 * 归档页面基本不会用到
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props

  return <>
        <div className="mb-10 pb-20 md:py-12 py-3  min-h-full">
            {Object.keys(archivePosts)?.map(archiveTitle => <BlogArchiveItem key={archiveTitle} archiveTitle={archiveTitle} archivePosts={archivePosts} />)}
        </div>
  </>
}

/**
 * 404
 */
const Layout404 = props => {
  return <>
        <div className='w-full h-96 py-80 flex justify-center items-center'>404 Not found.</div>
    </>
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return <>
     <div className='bg-white dark:bg-gray-700 py-10'>
                <div className='dark:text-gray-200 mb-5'>
                    <i className='mr-4 fas fa-th' />{locale.COMMON.CATEGORY}:
                </div>
                <div id='category-list' className='duration-200 flex flex-wrap'>
                    {categoryOptions?.map(category => {
                      return (
                            <Link
                                key={category.name}
                                href={`/category/${category.name}`}
                                passHref
                                legacyBehavior>
                                <div
                                    className={'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'}>
                                    <i className='mr-4 fas fa-folder' />{category.name}({category.count})
                                </div>
                            </Link>
                      )
                    })}
                </div>
            </div>
  </>
}

/**
 * 标签列表
 */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return <>
     <div className="bg-white dark:bg-gray-700 py-10">
                <div className="dark:text-gray-200 mb-5">
                    <i className="mr-4 fas fa-tag" />
                    {locale.COMMON.TAGS}:
                </div>
                <div id="tags-list" className="duration-200 flex flex-wrap">
                    {tagOptions?.map(tag => {
                      return (
                            <div key={tag.name} className="p-2">
                                <TagItemMini key={tag.name} tag={tag} />
                            </div>
                      )
                    })}
                </div>
            </div>
  </>
}

export {
  CONFIG as THEME_CONFIG,
  LayoutBase,
  LayoutIndex,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutPostList,
  LayoutCategoryIndex,
  LayoutTagIndex
}

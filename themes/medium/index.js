import CONFIG from './config'
import { useState, createContext, useContext, useEffect } from 'react'
import Footer from './components/Footer'
import InfoCard from './components/InfoCard'
import RevolverMaps from './components/RevolverMaps'
import Tabs from '@/components/Tabs'
import TopNavBar from './components/TopNavBar'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import JumpToTopButton from './components/JumpToTopButton'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Catalog from './components/Catalog'
import SearchNav from './components/SearchNav'
import { isBrowser } from '@/lib/utils'
import BlogArchiveItem from './components/BlogArchiveItem'
import BlogPostBar from './components/BlogPostBar'
import NotionPage from '@/components/NotionPage'
import Comment from '@/components/Comment'
import ArticleAround from './components/ArticleAround'
import TagItemMini from './components/TagItemMini'
import ShareBar from '@/components/ShareBar'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import { Style } from './style'
import replaceSearchResult from '@/components/Mark'
import ArticleInfo from './components/ArticleInfo'
import { siteConfig } from '@/lib/config'
import BlogMemos from './components/BlogMemos'

// 主题全局状态
const ThemeGlobalMedium = createContext()
export const useMediumGlobal = () => useContext(ThemeGlobalMedium)

/**
 * 基础布局
 * 采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, showInfoCard = true, post, notice } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const [tocVisible, changeTocVisible] = useState(false)
  const { onLoading, fullWidth } = useGlobal()
  const [slotRight, setSlotRight] = useState(null)
  useEffect(() => {
    if (post?.toc?.length > 0) {
      setSlotRight(
        <div key={locale.COMMON.TABLE_OF_CONTENTS}>
          <Catalog toc={post?.toc} />
        </div>
      )
    } else {
      setSlotRight(null)
    }
  }, [post])
  const slotTop = <BlogPostBar {...props} />

  return (
        <ThemeGlobalMedium.Provider value={{ tocVisible, changeTocVisible }}>
            {/* CSS样式 */}
            <Style />

            <div id='theme-medium' className={`${siteConfig('FONT_STYLE')} bg-[#F5F5DC] dark:bg-hexo-black-gray w-full h-full min-h-screen  dark:text-gray-300 scroll-smooth`}>

                <main id='wrapper' className={(JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE')) ? 'flex-row-reverse' : '') + 'relative flex justify-between w-full h-full mx-auto'}>
                    {/* 桌面端左侧菜单 */}
                    {/* <LeftMenuBar/> */}

                    {/* 主区 */}
                    <div id='container-wrapper' className='w-full relative z-10'>

                        {/* 顶部导航栏 */}
                        <TopNavBar {...props} />

                        <div id='container-inner' className={`px-5 ${fullWidth ? '' : 'max-w-5xl'} justify-center mx-auto min-h-screen`}>
                            <Transition
                                show={!onLoading}
                                appear={true}
                                enter="transition ease-in-out duration-700 transform order-first"
                                enterFrom="opacity-0 translate-y-16"
                                enterTo="opacity-100"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0 -translate-y-16"
                                unmount={false}
                            >
                                {slotTop}
                                {children}
                            </Transition>
                            <JumpToTopButton />
                        </div>
                        {/* 底部 */}
                        <Footer title={siteConfig('TITLE')} />
                    </div>

                    {/* 桌面端右侧 */}
                    {fullWidth
                      ? null
                      : <div className={`hidden xl:block border-l dark:border-transparent w-96 relative z-10 ${siteConfig('MEDIUM_RIGHT_PANEL_DARK', null, CONFIG) ? 'bg-hexo-black-gray dark' : ''}`}>
                            <div className='py-14 px-6 sticky top-0'>
                                <Tabs>
                                    {slotRight}
                                    <div key="About">
                                        {showInfoCard && <InfoCard {...props} />}
                                        {siteConfig('MEDIUM_WIDGET_REVOLVER_MAPS', null, CONFIG) === 'true' && <RevolverMaps />}
                                    </div>
                                </Tabs>
                            </div>
                        </div>}

                </main>
            </div>
        </ThemeGlobalMedium.Provider>
  )
}

/**
 * 首页
 * 首页就是一个博客列表
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  return <LayoutPostList {...props} />
}


/**
 * 博客列表
 * @returns
 */
const LayoutPostList = (props) => {
  return <>
        {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
    </>
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, prev, next} = props
  const slotRight = post?.toc && post?.toc?.length >= 3 && (
        <div>
            <Catalog toc={post?.toc} />
        </div>
  )

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
        <div showInfoCard={true} slotRight={slotRight} {...props} >

            {<div id='article-wrapper'>

                {/* 文章信息 */}
                <ArticleInfo {...props} />

                {/* Notion文章主体 */}
                <section className="px-1 max-w-4xl">
                    {post && (<NotionPage post={post} />)}
                </section>

                {/* 文章底部区域  */}
                <section>
                    {/* 分享 */}
                    <ShareBar post={post} />
                    {/* 上一篇下一篇文章 */}
                    {post?.type === 'Post' && <ArticleAround prev={prev} next={next} />}
                    {/* 评论区 */}
                    <Comment frontMatter={post} />
                </section>
            </div>}
        </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    // 高亮搜索结果
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
    }
  }, [])
  return (
    <div
      {...props}
      currentSearch={currentSearch}
    >
      <div id="post-outer-wrapper" className="px-5  md:px-0">
        {!currentSearch
          ? (
            <SearchNav {...props} />
            )
          : (
            <div id="posts-wrapper">
              {siteConfig('POST_LIST_STYLE') === 'page'
                ? (
                  <BlogPostListPage {...props} />
                  )
                : (
                  <BlogPostListScroll {...props} />
                  )}
            </div>
            )}
      </div>
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
        <>
            <div className="mb-10 pb-20 md:py-12 py-3  min-h-full">
                {Object.keys(archivePosts)?.map(archiveTitle => <BlogArchiveItem key={archiveTitle} archiveTitle={archiveTitle} archivePosts={archivePosts} />
                )}
            </div>
        </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  return <>
        <div className='w-full h-96 py-80 flex justify-center items-center'>404 Not found.</div>
    </>
}


/**
 * 说说
 * @param {*} props
 * @returns
 */
const LayoutMemos = (props) => {
  const memoPageInfo = {
    id: "0f94bc3a13004f3bbf75da174b0d741e", // 固定ID，确保唯一性
    type: "Memos",
    title: "我的说说",
  };
  return  (
  <div className="w-full lg:hover:shadow rounded-md lg:rounded-md lg:px-2 lg:py-4 article">
    <div id="article-wrapper" className="overflow-x-auto flex-grow mx-auto md:w-full px-3 font-serif">
      <article itemScope itemType="https://schema.org/Movie" className="subpixel-antialiased overflow-y-hidden overflow-x-hidden" >
         {/* Notion文章主体 */}
         <section className="px-5 justify-center mx-auto">
              <BlogMemos {...props}/>
         </section>
      </article>
      <div className='pt-4 border-dashed'></div>  
       {/* 评论互动 */}
       <div className="duration-200 overflow-x-auto px-3">
        <Comment frontMatter={memoPageInfo} />
      </div>       
    </div>
  </div>)
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
        <>
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
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
        <>
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
  )
}

export {
  CONFIG as THEME_CONFIG,
  LayoutBase,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutArchive,
  LayoutMemos,
  LayoutSlug,
  Layout404,
  LayoutCategoryIndex,
  LayoutTagIndex
  
}


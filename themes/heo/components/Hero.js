// import Image from 'next/image'
import { ArrowSmallRight, PlusSmall } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
<<<<<<< HEAD
import Link from 'next/link'
=======
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import CONFIG from '../config'

/**
 * 顶部英雄区
 * 左右布局，
 * 左侧：banner组
 * 右侧：今日卡牌遮罩
 * @returns
 */
const Hero = props => {
  const HEO_HERO_REVERSE = siteConfig('HEO_HERO_REVERSE', false, CONFIG)
  return (
    <div
<<<<<<< HEAD
      id="hero-wrapper"
      className="recent-top-post-group w-full overflow-hidden select-none px-5 mb-4"
    >
      <div
        id="hero"
        style={{ zIndex: 1 }}
        className={
           `animate__animated animate__fadeIn animate__fast 
           ${HEO_HERO_REVERSE ? 'xl:flex-row-reverse' : ''}
           recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] overflow-x-scroll w-full mx-auto flex-row flex-nowrap flex relative`
        }
      >
=======
      id='hero-wrapper'
      className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-4'>
      <div
        id='hero'
        style={{ zIndex: 1 }}
        className={`${HEO_HERO_REVERSE ? 'xl:flex-row-reverse' : ''}
           recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] overflow-x-scroll w-full mx-auto flex-row flex-nowrap flex relative`}>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        {/* 左侧banner组 */}
        <BannerGroup {...props} />

        {/* 中间留白 */}
        <div className='px-1.5 h-full'></div>

        {/* 右侧置顶文章组 */}
        <TopGroup {...props} />
      </div>
    </div>
  )
}

/**
 * 英雄区左侧banner组
 * @returns
 */
function BannerGroup(props) {
  return (
    // 左侧英雄区
    <div
<<<<<<< HEAD
      id="bannerGroup"
      className="flex flex-col justify-between flex-1 mr-2 max-w-[42rem]"
    >
=======
      id='bannerGroup'
      className='flex flex-col justify-between flex-1 mr-2 max-w-[42rem]'>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      {/* 动图 */}
      <Banner {...props} />
      {/* 导航分类 */}
      <GroupMenu />
    </div>
  )
}

/**
 * 英雄区左上角banner动图
 * @returns
 */
function Banner(props) {
  const router = useRouter()
<<<<<<< HEAD
  const { latestPosts } = props
=======
  const { allNavPages } = props
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  /**
   * 随机跳转文章
   */
  function handleClickBanner() {
<<<<<<< HEAD
    const randomIndex = Math.floor(Math.random() * latestPosts.length)
    const randomPost = latestPosts[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  return (
    <div
      id="banners"
      onClick={handleClickBanner}
      className="hidden xl:flex xl:flex-col group h-full bg-white dark:bg-[#1e1e1e] rounded-xl border dark:border-gray-700 mb-3 relative overflow-hidden"
    >
      <div id="banner-title" className="flex flex-col absolute top-10 left-10">
        <div className="text-4xl font-bold mb-3  dark:text-white">
=======
    const randomIndex = Math.floor(Math.random() * allNavPages.length)
    const randomPost = allNavPages[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  // 遮罩文字
  const coverTitle = siteConfig('HEO_HERO_COVER_TITLE')

  return (
    <div
      id='banners'
      onClick={handleClickBanner}
      className='hidden xl:flex xl:flex-col group h-full bg-white dark:bg-[#1e1e1e] rounded-xl border dark:border-gray-700 mb-3 relative overflow-hidden'>
      <div
        id='banner-title'
        className='z-10 flex flex-col absolute top-10 left-10'>
        <div className='text-4xl font-bold mb-3  dark:text-white'>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          {siteConfig('HEO_HERO_TITLE_1', null, CONFIG)}
          <br />
          {siteConfig('HEO_HERO_TITLE_2', null, CONFIG)}
        </div>
<<<<<<< HEAD
        <div className="text-xs text-gray-600  dark:text-gray-200">
=======
        <div className='text-xs text-gray-600  dark:text-gray-200'>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          {siteConfig('HEO_HERO_TITLE_3', null, CONFIG)}
        </div>
      </div>

      {/* 斜向滚动的图标 */}
      <TagsGroupBar />

      {/* 遮罩 */}
      <div
<<<<<<< HEAD
        id="banner-cover"
        style={{ backdropFilter: 'blur(15px)' }}
        className={
          'rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 duration-300 transition-all bg-[#C7EDCC] dark:bg-[#dca846] dark:text-white cursor-pointer absolute w-full h-full top-0 flex justify-start items-center'
        }
      >
        <div className="ml-12 -translate-x-32 group-hover:translate-x-0 duration-300 transition-all ease-in">
          <div className="text-7xl text-white font-extrabold">随便逛逛</div>
          <div className="-ml-3 text-gray-300">
=======
        id='banner-cover'
        style={{ backdropFilter: 'blur(15px)' }}
        className={
          'z-20 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 duration-300 transition-all bg-[#4259efdd] dark:bg-[#dca846] dark:text-white cursor-pointer absolute w-full h-full top-0 flex justify-start items-center'
        }>
        <div className='ml-12 -translate-x-32 group-hover:translate-x-0 duration-300 transition-all ease-in'>
          <div className='text-7xl text-white font-extrabold'>{coverTitle}</div>
          <div className='-ml-3 text-gray-300'>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
            <ArrowSmallRight className={'w-24 h-24 stroke-2'} />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 图标滚动标签组
 * 英雄区左上角banner条中斜向滚动的图标
 */
function TagsGroupBar() {
<<<<<<< HEAD
  const groupIcons = siteConfig('HEO_GROUP_ICONS', null, CONFIG).concat(siteConfig('HEO_GROUP_ICONS', null, CONFIG))

  return (
    <div className="tags-group-all flex -rotate-[15deg] h-full">
      <div className="tags-group-wrapper flex flex-nowrap absolute top-16">
        {groupIcons?.map((g, index) => {
          return (
            <div key={index} className="tags-group-icon-pair ml-6 select-none">
=======
  let groupIcons = siteConfig('HEO_GROUP_ICONS', null, CONFIG)
  if (groupIcons) {
    groupIcons = groupIcons.concat(groupIcons)
  }
  return (
    <div className='tags-group-all flex -rotate-[30deg] h-full'>
      <div className='tags-group-wrapper flex flex-nowrap absolute top-16'>
        {groupIcons?.map((g, index) => {
          return (
            <div key={index} className='tags-group-icon-pair ml-6 select-none'>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
              <div
                style={{ background: g.color_1 }}
                className={
                  'tags-group-icon w-28 h-28 rounded-3xl flex items-center justify-center text-white text-lg font-bold shadow-md'
<<<<<<< HEAD
                }
              >
=======
                }>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
                <LazyImage
                  priority={true}
                  src={g.img_1}
                  title={g.title_1}
<<<<<<< HEAD
                  className="w-2/3 hidden xl:block"
=======
                  className='w-2/3 hidden xl:block'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
                />
              </div>
              <div
                style={{ background: g.color_2 }}
                className={
                  'tags-group-icon  mt-5 w-28 h-28 rounded-3xl flex items-center justify-center text-white text-lg font-bold shadow-md'
<<<<<<< HEAD
                }
              >
=======
                }>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
                <LazyImage
                  priority={true}
                  src={g.img_2}
                  title={g.title_2}
<<<<<<< HEAD
                  className="w-2/3 hidden xl:block"
=======
                  className='w-2/3 hidden xl:block'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 英雄区左下角3个指定分类按钮
 * @returns
 */
function GroupMenu() {
<<<<<<< HEAD
  return (
    <div className="h-[165px] select-none xl:h-20 flex flex-col justify-between xl:space-y-0 xl:flex-row w-28 lg:w-48 xl:w-full xl:flex-nowrap xl:space-x-3">
      <Link
        href={siteConfig('HEO_HERO_CATEGORY_1', null, CONFIG)?.url}
        className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 flex h-20 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in"
      >
        <div className="font-bold lg:text-lg  pl-5 relative -mt-2">
          {siteConfig('HEO_HERO_CATEGORY_1', null, CONFIG)?.title}
          <span className="absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full"></span>
        </div>
        <div className="hidden lg:block absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0">
          <i className="fa-solid fa-star text-4xl"></i>
        </div>
      </Link>
      <Link
        href={siteConfig('HEO_HERO_CATEGORY_2', null, CONFIG)?.url}
        className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-yellow-500 flex h-20 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in"
      >
        <div className="font-bold lg:text-lg pl-5 relative -mt-2">
          {siteConfig('HEO_HERO_CATEGORY_2', null, CONFIG)?.title}
          <span className="absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full"></span>
        </div>
        <div className="hidden lg:block absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0">
          <i className="fa-solid fa-fire-flame-curved text-4xl"></i>
        </div>
      </Link>
      {/* 第三个标签在小屏上不显示 */}
      <Link
        href={siteConfig('HEO_HERO_CATEGORY_3', null, CONFIG)?.url}
        className="group relative overflow-hidden bg-gradient-to-r from-teal-300 to-cyan-300 hidden h-20 xl:flex justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in"
      >
        <div className="font-bold text-lg pl-5 relative -mt-2">
          {siteConfig('HEO_HERO_CATEGORY_3', null, CONFIG)?.title}
          <span className="absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full"></span>
        </div>
        <div className="absolute right-6 duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0">
          <i className="fa-solid fa-book-bookmark text-4xl "></i>
        </div>
      </Link>
=======
  const url_1 = siteConfig('HEO_HERO_CATEGORY_1', {}, CONFIG)?.url || ''
  const title_1 = siteConfig('HEO_HERO_CATEGORY_1', {}, CONFIG)?.title || ''
  const url_2 = siteConfig('HEO_HERO_CATEGORY_2', {}, CONFIG)?.url || ''
  const title_2 = siteConfig('HEO_HERO_CATEGORY_2', {}, CONFIG)?.title || ''
  const url_3 = siteConfig('HEO_HERO_CATEGORY_3', {}, CONFIG)?.url || ''
  const title_3 = siteConfig('HEO_HERO_CATEGORY_3', {}, CONFIG)?.title || ''

  return (
    <div className='h-[165px] select-none xl:h-20 flex flex-col justify-between xl:space-y-0 xl:flex-row w-28 lg:w-48 xl:w-full xl:flex-nowrap xl:space-x-3'>
      <SmartLink
        href={url_1}
        className='group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 flex h-20 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold lg:text-lg  pl-5 relative -mt-2'>
          {title_1}
          <span className='absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full'></span>
        </div>
        <div className='hidden lg:block absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-star text-4xl'></i>
        </div>
      </SmartLink>
      <SmartLink
        href={url_2}
        className='group relative overflow-hidden bg-gradient-to-r from-red-500 to-yellow-500 flex h-20 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold lg:text-lg pl-5 relative -mt-2'>
          {title_2}
          <span className='absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full'></span>
        </div>
        <div className='hidden lg:block absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-fire-flame-curved text-4xl'></i>
        </div>
      </SmartLink>
      {/* 第三个标签在小屏上不显示 */}
      <SmartLink
        href={url_3}
        className='group relative overflow-hidden bg-gradient-to-r from-teal-300 to-cyan-300 hidden h-20 xl:flex justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold text-lg pl-5 relative -mt-2'>
          {title_3}
          <span className='absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full'></span>
        </div>
        <div className='absolute right-6 duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-book-bookmark text-4xl '></i>
        </div>
      </SmartLink>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    </div>
  )
}

/**
 * 置顶文章区域
 */
function TopGroup(props) {
  const { latestPosts, allNavPages, siteInfo } = props
<<<<<<< HEAD
=======
  const { locale } = useGlobal()
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const todayCardRef = useRef()
  function handleMouseLeave() {
    todayCardRef.current.coverUp()
  }

  // 获取置顶推荐文章
  const topPosts = getTopPosts({ latestPosts, allNavPages })

  return (
    <div
<<<<<<< HEAD
      id="hero-right-wrapper"
      onMouseLeave={handleMouseLeave}
      className="flex-1 relative w-full"
    >
      {/* 置顶推荐文章 */}
      <div
        id="top-group"
        className="w-full flex space-x-3 xl:space-x-0 xl:grid xl:grid-cols-3 xl:gap-3 xl:h-[342px]"
      >
        {topPosts?.map((p, index) => {
          return (
            <Link href={`${siteConfig('SUB_PATH', '')}/${p?.slug}`} key={index}>
              <div className="cursor-pointer h-[164px] group relative flex flex-col w-52 xl:w-full overflow-hidden shadow bg-white dark:bg-black dark:text-white rounded-xl">
                <LazyImage
                  priority={index === 0}
                  className="h-24 object-cover"
                  alt={p?.title}
                  src={p?.pageCoverThumbnail || siteInfo?.pageCover}
                />
                <div className="group-hover:text-indigo-600 dark:group-hover:text-yellow-600 line-clamp-2 overflow-hidden m-2 font-semibold">
                  {p?.title}
                </div>
                {/* hover 悬浮的 ‘荐’ 字 */}
                <div className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-200 transition-all absolute -top-2 -left-2 bg-indigo-600 dark:bg-yellow-600  text-white rounded-xl overflow-hidden pr-2 pb-2 pl-4 pt-4 text-xs">
                  荐
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <TodayCard cRef={todayCardRef} siteInfo={siteInfo}/>
=======
      id='hero-right-wrapper'
      onMouseLeave={handleMouseLeave}
      className='flex-1 relative w-full'>
      {/* 置顶推荐文章 */}
      <div
        id='top-group'
        className='w-full flex space-x-3 xl:space-x-0 xl:grid xl:grid-cols-3 xl:gap-3 xl:h-[342px]'>
        {topPosts?.map((p, index) => {
          return (
            <SmartLink href={`${siteConfig('SUB_PATH', '')}/${p?.slug}`} key={index}>
              <div className='cursor-pointer h-[164px] group relative flex flex-col w-52 xl:w-full overflow-hidden shadow bg-white dark:bg-black dark:text-white rounded-xl'>
                <LazyImage
                  priority={index === 0}
                  className='h-24 object-cover'
                  alt={p?.title}
                  src={p?.pageCoverThumbnail || siteInfo?.pageCover}
                />
                <div className='group-hover:text-indigo-600 dark:group-hover:text-yellow-600 line-clamp-2 overflow-hidden m-2 font-semibold'>
                  {p?.title}
                </div>
                {/* hover 悬浮的 ‘荐’ 字 */}
                <div className='opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-200 transition-all absolute -top-2 -left-2 bg-indigo-600 dark:bg-yellow-600  text-white rounded-xl overflow-hidden pr-2 pb-2 pl-4 pt-4 text-xs'>
                  {locale.COMMON.RECOMMEND_BADGES}
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
      {/* 一个大的跳转文章卡片 */}
      <TodayCard cRef={todayCardRef} siteInfo={siteInfo} />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    </div>
  )
}

/**
 * 获取推荐置顶文章
 */
function getTopPosts({ latestPosts, allNavPages }) {
  // 默认展示最近更新
  if (
    !siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) ||
    siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) === ''
  ) {
    return latestPosts
  }

  // 显示包含‘推荐’标签的文章
  let sortPosts = []

  // 排序方式
<<<<<<< HEAD
  if (JSON.parse(siteConfig('HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME', null, CONFIG))) {
=======
  if (
    JSON.parse(
      siteConfig('HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME', null, CONFIG)
    )
  ) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    sortPosts = Object.create(allNavPages).sort((a, b) => {
      const dateA = new Date(a?.lastEditedDate)
      const dateB = new Date(b?.lastEditedDate)
      return dateB - dateA
    })
  } else {
    sortPosts = Object.create(allNavPages)
  }

  const topPosts = []
  for (const post of sortPosts) {
    if (topPosts.length === 6) {
      break
    }
    // 查找标签
<<<<<<< HEAD
    if (post?.tags?.indexOf(siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG)) >= 0) {
=======
    if (
      post?.tags?.indexOf(
        siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG)
      ) >= 0
    ) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      topPosts.push(post)
    }
  }
  return topPosts
}

/**
 * 英雄区右侧，今日卡牌
 * @returns
 */
function TodayCard({ cRef, siteInfo }) {
  const router = useRouter()
<<<<<<< HEAD
=======
  const link = siteConfig('HEO_HERO_TITLE_LINK', null, CONFIG)
  const { locale } = useGlobal()
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  // 卡牌是否盖住下层
  const [isCoverUp, setIsCoverUp] = useState(true)

  /**
   * 外部可以调用此方法
   */
  useImperativeHandle(cRef, () => {
    return {
      coverUp: () => {
        setIsCoverUp(true)
      }
    }
  })

  /**
<<<<<<< HEAD
   * 点击更多
   * @param {*} e
   */
  function handleClickMore(e) {
=======
   * 查看更多
   * @param {*} e
   */
  function handleClickShowMore(e) {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    e.stopPropagation()
    setIsCoverUp(false)
  }

  /**
   * 点击卡片跳转的链接
   * @param {*} e
   */
  function handleCardClick(e) {
<<<<<<< HEAD
    router.push(siteConfig('HEO_HERO_TITLE_LINK', null, CONFIG))
=======
    router.push(link)
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  }

  return (
    <div
<<<<<<< HEAD
      id="today-card"
      className={`${
        isCoverUp ? ' ' : 'pointer-events-none'
      } overflow-hidden absolute hidden xl:flex flex-1 flex-col h-full top-0 w-full`}
    >
      <div
        id="card-body"
=======
      id='today-card'
      className={`${
        isCoverUp ? ' ' : 'pointer-events-none'
      } overflow-hidden absolute hidden xl:flex flex-1 flex-col h-full top-0 w-full`}>
      <div
        id='card-body'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        onClick={handleCardClick}
        className={`${
          isCoverUp
            ? 'opacity-100 cursor-pointer'
            : 'opacity-0 transform scale-110 pointer-events-none'
<<<<<<< HEAD
        } shadow transition-all duration-200 today-card h-full bg-[#c7edcc] rounded-xl relative overflow-hidden flex items-end`}
      >
        <div
          id="today-card-info"
          className="z-10 flex justify-between w-full relative text-white p-10 items-end"
        >
          <div className="flex flex-col">
            <div className="text-xs font-light">{siteConfig('HEO_HERO_TITLE_4', null, CONFIG)}</div>
            <div className="text-3xl font-bold">{siteConfig('HEO_HERO_TITLE_5', null, CONFIG)}</div>
          </div>
          <div
            onClick={handleClickMore}
            className={`'${
              isCoverUp ? '' : 'hidden pointer-events-none '
            } flex items-center px-3 h-10 justify-center bg-[#7cd587] hover:bg-[#7cd587] transition-colors duration-100 rounded-3xl`}
          >
            <PlusSmall
              className={'w-6 h-6 mr-2 bg-white rounded-full stroke-green-600'}
            />
            <div id="more" className="select-none">
              更多推荐
            </div>
          </div>
        </div>
        <div
          id="today-card-cover"
          className={`${
            isCoverUp ? '' : ' pointer-events-none'
          } cursor-pointer today-card-cover absolute w-full h-full top-0`}
          style={{
            background:
              "url('https://bu.dusays.com/2023/09/11/64fed7f423cb6.png') no-repeat center /cover"
          }}
        ></div>
=======
        } shadow transition-all duration-200 today-card h-full bg-black rounded-xl relative overflow-hidden flex items-end`}>
        {/* 卡片文字信息 */}
        <div
          id='today-card-info'
          className='flex justify-between w-full relative text-white p-10 items-end'>
          <div className='flex flex-col'>
            <div className='text-xs font-light'>
              {siteConfig('HEO_HERO_TITLE_4', null, CONFIG)}
            </div>
            <div className='text-3xl font-bold'>
              {siteConfig('HEO_HERO_TITLE_5', null, CONFIG)}
            </div>
          </div>
          {/* 查看更多的按钮 */}
          <div
            onClick={handleClickShowMore}
            className={`'${isCoverUp ? '' : 'hidden pointer-events-none'} z-10 group flex items-center px-3 h-10 justify-center  rounded-3xl
            glassmorphism transition-colors duration-100 `}>
            <PlusSmall
              className={
                'group-hover:rotate-180 duration-500 transition-all w-6 h-6 mr-2 bg-white rounded-full stroke-black'
              }
            />
            <div id='more' className='select-none'>
              {locale.COMMON.RECOMMEND_POSTS}
            </div>
          </div>
        </div>

        {/* 封面图 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteInfo?.pageCover}
          id='today-card-cover'
          className={`${
            isCoverUp ? '' : ' pointer-events-none'
          } hover:scale-110 duration-1000 object-cover cursor-pointer today-card-cover absolute w-full h-full top-0`}
        />
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
      </div>
    </div>
  )
}

export default Hero

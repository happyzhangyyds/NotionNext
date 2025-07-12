import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * 页面的 Head 组件，用于设置 SEO 相关 meta 标签
 */
const GlobalHead = (props) => {
  const router = useRouter()
  const global = useGlobal()
  const meta = getSEOMeta(props, router, global)

  const title = meta?.title || siteConfig('TITLE')
  const description = meta?.description || siteConfig('DESCRIPTION')
  const image = meta?.image || '/bg_image.jpg'
  const type = meta?.type || 'website'
  const keywords = meta?.tags || siteConfig('KEYWORDS')
  const lang = siteConfig('LANG')?.replace('-', '_') || 'zh_CN'
  const category = meta?.category || siteConfig('KEYWORDS')

  const baseUrl = siteConfig('LINK')
  const slug = meta?.slug || ''
  const url = slug ? `${baseUrl}/${slug}` : baseUrl

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
      <meta name="robots" content="follow, index" />
      <meta name="theme-color" content={siteConfig('BACKGROUND_DARK')} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content={lang} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig('TITLE')} />
      <meta property="og:type" content={type} />

      {/* Google Site Verification */}
      {siteConfig('SEO_GOOGLE_SITE_VERIFICATION') && (
        <meta name="google-site-verification" content={siteConfig('SEO_GOOGLE_SITE_VERIFICATION')} />
      )}

      {/* 文章页专属 meta */}
      {type === 'Post' && (
        <>
          {meta.publishDay && <meta property="article:published_time" content={meta.publishDay} />}
          <meta property="article:author" content={siteConfig('AUTHOR')} />
          <meta property="article:section" content={category} />
          {siteConfig('FACEBOOK_PAGE') && (
            <meta property="article:publisher" content={siteConfig('FACEBOOK_PAGE')} />
          )}
        </>
      )}

      {props.children}
    </Head>
  )
}

/**
 * 根据当前路由和页面类型生成 SEO 元信息
 */
const getSEOMeta = (props, router, global) => {
  const { locale } = global
  const { post, tag, category, page } = props
  const keyword = router?.query?.s || ''
  const route = router.route

  const defaultMeta = {
    description: siteConfig('DESCRIPTION'),
    image: siteConfig('HOME_BANNER_IMAGE'),
    type: 'website'
  }

  const titleSuffix = ` | ${siteConfig('TITLE')}`

  switch (route) {
    case '/':
      return {
        ...defaultMeta,
        title: siteConfig.HOME_TITLE || '花径不曾缘客扫，蓬门今始为君开',
        description: siteConfig.HOME_DESCRIPTION || defaultMeta.description,
        slug: ''
      }
    case '/archive':
      return {
        ...defaultMeta,
        title: `${locale.NAV.ARCHIVE}${titleSuffix}`,
        slug: 'archive'
      }
    case '/page/[page]':
      return {
        ...defaultMeta,
        title: `${page} | Page${titleSuffix}`,
        slug: `page/${page}`
      }
    case '/category/[category]':
    case '/category/[category]/page/[page]':
      return {
        ...defaultMeta,
        title: `${category} | ${locale.COMMON.CATEGORY}${titleSuffix}`,
        slug: `category/${category}`
      }
    case '/tag/[tag]':
    case '/tag/[tag]/page/[page]':
      return {
        ...defaultMeta,
        title: `${tag} | ${locale.COMMON.TAGS}${titleSuffix}`,
        slug: `tag/${tag}`
      }
    case '/search':
    case '/search/[keyword]':
    case '/search/[keyword]/page/[page]':
      return {
        ...defaultMeta,
        title: `${keyword ? keyword + ' | ' : ''}${locale.NAV.SEARCH}${titleSuffix}`,
        slug: `search${keyword ? '/' + keyword : ''}`
      }
    case '/404':
      return {
        title: `${siteConfig('TITLE')} | 页面找不到啦`,
        image: siteConfig('HOME_BANNER_IMAGE'),
        type: 'website'
      }
    case '/tag':
      return {
        ...defaultMeta,
        title: `${locale.COMMON.TAGS}${titleSuffix}`,
        slug: 'tag'
      }
    case '/category':
      return {
        ...defaultMeta,
        title: `${locale.COMMON.CATEGORY}${titleSuffix}`,
        slug: 'category'
      }
    default:
      return {
        title: post?.title ? `${post.title}${titleSuffix}` : `加载中${titleSuffix}`,
        description: post?.summary || defaultMeta.description,
        image: post?.pageCoverThumbnail || defaultMeta.image,
        slug: post?.slug,
        type: post?.type || 'article',
        category: post?.category?.[0],
        tags: post?.tags,
        publishDay: post?.publishDay
      }
  }
}

export default GlobalHead

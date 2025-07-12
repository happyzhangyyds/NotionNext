const BLOG = {
      NOTION_PAGE_ID:
            process.env.NOTION_PAGE_ID || '',
      PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || false, // 伪静态路径，开启后所有文章URL都以 .html 结尾。
      NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 5, // 更新内容缓存间隔 单位(秒)；即每个页面有5秒的纯静态期、此期间无论多少次访问都不会抓取notion数据；调大该值有助于节省Vercel资源、同时提升访问速率，但也会使文章更新有延迟。
      THEME: process.env.NEXT_PUBLIC_THEME || '', // 当前主题，在themes文件夹下可找到所有支持的主题；主题名称就是文件夹名，例如 example,fukasawa,gitbook,heo,hexo,landing,matery,medium,next,nobelium,plog,simple
      THEME_SWITCH: process.env.NEXT_PUBLIC_THEME_SWITCH || false, // 是否显示切换主题按钮
      LANG: process.env.NEXT_PUBLIC_LANG || 'en-US', // e.g 'zh-CN','en-US'  see /lib/lang.js for more.
      SINCE: process.env.NEXT_SINCE || 2023, // e.g if leave this empty, current year will be used.
      APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'auto', // ['light', 'dark', 'auto'], // light 日间模式 ， dark夜间模式， auto根据时间和主题自动夜间模式
      APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 7], // 夜间模式起至时间，false时关闭根据时间自动切换夜间模式
    
      // 3.14.1版本后，欢迎语在此配置，英文逗号隔开, 即可支持多个欢迎语打字效果。
      GREETING_WORDS: process.env.NEXT_PUBLIC_GREETING_WORDS || '少年辛苦终身事，莫向光阴惰寸功',
    
      CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true, // 支持Menu 类型，从3.12.0版本起，各主题将逐步支持灵活的二级菜单配置，替代了原来的Page类型，此配置是试验功能、默认关闭。
      CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true, // 支持Menu 类型，从3.12.0版本起，各主题将逐步支持灵活的二级菜单配置，替代了原来的Page类型，此配置是试验功能、默认关闭。
    
      AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'MatrixCore', // 您的昵称 例如 tangly1024
      BIO: process.env.NEXT_PUBLIC_BIO || '不是一座孤岛，而是与挚友风雨兼程', // 作者简介
      LINK: process.env.NEXT_PUBLIC_LINK || 'https://matrixcore.love', // 网站地址
      KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || 'Notion, MatrixCore,matrixcore,MatrixCore的博客,NotionNext,博客,学习分享,生活体验,Elog', // 网站关键词 英文逗号隔开
    
      // 社交链接，不需要可留空白，例如 CONTACT_WEIBO:''
      CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'matrixcore@qq.com', // 邮箱地址 例如mail@tangly1024.com
      CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'matrixcore@qq.com', // 邮箱地址 例如mail@tangly1024.com
      CONTACT_BILIBILI: process.env.NEXT_PUBLIC_CONTACT_BILIBILI || 'https://space.bilibili.com/690893106', // B站主页
    
      NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || 'https://www.notion.so', // Notion域名，您可以选择用自己的域名进行反向代理，如果不懂得什么是反向代理，请勿修改此项
    
      BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || 'https://bu.dusays.com/2024/06/10/6666e44cb4d6d.jpeg', // blog favicon 配置, 默认使用 /public/favicon.ico，支持在线图片，如 https://img.imesong.com/favicon.png
    
      IMAGE_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_WIDTH || 360, // 图片压缩宽度默认值，作用于博客封面和文章内容 越小加载图片越快
      IMAGE_ZOOM_IN_WIDTH: process.env.NEXT_PUBLIC_IMAGE_ZOOM_IN_WIDTH || 1200, // 文章图片点击放大后的画质宽度，不代表在网页中的实际展示宽度
    
    FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-serif font-light',
    
    // 字体CSS
    FONT_URL: [
      'https://store.matrixcore.love/lxgw/style.css',
    ],
    
    // 无衬线字体
    FONT_SANS: [
      '"LXGW WenKai Screen"',
    ],
    
    // 衬线字体
    FONT_SERIF: [
      '"LXGW WenKai Screen"',
    ],
    
    // font-awesome 字体图标地址
    FONT_AWESOME: process.env.NEXT_PUBLIC_FONT_AWESOME_PATH || 'https://store.matrixcore.love/font/all.min.css',
    
      // 路径和组件映射，不同路径分别展示主题的什么组件
      LAYOUT_MAPPINGS: {
        '-1': 'LayoutBase',
        '/': 'LayoutIndex',
        '/archive': 'LayoutArchive',
        '/memos': 'LayoutMemos',
        '/page/[page]': 'LayoutPostList',
        '/category/[category]': 'LayoutPostList',
        '/category/[category]/page/[page]': 'LayoutPostList',
        '/tag/[tag]': 'LayoutPostList',
        '/tag/[tag]/page/[page]': 'LayoutPostList',
        '/search': 'LayoutSearch',
        '/search/[keyword]': 'LayoutSearch',
        '/search/[keyword]/page/[page]': 'LayoutSearch',
        '/404': 'Layout404',
        '/tag': 'LayoutTagIndex',
        '/category': 'LayoutCategoryIndex',
        '/[prefix]': 'LayoutSlug',
        '/[prefix]/[slug]': 'LayoutSlug',
        '/[prefix]/[slug]/[...suffix]': 'LayoutSlug',
      },
    
      CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY || true, // 是否允许复制页面内容 默认允许，如果设置为false、则全栈禁止复制内容。
    
      // 侧栏布局 是否反转(左变右,右变左) 已支持主题: hexo next medium fukasawa example
      LAYOUT_SIDEBAR_REVERSE: process.env.NEXT_PUBLIC_LAYOUT_SIDEBAR_REVERSE || false,
    
      BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '苏ICP备2024132328号-1', // 备案号 闽ICP备XXXXXXX
    
      // PrismJs 代码相关
      PRISM_JS_PATH: process.env.NEXT_PUBLIC_PRISM_JS_PATH,
      PRISM_JS_AUTO_LOADER: process.env.NEXT_PUBLIC_PRISM_JS_AUTO_LOADER,
    
      // 代码主题 @see https://github.com/PrismJS/prism-themes
      PRISM_THEME_PREFIX_PATH: process.env.NEXT_PUBLIC_PRISM_THEME_PREFIX_PATH || '', // 代码块默认主题
      PRISM_THEME_SWITCH: process.env.NEXT_PUBLIC_PRISM_THEME_SWITCH || true, // 是否开启浅色/深色模式代码主题切换； 开启后将显示以下两个主题
      PRISM_THEME_LIGHT_PATH: process.env.NEXT_PUBLIC_PRISM_THEME_LIGHT_PATH || '', // 浅色模式主题
      PRISM_THEME_DARK_PATH: process.env.NEXT_PUBLIC_PRISM_THEME_DARK_PATH || '', // 深色模式主题
      CODE_MAC_BAR: process.env.NEXT_PUBLIC_CODE_MAC_BAR || true, // 代码左上角显示mac的红黄绿图标
      CODE_LINE_NUMBERS: process.env.NEXT_PUBLIC_CODE_LINE_NUMBERS || false, // 是否显示行号
      CODE_COLLAPSE: process.env.NEXT_PUBLIC_CODE_COLLAPSE || false, // 是否折叠代码框
    
      // Mermaid 图表CDN
      MERMAID_CDN: process.env.NEXT_PUBLIC_MERMAID_CDN || '', 

      // QRCodeCDN
      QR_CODE_CDN: process.env.NEXT_PUBLIC_QR_CODE_CDN || '',
      BACKGROUND_LIGHT: '#F5F5DC', // use hex value, don't forget '#' e.g #fffefc
      BACKGROUND_DARK: '#2E2E2E', // use hex value, don't forget '#'
      SUB_PATH: '', // leave this empty unless you want to deploy in a folder
    
      POST_SHARE_BAR_ENABLE: process.env.NEXT_PUBLIC_POST_SHARE_BAR || 'true', // 文章分享功能 ，将在底部显示一个分享条
      POSTS_SHARE_SERVICES: process.env.NEXT_PUBLIC_POST_SHARE_SERVICES || 'link,wechat', // 分享的服務，按顺序显示,逗号隔开
      POSTS_SHARE_SERVICES: process.env.NEXT_PUBLIC_POST_SHARE_SERVICES || 'link,wechat', // 分享的服務，按顺序显示,逗号隔开
      
      // POST类型文章的默认路径前缀，例如默认POST类型的路径是  /article/[slug]
      POST_URL_PREFIX: process.env.NEXT_PUBLIC_POST_URL_PREFIX || 'article',


      POST_LIST_STYLE: process.env.NEXT_PUBLIC_POST_LIST_STYLE || 'page', // ['page','scroll] 文章列表样式:页码分页、单页滚动加载
      POST_LIST_PREVIEW: process.env.NEXT_PUBLIC_POST_PREVIEW || 'false', //  是否在列表加载文章预览
      POST_PREVIEW_LINES: 1, // 预览博客行数
      POST_RECOMMEND_COUNT: 1, // 推荐文章数量
      POSTS_PER_PAGE: 3, // post counts per page
      POSTS_SORT_BY: process.env.NEXT_PUBLIC_POST_SORT_BY || 'notion', // 排序方式 'date'按时间,'notion'由notion控制
      POST_WAITING_TIME_FOR_404: process.env.NEXT_PUBLIC_POST_WAITING_TIME_FOR_404 || '5', // 文章加载超时时间，单位秒；超时后跳转到404页面
    
      //ALGOLIA相关
      ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '', // 在这里查看 https://dashboard.algolia.com/account/api-keys/
      ALGOLIA_ADMIN_APP_KEY: process.env.ALGOLIA_ADMIN_APP_KEY || '', // 管理后台的KEY，不要暴露在代码中，在这里查看 https://dashboard.algolia.com/account/api-keys/
      ALGOLIA_SEARCH_ONLY_APP_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_APP_KEY || '', // 客户端搜索用的KEY
      ALGOLIA_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_INDEX || '', // 在Algolia中创建一个index用作数据库
      ALGOLIA_RECREATE_DATA: process.env.ALGOLIA_RECREATE_DATA || process.env.npm_lifecycle_event === 'build', // 为true时重新构建索引数据; 默认在build时会构建
      PREVIEW_CATEGORY_COUNT: 7, // 首页最多展示的分类数量，0为不限制
      PREVIEW_TAG_COUNT: 7, // 首页最多展示的标签数量，0为不限制

      // 画册视图禁止点击
      POST_DISABLE_GALLERY_CLICK: process.env.NEXT_PUBLIC_POST_DISABLE_GALLERY_CLICK || true, // 画册视图禁止点击，方便在友链页面的画册插入链接
    
      // Twikoo 评论系统配置
      COMMENT_TWIKOO_ENV_ID: process.env.NEXT_PUBLIC_COMMENT_ENV_ID || 'https://twikoo.matrixcore.top', // Twikoo 环境 ID 或 Vercel 域名
      COMMENT_TWIKOO_COUNT_ENABLE: process.env.NEXT_PUBLIC_COMMENT_TWIKOO_COUNT_ENABLE, // 是否显示评论数
      COMMENT_TWIKOO_CDN_URL: process.env.NEXT_PUBLIC_COMMENT_TWIKOO_CDN_URL || 'https://store.matrixcore.love/twikoo/1.6.22/twikoo.min.js', // Twikoo 客户端 CDN 地址
    
      // 自定义配置notion数据库字段名
      NOTION_PROPERTY_NAME: {
            type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type',
            type_post: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || 'Post',
            type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || 'Page',
            type_notice: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || 'Notice',
            type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || 'Menu',
          
            title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title',
            status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status',
            status_publish: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Published',
            status_invisible: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || 'Invisible',
          
            summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary',
            slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug',
            category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category',
            date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date',
            tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags'
          },
    
      // RSS订阅
      ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS || true, // 是否开启RSS订阅功能
    
      // 作废配置（优先使用 Notion 数据，以下为默认占位）
      AVATAR: process.env.NEXT_PUBLIC_AVATAR || '/avatar.svg', // 默认头像
      TITLE: process.env.NEXT_PUBLIC_TITLE || 'MatrixCore',     // 默认站点标题（不可为空）
      HOME_BANNER_IMAGE: process.env.NEXT_PUBLIC_HOME_BANNER_IMAGE || '/bg_image.jpg', // 默认首页封面图
      DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION || '🎉Welcome to MatrixCore！🎉', // 默认描述

    
      // 网站图片
      IMG_LAZY_LOAD_PLACEHOLDER: process.env.NEXT_PUBLIC_IMG_LAZY_LOAD_PLACEHOLDER || 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      IMG_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMG_COMPRESS_WIDTH || 600,
    
      // 开发相关
      ENABLE_CACHE: process.env.ENABLE_CACHE || process.env.npm_lifecycle_event === 'build' || process.env.npm_lifecycle_event === 'export', // 在打包过程中默认开启缓存
      isProd: process.env.VERCEL_ENV === 'production', // 区分开发和生产环境
      VERSION: process.env.NEXT_PUBLIC_VERSION // 版本号
    }
    
    module.exports = BLOG

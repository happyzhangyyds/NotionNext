const CONFIG = {
  HOME_BANNER_ENABLE: false,

  SITE_CREATE_TIME: '2023-04-20', // 建站日期，用于计算网站运行的第几天

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  NOTICE_BAR: [
    { title: '欢迎来到我的博客', url: 'https://matrixcore.top' },
    { title: '分享有趣的科技知识', url: 'https://matrixcore.top/article/poem' }
  ],

  // 英雄区(首页顶部大卡)
  HERO_TITLE_1: '岁月长廊',
  HERO_TITLE_2: '',
  HERO_TITLE_3: 'MATRIXCORE.TOP',
  HERO_TITLE_4: '秘密树洞',
  HERO_TITLE_5: '乘着时光胶囊看岁月的晴雨表',
  HERO_TITLE_LINK: 'https://matrixcore.top/article/feedback',

  // 英雄区显示三个置顶分类
  HERO_CATEGORY_1: { title: '必看精选', url: '/tag/必看精选' },
  HERO_CATEGORY_2: { title: '热门文章', url: '/tag/热门文章' },
  HERO_CATEGORY_3: { title: '实用教程', url: '/tag/实用教程' },

  // 英雄区右侧推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  HERO_RECOMMEND_POST_TAG: '推荐',
  HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 推荐文章排序，为`true`时将强制按最后修改时间倒序

  // 右侧个人资料卡牌欢迎语，点击可自动切换
  INFOCARD_GREETINGS: [
    '你好！我是',
    '🔍 分享与热心帮助',
    '🤝 专修交互与设计',
    '🏃 脚踏实地行动派',
    '🏠 智能家居小能手',
    '🤖️ 数码科技爱好者',
    '🧱 团队小组发动机'
  ],
  INFO_CARD_URL: 'https://github.com/tangly1024/NotionNext', // 个人资料底部按钮链接

  // 用户技能图标
  GROUP_ICONS: [
    {
      title_1: 'AfterEffect',
      img_1: '/images/heo/1.png',
      color_1: '#C7EDCC',
      title_2: 'Sketch',
      img_2: '/images/heo/2.png',
      color_2: '#E9EBFE'
    },
    {
      title_1: 'Docker',
      img_1: '/images/heo/3.png',
      color_1: '#FAF9DE',
      title_2: 'Photoshop',
      img_2: '/images/heo/4.png',
      color_2: '#DCE2F1'
    },
    {
      title_1: 'FinalCutPro',
      img_1: '/images/heo/5.png',
      color_1: '#FDE6E0',
      title_2: 'Python',
      img_2: '/images/heo/6.png',
      color_2: '#FFF2E2'
    },
    {
      title_1: 'Swift',
      img_1: '/images/heo/7.png',
      color_1: '#FDE6E0',
      title_2: 'Principle',
      img_2: '/images/heo/8.png',
      color_2: '#DCE2F1'
    },
    {
      title_1: 'illustrator',
      img_1: '/images/heo/9.png',
      color_1: '#E9EBFE',
      title_2: 'CSS3',
      img_2: '/images/heo/10.png',
      color_2: '#E3EDCD'
    },
    {
      title_1: 'JS',
      img_1: '/images/heo/11.png',
      color_1: '#FFF2E2',
      title_2: 'HTML',
      img_2: '/images/heo/12.png',
      color_2: '#E3EDCD'
    },
    {
      title_1: 'Git',
      img_1: '/images/heo/13.png',
      color_1: '#E9EBFE',
      title_2: 'Rhino',
      img_2: '/images/heo/14.png',
      color_2: '#FDE6E0'
    }
  ],

  SOCIAL_CARD: false, // 是否显示右侧，点击加入社群按钮
  SOCIAL_CARD_TITLE_1: '交流频道',
  SOCIAL_CARD_TITLE_2: '加入我们的社群讨论分享',
  SOCIAL_CARD_TITLE_3: '点击加入社群',
  SOCIAL_CARD_URL: 'https://docs.tangly1024.com/article/how-to-question',

  // *****  以下配置无效，只是预留开发 ****
  // 菜单配置
  MENU_INDEX: true, // 显示首页
  MENU_CATEGORY: true, // 显示分类
  MENU_TAG: true, // 显示标签
  MENU_ARCHIVE: true, // 显示归档
  MENU_SEARCH: true, // 显示搜索

  POST_LIST_COVER: true, // 列表显示文章封面
  POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  POST_LIST_SUMMARY: true, // 文章摘要
  POST_LIST_PREVIEW: false, // 读取文章预览
  POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  ARTICLE_RECOMMEND: true, // 文章关联推荐

  WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  WIDGET_ANALYTICS: false, // 显示统计卡
  WIDGET_TO_TOP: true,
  WIDGET_TO_COMMENT: true, // 跳到评论区
  WIDGET_DARK_MODE: true, // 夜间模式
  WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG

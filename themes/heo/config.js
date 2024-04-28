const CONFIG = {
  HOME_BANNER_ENABLE: false,

<<<<<<< HEAD
  HEO_SITE_CREATE_TIME: '2023-04-20', // 建站日期，用于计算网站运行的第几天

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  HEO_NOTICE_BAR: [
    { title: '风雨如晦，鸡鸣不已。既见君子，云胡不喜？', url: 'https://matrixcore.top/article/feedback' },
    { title: '呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。', url: 'https://matrixcore.top/links' },
    { title: '昔我往矣，杨柳依依。今我来思，雨雪霏霏。', url: 'https://matrixcore.top/article/Terminal' }
=======
  SITE_CREATE_TIME: '2023-04-20', // 建站日期，用于计算网站运行的第几天

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  NOTICE_BAR: [ 
  { title: '风雨如晦，鸡鸣不已。既见君子，云胡不喜？', url: 'https://matrixcore.top/article/feedback' },
  { title: '呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。', url: 'https://matrixcore.top/links' },
  { title: '昔我往矣，杨柳依依。今我来思，雨雪霏霏。', url: 'https://matrixcore.top/article/Terminal' }
>>>>>>> main
  ],

  // 英雄区左右侧组件颠倒位置
  HEO_HERO_REVERSE: false,
  // 博客主体区左右侧组件颠倒位置
  HEO_HERO_BODY_REVERSE:false,

  // 英雄区(首页顶部大卡)
<<<<<<< HEAD
  HEO_HERO_TITLE_1: '岁月长廊',
  HEO_HERO_TITLE_2: '',
  HEO_HERO_TITLE_3: 'MATRIXCORE.LIFE',
  HEO_HERO_TITLE_4: '秘密树洞',
  HEO_HERO_TITLE_5: '乘着时光胶囊看岁月的晴雨表',
  HEO_HERO_TITLE_LINK: 'https://matrixcore.top/article/feedback',
=======
  HERO_TITLE_1: '岁月长廊',
  HERO_TITLE_2: '',
  HERO_TITLE_3: 'MATRIXCORE.TOP',
  HERO_TITLE_4: '秘密树洞',
  HERO_TITLE_5: '乘着时光胶囊看岁月的晴雨表',
  HERO_TITLE_LINK: 'https://matrixcore.top/article/feedback',
>>>>>>> main

  // 英雄区显示三个置顶分类
  HEO_HERO_CATEGORY_1: { title: '必看精选', url: '/tag/必看精选' },
  HEO_HERO_CATEGORY_2: { title: '热门文章', url: '/tag/热门文章' },
  HEO_HERO_CATEGORY_3: { title: '实用教程', url: '/tag/实用教程' },

  // 英雄区右侧推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  HEO_HERO_RECOMMEND_POST_TAG: '推荐',
  HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 推荐文章排序，为`true`时将强制按最后修改时间倒序
  //   HERO_RECOMMEND_COVER: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg', // 英雄区右侧图片

  // 右侧个人资料卡牌欢迎语，点击可自动切换
  HEO_INFOCARD_GREETINGS: [
    '你好！我是'
  ],
  HEO_INFO_CARD_URL: 'https://github.com/tangly1024/NotionNext', // 个人资料底部按钮链接

  // 用户技能图标
  HEO_GROUP_ICONS: [
    {
      title_1: 'AfterEffect',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b55c1f64b.jpeg',
      color_1: '#C7EDCC',
      title_2: 'Sketch',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b554072f1.jpeg',
=======
      img_1: '/images/heo/1.png',
      color_1: '#C7EDCC',
      title_2: 'Sketch',
      img_2: '/images/heo/2.png',
>>>>>>> main
      color_2: '#E9EBFE'
    },
    {
      title_1: 'Docker',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b54fda7db.jpeg',
      color_1: '#FAF9DE',
      title_2: 'Photoshop',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b54b9a977.jpeg',
=======
      img_1: '/images/heo/3.png',
      color_1: '#FAF9DE',
      title_2: 'Photoshop',
      img_2: '/images/heo/4.png',
>>>>>>> main
      color_2: '#DCE2F1'
    },
    {
      title_1: 'FinalCutPro',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b546ea2ae.jpeg',
      color_1: '#FDE6E0',
      title_2: 'Python',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b54329566.jpeg',
=======
      img_1: '/images/heo/5.png',
      color_1: '#FDE6E0',
      title_2: 'Python',
      img_2: '/images/heo/6.png',
>>>>>>> main
      color_2: '#FFF2E2'
    },
    {
      title_1: 'Swift',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b53d031bd.jpeg',
      color_1: '#FDE6E0',
      title_2: 'Principle',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b5382cae0.jpeg',
=======
      img_1: '/images/heo/7.png',
      color_1: '#FDE6E0',
      title_2: 'Principle',
      img_2: '/images/heo/8.png',
>>>>>>> main
      color_2: '#DCE2F1'
    },
    {
      title_1: 'illustrator',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b5311893b.jpeg',
      color_1: '#E9EBFE',
      title_2: 'CSS3',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b52d1db2b.jpeg',
=======
      img_1: '/images/heo/9.png',
      color_1: '#E9EBFE',
      title_2: 'CSS3',
      img_2: '/images/heo/10.png',
>>>>>>> main
      color_2: '#E3EDCD'
    },
    {
      title_1: 'JS',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b52697872.jpeg',
      color_1: '#FFF2E2',
      title_2: 'HTML',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b51f4a4a8.jpeg',
=======
      img_1: '/images/heo/11.png',
      color_1: '#FFF2E2',
      title_2: 'HTML',
      img_2: '/images/heo/12.png',
>>>>>>> main
      color_2: '#E3EDCD'
    },
    {
      title_1: 'Git',
<<<<<<< HEAD
      img_1: 'https://bu.dusays.com/2024/04/23/6627b5193f9c4.jpeg',
      color_1: '#E9EBFE',
      title_2: 'Rhino',
      img_2: 'https://bu.dusays.com/2024/04/23/6627b51019e2b.jpeg',
=======
      img_1: '/images/heo/13.png',
      color_1: '#E9EBFE',
      title_2: 'Rhino',
      img_2: '/images/heo/14.png',
>>>>>>> main
      color_2: '#FDE6E0'
    }
  ],

<<<<<<< HEAD
  HEO_SOCIAL_CARD: false, // 是否显示右侧，点击加入社群按钮
  HEO_SOCIAL_CARD_TITLE_1: '交流频道',
  HEO_SOCIAL_CARD_TITLE_2: '加入我们的社群讨论分享',
  HEO_SOCIAL_CARD_TITLE_3: '点击加入社群',
  HEO_SOCIAL_CARD_URL: 'https://docs.tangly1024.com/article/how-to-question',
=======
  SOCIAL_CARD: false, // 是否显示右侧，点击加入社群按钮
  SOCIAL_CARD_TITLE_1: '交流频道',
  SOCIAL_CARD_TITLE_2: '加入我们的社群讨论分享',
  SOCIAL_CARD_TITLE_3: '点击加入社群',
  SOCIAL_CARD_URL: 'https://docs.tangly1024.com/article/how-to-question',
>>>>>>> main

  // *****  以下配置无效，只是预留开发 ****
  // 菜单配置
  HEO_MENU_INDEX: true, // 显示首页
  HEO_MENU_CATEGORY: true, // 显示分类
  HEO_MENU_TAG: true, // 显示标签
  HEO_MENU_ARCHIVE: true, // 显示归档
  HEO_MENU_SEARCH: true, // 显示搜索

  HEO_POST_LIST_COVER: true, // 列表显示文章封面
  HEO_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  HEO_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  HEO_POST_LIST_SUMMARY: true, // 文章摘要
  HEO_POST_LIST_PREVIEW: false, // 读取文章预览
  HEO_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  HEO_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  HEO_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  HEO_ARTICLE_RECOMMEND: true, // 文章关联推荐

  HEO_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  HEO_WIDGET_ANALYTICS: false, // 显示统计卡
  HEO_WIDGET_TO_TOP: true,
  HEO_WIDGET_TO_COMMENT: true, // 跳到评论区
  HEO_WIDGET_DARK_MODE: true, // 夜间模式
  HEO_WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG

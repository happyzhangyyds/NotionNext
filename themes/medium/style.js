/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      // 夜间模式下的背景颜色和字体颜色
      .dark body {
        background-color: black; /* 背景颜色为黑色 */
        color: #c5a880; /* 字体颜色为柔和的暗金色 */
      }

      // 夜间模式下链接的颜色
      .dark a {
        color: #E0E0E0; 
      }

      夜间模式下标题的颜色
      .dark h1,
      .dark h2,
      .dark h3,
      .dark h4,
      .dark h5,
      .dark h6 {
        color: #c5a880; 
      }
    `}</style>
  );
};

export { Style };

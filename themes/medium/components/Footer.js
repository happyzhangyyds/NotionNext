import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/config';

const Footer = ({ title }) => {
  // 用于存储是否为移动端的状态
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 定义判断是否为移动端的函数
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1680);
    };

    // 初始化时判断一次窗口大小
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 组件卸载时清除事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 移动端 Footer
  if (isMobile) {
    return (
      <footer className="relative z-10 flex-shrink-0 bg-[#F5F5DC] dark:bg-[#121212] justify-center text-center m-auto w-full leading-6 text-gray-600 dark:text-gray-100 text-sm">
        <div className="flex items-center justify-center">
          <span className="mx-1 text-pink-200">💐</span>
          <div className="p-1">少年辛苦终身事，莫向光阴惰寸功</div>
        </div>
      </footer>
    );
  }

  // 桌面端 Footer
  return (
    <footer className="relative z-10 flex-shrink-0 bg-[#F5F5DC] dark:bg-[#121212] justify-center text-center m-auto w-full leading-6 text-gray-600 dark:text-gray-100 text-sm">
      {/* 底部页面信息 */}
      <div
        id="footer-bottom"
        className="w-full h-12 flex flex-col p-1 lg:flex-row justify-between px-5 items-center bg-[#F5F5DC] dark:bg-[#121212]"
      >
        {/* 左侧内容 - 友链 */}
        <div id="footer-bottom-left">
          <i className="mx-1 animate-pulse fas fa-heart text-pink-200" />
          <a
            href={siteConfig('LINK')}
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            {siteConfig('AUTHOR')}
          </a>
          <a
            href="http://www.andawell.com"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            Andawell
          </a>
          <a
            href="https://blog.tangly1024.com/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            Tangly
          </a>
          <a
            href="https://blog.1874.cool/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            1874
          </a>
          <a
            href="https://www.wys.me/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            王语双
          </a>
          <a
            href="https://dusays.com/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            杜老师
          </a>
          <a
            href="https://chenge.ink/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            尘歌
          </a>
          <a
            href="https://shiyu.dev/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            时雨
          </a>
          <a
            href="https://yayu.net/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            雅余
          </a>
          <a
            href="https://veryjack.com/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            Jack
          </a>
          <a
            href="https://www.hsuyeung.com"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            Hsu Yeung
          </a>
          <a
            href="https://crowya.com/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            鸦鸦
          </a>
          <a
            href="https://kuangyichen.com/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            易浅
          </a>
          <a
            href="https://www.cnblogs.com/sixuwuxian"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            思绪无限
          </a>
          <a
            href="https://wangyurui.com"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            太隐
          </a>
          <a
            href="https://www.tomatolist.com/faq.html"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            老周
          </a>

          <a
            href="https://quidc.com/"
            style={{ marginRight: '10px' }}
            className="underline font-bold dark:text-gray-300"
          >
            趣网数据
          </a>
        </div>

        {/* 右侧内容 - 备案信息 */}
        <div
          id="footer-bottom-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap', // 添加 flex-wrap
          }}
        >
          {siteConfig('BEI_AN') && (
            <a
              href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px', // 添加间距，防止换行时元素重叠
              }}
            >
              <img
                src="https://bu.dusays.com/2024/10/18/67124dd4ce55e.png"
                alt="备案图标"
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
              />
              <span>{siteConfig('BEI_AN')}</span>
            </a>
          )}
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=44011102484010"
            rel="noreferrer"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px', // 添加间距，防止换行时元素重叠
            }}
          >
            <img
              src="https://bu.dusays.com/2024/10/18/67124b6f6b416.png"
              alt="公安备案图标"
              style={{ width: '20px', height: '20px', marginRight: '5px' }}
            />
            粤公网安备44011102484010
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

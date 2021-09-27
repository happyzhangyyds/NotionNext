import BLOG from '@/blog.config'

const ThirdPartyScript = () => {
  return <>
    {/* GoogleAdsense */}
    { BLOG.isProd && (
      <>
        {BLOG.googleAdsense && (
          <script data-ad-client='ca-pub-2708419466378217' async
                  src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' />
        )}

        {/* 统计脚本 */}
        { BLOG.analytics.provider === 'ackee' && (
          <script async src={BLOG.analytics.ackeeConfig.tracker}
                  data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
                  data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
          />
        )}
        {/* 百度 */}
        {BLOG.analytics.baidyAnalytics && (
          <script async
                  dangerouslySetInnerHTML={{
                    __html: `
                  var _hmt = _hmt || [];
                  (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?${BLOG.analytics.baidyAnalytics}";
                    var s = document.getElementsByTagName("script")[0]; 
                    s.parentNode.insertBefore(hm, s);
                  })();
                  `
                  }}
          />
        )}
        {/* 不蒜子 */}
        {BLOG.analytics.busuanzi && (
          <script async
                  src={'//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'}
          />
        )}

        {/* 站长统计 */}
        {BLOG.isProd && (
          <script async
                  dangerouslySetInnerHTML={{
                    __html: `
                  document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1279970751'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D1279970751' type='text/javascript'%3E%3C/script%3E"));
                  `
                  }}
          />
        )}

        {/* 谷歌统计 */}
        {BLOG.analytics.provider === 'ga' && (
          <>
            <script async
                    src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
            />
            <script async
                    dangerouslySetInnerHTML={{
                      __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
                          page_path: window.location.pathname,
                        });
                      `
                    }}
            />
          </>
        )}
      </>
    )}
  </>
}

export default ThirdPartyScript

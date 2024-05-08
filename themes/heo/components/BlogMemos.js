import React, { useEffect, useState } from 'react';
import { loadExternalResource } from '@/lib/utils';

const BlogMemos = () => {
    const [isResourcesLoaded, setResourcesLoaded] = useState(false);
        // 设置页面标题
    useEffect(() => {
        const originalTitle = document.title; // 保存当前标题
        document.title = "岁月轻歌"; // 设置新的标题
    
        // 组件卸载时还原原来的标题
        return () => {
            document.title = originalTitle;
        };
        }, []);
    

    useEffect(() => {
        // 并行加载CSS文件
        Promise.all([
            loadExternalResource('/css/memos.css', 'css'),
            loadExternalResource('/css/highlight.github.min.css', 'css'),
            loadExternalResource('/js/lazyload.min.js?v=17.8.3', 'js'),
            loadExternalResource('/js/marked.min.js?v=11.1.1', 'js'),
            loadExternalResource('/js/view-image.min.js?v=2.0.2', 'js'),
            loadExternalResource('/js/highlight.min.js?v=11.9.0', 'js'),
            loadExternalResource('/js/moment.min.js?v=2.30.1', 'js'),
        ])
        .then(() => {
            // 保证moment.js加载完成后再加载moment.twitter.js
            return loadExternalResource('/js/moment.twitter.js', 'js');
        })
        .then(() => {
            setResourcesLoaded(true); // 设置资源加载完成的状态
        })
        .catch(console.error);
    }, []);

    useEffect(() => {
        if (isResourcesLoaded) {
            // 当所有资源加载完成后，加载 memos.js
            const script = document.createElement('script');
            script.src = '/js/memos.js';
            script.async = true;
            document.body.appendChild(script);
            return () => {
                // 组件卸载时移除script
                document.body.removeChild(script);
            };
        }
    }, [isResourcesLoaded]); // 依赖于资源加载状态
    
    return (
        <section id="main" className="container">
            <h2>岁月轻歌</h2>
            <div className="total">一共 <span id="total">0</span> 条随想 🎉</div>
            <blockquote id="tag-filter" className="filter">
                <div id="tags"></div>
            </blockquote>

            <div id="memos" className="memos">
                {/* Memos Container */}
            </div>
        </section>
    );
};

export default BlogMemos;
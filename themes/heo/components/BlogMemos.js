import React, { useEffect, useState } from 'react';
import { loadExternalResource } from '@/lib/utils';

const BlogMemos = () => {
    const [isResourcesLoaded, setResourcesLoaded] = useState(false);

    useEffect(() => {
        const originalTitle = document.title;
        document.title = "岁月轻歌";

        return () => {
            document.title = originalTitle;
        };
    }, []);

    useEffect(() => {
        const loadResources = async () => {
            try {
                await Promise.all([
                    loadExternalResource('/css/memos.css', 'css'),
                    loadExternalResource('/css/highlight.github.min.css', 'css'),
                    loadExternalResource('/js/lazyload.min.js?v=17.8.3', 'js'),
                    loadExternalResource('/js/marked.min.js?v=11.1.1', 'js'),
                    loadExternalResource('/js/view-image.min.js?v=2.0.2', 'js'),
                    loadExternalResource('/js/highlight.min.js?v=11.9.0', 'js'),
                    loadExternalResource('/js/moment.min.js?v=2.30.1', 'js'),
                ]);
                await loadExternalResource('/js/moment.twitter.js', 'js');
                setResourcesLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        loadResources();
    }, []);

    useEffect(() => {
        if (!isResourcesLoaded) return;
        
        const script = document.createElement('script');
        script.src = '/js/memos.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [isResourcesLoaded]);

    return (
        <section id="main" className="container">
            <h2>岁月轻歌</h2>
            <blockquote id="tag-filter" className="filter">
                <div id="tags"></div>
            </blockquote>
            <div id="memos1" className="memos"></div>
            <div id="memos2" className="memos"></div>
            <div id="memos3" className="memos"></div>
            <div id="memos4" className="memos"></div>
            <div id="memos5" className="memos"></div>
            <div id="memos6" className="memos"></div>
            <div id="memos7" className="memos"></div>
        </section>
    );
};

export default BlogMemos;

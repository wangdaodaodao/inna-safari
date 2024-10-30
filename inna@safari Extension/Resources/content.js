/**
 * 查找页面中的视频源
 * @returns {string[]} 视频源数组
 */
function findVideoSources() {
    const videoSources = new Set();
    const mediaPatterns = {
        m3u8: /https?:\/\/[^"'\s]*?\.m3u8[^"'\s]*/g,
        mp4: /https?:\/\/[^"'\s]*?\.mp4[^"'\s]*/g
    };

    // 检查 video 标签及其 source 子标签
    document.querySelectorAll('video').forEach(video => {
        if (video.src) videoSources.add(video.src);
        video.querySelectorAll('source').forEach(source => {
            if (source.src) videoSources.add(source.src);
        });
    });

    // 在页面内容中查找媒体链接
    const pageContent = document.documentElement.innerHTML;
    Object.values(mediaPatterns).forEach(pattern => {
        const matches = pageContent.match(pattern);
        if (matches) {
            matches.forEach(url => videoSources.add(url));
        }
    });

    return Array.from(videoSources);
}

/**
 * 检查当前网站是否允许处理
 * @returns {boolean} 是否允许处理
 */
function isAllowedWebsite() {
    const blockedDomains = ['youtube.com', 'bilibili.com'];
    const currentHost = window.location.hostname;
    return !blockedDomains.some(domain => currentHost.includes(domain));
}

/**
 * 发送视频源到 background.js
 * @param {string[]} sources - 视频源数组
 */
function sendVideoSourcesToBackground(sources) {
    if (!sources?.length || !isAllowedWebsite()) return;
    
    browser.runtime.sendMessage({
        type: 'videoSourcesFound',
        sources: sources
    });
}

/**
 * 监听右键点击事件
 */
document.addEventListener('contextmenu', function(e) {
    if (!isAllowedWebsite()) return;

    const videoSources = findVideoSources();
    if (videoSources.length > 0) {
        sendVideoSourcesToBackground(videoSources);
    }
}, true);
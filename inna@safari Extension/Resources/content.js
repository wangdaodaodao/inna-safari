// 查找页面中的视频源
function findVideoSources() {
    let videoSources = new Set();

    // 检查 video 标签
    document.querySelectorAll('video').forEach(video => {
        if (video.src) videoSources.add(video.src);
        
        // 检查 source 标签
        video.querySelectorAll('source').forEach(source => {
            if (source.src) videoSources.add(source.src);
        });
    });

    // 查找 m3u8 链接
    const pageContent = document.documentElement.innerHTML;
    const m3u8Regex = /https?:\/\/[^"'\s]*?\.m3u8[^"'\s]*/g;
    const m3u8Matches = pageContent.match(m3u8Regex);
    if (m3u8Matches) {
        m3u8Matches.forEach(url => videoSources.add(url));
    }

    // 查找 mp4 链接
    const mp4Regex = /https?:\/\/[^"'\s]*?\.mp4[^"'\s]*/g;
    const mp4Matches = pageContent.match(mp4Regex);
    if (mp4Matches) {
        mp4Matches.forEach(url => videoSources.add(url));
    }

    return Array.from(videoSources);
}

// 处理右键点击事件
document.addEventListener('contextmenu', function(e) {
    // 存储找到的视频源
    const videoSources = findVideoSources();
    if (videoSources.length > 0) {
        // 将找到的视频源存储在 sessionStorage 中
        sessionStorage.setItem('videoSources', JSON.stringify(videoSources));
    }
}, true);
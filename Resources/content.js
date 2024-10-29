function findVideoUrl() {
    // 查找页面中的视频元素
    const videoElement = document.querySelector('video');
    if (videoElement && videoElement.src) {
        return videoElement.src;
    }
    
    // 查找视频源
    const videoSource = document.querySelector('video source');
    if (videoSource && videoSource.src) {
        return videoSource.src;
    }
    
    // 如果找不到视频元素，返回当前页面 URL
    return window.location.href;
}

// 监听来自 popup 的消息
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getVideoUrl") {
        sendResponse({ url: findVideoUrl() });
    }
}); 
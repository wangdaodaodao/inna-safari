/**
 * 创建右键菜单
 */
browser.contextMenus.create({
    id: "openInIINA",
    title: "Open Video in IINA Player",
    contexts: ["all"]
});

/**
 * 存储视频源的映射
 * @type {Map<number, string[]>}
 */
const videoSourcesMap = new Map();

/**
 * 使用 IINA 打开视频
 * @param {string} url - 视频地址
 * @param {number} tabId - 标签页 ID
 */
function openWithIINA(url, tabId) {
    if (!url) return;
    const iinaUrl = `iina://weblink?url=${encodeURIComponent(url)}`;
    browser.tabs.update(tabId, { url: iinaUrl });
}

/**
 * 监听来自 content.js 的消息
 */
browser.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'videoSourcesFound' && message.sources) {
        // 存储该标签页的视频源
        videoSourcesMap.set(sender.tab.id, message.sources);
        
        // 更新右键菜单标题
        browser.contextMenus.update("openInIINA", {
            title: "Open Video in IINA Player",
            visible: true
        });
    }
});

/**
 * 处理右键菜单点击
 */
browser.contextMenus.onClicked.addListener((info, tab) => {
    const url = tab.url;
    
    // 检查是否有存储的视频源
    const videoSources = videoSourcesMap.get(tab.id);
    if (videoSources?.length > 0) {
        openWithIINA(videoSources[0], tab.id);
        return;
    }

    // 处理特定网站
    if (url.includes('bilibili.com')) {
        const bvMatch = url.match(/BV\w+/);
        if (bvMatch) {
            const processedUrl = `https://www.bilibili.com/video/${bvMatch[0]}/`;
            openWithIINA(processedUrl, tab.id);
        }
    } else if (url.includes('youtube.com')) {
        openWithIINA(url, tab.id);
    }
});

/**
 * 当标签页关闭时清理存储的视频源
 */
browser.tabs.onRemoved.addListener((tabId) => {
    videoSourcesMap.delete(tabId);
});

browser.contextMenus.create({
    id: "openInIINA",
    title: browser.i18n.getMessage("menuTitle"),
    contexts: ["all"]
});



// 创建右键菜单
browser.contextMenus.create({
    id: "openInIINA",
    title: "在 IINA 中打开视频",
    contexts: ["all"]
});

// 处理右键菜单点击
browser.contextMenus.onClicked.addListener((info, tab) => {
    const url = tab.url;
    console.log('Current URL:', url); // 调试日志

    // 检查是否是 YouTube 或 Bilibili
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        handleYouTube(url, tab);
    } else if (url.includes('bilibili.com')) {
        handleBilibili(url, tab);
    } else {
        // 其他网站的处理逻辑
        handleOtherSites(tab);
    }
});

// 处理 YouTube
function handleYouTube(url, tab) {
    console.log('Handling YouTube URL:', url); // 调试日志
    
    // 直接使用 YouTube URL
    const iinaUrl = `iina://weblink?url=${encodeURIComponent(url)}`;
    openInIINA(iinaUrl, tab);
}

// 处理 Bilibili
function handleBilibili(url, tab) {
    console.log('Handling Bilibili URL:', url); // 调试日志
    
    // 提取 BV 号
    const bvMatch = url.match(/BV\w+/);
    if (bvMatch) {
        const cleanUrl = `https://www.bilibili.com/video/${bvMatch[0]}/`;
        const iinaUrl = `iina://weblink?url=${encodeURIComponent(cleanUrl)}`;
        openInIINA(iinaUrl, tab);
    } else {
        // 如果没有找到 BV 号，使用原始 URL
        const iinaUrl = `iina://weblink?url=${encodeURIComponent(url)}`;
        openInIINA(iinaUrl, tab);
    }
}

// 处理其他网站
function handleOtherSites(tab) {
    browser.tabs.executeScript(tab.id, {
        code: `
            (function() {
                const videoElement = document.querySelector('video');
                if (videoElement) {
                    return videoElement.src || videoElement.currentSrc;
                }
                return window.location.href;
            })();
        `
    }, (results) => {
        if (results && results[0]) {
            const videoUrl = results[0];
            const iinaUrl = `iina://weblink?url=${encodeURIComponent(videoUrl)}`;
            openInIINA(iinaUrl, tab);
        }
    });
}

// 统一的打开 IINA 函数
function openInIINA(iinaUrl, tab) {
    console.log('Opening IINA URL:', iinaUrl); // 调试日志
    
    // 使用 tabs.update 打开 IINA
    browser.tabs.update(tab.id, {
        url: iinaUrl
    });
}
// 创建右键菜单
browser.contextMenus.create({
    id: "openInIINA",
    title: "在 IINA 中打开视频",
    contexts: ["all"]
});

// 处理右键菜单点击
browser.contextMenus.onClicked.addListener((info, tab) => {
    console.log('Menu clicked:', info, tab);  // 调试信息
    
    // 获取当前页面 URL
    const url = tab.url;
    console.log('Current URL:', url);  // 调试信息
    
    // 注入脚本来获取视频 URL
    browser.tabs.executeScript(tab.id, {
        code: `
            // 查找视频元素
            const videos = document.getElementsByTagName('video');
            if (videos.length > 0) {
                videos[0].src || videos[0].currentSrc;
            } else {
                window.location.href;
            }
        `
    }, (results) => {
        console.log('Found video URL:', results);  // 调试信息
        
        if (results && results[0]) {
            const videoUrl = results[0];
            // 构造 IINA URL
            const iinaUrl = `iina://weblink?url=${encodeURIComponent(videoUrl)}`;
            console.log('Opening IINA URL:', iinaUrl);  // 调试信息
            
            // 打开 IINA
            window.location.href = iinaUrl;
        }
    });
}); 
// 创建右键菜单项
browser.contextMenus.create({
    id: "openInIINA",                    // 菜单项唯一标识符
    title: browser.i18n.getMessage("menuTitle"),  // 菜单项显示文本
    contexts: ["all"]                    // 在所有内容上显示此菜单
});

// 监听菜单项点击事件
browser.contextMenus.onClicked.addListener((info, tab) => {
    // info: 包含点击信息的对象
    // tab: 当前标签页信息
    
    // 获取当前页面 URL
    const url = tab.url;
    
    // 处理不同网站的 URL
    let processedUrl = url;
    if (url.includes('bilibili.com')) {
        // 处理 Bilibili 链接
        const bvMatch = url.match(/BV\w+/);
        if (bvMatch) {
            processedUrl = `https://www.bilibili.com/video/${bvMatch[0]}/`;
        }
    }
    // 可以添加其他网站的特殊处理
    
    // 构造 IINA URL scheme
    // encodeURIComponent 确保 URL 被正确编码
    const iinaUrl = `iina://weblink?url=${encodeURIComponent(processedUrl)}`;
    
    // 更新当前标签页 URL，触发 IINA 打开
    browser.tabs.update(tab.id, { url: iinaUrl });
});

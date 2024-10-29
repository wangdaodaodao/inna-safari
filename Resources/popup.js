document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('openInInna');
    const status = document.getElementById('status');

    button.addEventListener('click', function() {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentUrl = tabs[0].url;
            
            // 处理 URL
            let processedUrl = processUrl(currentUrl);
            
            // 构造 Inna URL scheme
            const innaUrl = `inna://${encodeURIComponent(processedUrl)}`;
            
            status.textContent = '正在打开: ' + innaUrl;
            window.location.href = innaUrl;
        });
    });
});

function processUrl(url) {
    try {
        const urlObj = new URL(url);
        
        // 处理 Bilibili 链接
        if (urlObj.hostname.includes('bilibili.com')) {
            const match = url.match(/BV\w+/);
            if (match) {
                return `https://www.bilibili.com/video/${match[0]}/`;
            }
        }
        
        // 处理优酷链接
        if (urlObj.hostname.includes('youku.com')) {
            // 提取优酷视频 ID
            const match = url.match(/id_(\w+)/);
            if (match) {
                return `https://v.youku.com/v_show/id_${match[1]}`;
            }
        }
        
        // 处理腾讯视频链接
        if (urlObj.hostname.includes('v.qq.com')) {
            // 提取腾讯视频 ID
            const match = url.match(/(\w+)\.html/);
            if (match) {
                return `https://v.qq.com/x/cover/${match[1]}.html`;
            }
        }
        
        // 如果不是特殊情况，返回原始 URL
        return url;
    } catch (e) {
        console.error('URL 处理错误:', e);
        return url;
    }
} 
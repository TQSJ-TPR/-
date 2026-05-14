const BACKGROUND_IMAGE_URL = 'https://t.alcy.cc/ycy';

function loadImage(url, options = {}) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        if (options.crossOrigin) {
            img.crossOrigin = options.crossOrigin;
        }

        img.onload = function () {
            resolve(img);
        };

        img.onerror = function () {
            reject(new Error(`Failed to load image: ${url}`));
        };

        img.src = url;
    });
}

(function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBarVertical = document.getElementById('loading-bar-vertical');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingCoverHorizontal = document.getElementById('loading-cover-horizontal');
    const loadingContent = document.querySelector('.loading-content');

    if (!loadingScreen || !loadingBarVertical || !loadingPercentage || !loadingCoverHorizontal) {
        console.warn('加载页面元素未找到');
        return;
    }

    let progress = 0;
    const totalDuration = 2500;
    const verticalDuration = 1800;
    const horizontalDuration = 400;
    const fadeOutDuration = 300;

    function updateProgress(currentProgress) {
        progress = Math.min(100, Math.max(0, currentProgress));
        const viewportHeight = window.innerHeight;
        const barHeight = (progress / 100) * viewportHeight;
        loadingBarVertical.style.height = `${barHeight}px`;
        loadingPercentage.textContent = `${Math.round(progress)}%`;

        if (loadingContent) {
            const contentHeight = loadingContent.offsetHeight || 100;
            const maxTop = viewportHeight - contentHeight - 50;
            const contentTop = Math.min(barHeight, maxTop);
            loadingContent.style.top = `${contentTop}px`;
        }
    }

    function startHorizontalCover() {
        loadingCoverHorizontal.style.width = '100%';

        setTimeout(() => {
            loadingScreen.classList.add('hidden');

            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }

                const event = new CustomEvent('loadingComplete');
                document.dispatchEvent(event);
            }, fadeOutDuration);
        }, horizontalDuration);
    }

    function simulateLoading() {
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            let currentProgress = 0;

            if (elapsed < verticalDuration) {
                const easeProgress = elapsed / verticalDuration;
                const easeOutQuad = 1 - (1 - easeProgress) * (1 - easeProgress);
                currentProgress = easeOutQuad * 100;
                updateProgress(currentProgress);

                requestAnimationFrame(animate);
            } else {
                updateProgress(100);

                setTimeout(() => {
                    startHorizontalCover();
                }, 200);
            }
        }

        requestAnimationFrame(animate);
    }

    async function loadBackgroundImageFirst() {
        try {
            await loadImage(BACKGROUND_IMAGE_URL);
            loadingScreen.style.backgroundImage = `url('${BACKGROUND_IMAGE_URL}')`;
        } catch {
            console.warn('背景图加载失败，使用黑色背景');
            loadingScreen.style.backgroundColor = '#000000';
        }

        setTimeout(() => {
            if (loadingBarVertical && loadingContent) {
                loadingBarVertical.style.opacity = '1';
                loadingContent.style.opacity = '1';
            }
            simulateLoading();
        }, 400);
    }

    document.addEventListener('DOMContentLoaded', loadBackgroundImageFirst);
})();

const blogs = [
    {
        title: '工具',
        content: `
            <div class="nested-tabs">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-tab="common-tools">图片工具</button>
                    <button class="tab-btn" data-tab="video-tools">视频工具</button>
                    <button class="tab-btn" data-tab="audio-tools">音频工具</button>
                    <button class="tab-btn" data-tab="ai-tools">AI工具</button>
                    <button class="tab-btn" data-tab="file-tools">文件工具</button>
                    <button class="tab-btn" data-tab="download-tools">下载工具</button>
                    <button class="tab-btn" data-tab="web-tools">网页驱动</button>
                    <button class="tab-btn" data-tab="other-tools">其他工具</button>
                </div>
                <div class="tab-content active" id="common-tools">
                    <div class="tool-grid">
                        <a href='https://ocr.wdku.net/' target='_blank'><div class="tool-item"><div class="tool-text">OCR工具</div></div></a>
                        <a href='https://ai.animedb.cn/' target='_blank'><div class="tool-item"><div class="tool-text">以图识番</div></div></a>
                        <a href='https://www.saucenao.cn/' target='_blank'><div class="tool-item"><div class="tool-text">以图识图</div></div></a>
                        <a href='https://photokit.com/editor/?lang=zh' target='_blank'><div class="tool-item"><div class="tool-text">图片编辑器</div></div></a>
                        <a href='https://zh.qr-code.net/' target='_blank'><div class="tool-item"><div class="tool-text">二维码生成器</div></div></a>
                        <a href='https://imgonline.tools/zh/' target='_blank'><div class="tool-item"><div class="tool-text">图片工具包-1</div></div></a>
                        <a href='https://www.iloveimg.com/zh-cn' target='_blank'><div class="tool-item"><div class="tool-text">图片工具包-2</div></div></a>
                        <a href='https://d2n.moe/petpet-js/' target='_blank'><div class="tool-item"><div class="tool-text">预制表情包</div></div></a>
                        <a href='https://images.batchtool.com/zh?utm_source=ai-bot.cn' target='_blank'><div class="tool-item"><div class="tool-text">图片抠图</div></div></a>
                        <a href='https://bigjpg.com/' target='_blank'><div class="tool-item"><div class="tool-text">图片无损放大</div></div></a>
                        <a href='https://www.mergepictures.net/zh-CN' target='_blank'><div class="tool-item"><div class="tool-text">图片拼接</div></div></a>
                        <a href='https://www.abtool.cn/image_compre' target='_blank'><div class="tool-item"><div class="tool-text">图片压缩</div></div></a>
                    </div>
                </div>
                <div class="tab-content" id="video-tools">
                    <div class="tool-grid">
                        <a href='https://www.aigei.com/tool/video' target='_blank'><div class="tool-item"><div class="tool-text">视频编辑器</div></div></a>
                        <a href='https://pv.vlogdownloader.com/' target='_blank'><div class="tool-item"><div class="tool-text">网址视频解析-1</div></div></a>
                        <a href='https://zh.get-save.net/1-video-downloader/' target='_blank'><div class="tool-item"><div class="tool-text">网址视频解析-2</div></div></a>
                        <a href='https://www.hellotik.app/zh' target='_blank'><div class="tool-item"><div class="tool-text">网址视频解析-3</div></div></a>
                        <a href='https://www.redpandacompress.com/zh/' target='_blank'><div class="tool-item"><div class="tool-text">视频压缩-1</div></div></a>
                        <a href='https://dojoclip.com/zh/video-compressor' target='_blank'><div class="tool-item"><div class="tool-text">视频压缩-2</div></div></a>
                        <a href='https://offlineconverter.com/cn/video/mkv-to-gif/' target='_blank'><div class="tool-item"><div class="tool-text">视频转GIF</div></div></a>
                    </div>
                </div>
                <div class="tab-content" id="audio-tools">
                <div class="tool-grid"> 
                <a href='https://www.aigei.com/tool/video/audio-to-video' target='_blank'><div class="tool-item"><div class="tool-text">视频转音频</div></div></a>
                <a href='https://freecompress.com/zh-cn/compress-audio/' target='_blank'><div class="tool-item"><div class="tool-text">音频压缩</div></div></a>
                <a href='https://www.vocu.ai/' target='_blank'><div class="tool-item"><div class="tool-text">语音合成</div></div></a>
                <a href='https://realdubbing.com/zh/' target='_blank'><div class="tool-item"><div class="tool-text">TTS文本转语音</div></div></a>
                <a href='https://fish.audio/zh-CN/app/text-to-speech/' target='_blank'><div class="tool-item"><div class="tool-text">语音克隆</div></div></a>
                <a href='https://vocalremover.org/zh/' target='_blank'><div class="tool-item"><div class="tool-text">音频人声分离</div></div></a>
                <a href='https://mscdownload.pages.dev/' target='_blank'><div class="tool-item"><div class="tool-text">网易云音乐下载</div></div></a>
                </div>
                </div>
                <div class="tab-content" id="ai-tools">
                    <div class="tool-grid">
                        <a href='https://chat.openai.com/' target='_blank'><div class="tool-item"><div class="tool-text">ChatGPT</div></div></a>
                        <a href='https://claude.ai/' target='_blank'><div class="tool-item"><div class="tool-text">Claude</div></div></a>
                        <a href='https://bard.google.com/' target='_blank'><div class="tool-item"><div class="tool-text">Gemini</div></div></a>
                        <a href='https://www.perplexity.ai/' target='_blank'><div class="tool-item"><div class="tool-text">Perplexity</div></div></a>
                        <a href='https://www.wolframalpha.com/' target='_blank'><div class="tool-item"><div class="tool-text">Wolfram Alpha</div></div></a>
                        <a href='https://huggingface.co/' target='_blank'><div class="tool-item"><div class="tool-text">Hugging Face</div></div></a>
                        <a href='https://www.midjourney.com/' target='_blank'><div class="tool-item"><div class="tool-text">Midjourney</div></div></a>
                        <a href='https://yiyan.baidu.com/' target='_blank'><div class="tool-item"><div class="tool-text">文心一言</div></div></a>
                        <a href='https://www.doubao.com/' target='_blank'><div class="tool-item"><div class="tool-text">豆包</div></div></a>
                        <a href='https://www.kimi.com/' target='_blank'><div class="tool-item"><div class="tool-text">Kimi</div></div></a>
                        <a href='https://chatglm.cn/' target='_blank'><div class="tool-item"><div class="tool-text">智谱清言</div></div></a>
                        <a href='https://yuanbao.tencent.com/' target='_blank'><div class="tool-item"><div class="tool-text">腾讯元宝</div></div></a>
                        <a href='https://qianwen.aliyun.com/' target='_blank'><div class="tool-item"><div class="tool-text">通义千问</div></div></a>
                        <a href='https://xinghuo.xfyun.cn/' target='_blank'><div class="tool-item"><div class="tool-text">讯飞星火</div></div></a>
                    </div>
                </div>
                <div class="tab-content" id="file-tools">
                    <div class="tool-grid">
                        <a href='https://webrename.cn/' target='_blank'><div class="tool-item"><div class="tool-text">文件批量命名</div></div></a>
                        <a href='https://convertio.co/zh/' target='_blank'><div class="tool-item"><div class="tool-text">文件格式转换</div></div></a>
                    </div>
                </div>
                <div class="tab-content" id="download-tools">
                    <div class="tool-grid">
                        <a href='https://apkcombo.com/zh/' target='_blank'><div class="tool-item"><div class="tool-text">Google软件下载</div></div></a>
                    </div>
                </div>
                <div class="tab-content" id="web-tools">
                    <div class="tool-grid">
                        <a href='https://www.mchose.com.cn/#/connectDevice' target='_blank'><div class="tool-item"><div class="tool-text">迈从网页驱动</div></div></a>
                    </div>
                </div>
                <div class="tab-content" id="other-tools">
                    <div class="tool-grid">
                    </div>
                </div>
            </div>
        `
    },
    {
        title: '资源',
        content: `
        <div class="nested-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="system-Resource">系统工具</button>
                <button class="tab-btn" data-tab="game-Resource">游戏资源</button>
                <button class="tab-btn" data-tab="anime-Resource">动漫资源</button>
                <button class="tab-btn" data-tab="other-Resource">其他资源</button>
            </div>
            <div class="tab-content active" id="system-Resource">
                <div class="tool-grid">
                    <a href='https://next.itellyou.cn/' target='_blank'><div class="tool-item"><div class="tool-text">纯净系统下载</div></div></a>
                    <a href='https://www.tbtool.cn/' target='_blank'><div class="tool-item"><div class="tool-text">图吧工具箱</div></div></a>
                </div>
            </div>
            <div class="tab-content" id="game-Resource">
                <div class="tool-grid">
                    <a href='https://www.galzy.eu.org/' target='_blank'><div class="tool-item"><div class="tool-text">紫缘社</div></div></a>
                    <a href='https://hacg.me/' target='_blank'><div class="tool-item"><div class="tool-text">琉璃神社</div></div></a>
                    <a href='https://itch.io/' target='_blank'><div class="tool-item"><div class="tool-text">ITCH游戏网站</div></div></a>
                </div>
            </div>
            <div class="tab-content" id="anime-Resource">
                <div class="tool-grid">
                    <a href='https://animes.garden/' target='_blank'><div class="tool-item"><div class="tool-text">动漫花园</div></div></a>
                    <a href='http://dmhy.org/' target='_blank'><div class="tool-item"><div class="tool-text">动漫资源</div></div></a>
                </div>
            </div>
            <div class="tab-content" id="other-Resource">
                <div class="tool-grid">
                    <a href='https://modrinth.com/' target='_blank'><div class="tool-item"><div class="tool-text">Minecraft Mod下载</div></div></a>
                </div>
            </div>
        </div>
        `
    },
    {
        title: '联系方式',
        content: `
            <div class="contact-info">
                <a href="https://www.bilibili.com/video/BV1UT42167xb" target="_blank" class="contact-link bilibili-link" data-tooltip="点击跳转">
                    <span>我的bilibili主页</span>
                </a>
                <img src="./img/1.gif" alt="动图" class="contact-gif">
                <span class="contact-text email-text" data-tooltip="点击复制邮箱" data-email="TQSJ-TPR@outlook.com">我的邮箱</span>
            </div>
        `
    }
];

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function renderBlogs() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    blogList.innerHTML = '';

    blogs.forEach((blog) => {
        const post = document.createElement('article');
        post.className = 'blog-post';
        post.innerHTML = `<h2>${blog.title}</h2><p>${blog.content}</p>`;
        blogList.appendChild(post);
    });
}

function startCardAnimation() {
    const favorites = getFavorites();
    const favSection = document.querySelector('.favorites-section');
    const posts = document.querySelectorAll('.blog-post:not(.favorites-section)');

    let delayOffset = 0;
    if (favorites.length > 0 && favSection) {
        setTimeout(() => {
            favSection.classList.add('show');
        }, 100);
        delayOffset = 200;
    }

    setTimeout(() => {
        let hasToolGrid = false;
        posts.forEach((post, idx) => {
            setTimeout(() => {
                post.classList.add('show');
                if (!hasToolGrid && post.querySelector('.tool-grid')) {
                    hasToolGrid = true;
                    adjustToolItemTextSize();
                }
            }, idx * 200);
        });
    }, delayOffset);
}

function adjustToolItemTextSize() {
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        const textElement = item.querySelector('.tool-text');
        if (!textElement) return;

        textElement.style.fontSize = '';
        const itemWidth = item.clientWidth -
            parseFloat(getComputedStyle(item).paddingLeft) -
            parseFloat(getComputedStyle(item).paddingRight);

        if (textElement.scrollWidth > itemWidth) {
            const scale = Math.min(1, itemWidth / textElement.scrollWidth);
            const baseSize = parseFloat(getComputedStyle(textElement).fontSize);
            textElement.style.fontSize = `${baseSize * scale}px`;
        }
    });
}

/**
 * 通用的显示tooltip函数
 * @param {HTMLElement} element - 要附加tooltip的元素
 * @param {string} text - tooltip的内容
 * @param {Object} options - 可选配置
 * @param {string} options.customClass - 自定义类名
 * @param {string} options.customStyle - 自定义样式
 * @param {number} options.duration - 自动隐藏的时长（毫秒），不设置则不自动隐藏
 */
function showTooltip(element, text, options = {}) {
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip' + (options.customClass ? ' ' + options.customClass : '');
    tooltip.textContent = text;
    if (options.customStyle) {
        tooltip.style.cssText = options.customStyle;
    }
    document.body.appendChild(tooltip);

    // 计算tooltip位置
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + (rect.width - tooltipRect.width) / 2;
    let top = rect.top - tooltipRect.height - 8;

    // 边界检查
    if (left < 5) left = 5;
    if (left + tooltipRect.width > window.innerWidth - 5) {
        left = window.innerWidth - tooltipRect.width - 5;
    }
    if (top < 5) {
        top = rect.bottom + 8;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';

    requestAnimationFrame(() => {
        tooltip.classList.add('show');
    });

    // 如果设置了duration，自动隐藏
    if (options.duration) {
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 300);
        }, options.duration);
    }

    return tooltip;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 300);
    }
}

function copyToClipboard(text, element) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showCopySuccess(element))
            .catch(() => fallbackCopy(text, element));
    } else {
        fallbackCopy(text, element);
    }
}

function fallbackCopy(text, element) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-999999px;top:-999999px;';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        document.execCommand('copy');
        showCopySuccess(element);
    } catch (err) {
        console.error('复制失败:', err);
    } finally {
        document.body.removeChild(textarea);
    }
}

function showCopySuccess(element) {
    showTooltip(element, '邮箱已复制到剪贴板！', {
        customClass: 'copy-success-tooltip',
        customStyle: 'background:#10b981;color:#fff;',
        duration: 2000
    });
}

function setupTooltips() {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (target) {
            showTooltip(target, target.dataset.tooltip);
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (target) {
            hideTooltip();
        }
    });

    document.addEventListener('click', (e) => {
        const emailElement = e.target.closest('[data-email]');
        if (emailElement) {
            copyToClipboard(emailElement.dataset.email, emailElement);
        }
    });
}

function setupHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop <= 0) {
            header.classList.remove('hidden');
        } else if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            header.classList.add('hidden');
        } else if (currentScrollTop < lastScrollTop) {
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScrollTop;
    }, { passive: true });
}

window.addEventListener('resize', debounce(() => {
    adjustToolItemTextSize();

    // 根据窗口宽度动态启用/禁用3D效果
    if (window.innerWidth >= 768) {
        setupCard3DEffect();
    } else {
        // 移除3D效果相关的事件监听器
        document.querySelectorAll('.blog-post:not(.favorites-section), .tool-item:not(.favorite-item), .contact-gif').forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    }
}, 250));

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const lightIcon = themeToggle.querySelector('.theme-light-icon');
    const darkIcon = themeToggle.querySelector('.theme-dark-icon');

    if (savedTheme === 'dark' || (!savedTheme)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (lightIcon) lightIcon.style.display = 'block';
        if (darkIcon) darkIcon.style.display = 'none';
        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'block';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (lightIcon) lightIcon.style.display = 'block';
            if (darkIcon) darkIcon.style.display = 'none';
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (lightIcon) lightIcon.style.display = 'block';
                if (darkIcon) darkIcon.style.display = 'none';
            } else {
                document.documentElement.removeAttribute('data-theme');
                if (lightIcon) lightIcon.style.display = 'none';
                if (darkIcon) darkIcon.style.display = 'block';
            }
        }
    });
}

function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key.toLowerCase()) {
            case 't':
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle && !e.ctrlKey && !e.metaKey) {
                    themeToggle.click();
                    e.preventDefault();
                }
                break;
            case 'home':
            case 'end':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    window.scrollTo({
                        top: e.key.toLowerCase() === 'home' ? 0 : document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }
                break;
        }
    });
}

function setupNestedTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = btn.dataset.tab;
            const parent = btn.closest('.nested-tabs');

            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            parent.querySelector('#' + tabId).classList.add('active');
        });
    });
}

function apply3DEffect(element, e) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(2);
    const normalizedDistance = distance / maxDistance;

    const translateZ = Math.min(50, normalizedDistance * 60);
    const scale = 1 + (normalizedDistance * 0.03);
    const rotateX = deltaY * 8;
    const rotateY = deltaX * -8;

    element.style.transform = `
        perspective(1000px) 
        translateZ(${translateZ}px) 
        scale(${scale}) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
    `;

    element.style.boxShadow = `
        ${-deltaX * 15}px ${-deltaY * 15}px ${30 + translateZ}px rgba(0, 0, 0, ${0.15 + normalizedDistance * 0.1}),
        0 0 ${40 + translateZ * 2}px rgba(37, 99, 235, ${0.08 + normalizedDistance * 0.05})
    `;
}

function reset3DEffect(element) {
    element.style.transform = '';
    element.style.boxShadow = '';
}

function setupCard3DEffect() {
    const cards = document.querySelectorAll('.blog-post:not(.favorites-section), .tool-item:not(.favorite-item), .contact-gif');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            apply3DEffect(card, e);
        });

        card.addEventListener('mouseleave', () => {
            reset3DEffect(card);
        });
    });

    document.querySelectorAll('.favorites-section').forEach(section => {
        section.addEventListener('mousemove', (e) => {
            apply3DEffect(section, e);
        });

        section.addEventListener('mouseleave', () => {
            reset3DEffect(section);
        });
    });
}

function initMainContent() {
    renderBlogs();
    adjustToolItemTextSize();
    setupHeaderScroll();
    setupTooltips();
    setupThemeToggle();
    setupBackToTop();
    setupKeyboardShortcuts();
    secureExternalLinks();
    loadBackgroundImage();
    setupSettingsPanel();
    setupNestedTabs();
}

document.addEventListener('loadingComplete', () => {
    initMainContent();
    createFavoritesSection();

    setTimeout(() => {
        startCardAnimation();
    }, 100);

    if (window.innerWidth >= 768) {
        setTimeout(() => {
            setupCard3DEffect();
        }, 1500);
    }

    setTimeout(() => {
        setupDragAndDrop();
    }, 500);
});

function secureExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        } else if (!link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', link.getAttribute('rel') + ' noopener noreferrer');
        }
    });
}

function updateSchemaJsonLd() {
    const schemaScript = document.getElementById('schema-json');
    if (schemaScript) {
        try {
            const schema = JSON.parse(schemaScript.textContent);
            schema.url = window.location.href;
            schemaScript.textContent = JSON.stringify(schema);
        } catch (e) {
            console.warn('更新 schema JSON-LD 失败:', e);
        }
    }
}

async function loadBackgroundImage() {
    const bgLayer = document.getElementById('background-layer');

    try {
        await loadImage(BACKGROUND_IMAGE_URL, { crossOrigin: 'anonymous' });
        if (bgLayer) {
            bgLayer.style.backgroundImage = `url('${BACKGROUND_IMAGE_URL}')`;
        }
        console.log('✅ 背景图片加载成功');
    } catch {
        console.warn('⚠️ 背景图片加载失败');
    }
}

function setupSettingsPanel() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsClose = document.getElementById('settings-close');
    const resetBtn = document.getElementById('reset-settings');

    const bgBlurSlider = document.getElementById('bg-blur');
    const bgBrightnessSlider = document.getElementById('bg-brightness');
    const blurValueDisplay = document.getElementById('blur-value');
    const brightnessValueDisplay = document.getElementById('brightness-value');

    if (!settingsBtn || !settingsModal) return;

    const defaultSettings = {
        blur: 10,
        brightness: 100
    };

    function loadSettings() {
        try {
            const savedSettings = localStorage.getItem('backgroundSettings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                applyBackgroundSettings(settings.blur, settings.brightness);

                if (bgBlurSlider) bgBlurSlider.value = settings.blur;
                if (blurValueDisplay) blurValueDisplay.textContent = `${settings.blur}px`;

                if (bgBrightnessSlider) bgBrightnessSlider.value = settings.brightness;
                if (brightnessValueDisplay) brightnessValueDisplay.textContent = `${settings.brightness}%`;
            } else {
                applyBackgroundSettings(defaultSettings.blur, defaultSettings.brightness);
            }
        } catch (error) {
            console.warn('加载背景设置失败:', error);
            applyBackgroundSettings(defaultSettings.blur, defaultSettings.brightness);
        }
    }

    function saveSettings(blur, brightness) {
        try {
            const settings = { blur, brightness };
            localStorage.setItem('backgroundSettings', JSON.stringify(settings));
        } catch (error) {
            console.warn('保存背景设置失败:', error);
        }
    }

    function applyBackgroundSettings(blur, brightness) {
        const bgLayer = document.getElementById('background-layer');
        if (bgLayer) {
            bgLayer.style.filter = `blur(${blur}px) brightness(${brightness / 100})`;
        }
    }

    function openSettings() {
        settingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSettings() {
        settingsModal.classList.add('closing');
        settingsModal.classList.remove('active');

        setTimeout(() => {
            settingsModal.classList.remove('closing');
            document.body.style.overflow = '';
        }, 350);
    }

    function handleBlurChange(e) {
        const value = parseInt(e.target.value, 10);
        if (blurValueDisplay) blurValueDisplay.textContent = `${value}px`;

        const brightnessValue = parseInt(bgBrightnessSlider ? bgBrightnessSlider.value : 100, 10);
        applyBackgroundSettings(value, brightnessValue);
        saveSettings(value, brightnessValue);
    }

    function handleBrightnessChange(e) {
        const value = parseInt(e.target.value, 10);
        if (brightnessValueDisplay) brightnessValueDisplay.textContent = `${value}%`;

        const blurValue = parseInt(bgBlurSlider ? bgBlurSlider.value : 0, 10);
        applyBackgroundSettings(blurValue, value);
        saveSettings(blurValue, value);
    }

    function resetToDefault() {
        applyBackgroundSettings(defaultSettings.blur, defaultSettings.brightness);
        saveSettings(defaultSettings.blur, defaultSettings.brightness);

        if (bgBlurSlider) bgBlurSlider.value = defaultSettings.blur;
        if (blurValueDisplay) blurValueDisplay.textContent = `${defaultSettings.blur}px`;

        if (bgBrightnessSlider) bgBrightnessSlider.value = defaultSettings.brightness;
        if (brightnessValueDisplay) brightnessValueDisplay.textContent = `${defaultSettings.brightness}%`;
    }

    settingsBtn.addEventListener('click', openSettings);

    if (settingsClose) {
        settingsClose.addEventListener('click', closeSettings);
    }

    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', closeSettings);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetToDefault);
    }

    if (bgBlurSlider) {
        bgBlurSlider.addEventListener('input', handleBlurChange);
    }

    if (bgBrightnessSlider) {
        bgBrightnessSlider.addEventListener('input', handleBrightnessChange);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
            closeSettings();
        }
    });

    loadSettings();
}

// ==================== 搜索功能 ====================

// 搜索数据库
const searchDatabase = [];

// 从blogs数据中直接生成搜索数据
function initSearchDatabase() {
    searchDatabase.length = 0;
    
    blogs.forEach(blog => {
        const type = blog.title;
        
        // 解析 content 中的选项卡和工具项
        const parser = new DOMParser();
        const doc = parser.parseFromString(blog.content, 'text/html');
        
        const tabButtons = doc.querySelectorAll('.tab-btn');
        const tabContents = doc.querySelectorAll('.tab-content');
        
        tabButtons.forEach((btn, index) => {
            const category = btn.textContent.trim();
            const tabContent = tabContents[index];
            
            if (!tabContent) return;
            
            const toolItems = tabContent.querySelectorAll('.tool-item');
            
            toolItems.forEach(item => {
                const linkElement = item.closest('a');
                const toolTextElement = item.querySelector('.tool-text');
                
                if (linkElement && toolTextElement) {
                    searchDatabase.push({
                        name: toolTextElement.textContent.trim(),
                        url: linkElement.getAttribute('href'),
                        category: category,
                        type: type
                    });
                }
            });
        });
    });
}

// 搜索功能
function searchItems(query) {
    if (!query.trim()) {
        return [];
    }
    
    const lowerQuery = query.toLowerCase();
    
    return searchDatabase.filter(item => {
        return item.name.toLowerCase().includes(lowerQuery) ||
               item.category.toLowerCase().includes(lowerQuery) ||
               item.type.toLowerCase().includes(lowerQuery);
    });
}

// 显示搜索建议
function showSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    suggestionsContainer.innerHTML = '';
    
    if (suggestions.length === 0) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    suggestions.forEach(item => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';
        const isFavorite = getFavorites().some(f => f.url === item.url);
        suggestionDiv.innerHTML = `
            <div class="suggestion-left">
                <div class="suggestion-title">${item.name}</div>
                <div class="suggestion-category">${item.type} - ${item.category}</div>
            </div>
            <button class="suggestion-fav-btn ${isFavorite ? 'favorited' : ''}" data-name="${item.name}" data-url="${item.url}">${isFavorite ? '已添加' : '添加到常用'}</button>
        `;
        
        suggestionDiv.querySelector('.suggestion-left').addEventListener('click', () => {
            window.open(item.url, '_blank');
            document.getElementById('search-input').value = '';
            suggestionsContainer.classList.remove('active');
        });

        const favBtn = suggestionDiv.querySelector('.suggestion-fav-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = favBtn.getAttribute('data-name');
            const url = favBtn.getAttribute('data-url');
            if (favBtn.classList.contains('favorited')) {
                removeFromFavorites(name, url);
                favBtn.textContent = '添加到常用';
                favBtn.classList.remove('favorited');
            } else {
                addToFavorites(name, url);
                favBtn.textContent = '已添加';
                favBtn.classList.add('favorited');
            }
        });
        
        suggestionsContainer.appendChild(suggestionDiv);
    });
    
    suggestionsContainer.classList.add('active');
    
    // 移动端优化：确保建议弹窗位置正确
    if (window.innerWidth <= 768) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            const rect = searchContainer.getBoundingClientRect();
            suggestionsContainer.style.top = (rect.bottom + 8) + 'px';
        }
    }
}



// 更新建议项选择状态
function updateSuggestionSelection(suggestions, index) {
    suggestions.forEach((item, i) => {
        if (i === index) {
            item.style.background = 'rgba(139, 92, 246, 0.25)';
        } else {
            item.style.background = '';
        }
    });
}

// 初始化搜索功能
function initSearch() {
    // 延迟一点时间确保DOM完全渲染
    setTimeout(() => {
        initSearchDatabase();
        setupSearchEvents();
    }, 100);
}

// 设置搜索事件
function setupSearchEvents() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (!searchInput || !suggestionsContainer) return;
    
    // 使用防抖函数优化搜索
    const debouncedSearch = debounce((query) => {
        const results = searchItems(query);
        showSuggestions(results);
    }, 200);
    
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    // 点击外部关闭建议
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestionsContainer.classList.remove('active');
        }
    });
    
    // 移动端滚动时关闭建议
    window.addEventListener('scroll', () => {
        suggestionsContainer.classList.remove('active');
    }, { passive: true });
    
    // 键盘导航
    let selectedIndex = -1;
    
    searchInput.addEventListener('keydown', (e) => {
        const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
        
        if (suggestions.length === 0) return;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
                updateSuggestionSelection(suggestions, selectedIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSuggestionSelection(suggestions, selectedIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    const leftEl = suggestions[selectedIndex].querySelector('.suggestion-left');
                    if (leftEl) {
                        leftEl.click();
                    }
                }
                break;
            case 'Escape':
                suggestionsContainer.classList.remove('active');
                selectedIndex = -1;
                break;
        }
    });
}

// 在页面加载完成后初始化搜索
document.addEventListener('loadingComplete', () => {
    initSearch();
});

// ==================== 常用工具收藏功能 ====================

const FAVORITES_KEY = 'favorite_tools';

function getFavorites() {
    try {
        const data = localStorage.getItem(FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.warn('保存收藏数据失败:', e);
    }
}

function createFavoritesSection() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    const favoritesSection = document.createElement('article');
    favoritesSection.className = 'blog-post favorites-section';
    favoritesSection.id = 'favorites-section';
    favoritesSection.innerHTML = `
        <div class="favorites-header">
            <h2>常用</h2>
            <button class="remove-all-btn" id="remove-all-fav-btn">移除所有</button>
        </div>
        <div class="favorites-grid" id="favorites-grid"></div>
    `;

    blogList.insertBefore(favoritesSection, blogList.firstChild);

    document.getElementById('remove-all-fav-btn').addEventListener('click', () => {
        const favorites = getFavorites();
        if (favorites.length === 0) return;
        localStorage.removeItem(FAVORITES_KEY);
        renderFavorites();
        showNotification('已移除所有常用工具', 'remove');
    });

    renderFavorites();
}

function renderFavorites() {
    const favorites = getFavorites();
    const grid = document.getElementById('favorites-grid');
    const section = document.getElementById('favorites-section');

    if (!grid || !section) return;

    if (favorites.length === 0) {
        section.classList.remove('show');
        grid.innerHTML = '';
        return;
    }

    section.classList.add('show');

    const existingLinks = Array.from(grid.children);

    const currentData = existingLinks.map(link => {
        const item = link.querySelector('.tool-item');
        return item ? item.getAttribute('data-url') : null;
    });

    if (JSON.stringify(favorites.map(f => f.url)) === JSON.stringify(currentData)) {
        return;
    }

    grid.innerHTML = '';

    favorites.forEach((fav, index) => {
        const link = document.createElement('a');
        link.href = fav.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<div class="tool-item favorite-item" data-name="${fav.name}" data-url="${fav.url}" data-index="${index}"><div class="tool-text">${fav.name}</div></div>`;
        grid.appendChild(link);

        requestAnimationFrame(() => {
            const textElement = link.querySelector('.tool-text');
            const item = link.querySelector('.tool-item');
            if (!textElement || !item) return;
            const itemWidth = item.clientWidth -
                parseFloat(getComputedStyle(item).paddingLeft) -
                parseFloat(getComputedStyle(item).paddingRight);

            if (textElement.scrollWidth > itemWidth) {
                const scale = itemWidth / textElement.scrollWidth;
                const baseSize = 16;
                textElement.style.fontSize = `${baseSize * scale}px`;
            }
        });
    });
}

function addToFavorites(name, url) {
    const favorites = getFavorites();
    const exists = favorites.some(f => f.url === url);
    if (exists) {
        showNotification('该工具已在常用工具中', 'add');
        return false;
    }
    favorites.push({ name, url });
    saveFavorites(favorites);
    renderFavorites();
    showNotification(`已添加「${name}」到常用工具`, 'add');
    return true;
}

function removeFromFavorites(name, url) {
    let favorites = getFavorites();
    favorites = favorites.filter(f => f.url !== url);
    saveFavorites(favorites);
    renderFavorites();
    showNotification(`已从常用工具移除「${name}」`, 'remove');
}

function showNotification(message, type) {
    const existing = document.querySelector('.add-success-notification, .remove-success-notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = type === 'add' ? 'add-success-notification' : 'remove-success-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 2000);
}

function setupDragAndDrop() {
    let isDragging = false;
    let dragData = null;
    let dragPreview = null;
    let dropZones = [];
    let isFavoriteDrag = false;
    let currentDragSource = null;
    let currentDragLink = null;
    let currentElementLink = null;
    let currentPressTimer = null;
    let currentDisableTimer = null;
    let currentHasFired = false;
    let currentMoveHandler = null;
    let isPressActive = false;

    function createDropZones(mode) {
        removeDropZones();

        const bottomZone = document.createElement('div');
        bottomZone.className = 'drop-zone bottom';
        bottomZone.innerHTML = `<div class="drop-zone-text">${mode === 'add' ? '拖拽到此添加到常用' : '拖拽到此处删除'}</div>`;

        document.body.appendChild(bottomZone);

        dropZones = [bottomZone];

        requestAnimationFrame(() => {
            bottomZone.classList.add('visible');
        });

        return dropZones;
    }

    function removeDropZones() {
        dropZones.forEach(zone => {
            if (zone.parentNode) {
                zone.remove();
            }
        });
        dropZones = [];
    }

    function createDragPreview(element) {
        if (dragPreview) {
            dragPreview.remove();
        }

        const textElement = element.querySelector('.tool-text');
        const text = textElement ? textElement.textContent : '';

        dragPreview = document.createElement('div');
        dragPreview.className = 'drag-preview';
        dragPreview.innerHTML = `<div class="tool-text">${text}</div>`;
        document.body.appendChild(dragPreview);

        return dragPreview;
    }

    function removeDragPreview() {
        if (dragPreview && dragPreview.parentNode) {
            dragPreview.remove();
        }
        dragPreview = null;
    }

    function startDrag(element, mode) {
        isDragging = true;
        isFavoriteDrag = mode === 'remove';
        currentDragSource = element;
        currentDragLink = element.closest('a');

        const textElement = element.querySelector('.tool-text');
        const linkElement = element.closest('a');

        dragData = {
            name: textElement ? textElement.textContent : '',
            url: linkElement ? linkElement.href : ''
        };

        element.classList.add('dragging');
        createDragPreview(element);
        createDropZones(mode);

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
    }

    function onDragMove(e) {
        if (!isDragging || !dragPreview) return;

        const x = e.clientX;
        const y = e.clientY;

        dragPreview.style.left = (x - dragPreview.offsetWidth / 2) + 'px';
        dragPreview.style.top = (y - dragPreview.offsetHeight / 2) + 'px';

        checkDropZoneHover(x, y);
    }

    function onTouchMove(e) {
        if (!isDragging || !dragPreview) return;
        e.preventDefault();

        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        dragPreview.style.left = (x - dragPreview.offsetWidth / 2) + 'px';
        dragPreview.style.top = (y - dragPreview.offsetHeight / 2) + 'px';

        checkDropZoneHover(x, y);
    }

    function checkDropZoneHover(x, y) {
        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                zone.classList.add('drag-over-active');
            } else {
                zone.classList.remove('drag-over-active');
            }
        });
    }

    function endDrag(x, y) {
        isDragging = false;
        if (currentDragSource) {
            currentDragSource.classList.remove('dragging');
        }

        removeDragPreview();

        if (currentDragLink) {
            currentDragLink.style.pointerEvents = '';
        }

        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                if (isFavoriteDrag) {
                    if (dragData) {
                        removeFromFavorites(dragData.name, dragData.url);
                    }
                } else {
                    if (dragData) {
                        addToFavorites(dragData.name, dragData.url);
                    }
                }
            }
            zone.classList.remove('drag-over-active');
        });

        removeDropZones();

        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);

        dragData = null;
        currentDragSource = null;
        currentDragLink = null;
    }

    function resetAllStates() {
        if (currentDisableTimer) {
            clearTimeout(currentDisableTimer);
            currentDisableTimer = null;
        }
        if (currentPressTimer) {
            clearTimeout(currentPressTimer);
            currentPressTimer = null;
        }
        if (currentElementLink) {
            currentElementLink.style.pointerEvents = '';
        }
        if (currentDragSource && currentDragSource.classList.contains('dragging')) {
            currentDragSource.classList.remove('dragging');
        }
        if (currentMoveHandler) {
            document.removeEventListener('mousemove', currentMoveHandler);
            currentMoveHandler = null;
        }
        currentElementLink = null;
        currentDragSource = null;
        currentHasFired = false;
        currentPressTimer = null;
        currentDisableTimer = null;
        isPressActive = false;
    }

    function initLongPress(element, mode) {
        let startX = 0;
        let startY = 0;
        const MOVE_THRESHOLD = 8;
        const CLICK_DISABLE_TIME = 150;
        const LONG_PRESS_TIME = 400;
        const linkElement = element.closest('a');

        function disableLinkClick() {
            if (linkElement) {
                linkElement.style.pointerEvents = 'none';
            }
        }

        function preventLinkClick(e) {
            if (isPressActive || isDragging) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }

        if (linkElement) {
            linkElement.addEventListener('click', preventLinkClick, true);
        }

        function startPress(e) {
            if (isDragging || isPressActive || currentPressTimer) return;
            e.stopPropagation();

            const point = e.touches ? e.touches[0] : e;
            startX = point.clientX;
            startY = point.clientY;
            currentDragSource = element;
            currentElementLink = linkElement;
            isPressActive = true;

            currentDisableTimer = setTimeout(() => {
                disableLinkClick();
                currentDisableTimer = null;
            }, CLICK_DISABLE_TIME);

            currentPressTimer = setTimeout(() => {
                isPressActive = false;
                currentHasFired = true;
                currentPressTimer = null;
                clearTimeout(currentDisableTimer);
                currentDisableTimer = null;
                startDrag(element, mode);
            }, LONG_PRESS_TIME);
        }

        function checkMove(e) {
            if (!isPressActive || currentHasFired) return;
            const point = e.touches ? e.touches[0] : e;
            const dx = point.clientX - startX;
            const dy = point.clientY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > MOVE_THRESHOLD) {
                resetAllStates();
            }
        }

        element.addEventListener('mousedown', startPress);
        element.addEventListener('touchstart', startPress, { passive: true });
        currentMoveHandler = checkMove;
        document.addEventListener('mousemove', currentMoveHandler);
        document.addEventListener('touchmove', checkMove, { passive: true });
    }

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) {
            resetAllStates();
            return;
        }
        endDrag(e.clientX, e.clientY);
    });

    document.addEventListener('touchend', (e) => {
        if (!isDragging) {
            resetAllStates();
            return;
        }
        const touch = e.changedTouches[0];
        endDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchcancel', () => {
        if (isDragging) {
            endDrag(0, 0);
        } else {
            resetAllStates();
        }
    });

    const observer = new MutationObserver(() => {
        document.querySelectorAll('.tool-item:not(.favorite-item):not([data-drag-initialized="add"])').forEach(item => {
            item.setAttribute('data-drag-initialized', 'add');
            initLongPress(item, 'add');
        });

        document.querySelectorAll('.favorite-item:not([data-drag-initialized="remove"])').forEach(item => {
            item.setAttribute('data-drag-initialized', 'remove');
            initLongPress(item, 'remove');
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll('.tool-item:not(.favorite-item)').forEach(item => {
        item.setAttribute('data-drag-initialized', 'add');
        initLongPress(item, 'add');
    });

    document.querySelectorAll('.favorite-item').forEach(item => {
        item.setAttribute('data-drag-initialized', 'remove');
        initLongPress(item, 'remove');
    });

    document.addEventListener('dragstart', (e) => {
        const toolItem = e.target.closest('.tool-item');
        if (toolItem) {
            e.preventDefault();
            return;
        }
        const link = e.target.closest('a');
        if (link && link.querySelector('.tool-item')) {
            e.preventDefault();
        }
    });

    function preventLinkDrag(e) {
        e.preventDefault();
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('dragstart', preventLinkDrag);
    });

    const linkObserver = new MutationObserver(() => {
        document.querySelectorAll('a:not([data-drag-prevented])').forEach(link => {
            link.setAttribute('data-drag-prevented', 'true');
            link.addEventListener('dragstart', preventLinkDrag);
        });
    });
    linkObserver.observe(document.body, { childList: true, subtree: true });
}
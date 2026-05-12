(function() {
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

    function loadBackgroundImageFirst() {
        const bgUrl = 'https://t.alcy.cc/ycy';
        const img = new Image();
        
        img.onload = function() {
            loadingScreen.style.backgroundImage = `url('${bgUrl}')`;
            
            setTimeout(() => {
                if (loadingBarVertical && loadingContent) {
                    loadingBarVertical.style.opacity = '1';
                    loadingContent.style.opacity = '1';
                }
                simulateLoading();
            }, 400);
        };
        
        img.onerror = function() {
            console.warn('背景图加载失败，使用黑色背景');
            loadingScreen.style.backgroundColor = '#000000';
            
            setTimeout(() => {
                if (loadingBarVertical && loadingContent) {
                    loadingBarVertical.style.opacity = '1';
                    loadingContent.style.opacity = '1';
                }
                simulateLoading();
            }, 400);
        };
        
        img.src = bgUrl;
    }

    document.addEventListener('DOMContentLoaded', loadBackgroundImageFirst);
})();

const blogs = [
    {
        title: '常用工具',
        content: `
            <div class="tool-grid">
                <a href='https://webrename.cn/'><div class="tool-item"><div class="tool-text">文件批量命名</div></div></a>
                <a href='https://www.mchose.com.cn/#/connectDevice'><div class="tool-item"><div class="tool-text">迈从网页驱动</div></div></a>
                <a href='https://www.kimi.com/'><div class="tool-item"><div class="tool-text">Kimi</div></div></a>
                <a href='https://apkcombo.com/zh/'><div class="tool-item"><div class="tool-text">Google软件下载</div></div></a>
                <a href='https://ocr.wdku.net/'><div class="tool-item"><div class="tool-text">OCR工具</div></div></a>
                <a href='https://ai.animedb.cn/'><div class="tool-item"><div class="tool-text">以图识番</div></div></a>
                <a href='https://www.saucenao.cn/'><div class="tool-item"><div class="tool-text">以图识图</div></div></a>
                <a href='https://www.v2ob.com/bilibili'><div class="tool-item"><div class="tool-text">B站视频解析</div></div></a>
            </div>
        `
    },
    {
        title: '收藏资源',
        content: `
            <div class="tool-grid">
                <a href='https://next.itellyou.cn/'><div class="tool-item"><div class="tool-text">纯净系统下载</div></div></a>
                <a href='https://www.galzy.eu.org/'><div class="tool-item"><div class="tool-text">紫缘社</div></div></a>
                <a href='https://www.cilichi.art/'><div class="tool-item"><div class="tool-text">磁力池</div></div></a>
                <a href='https://flowus.cn/share/ab4b6b86-34a6-4aa0-a679-b4a221b8e41d?code=CZ3ECT'><div class="tool-item"><div class="tool-text">Adobe全家桶</div></div></a>
                <a href='https://hacg.me/'><div class="tool-item"><div class="tool-text">琉璃神社</div></div></a>
                <a href='https://itch.io/'><div class="tool-item"><div class="tool-text">ITCH游戏网站</div></div></a>
                <a href='https://animes.garden/'><div class="tool-item"><div class="tool-text">动漫花园</div></div></a>
                <a href='http://dmhy.org/'><div class="tool-item"><div class="tool-text">动漫资源</div></div></a>
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
        post.innerHTML = blog.content 
            ? `<h2>${blog.title}</h2><p>${blog.content}</p>` 
            : `<h2>${blog.title}</h2>`;
        blogList.appendChild(post);
    });
}

function startCardAnimation() {
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach((post, idx) => {
        setTimeout(() => {
            post.classList.add('show');
            if (post.querySelector('.tool-grid')) {
                adjustToolItemTextSize();
            }
        }, idx * 150);
    });
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

function showTooltip(element, text) {
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = rect.left + (rect.width - tooltipRect.width) / 2;
    let top = rect.top - tooltipRect.height - 8;
    
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
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove();
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
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip copy-success-tooltip';
    tooltip.textContent = '邮箱已复制到剪贴板！';
    tooltip.style.cssText = 'background:#10b981;color:#fff;';
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = rect.left + (rect.width - tooltipRect.width) / 2;
    let top = rect.top - tooltipRect.height - 8;
    
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
    
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
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
        
        switch(e.key.toLowerCase()) {
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

function setupParallaxEffect() {
    const gridBackground = document.querySelector('.grid-background');
    if (!gridBackground) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        gridBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
}

function setupCard3DEffect() {
    document.querySelectorAll('.blog-post, .tool-item, .visit-stats-card, .music-player-container, .contact-gif').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
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
            
            card.style.transform = `
                perspective(1000px) 
                translateZ(${translateZ}px) 
                scale(${scale}) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
            
            card.style.boxShadow = `
                ${-deltaX * 15}px ${-deltaY * 15}px ${30 + translateZ}px rgba(0, 0, 0, ${0.15 + normalizedDistance * 0.1}),
                0 0 ${40 + translateZ * 2}px rgba(37, 99, 235, ${0.08 + normalizedDistance * 0.05})
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
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
    setupParallaxEffect();
    loadBackgroundImage();
    setupSettingsPanel();
}

document.addEventListener('loadingComplete', () => {
    initMainContent();
    startCardAnimation();
    
    setTimeout(() => {
        setupCard3DEffect();
    }, 1500);
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

function loadBackgroundImage() {
    const bgUrl = 'https://t.alcy.cc/ycy';
    const bgLayer = document.getElementById('background-layer');
    const img = new Image();
    
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
        if (bgLayer) {
            bgLayer.style.backgroundImage = `url('${bgUrl}')`;
        }
        console.log('✅ 背景图片加载成功');
    };
    
    img.onerror = function() {
        console.warn('⚠️ 背景图片加载失败');
    };
    
    img.src = bgUrl;
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
        blur: 20,
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
        const panel = settingsModal.querySelector('.settings-panel');

        settingsModal.classList.remove('closing');

        requestAnimationFrame(() => {
            settingsModal.classList.add('closing');

            if (panel) {
                panel.addEventListener('transitionend', function handler(e) {
                    if (e.propertyName === 'transform') {
                        panel.removeEventListener('transitionend', handler);
                        settingsModal.classList.remove('active', 'closing');
                        document.body.style.overflow = '';
                    }
                });

                setTimeout(() => {
                    settingsModal.classList.remove('active', 'closing');
                    document.body.style.overflow = '';
                }, 350);
            } else {
                settingsModal.classList.remove('active', 'closing');
                document.body.style.overflow = '';
            }
        });
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
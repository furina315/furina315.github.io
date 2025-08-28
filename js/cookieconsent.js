/**
 * Cookie同意弹窗实现
 * 基于cookieconsent库的简化版本
 */

(function() {
    'use strict';

    // 检查是否已经显示过cookie同意弹窗
    function hasConsented() {
        return localStorage.getItem('cookieconsent_status') === 'allow';
    }

    // 检查是否已经拒绝过
    function hasDeclined() {
        return localStorage.getItem('cookieconsent_status') === 'deny';
    }

    // 设置cookie同意状态
    function setConsentStatus(status) {
        localStorage.setItem('cookieconsent_status', status);
        localStorage.setItem('cookieconsent_timestamp', Date.now().toString());
    }

    // 创建cookie同意弹窗HTML
    function createCookieConsentHTML() {
        const html = `
            <div id="cookieconsent" class="cc-window cc-banner cc-type-info cc-theme-block cc-bottom cc-color-override--175085088" style="display: none;">
                <span class="cc-message">
                    我们使用Cookie来改善您的浏览体验、提供个性化内容、分析我们的流量。点击"接受"即表示您同意我们使用Cookie。
                    <a class="cc-link" href="/privacy" target="_blank">了解更多</a>
                </span>
                <div class="cc-compliance cc-highlight">
                    <a class="cc-btn cc-allow" href="#" aria-label="接受Cookie">接受</a>
                    <a class="cc-btn cc-deny" href="#" aria-label="拒绝Cookie">拒绝</a>
                </div>
            </div>
        `;
        return html;
    }

    // 显示cookie同意弹窗
    function showCookieConsent() {
        // 如果已经同意或拒绝过，不显示弹窗
        if (hasConsented() || hasDeclined()) {
            return;
        }

        // 创建弹窗HTML
        const consentHTML = createCookieConsentHTML();
        
        // 添加到页面
        document.body.insertAdjacentHTML('beforeend', consentHTML);
        
        // 获取弹窗元素
        const consentElement = document.getElementById('cookieconsent');
        
        // 显示弹窗
        setTimeout(() => {
            consentElement.style.display = 'block';
            consentElement.classList.add('cc-show');
        }, 1000);

        // 绑定事件
        bindCookieConsentEvents(consentElement);
    }

    // 绑定cookie同意弹窗事件
    function bindCookieConsentEvents(consentElement) {
        const allowBtn = consentElement.querySelector('.cc-allow');
        const denyBtn = consentElement.querySelector('.cc-deny');

        // 接受按钮事件
        allowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setConsentStatus('allow');
            hideCookieConsent(consentElement);
            
            // 触发自定义事件，通知其他脚本可以加载统计代码
            window.dispatchEvent(new CustomEvent('cookieconsent_allow'));
        });

        // 拒绝按钮事件
        denyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setConsentStatus('deny');
            hideCookieConsent(consentElement);
            
            // 立即拒绝统计代码
            denyAnalytics();
            
            // 触发自定义事件，通知其他脚本不要加载统计代码
            window.dispatchEvent(new CustomEvent('cookieconsent_deny'));
        });
    }

    // 隐藏cookie同意弹窗
    function hideCookieConsent(consentElement) {
        consentElement.classList.remove('cc-show');
        consentElement.classList.add('cc-hide');
        
        setTimeout(() => {
            if (consentElement && consentElement.parentNode) {
                consentElement.parentNode.removeChild(consentElement);
            }
        }, 500);
    }

    // 检查cookie同意状态并加载相应的统计代码
    function loadAnalyticsBasedOnConsent() {
        if (hasConsented()) {
            // 用户已同意，可以加载统计代码
            loadAnalytics();
        } else if (hasDeclined()) {
            // 用户已拒绝，不加载统计代码
            denyAnalytics();
        }
    }

    // 加载统计代码的函数（根据你的实际统计代码调整）
    function loadAnalytics() {
        console.log('用户同意了Cookie，可以加载统计代码');
        
        // Microsoft Clarity同意
        if (typeof window.clarity === 'function') {
            window.clarity("consent", "granted");
            console.log('Microsoft Clarity同意已授予');
        }
    }

    // 拒绝统计代码的函数
    function denyAnalytics() {
        console.log('用户拒绝了Cookie，停止统计代码');
        
        // Microsoft Clarity拒绝
        if (typeof window.clarity === 'function') {
            window.clarity("consent", "denied");
            console.log('Microsoft Clarity同意已拒绝');
        }
    }

    // 监听cookie同意事件
    window.addEventListener('cookieconsent_allow', function() {
        loadAnalytics();
    });

    window.addEventListener('cookieconsent_deny', function() {
        console.log('用户拒绝了Cookie');
    });

    // 页面加载完成后初始化
    function initCookieConsent() {
        // 延迟显示，避免与其他弹窗冲突
        setTimeout(() => {
            showCookieConsent();
        }, 2000);
        
        // 检查是否已经同意过，如果是则加载统计代码
        loadAnalyticsBasedOnConsent();
    }

    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }

    // 暴露一些方法到全局，方便调试
    window.cookieConsent = {
        show: showCookieConsent,
        hasConsented: hasConsented,
        hasDeclined: hasDeclined,
        setConsentStatus: setConsentStatus,
        loadAnalytics: loadAnalytics,
        denyAnalytics: denyAnalytics
    };

})();

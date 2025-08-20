// 友链页面复选框控制脚本
(function() {
  // 等待页面完全加载
  function initCheckboxControl() {
    const checkboxes = document.querySelectorAll(".agree-rule");
    const commentSection = document.getElementById("post-comment");
    const agreementWrapper = document.getElementById("agreement-wrapper");

    // 检查是否在友链页面
    if (!agreementWrapper || checkboxes.length === 0) {
      return; // 不是友链页面，退出
    }

    // 确保评论区存在
    if (!commentSection) {
      console.warn("评论区元素未找到");
      return;
    }

    // 立即隐藏评论区（防止闪烁）
    commentSection.style.display = "none";
    commentSection.style.opacity = "0";
    commentSection.classList.remove("show-comment");

    function checkAllAgreed() {
      let allChecked = true;
      checkboxes.forEach(function (checkbox) {
        if (!checkbox.checked) {
          allChecked = false;
        }
      });

      if (allChecked) {
        // 显示评论区
        commentSection.classList.add("show-comment");
        commentSection.style.display = "block";
        commentSection.style.transition = "opacity 0.5s ease-in-out";
        // 使用 requestAnimationFrame 确保 display: block 生效后再设置透明度
        requestAnimationFrame(() => {
          commentSection.style.opacity = "1";
        });
      } else {
        // 隐藏评论区
        commentSection.classList.remove("show-comment");
        commentSection.style.transition = "opacity 0.3s ease-in-out";
        commentSection.style.opacity = "0";
        setTimeout(() => {
          commentSection.style.display = "none";
        }, 300);
      }
    }

    // 为每个复选框添加事件监听器
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", checkAllAgreed);
    });

    // 页面加载完成后立即检查状态
    checkAllAgreed();

    // 监听复选框的点击事件（防止事件冒泡问题）
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("click", function(e) {
        // 阻止事件冒泡
        e.stopPropagation();
      });
    });

    console.log("友链页面复选框控制已初始化");
  }

  // 多种方式确保脚本执行
  if (document.readyState === "loading") {
    // 页面还在加载中
    document.addEventListener("DOMContentLoaded", initCheckboxControl);
  } else {
    // 页面已经加载完成
    initCheckboxControl();
  }

  // 监听页面变化（适用于SPA或动态加载）
  if (typeof window !== "undefined") {
    // 监听 URL 变化
    let currentUrl = window.location.href;
    const checkUrlChange = () => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        // URL 变化后延迟执行，确保页面内容已更新
        setTimeout(initCheckboxControl, 100);
      }
    };

    // 监听 popstate 事件（浏览器前进后退）
    window.addEventListener("popstate", () => {
      setTimeout(initCheckboxControl, 100);
    });

    // 监听 hashchange 事件
    window.addEventListener("hashchange", () => {
      setTimeout(initCheckboxControl, 100);
    });

    // 定期检查（作为备用方案）
    setInterval(checkUrlChange, 1000);
  }
})();

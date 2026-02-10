var posts=["p/23135/","p/2913/","p/55815/","p/58823/","p/32480/","p/58137/","p/59012/","p/40216/","p/49802/","p/42401/","p/27095/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"Anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"Cloudflare","link":"https://cloudflare.com/","avatar":"https://image.xd520.us.kg/file/1754127128270_cloudflare.png","descr":"全球领先的网络安全和性能服务提供商","siteshot":"https://image.xiduo.qzz.io/file/blog/1754730477225_cf.jpg"},{"name":"Github","link":"https://github.com/","avatar":"https://image.xd520.us.kg/file/1754126752396_githublogo.png","descr":"全球最大的开源社区，提供代码托管服务","siteshot":null},{"name":"VS Code 编辑器","link":"https://code.visualstudio.com/","avatar":"https://image.xd520.us.kg/file/1754126966582_vscodelogo.png","descr":"全球领先的代码编辑器","siteshot":"https://image.xiduo.qzz.io/file/blog/1754730472121_vscode.jpg"},{"name":"WebStorm","link":"https://www.jetbrains.com/webstorm/","avatar":"https://image.xiduo.qzz.io/file/blog/1762611839058_webstorm.ico","descr":"界面比较好看，功能也强大~","siteshot":"https://image.xiduo.qzz.io/file/blog/1762611980751_image.png"},{"name":"萌ICP备","link":"https://icp.gov.moe","avatar":"https://image.xd520.us.kg/file/1754127237347_icon400.png","descr":"萌国的ICP备案","siteshot":"https://image.xiduo.qzz.io/file/blog/1754730472462_icp.jpg"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"Kuyo's Note","link":"https://note.998315.xyz/","avatar":"https://img.998315.xyz/api/Pic/avatar.jpg","descr":"记录点滴","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"Routerの博客","link":"https://blog.irislc.net/","avatar":"https://image.xiduo.qzz.io/file/blog/1762005736505_头像2.jpg","descr":"死神埋葬了过去，天使却将其拾起！","recommend":true},{"name":"博客中心","link":"https://bokehub.com/home","avatar":"https://bokehub.com/assets/images/sites/logo/logo-small.png","descr":"这里是博客世界的中心，更是思想的回声谷。在这里，让每一次阅读都充满惊喜。","recommend":true},{"name":"虚位以待~","link":"/","avatar":"https://image.xiduo.qzz.io/file/blog/1754729825333_friend_404.gif","descr":"说不定下一个就是呢！","recommend":null}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };
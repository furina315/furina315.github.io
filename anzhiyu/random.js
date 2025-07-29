var posts=["2025/07/29/这是一篇文章/","2025/07/29/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };
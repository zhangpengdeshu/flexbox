(function(designWidth,maxWidth){
   var doc = document,
       win = window,
       docEl = document.documentElement,
       remStyle = doc.createElement('style'),
       tid;
   //动态计算根节点html的fontSize的大小    
   function refreshRem(){
       var screenWidth = docEl.getBoundingClientRect().width;
       maxWidth = maxWidth || 540;
       if(screenWidth > maxWidth){
            screenWidth = maxWidth;
       }
       //以设计图为准，例如：我司的设计图示640的 则 1rem = 100px;
       var rem = screenWidth * 100 / designWidth;
       remStyle.innerHTML = 'html{font-size:'+rem+'px;}';
   }
   //将计算好的数据加载到dom中
   if(docEl.firstElementChild){
       docEl.firstElementChild.appendChild(remStyle);
   }else{
       var wrap = doc.createElement('div');
       wrap.appendChild(remStyle);
       doc.write(wrap.innerHTML);
       wrap = null;
   }
   refreshRem();
   //页面大小改变后重新计算元素的大小   
   win.addEventListener('resize',function(){
       clearTimeout(tid);
       tid = setTimeout(refreshRem,300);
   },false);
   
   //页面回退后重新计算元素的大小
   win.addEventListener('pageshow',function(e){
       if(e.persisted){
            clearTimeout(tid);
             tid = setTimeout(refreshRem,300);
       }
   },false);
   //这只body的默认字体的大小
   if(doc.readyState === 'complete'){
       doc.body.style.fontSize = '14px';
   }else{
       doc.addEventListener('DOMContentLoaded',function(e){
         doc.body.style.fontSize = '14px';
       },false);
   }
})(640,640)
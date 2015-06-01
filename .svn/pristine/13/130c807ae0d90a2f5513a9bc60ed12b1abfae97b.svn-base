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
function checkLocalStorage() {
   return false;
}

//第一次玩
function newPlayer() {
//添加信息、localstorage等
}

function imageLoadComplete() {
   //要告诉主过程可以开始游戏了
   //否则就是一直loading
   init();
}

function optimizeCanvas() {
   $('#canv')[0].ondragstart = function(e) {
       if (e && e.preventDefault) {
           e.preventDefault();
       }
       if (e && e.stopPropagation) {
           e.stopPropagation();
       }
       return false;
   }
   $('#canv')[0].onselectstart = function(e) {
       if (e && e.preventDefault) {
           e.preventDefault();
       }
       if (e && e.stopPropagation) {
           e.stopPropagation();
       }
       return false;
   }
   $('#canv').css({cursor: 'none'}); //这个还要多判断一些情况
}

//初始化一个游戏
function init() {
   //变量初始化区：
   window.onresize = optimize;
   FPS = 30;
   MAXBULLET = 5;
   bulletTimer = 0;
   addBulletTimer = 0;
   CLOCK = 0;
   data = {
       tank: {x: 512,y: 512,deg1: 0,deg2: 0,color: '1',speed: 0,bullet:MAXBULLET,bullets:[]},
       tankShadows: [],
       tanks: [],
       tankTest: {x: 512,y: 512,vx: 0,vy: 0,ax: 0,ay: 0,deg1: 0,deg2: 0,color: '2'},
       bullets: [],
       players: []
   };
   console.log(data);
   MOUSEX = 512;
   MOUSEY = 512;
   keyNow = 0;

   firing   = false;
   maxspeed = 8;
   minspeed = -8;
   degspeed = 10;
   engine_acceleration = 0.4;
   fraction_acceleration = 0.2;
   key = {u: false,d: false,l: false,r: false}
   //调用一些函数
   optimize();
   addEvent();
   addTimer();
   optimizeCanvas();
   //还需要显示游戏指导什么的
   if (!checkLocalStorage()) {
       newPlayer();
   }
}

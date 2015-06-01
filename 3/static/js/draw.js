//所有和画图相关的代码都在这里
//注意要变换坐标

function loadImages(){
  IMAGE_LOADED = 0;
  var count = 14;
  images={
    bg:new Image(),
    tank1:new Image(),
    tank2:new Image(),
    tank3:new Image(),
    tank4:new Image(),
    fire1:new Image(),
    fire2:new Image(),
    fire3:new Image(),
    fire4:new Image(),
    bul1:new Image(),
    bul2:new Image(),
    bul3:new Image(),
    bul4:new Image(),
    cursor:new Image()
  };
  with (images){
    bg.src      = 'static/img/bg.png';
    tank1.src   = 'static/img/tank1.png';
    tank2.src   = 'static/img/tank2.png';
    tank3.src   = 'static/img/tank3.png';
    tank4.src   = 'static/img/tank4.png';
    fire1.src   = 'static/img/fire1.png';
    fire2.src   = 'static/img/fire2.png';
    fire3.src   = 'static/img/fire3.png';
    fire4.src   = 'static/img/fire4.png';
    bul1.src    = 'static/img/bul1.png';
    bul2.src    = 'static/img/bul2.png';
    bul3.src    = 'static/img/bul3.png';
    bul4.src    = 'static/img/bul4.png';
    cursor.src  = 'static/img/cursor.png';
  }
  for (var p in images){
    images[p].onload=function(){
      IMAGE_LOADED++;
      if (IMAGE_LOADED == 10){
        imageLoadComplete();
      }
    }
  }
}

function drawOneFrame(){
  drawBackground();
  for (var p in data.tanks){
    drawTank(data.tanks[p]);
  }
  for (var p in data.bullets){
    drawBullet(data.bullets[p]);
  }
  drawCursor();
}

function drawBullet(p){
  var bi=images['bul'+p.color];
  var size = 12
  var xpos=p.x-size/2;
  var ypos=p.y-size/2;
  ctx.save();
  ctx.translate(xpos+size/2, ypos+size/2);
  ctx.rotate(Math.random()*360*Math.PI/180);
  ctx.translate(-xpos-size/2, -ypos-size/2);
  ctx.drawImage(bi, p.x-size/2,p.y-size/2, size, size);
  ctx.restore();
}

function drawTank(p){
  var ti=images['tank'+p.color];
  var fi=images['fire'+p.color];
  var xpos=p.x-1024/64;
  var ypos=p.y-1024/64;
  ctx.save();
  ctx.translate(xpos+1024/64, ypos+1024/64);
  ctx.rotate(p.deg1*Math.PI/180);
  ctx.translate(-xpos-1024/64, -ypos-1024/64);
  ctx.drawImage(ti, xpos, ypos, 1024/32, 1024/32);
  ctx.restore();

  ctx.save();
  ctx.translate(xpos+1024/64, ypos+1024/64);
  ctx.rotate(-p.deg2);
  ctx.translate(-xpos-1024/64, -ypos-1024/64);
  ctx.drawImage(fi, xpos, ypos, 1024/32, 1024/32);
  ctx.restore();
}

function drawCursor(){
  var size=40;
  ctx.drawImage(images.cursor,MOUSEX-size/2,MOUSEY-size/2,size,size);
}

function drawBackground(){
  //包括障碍物？
  //障碍物是否要不断生成？
  // ctx.drawImage(images.bg, 0,0);//,GAME_HEIGHT,GAME_HEIGHT);
  ctx.save();
  ctx.fillStyle='white';
  ctx.fillRect(0,0,1024,1024);
  ctx.restore();
}

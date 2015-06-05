//所有和画图相关的代码都在这里
//注意要变换坐标

function loadImages() {
   IMAGE_LOADED = 0;
   var count = 14;
   images = {
       tank1: new Image(),
       tank2: new Image(),
       fire1: new Image(),
       fire2: new Image(),
       bul1: new Image(),
       bul2: new Image(),
       cursor: new Image()
   };
   with (images) {
       tank1.src = 'static/img/tank1.png';
       tank2.src = 'static/img/tank2.png';
       fire1.src = 'static/img/fire1.png';
       fire2.src = 'static/img/fire2.png';
       bul1.src = 'static/img/bul1.png';
       bul2.src = 'static/img/bul2.png';
       cursor.src = 'static/img/cursor.png';
   }
   for (var p in images) {
       images[p].onload = function() {
           IMAGE_LOADED++;
           if (IMAGE_LOADED == 7) {
               imageLoadComplete();
           }
       }
   }
}

function drawOneFrame() {
   drawBackground();
   drawTank(data.tank);
   drawTank(data.tankTest);
   for (var p in data.tankShadows) {
       drawTank(data.tankShadows[p]);
   }
   for (var p in data.tanks) {
       drawTank(data.tanks[p]);
   }
   for (var p in data.bullets) {
       drawBullet(data.bullets[p]);
   }
   drawCursor();
}

function drawBullet(p) {
   var bi = images['bul' + p.color];
   var size = 18
   var xpos = p.x - size / 2;
   var ypos = p.y - size / 2;
   ctx.save();
   ctx.translate(xpos + size / 2, ypos + size / 2);
   ctx.rotate(Math.random() * 360 * Math.PI / 180);
   ctx.translate(-xpos - size / 2, -ypos - size / 2);
   ctx.drawImage(bi, p.x - size / 2, p.y - size / 2, size, size);
   ctx.restore();
}

function drawTank(p) {
   var ti = images['tank' + p.color];
   var fi = images['fire' + p.color];
   var xpos = p.x - 2048 / 64;
   var ypos = p.y - 2048 / 64;
   ctx.save();
   ctx.translate(xpos + 2048 / 64, ypos + 2048 / 64);
   ctx.rotate(p.deg1 * Math.PI / 180);
   ctx.translate(-xpos - 2048 / 64, -ypos - 2048 / 64);
   ctx.drawImage(ti, xpos, ypos, 2048 / 32, 2048 / 32);
   ctx.restore();

   ctx.save();
   ctx.translate(xpos + 2048 / 64, ypos + 2048 / 64);
   ctx.rotate(-p.deg2);
   ctx.translate(-xpos - 2048 / 64, -ypos - 2048 / 64);
   ctx.drawImage(fi, xpos, ypos, 2048 / 32, 2048 / 32);
   ctx.restore();
}

function drawCursor() {
   var size = 80;
   ctx.drawImage(images.cursor, MOUSEX - size / 2, MOUSEY - size / 2, size, size);
}

function drawBackground() {
   //包括障碍物？
   //障碍物是否要不断生成？
   // ctx.drawImage(images.bg, 0,0);//,GAME_HEIGHT,GAME_HEIGHT);
   ctx.save();
   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, 1024, 1024);
   ctx.strokeStyle = '#e2e4ed';
   ctx.beginPath();
   for (var i=1;i<32;i++){
       ctx.moveTo(i*(1024/32),0);
       ctx.lineTo(i*(1024/32),1024);
       ctx.moveTo(0,i*(1024/32));
       ctx.lineTo(1024,i*(1024/32));
   }
   ctx.closePath();
   ctx.stroke();
   ctx.restore();
}

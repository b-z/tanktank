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
       flag1: new Image(),
       flag2: new Image(),
       cursor: new Image()
   };
   with (images) {
       tank1.src = 'static/img/tank1.png';
       tank2.src = 'static/img/tank2.png';
       fire1.src = 'static/img/fire1.png';
       fire2.src = 'static/img/fire2.png';
       bul1.src = 'static/img/bul1.png';
       bul2.src = 'static/img/bul2.png';
       flag1.src = 'static/img/flag1.png';
       flag2.src = 'static/img/flag2.png';
       cursor.src = 'static/img/cursor.png';
   }
   for (var p in images) {
       images[p].onload = function() {
           IMAGE_LOADED++;
           if (IMAGE_LOADED == 9) {
               imageLoadComplete();
           }
       }
   }
}

function drawOneFrame() {
   drawBackground();
   for (var p in data.bullets) {
       drawBullet(data.bullets[p]);
   }
   // for (var p in data.tank.bullets) {
   //     drawBullet(data.tank.bullets[p]);
   // }
   drawTank(data.tank);
   //drawTank(data.tankTest);
   // for (var p in data.tankShadows) {
   //     drawTank(data.tankShadows[p]);
   // }
   for (var p in data.tanks) {
    //    console.log(data.tanks[p]);
       if (data.tanks[p].i!=my_id)
            drawTank(data.tanks[p]);
   }
   drawBarrier();
   drawFlag(650,270,'1');
   drawFlag(1024-650,1024-270,'2');
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
   // console.log(p.color);
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
   var size = 80 + 15 * Math.sin(CLOCK/5);
   var xpos = MOUSEX - size / 2;
   var ypos = MOUSEY - size / 2;
   ctx.save();
   ctx.translate(xpos + size / 2, ypos + size / 2);
   ctx.rotate(- CLOCK * Math.PI / 180 * 1.5);
   ctx.translate(-xpos - size / 2, -ypos - size / 2);
   ctx.drawImage(images.cursor, xpos, ypos, size, size);
   ctx.restore();
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
// {
//     data:[
//         {id:'asdasdasd',bul:[],tank:{}},
//         {id:'asdasdasd',bul:{},tank:[]},
//         {id:'asdasdasd',bul:{},tank:{}},
//         {id:'asdasdasd',bul:{},tank:{}},
//         {id:'asdasdasd',bul:{},tank:{}},
//         {id:'asdasdasd',bul:{},tank:{}},
//
//     ]
// }

function drawBarrier() {
    var w = 8;
    ctx.save();
    ctx.lineWidth = w;
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(w/2,0);
    ctx.lineTo(w/2,1024);
    ctx.moveTo(0,w/2);
    ctx.lineTo(1024,w/2);
    ctx.moveTo(1024,1024-w/2);
    ctx.lineTo(w/2,1024-w/2);
    ctx.moveTo(1024-w/2,1024);
    ctx.lineTo(1024-w/2,w/2);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgb('+Math.round(75+35*Math.sin(CLOCK/15))+',0,0)';
    var p = 200;
    w = 10;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(p,p);
    ctx.lineTo(1024-p,p);
    ctx.lineTo(p,1024-p);
    ctx.lineTo(1024-p,1024-p);
    //ctx.closePath();
    ctx.stroke();

    ctx.restore();
}

function drawFlag(x, y, c) {
    var fi = images['flag' + c];
    var size = 50;
    var xpos = x - size / 2;
    var ypos = y - size / 2;
    ctx.save();
    ctx.drawImage(fi, xpos, ypos, size, size);
    ctx.restore();
}

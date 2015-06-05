// function tankMove(){
//   switch(keyNow){
//     case 'UP':data.tank.y-=4;data.tank.deg1=0;break;
//     case 'DOWN':data.tank.y+=4;data.tank.deg1=180;break;
//     case 'LEFT':data.tank.x-=4;data.tank.deg1=90;break;
//     case 'RIGHT':data.tank.x+=4;data.tank.deg1=270;break;
//   }
//   data.tank.deg2=Math.PI+Math.atan2(MOUSEX-data.tank.x,MOUSEY-data.tank.y);
// }
function dis2(x1, y1, x2, y2) {
   return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

function tankMoveToShadow() {
   for (var p in data.tankShadows) {
       var m = 0;
       var mx = data.tankShadows[p].x - 0;
       var my = data.tankShadows[p].y - 0;
       for (var q in data.tanks) {
           if (data.tanks[q].i == data.tankShadows[p].i) {
               m = 1;
               var u1 = 6, u2 = 80;

               with (data.tanks[q]) {
                   //var dd = dis2(mx, my, x, y);
                   //ax = (mx - x) - vx / u1;
                   //ay = (my - y) - vy / u1;
                   //var vv = dis2(vx, vy, 0, 0);
                   var v2=3*Math.pow(Math.abs(my-y),0.35);
                   var v1=3*Math.pow(Math.abs(mx-x),0.35);
                   var oldx = x;
                   var oldy = y;
                   vx=(mx>x)?v1:(-v1);
                   vy=(my>y)?v2:(-v2);
                   if((x+vx-mx)*(x-mx)<0){
                       x=mx;
                       vx=0;
                   }
                   else
                       x+=vx;
                   if((y+vy-my)*(y-my)<0){
                       y=my;
                       vy=0;
                   }
                   else
                       y+=vy;
                   if(!(x-oldx==0&&y-oldy==0)){
                       final_deg = (Math.PI / 2 + Math.atan2(y-oldy, x-oldx)) * 180 / Math.PI;
                       if (Math.abs(deg1 - final_deg) <= 90 || Math.abs(deg1 - final_deg) >= 270) {
                           deg = final_deg;
                       }
                       else {
                           deg = (final_deg + 180) % 360;
                       }
                       if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270) {
                           deg1 += degspeed;
                           deg1 %= 360;
                           if (((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270))
                               deg1 = deg;
                       }
                       else if ((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270) {
                           deg1 -= degspeed;
                           if (deg1 < 0)
                               deg1 += 360;
                           if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270)
                               deg1 = deg;
                       }
                   }
               }
           }
       }
       if (m == 0) {
           data.tanks.push({i: data.tankShadows[p].i,x: mx,y: my,vx: 0,vy: 0,ax: 0,ay: 0,deg1: 0,color: '1'});
       }
   }
   //还要检查离开的情况
   for (var q = data.tanks.length - 1; q >= 0; q--) {
       var m = 0;
       for (var p in data.tankShadows) {
           if (data.tankShadows[p].i == data.tanks[q].i) {
               m = 1;
           }
       }
       if (m == 0) {
           data.tanks.splice(q, 1);
       }
   }
}

function tankTestMove() {
   var u1 = 6;
   var u2 = 80;
   with (data.tankTest) {
       //var dd = dis2(MOUSEX, MOUSEY, x, y);
       //ax = (MOUSEX - x) - vx / u1;
       //ay = (MOUSEY - y) - vy / u1;
       //var vv = dis2(vx, vy, 0, 0);
       var v2=3*Math.pow(Math.abs(MOUSEY-y),0.35);
       var v1=3*Math.pow(Math.abs(MOUSEX-x),0.35);
       var oldx = x;
       var oldy = y;
       vx=(MOUSEX>x)?v1:(-v1);
       vy=(MOUSEY>y)?v2:(-v2);
       if((x+vx-MOUSEX)*(x-MOUSEX)<0){
           x=MOUSEX;
           vx=0;
       }
       else
           x+=vx;
       if((y+vy-MOUSEY)*(y-MOUSEY)<0){
           y=MOUSEY;
           vy=0;
       }
       else
           y+=vy;
       if(!(x-oldx==0&&y-oldy==0)){
           final_deg = (Math.PI / 2 + Math.atan2(y-oldy, x-oldx)) * 180 / Math.PI;
           if (Math.abs(deg1 - final_deg) <= 90 || Math.abs(deg1 - final_deg) >= 270) {
               deg = final_deg;
           }
           else {
               deg = (final_deg + 180) % 360;
           }
           if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270) {
               deg1 += degspeed;
               deg1 %= 360;
               if (((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270))
                   deg1 = deg;
           }
           else if ((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270) {
               deg1 -= degspeed;
               if (deg1 < 0)
                   deg1 += 360;
               if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270)
                   deg1 = deg;
           }
       }
   }
}

function updateData(d) {
   //输入: 从服务器过来的数据
   //console.log(d.tanks);
   data.tankShadows = d.tanks;
}

function tankMove() {
   switch (keyNow) {
       case 0:
           tankStop();
           break;
       case 1:
           tankStart(0);
           break;
       case 4:
           tankStart(180);
           break;
       case 2:
           tankStart(270);
           break;
       case 8:
           tankStart(90);
           break;
       case 3:
           tankStart(315);
           break;
       case 12:
           tankStart(135);
           break;
       case 6:
           tankStart(225);
           break;
       case 9:
           tankStart(45);
           break;
   }
   data.tank.deg2 = Math.PI + Math.atan2(MOUSEX - data.tank.x, MOUSEY - data.tank.y);
}

function tankStart(final_deg) {
   with (data.tank) {
       if (Math.abs(deg1 - final_deg) <= 90 || Math.abs(deg1 - final_deg) >= 270) {
           if (speed < maxspeed)
               speed += engine_acceleration;
           deg = final_deg;
       }
       else {
           if (speed > minspeed)
               speed -= engine_acceleration;
           deg = (final_deg + 180) % 360;
       }
       if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270) {
           deg1 += degspeed;
           deg1 %= 360;
           if (((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270))
               deg1 = deg;
       }
       else if ((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270) {
           deg1 -= degspeed;
           if (deg1 < 0)
               deg1 += 360;
           if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270)
               deg1 = deg;
       }
       if (!(Math.abs(speed) < 0.00001)) {
           x += speed * Math.sin(2 * Math.PI / 360 * deg1);
           y -= speed * Math.cos(2 * Math.PI / 360 * deg1);
       }
   }
}

function tankStop() {
   with (data.tank) {
       if (speed > 0.00001)
           speed -= fraction_acceleration
       else if (speed < -0.00001)
           speed += fraction_acceleration
       if (!(Math.abs(speed) < 0.00001)) {
           x += speed * Math.sin(2 * Math.PI / 360 * deg1);
           y -= speed * Math.cos(2 * Math.PI / 360 * deg1);
       }
   }
}

function fireBullet() {
    if (addBulletTimer>0) {
        addBulletTimer--;
        return 'adding bullet';
    }
    if (!addBulletTimer&&!data.tank.bullet) {
        data.tank.bullet = MAXBULLET;
    }
    if (bulletTimer>0) {
        bulletTimer--;
        return 'waiting next bullet';
    }
    if (!firing) return 'not firing';
    /**/
    data.tank.bullet--;
    var dir = data.tank.deg2*180/Math.PI;
    var vx = -Math.sin(dir)*8;
    var vy = -Math.cos(dir)*8;
    var msg={
        t:'AddBullet',
        x:data.tank.x,
        y:data.tank.y,
        color:data.tank.color,
        vx:vx,
        vy:vy
    };
    sendMessage(msg);
    if (data.tank.bullet){
        bulletTimer = 10;
    } else {
        addBulletTimer = 60;
    }
    return msg;
}

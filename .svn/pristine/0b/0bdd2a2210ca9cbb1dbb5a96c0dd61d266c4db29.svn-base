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
               data.tanks[q].deg2 = data.tankShadows[p].d;
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
           data.tanks.push({i: data.tankShadows[p].i,x: mx,y: my,vx: 0,vy: 0,ax: 0,ay: 0,deg1: 0,color: data.tankShadows[p].c});
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
// function tankTestMove() {
//    var u1 = 6;
//    var u2 = 80;
//    with (data.tankTest) {
//        //var dd = dis2(MOUSEX, MOUSEY, x, y);
//        //ax = (MOUSEX - x) - vx / u1;
//        //ay = (MOUSEY - y) - vy / u1;
//        //var vv = dis2(vx, vy, 0, 0);
//        var v2=3*Math.pow(Math.abs(MOUSEY-y),0.35);
//        var v1=3*Math.pow(Math.abs(MOUSEX-x),0.35);
//        var oldx = x;
//        var oldy = y;
//        vx=(MOUSEX>x)?v1:(-v1);
//        vy=(MOUSEY>y)?v2:(-v2);
//        if((x+vx-MOUSEX)*(x-MOUSEX)<0){
//            x=MOUSEX;
//            vx=0;
//        }
//        else
//            x+=vx;
//        if((y+vy-MOUSEY)*(y-MOUSEY)<0){
//            y=MOUSEY;
//            vy=0;
//        }
//        else
//            y+=vy;
//        if(!(x-oldx==0&&y-oldy==0)){
//            final_deg = (Math.PI / 2 + Math.atan2(y-oldy, x-oldx)) * 180 / Math.PI;
//            if (Math.abs(deg1 - final_deg) <= 90 || Math.abs(deg1 - final_deg) >= 270) {
//                deg = final_deg;
//            }
//            else {
//                deg = (final_deg + 180) % 360;
//            }
//            if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270) {
//                deg1 += degspeed;
//                deg1 %= 360;
//                if (((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270))
//                    deg1 = deg;
//            }
//            else if ((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270) {
//                deg1 -= degspeed;
//                if (deg1 < 0)
//                    deg1 += 360;
//                if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270)
//                    deg1 = deg;
//            }
//        }
//    }
// }

function updateData(d) {
   //输入: 从服务器过来的数据
   //console.log(d.tanks);

/*
d:
   [{
       "u_id": "b37eff17dc2540d0bed2ae66d4051e95",
       "bullets": [],
       "tanks": {"y": 512, "x": 512, "color": "1"}},
   {
        "u_id": "a2802c6920fb4b71bc55382553343527",
       "bullets": [],
       "tanks": {"y": 759, "x": 512, "color": "1"}},
   {
        "u_id": "313e4dc2893c4a79b517e650d89dcdb6",
       "bullets": [],
       "tanks": {"y": 512, "x": 512, "color": "1"}}]
*/

//a["[{\"u_id\": \"9f002e534b4e4497a86c28fb1503e9e2\", \"bullets\": [], \"tanks\": {\"y\": 535, \"x\": 168, \"c\": \"1\", \"d\": 6.26}}, {\"u_id\": \"75522aad14df453b93e4d3cca68f6ffe\", \"bullets\": [], \"tanks\": {\"y\": 605, \"x\": 739, \"c\": \"2\", \"d\": 2.1}}, {\"u_id\": \"471328411b8142758277bd77173731e7\", \"bullets\": [], \"tanks\": {\"y\": 512, \"x\": 512, \"c\": \"2\", \"d\": 3.14}}]"]

    data.bullets = [];
    data.tankShadows = [];
    for (var p in d) {
        //console.log(d[p]);
        data.tankShadows.push(d[p].tanks);
        data.tankShadows[p].i = d[p].u_id;
        data.bullets = data.bullets.concat(d[p].bullets);
    }

//    data.tankShadows = d.tanks;
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

function checkPosition() {
    //如果位置不合法就退回前一帧位置。
    var u = 35;
    with (data.tank) {
        if (x<u) {
            x=u;
        }
        if (x>1024-u) {
            x=1024-u;
        }
        if (y<u) {
            y=u;
        }
        if (y>1024-u) {
            y=1024-u;
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
    var dir = data.tank.deg2;
    console.log(dir);
    var vx = -Math.round(Math.sin(dir)*16*100)/100;
    var vy = -Math.round(Math.cos(dir)*16*100)/100;

    data.tank.bullets.push({
        x:Math.round(data.tank.x*100)/100,
        y:Math.round(data.tank.y*100)/100,
        color:data.tank.color,
        vx:vx,
        vy:vy,
        f:90
    });
    if (data.tank.bullet){
        bulletTimer = 10;
    } else {
        addBulletTimer = 60;
    }
}

function bulletMove(){
    for (var p in data.bullets) {//对其他玩家的子弹进行插值
        with(data.bullets[p]) {
            x+=vx;
            y+=vy;
        }
    }
    for (var p in data.tank.bullets) {//自己的子弹，进行各种判定
        with(data.tank.bullets[p]) {
            var prex = x;//记录上一帧的xy
            var prey = y;

            x+=vx;
            y+=vy;
            x = Math.round(x*100)/100;
            y = Math.round(y*100)/100;
            f--;

//开始判定
            var s = 10;
            if (x<s) {
                x = s*2-x;
                vx*=-1;
            }
            if (y<s) {
                y = s*2-y;
                vy*=-1;
            }
            if (x>1024-s) {
                x = 2048-2*s-x;
                vx*=-1;
            }
            if (y>1024-s) {
                y = 2048-2*s-y;
                vy*=-1;
            }

            /*
            如果进入中间Z字的边界，则做镜面反射
            子弹速度是每帧16，所以z字的厚度应该大于16
            */
            var w = checkInZ(prex, prey, x, y, s);//在z形的哪一段
            if (w) console.log(w);
            switch (w) {
                case 1:break;
                case 2:break;
                case 3:break;
                case 4:break;
                case 5:break;
                case 6:break;
                case 7:break;
                case 8:break;
            }


        }
    }
    for (var p = data.tank.bullets.length-1;p>=0;p--) {//删除自己超时的子弹//还要加上已命中坦克的子弹
        if (data.tank.bullets[p].f==0) {
            data.tank.bullets.splice(p,1);
        }
    }
}

function checkInZ(px,py,x0,y0,s) {
    if (y0!=py) {
        //3 4 6 5
        if (py<=200-s&&y0>=200-s) {
            var tmp = 200-s;
            var x = (x0-px)*(tmp-py)/(y0-py)+px;
            if (x>200-s&&x<1024-200+s) return 3;
        }
        if (py>=200+s&&y0<=200+s) {
            var tmp = 200+s;
            var x = (x0-px)*(tmp-py)/(y0-py)+px;
            if (x>200-s&&x<1024-200+s) return 4;
        }
        if (py<=1024-200-s&&y0>=1024-200-s) {
            var tmp = 1024-200-s;
            var x = (x0-px)*(tmp-py)/(y0-py)+px;
            if (x>200-s&&x<1024-200+s) return 5;
        }
        if (py>=1024-200+s&&y0<=1024-200+s) {
            var tmp = 1024-200+s;
            var x = (x0-px)*(tmp-py)/(y0-py)+px;
            if (x>200-s&&x<1024-200+s) return 6;
        }
    }
    if (x0!=px) {
        //1 2
        var y = (y0-py)*(200-s)/(x0-px)+py;
        if (px<=200-s&&x0>=200-s&&((y>200-s&&y<200+s)||(y>1024-200-s&&y<1024-200+s))) return 1;
        y = (y0-py)*(1024-200+s)/(x0-px)+py;
        if (px>=1024-200+s&&x0<=1024-200+s&&((y>200-s&&y<200+s)||(y>1024-200-s&&y<1024-200+s))) return 2;
    }
    return 0;
}

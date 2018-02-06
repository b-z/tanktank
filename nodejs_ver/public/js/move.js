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
                data.tanks[q].hp = data.tankShadows[p].hp;
                data.tanks[q].flag = data.tankShadows[p].f;
                data.tanks[q].score = data.tankShadows[p].s;

                m = 1;
                var u1 = 6,
                    u2 = 80;
                with(data.tanks[q]) {
                    //var dd = dis2(mx, my, x, y);
                    //ax = (mx - x) - vx / u1;
                    //ay = (my - y) - vy / u1;
                    //var vv = dis2(vx, vy, 0, 0);
                    var v2 = 3 * Math.pow(Math.abs(my - y), 0.35);
                    var v1 = 3 * Math.pow(Math.abs(mx - x), 0.35);
                    var oldx = x;
                    var oldy = y;
                    vx = (mx > x) ? v1 : (-v1);
                    vy = (my > y) ? v2 : (-v2);
                    if ((x + vx - mx) * (x - mx) < 0) {
                        x = mx;
                        vx = 0;
                    } else
                        x += vx;
                    if ((y + vy - my) * (y - my) < 0) {
                        y = my;
                        vy = 0;
                    } else
                        y += vy;
                    if (!(x - oldx == 0 && y - oldy == 0)) {
                        final_deg = (Math.PI / 2 + Math.atan2(y - oldy, x - oldx)) * 180 / Math.PI;
                        if (Math.abs(deg1 - final_deg) <= 90 || Math.abs(deg1 - final_deg) >= 270) {
                            deg = final_deg;
                        } else {
                            deg = (final_deg + 180) % 360;
                        }
                        if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270) {
                            deg1 += degspeed;
                            deg1 %= 360;
                            if (((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270))
                                deg1 = deg;
                        } else if ((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270) {
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
            data.tanks.push({
                i: data.tankShadows[p].i,
                x: mx,
                y: my,
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0,
                deg1: 0,
                color: data.tankShadows[p].c,
                name: data.tankShadows[p].n,
                hp: data.tankShadows[p].hp,
                flag: data.tankShadows[p].f,
                score: data.tankShadows[p].s,
            });
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

function updateData(d) {
    data.bullets = [];
    data.tankShadows = {};
    //console.log(d.pos.fp);
    for (var p in d.data) {
        // console.log(d[p].hp);
        data.tankShadows[p] = d.data[p].tanks;
        data.tankShadows[p].i = p;
        data.tankShadows[p].hp = d.data[p].hp;
        // data.tankShadows[p].f = d[p].f;
        // console.log(d.data[p].tanks.s);

        data.bullets = data.bullets.concat(d.data[p].bullets);
    }
    if (d.pos != undefined) {
        data.fpos = d.pos.fp;
        data.dpos = d.pos.dp;
    }

    //    data.tankShadows = d.tanks;
}

function tankMove() {
    data.prex = data.tank.x;
    data.prey = data.tank.y;
    if (data.tank.hp == 0) return;
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
    checkPosition();
    data.tank.deg2 = Math.PI + Math.atan2(MOUSEX - data.tank.x, MOUSEY - data.tank.y);
}

function tankStart(final_deg) {
    with(data.tank) {
        if (Math.abs(deg1 - final_deg) <= 90 || Math.abs(deg1 - final_deg) >= 270) {
            if (speed < maxspeed)
                speed += engine_acceleration;
            deg = final_deg;
        } else {
            if (speed > minspeed)
                speed -= engine_acceleration;
            deg = (final_deg + 180) % 360;
        }
        if ((deg1 - deg >= -90 && deg1 - deg < 0) || deg1 - deg >= 270) {
            deg1 += degspeed;
            deg1 %= 360;
            if (((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270))
                deg1 = deg;
        } else if ((deg1 - deg <= 90 && deg1 - deg > 0) || deg1 - deg <= -270) {
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
    with(data.tank) {
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
    with(data.tank) {
        if (x < u) {
            x = u;
            x = data.prex;
            y = data.prey;
            speed = 0;
        }
        if (x > 1024 - u) {
            x = 1024 - u;
            x = data.prex;
            y = data.prey;
            speed = 0;
        }
        if (y < u) {
            y = u;
            x = data.prex;
            y = data.prey;
            speed = 0;
        }
        if (y > 1024 - u) {
            y = 1024 - u;
            x = data.prex;
            y = data.prey;
            speed = 0;
        }
        var w = checkInZ(data.prex, data.prey, x, y, u);
        //    if (w) console.log(w);

        switch (w) {
            case 1:
                x = 200 - u;
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 2:
                x = 1024 - 200 + u;
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 3:
                y = 200 - u;
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 4:
                y = 200 + u;
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 5:
                y = 1024 - 200 - u;
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 6:
                y = 1024 - 200 + u;
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 7:
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
            case 8:
                x = data.prex;
                y = data.prey;
                speed = 0;
                break;
        }
    }
}

function fireBullet() {
    if (died) {
        return 'died';
    }
    if (addBulletTimer > 0) {
        addBulletTimer--;
        return 'adding bullet';
    }
    if (!addBulletTimer && !data.tank.bullet) {
        data.tank.bullet = MAXBULLET;
        $("#mp").html("Bullets: 5");
    }
    if (bulletTimer > 0) {
        bulletTimer--;
        return 'waiting next bullet';
    }
    if (!firing) return 'not firing';
    /**/
    data.tank.bullet--;
    var dir = data.tank.deg2;
    //console.log(dir);
    var vx = -Math.round(Math.sin(dir) * 16 * 100) / 100;
    var vy = -Math.round(Math.cos(dir) * 16 * 100) / 100;

    data.tank.bullets.push({
        x: Math.round(data.tank.x * 100) / 100,
        y: Math.round(data.tank.y * 100) / 100,
        color: data.tank.color,
        vx: vx,
        vy: vy,
        f: 120
    });
    if (data.tank.bullet) {
        bulletTimer = 10;
        $("#mp").html("Bullets: " + data.tank.bullet);
    } else {
        addBulletTimer = 60;
        $("#mp").html("Adding bullet");
    }
}

function bulletMove() {
    for (var p in data.bullets) { //对其他玩家的子弹进行插值
        if (typeof(data.bullets[p]) != 'object') continue;
        with(data.bullets[p]) {
            var prex = x; //记录上一帧的xy
            var prey = y;

            x += vx;
            y += vy;
            x = Math.round(x * 100) / 100;
            y = Math.round(y * 100) / 100;
            f--;

            //开始判定
            var s = 10;
            if (x < s) {
                x = s * 2 - x;
                vx *= -1;
            }
            if (y < s) {
                y = s * 2 - y;
                vy *= -1;
            }
            if (x > 1024 - s) {
                x = 2048 - 2 * s - x;
                vx *= -1;
            }
            if (y > 1024 - s) {
                y = 2048 - 2 * s - y;
                vy *= -1;
            }

            /*
            如果进入中间Z字的边界，则做镜面反射
            子弹速度是每帧16，所以z字的厚度应该大于16
            */
            var w = checkInZ(prex, prey, x, y, s); //在z形的哪一段
            //        if (w) console.log(w);
            switch (w) {
                case 1:
                    vx = -vx;
                    x = 2 * (200 - s) - x;
                    x = prex;
                    y = prey;
                    break;
                case 2:
                    vx = -vx;
                    x = 2 * (1024 - 200 + s) - x;
                    x = prex;
                    y = prey;
                    break;
                case 3:
                    vy = -vy;
                    y = 2 * (200 - s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 4:
                    vy = -vy;
                    y = 2 * (200 + s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 5:
                    vy = -vy;
                    y = 2 * (1024 - 200 - s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 6:
                    vy = -vy;
                    y = 2 * (1024 - 200 + s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 7:
                    var tmp = vx;
                    vx = -vy;
                    vy = -tmp;
                    tmp = x;
                    x = 1024 - s * Math.sqrt(2) - y;
                    y = 1024 - s * Math.sqrt(2) - tmp;
                    x = prex;
                    y = prey;
                    break;
                case 8:
                    var tmp = vx;
                    vx = -vy;
                    vy = -tmp;
                    tmp = x;
                    x = 1024 + s * Math.sqrt(2) - y;
                    y = 1024 + s * Math.sqrt(2) - tmp;
                    x = prex;
                    y = prey;
                    break;
            }
        }
    }
    for (var p in data.tank.bullets) { //自己的子弹，进行各种判定
        with(data.tank.bullets[p]) {
            var prex = x; //记录上一帧的xy
            var prey = y;

            x += vx;
            y += vy;
            x = Math.round(x * 100) / 100;
            y = Math.round(y * 100) / 100;
            f--;

            //开始判定
            var s = 10;
            if (x < s) {
                x = s * 2 - x;
                vx *= -1;
            }
            if (y < s) {
                y = s * 2 - y;
                vy *= -1;
            }
            if (x > 1024 - s) {
                x = 2048 - 2 * s - x;
                vx *= -1;
            }
            if (y > 1024 - s) {
                y = 2048 - 2 * s - y;
                vy *= -1;
            }

            /*
            如果进入中间Z字的边界，则做镜面反射
            子弹速度是每帧16，所以z字的厚度应该大于16
            */
            var w = checkInZ(prex, prey, x, y, s); //在z形的哪一段
            // if (w) console.log(w);
            switch (w) {
                case 1:
                    vx = -vx;
                    x = 2 * (200 - s) - x;
                    x = prex;
                    y = prey;
                    break;
                case 2:
                    vx = -vx;
                    x = 2 * (1024 - 200 + s) - x;
                    x = prex;
                    y = prey;
                    break;
                case 3:
                    vy = -vy;
                    y = 2 * (200 - s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 4:
                    vy = -vy;
                    y = 2 * (200 + s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 5:
                    vy = -vy;
                    y = 2 * (1024 - 200 - s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 6:
                    vy = -vy;
                    y = 2 * (1024 - 200 + s) - y;
                    x = prex;
                    y = prey;
                    break;
                case 7:
                    var tmp = vx;
                    vx = -vy;
                    vy = -tmp;
                    tmp = x;
                    x = 1024 - s * Math.sqrt(2) - y;
                    y = 1024 - s * Math.sqrt(2) - tmp;
                    x = prex;
                    y = prey;
                    break;
                case 8:
                    var tmp = vx;
                    vx = -vy;
                    vy = -tmp;
                    tmp = x;
                    x = 1024 + s * Math.sqrt(2) - y;
                    y = 1024 + s * Math.sqrt(2) - tmp;
                    x = prex;
                    y = prey;
                    break;
            }


        }
    }
    for (var p = data.tank.bullets.length - 1; p >= 0; p--) { //删除自己超时的子弹//还要加上已命中坦克的子弹
        if (data.tank.bullets[p].f == 0) {
            data.tank.bullets.splice(p, 1);
        }
    }
}

function checkInZ(px, py, x0, y0, s) {
    if (x0 <= 200 && y0 < 512) {
        if ((x0 - 200) * (x0 - 200) + (y0 - 200) * (y0 - 200) < s * s)
            return 1;
        else
            return 0;
    }
    if (x0 >= 1024 - 200 && y0 > 512) {
        if ((x0 - (1024 - 200)) * (x0 - (1024 - 200)) + (y0 - (1024 - 200)) * (y0 - (1024 - 200)) < s * s)
            return 2;
        else
            return 0;
    }
    if (x0 <= 200 && y0 > 512 && x0 + 1024 - 200 <= y0 + 200) {
        if ((x0 - 200) * (x0 - 200) + (y0 - (1024 - 200)) * (y0 - (1024 - 200)) < s * s)
            return 1;
        else
            return 0;
    }
    if (x0 >= 1024 - 200 && y0 < 512 && x0 + 200 >= y0 + 1024 - 200) {
        if ((x0 - (1024 - 200)) * (x0 - (1024 - 200)) + (y0 - 200) * (y0 - 200) < s * s)
            return 2;
        else {
            //    console.log(1);
            return 0;
        }
    }
    if (y0 != py) {
        //3 4 6 5
        if (py <= 200 - s && y0 >= 200 - s) {
            var tmp = 200 - s;
            var x = (x0 - px) * (tmp - py) / (y0 - py) + px;
            if (x > 200 && x < 1024 - 200) return 3;
        }
        if (py >= 200 + s && y0 <= 200 + s) {
            var tmp = 200 + s;
            var x = (x0 - px) * (tmp - py) / (y0 - py) + px;
            if (x > 200 && x < 1024 - 200) return 4;
        }
        if (py <= 1024 - 200 - s && y0 >= 1024 - 200 - s) {
            var tmp = 1024 - 200 - s;
            var x = (x0 - px) * (tmp - py) / (y0 - py) + px;
            if (x > 200 && x < 1024 - 200) return 5;
        }
        if (py >= 1024 - 200 + s && y0 <= 1024 - 200 + s) {
            var tmp = 1024 - 200 + s;
            var x = (x0 - px) * (tmp - py) / (y0 - py) + px;
            if (x > 200 && x < 1024 - 200) return 6;
        }
    }
    if (x0 != px) {
        //1 2
        var y = (y0 - py) * (200 - s - px) / (x0 - px) + py;
        if (px <= 200 - s && x0 >= 200 - s && ((y > 200 - s && y < 200 + s) || (y > 1024 - 200 - s && y < 1024 - 200 + s))) return 1;
        y = (y0 - py) * (1024 - 200 + s - px) / (x0 - px) + py;
        if (px >= 1024 - 200 + s && x0 <= 1024 - 200 + s && ((y > 200 - s && y < 200 + s) || (y > 1024 - 200 - s && y < 1024 - 200 + s))) return 2;
    }
    if (px + py != x0 + y0) {
        //7 8
        var tmp = 1024 - s * Math.sqrt(2);
        if (px + py <= tmp && x0 + y0 >= tmp) {
            var x = ((x0 - px) * (tmp - py) + px * (y0 - py)) / (x0 + y0 - px - py);
            if (x > 200 - s && x < 1024 - 200 + s && py > 200 - s && py < 1024 - 200 + s) return 7;
        }
        tmp = 1024 + s * Math.sqrt(2);
        if (px + py >= tmp && x0 + y0 <= tmp) {
            var x = ((x0 - px) * (tmp - py) + px * (y0 - py)) / (x0 + y0 - px - py);
            if (x > 200 - s && x < 1024 - 200 + s && py > 200 - s && py < 1024 - 200 + s) return 8;
        }
    }
    return 0;
}

function checkHit() {
    for (var b = data.tank.bullets.length - 1; b >= 0; b--) {
        for (var t in data.tanks) {
            //console.log(data.tanks[t]);
            if (data.tank.bullets[b] != undefined && data.tank.bullets[b].f <= 115) {
                if (Math.abs(data.tanks[t].x - data.tank.bullets[b].x) <= 35 &&
                    Math.abs(data.tanks[t].y - data.tank.bullets[b].y) <= 35) {
                    // console.log(data.tanks[t]);
                    data.tank.bullets.splice(b, 1);
                    data.tank.hit.push(data.tanks[t].i);
                    if (data.tanks[t].hp > 0) {
                        localStorage.setItem(0, localStorage.getItem(0) - (-1));
                        if (data.tanks[t].color == my_team)
                            localStorage.setItem(0, localStorage.getItem(0) - (2));
                    }
                    data.tank.score = localStorage.getItem(0);
                }
            }
        }
    }
}

function checkGetFlag() {
    if (Math.abs(data.tank.x - data.fpos.x) <= 35 && Math.abs(data.tank.y - data.fpos.y) <= 35) {
        var tmp = 0;
        for (var p in data.tanks) {
            if (data.tanks[p].flag)
                tmp = 1;
        }
        if (!tmp) {
            data.tank.flag = 1;
        }
    }
    if (data.tank.flag == 1 && Math.abs(data.tank.x - data.dpos.x) <= 35 && Math.abs(data.tank.y - data.dpos.y) <= 35) {
        data.g = 1;
    }
}

function die() {
    died = true;
    data.tank.flag = 0;
    setTimeout(function() {
        //        died = false;
        //        data.tank.hp = 5;
        // console.log("revival");
        // sendMessage("revival",{i:my_id});
        socket.emit("revival", {
            i: my_id
        });
    }, 3000);
}

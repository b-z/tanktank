//所有和画图相关的代码都在这里
//注意要变换坐标

function loadImages() {
    IMAGE_LOADED = 0;
    var count = 15;
    images = {
        tank1: new Image(),
        tank2: new Image(),
        fire1: new Image(),
        fire2: new Image(),
        bul1: new Image(),
        bul2: new Image(),
        flag1: new Image(),
        goal: new Image(),
        shit1: new Image(),
        shit2: new Image(),
        cursor: new Image(),
        cursor_fire: new Image(),
        heart: new Image(),
        bullet1: new Image(),
        bullet2: new Image(),
    };
    with(images) {
        tank1.src = 'img/tank1.png';
        tank2.src = 'img/tank2.png';
        fire1.src = 'img/fire1.png';
        fire2.src = 'img/fire2.png';
        bul1.src = 'img/bul1.png';
        bul2.src = 'img/bul2.png';
        flag1.src = 'img/flag1.png';
        goal.src = 'img/goal.png';
        shit1.src = 'img/shit1.png';
        shit2.src = 'img/shit2.png';
        cursor.src = 'img/cursor.png';
        cursor_fire.src = 'img/cursor_fire.png';
        heart.src = 'img/heart.png';
        bullet1.src = 'img/bullet1.png';
        bullet2.src = 'img/bullet2.png';
    }
    for (var p in images) {
        images[p].onload = function() {
            IMAGE_LOADED++;
            if (IMAGE_LOADED == count) {
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
    drawGoal(data.dpos.x, data.dpos.y);

    drawTank(data.tank);
    // drawTank(data.tankTest);
    // for (var p in data.tankShadows) {
    //     drawTank(data.tankShadows[p]);
    // }
    for (var p in data.tanks) {
        //    console.log(data.tanks[p]);
        if (data.tanks[p].i != my_id) {
            drawTank(data.tanks[p]);
        } else {
            var s1 = localStorage.getItem(0);
            var s2 = data.tanks[p].score;
            // console.log(s2);
            if (Math.abs(s1 - s2) > 20) {
                localStorage.setItem(0, data.tanks[p].score);
                data.tank.score = data.tanks[p].score;
                // console.log(s1 + 'hehe' + s2); // TODO ???
            } else if (data.tanks[p].hp < data.tank.hp) {
                // 掉血
                localStorage.setItem(0, localStorage.getItem(0) - 1);
                data.tank.score = localStorage.getItem(0);
                data.tank.super = false;
            }
            data.tank.hp = data.tanks[p].hp;
            if (data.tank.hp == 0 && died == false) {
                die();
            } else if (data.tank.hp > 0 && died == true) {
                died = false;
                // if (my_team=='1') {
                //     data.tank.x = Math.random()*200+100;
                //     data.tank.y = Math.random()*300+300;
                // } else {
                //     data.tank.x = 1024-Math.random()*200-100;
                //     data.tank.y = 1024-(Math.random()*300+300);
                // }
                data.tank.bullet = 5;
                data.tank.speed = 0;
                $("#hp").html("Life: " + data.tank.hp);
                $("#mp").html("Bullets: " + data.tank.bullet);
            } else if (data.tank.hp > 0)
                $("#hp").html("Life: " + data.tank.hp);
        }
        $("#score").html("Score: " + data.tank.score);
    }
    drawBarrier();
    var tmp = 0;
    for (var p in data.tanks) {
        if (data.tanks[p].flag)
            tmp = 1;
    }
    if (!tmp) {
        drawFlag(data.fpos.x, data.fpos.y);
    }
    drawCursor();
    drawDieMask();
}

function drawBullet(p) {
    if (typeof(p) != 'object') return;
    var bi = images['bul' + p.color];
    // console.log(p);
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
    if (p.color != '1' && p.color != '2') return;
    var ti = images['tank' + p.color];
    var fi = images['fire' + p.color];
    // console.log(p.color);
    var xpos = p.x - 2048 / 64;
    var ypos = p.y - 2048 / 64;

    ctx.save();
    ctx.font = "20px sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.name, p.x, p.y + 40, 80);
    ctx.fillText('Score:' + p.score, p.x, p.y + 60, 80)
    ctx.restore();

    for (var i = 0; i < p.hp; i++) {
        var r = 40;
        var t = p.deg2 + 2 * i * Math.PI / p.hp;
        if (p.super) t += CLOCK / 10 * (p.color == '1' ? 1 : -1);
        // r *= Math.sin(CLOCK/10);
        var oy = r * Math.cos(t);
        var ox = r * Math.sin(t);
        ctx.drawImage(images.heart, p.x + ox - 10, p.y + oy - 10, 20, 20);
    }

    if (p.hp == 0) {
        ctx.drawImage(images['shit' + p.color], xpos, ypos, 2048 / 32, 2048 / 32);
        return;
    }
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

    if (p.flag) {
        ctx.drawImage(images['flag1'], p.x - 7, p.y - 45, 50, 50);
    }


}

function drawCursor() {
    var size = 80 + 15 * Math.sin(CLOCK / 5);
    var xpos = MOUSEX - size / 2;
    var ypos = MOUSEY - size / 2;
    var b = data.tank.bullet;
    var f = firing;
    var c = data.tank.color;
    for (var i = 0; i < b; i++) {
        ctx.drawImage(images['bullet' + c], MOUSEX + 20 * i, MOUSEY, 20, 40);
    }
    ctx.save();
    ctx.translate(xpos + size / 2, ypos + size / 2);
    ctx.rotate(-CLOCK * Math.PI / 180 * 1.5);
    ctx.translate(-xpos - size / 2, -ypos - size / 2);
    ctx.drawImage(images['cursor' + ((f && b) ? '_fire' : '')], xpos, ypos, size, size);
    ctx.restore();
    if (data.tank.super) {
        var r = Math.sqrt(Math.pow(MOUSEX - data.tank.x, 2) + Math.pow(MOUSEY - data.tank.y, 2));
        size /= 2;
        xpos = data.tank.x - size / 2 - r * Math.sin(data.tank.deg2 + 0.05);
        ypos = data.tank.y - size / 2 - r * Math.cos(data.tank.deg2 + 0.05);
        ctx.save();
        ctx.translate(xpos + size / 2, ypos + size / 2);
        ctx.rotate(-CLOCK * Math.PI / 180 * 1.5);
        ctx.translate(-xpos - size / 2, -ypos - size / 2);
        ctx.drawImage(images['cursor' + ((f && b) ? '_fire' : '')], xpos, ypos, size, size);
        ctx.restore();
        xpos = data.tank.x - size / 2 - r * Math.sin(data.tank.deg2 - 0.05);
        ypos = data.tank.y - size / 2 - r * Math.cos(data.tank.deg2 - 0.05);
        ctx.save();
        ctx.translate(xpos + size / 2, ypos + size / 2);
        ctx.rotate(-CLOCK * Math.PI / 180 * 1.5);
        ctx.translate(-xpos - size / 2, -ypos - size / 2);
        ctx.drawImage(images['cursor' + ((f && b) ? '_fire' : '')], xpos, ypos, size, size);
        ctx.restore();
    }
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
    for (var i = 1; i < 32; i++) {
        ctx.moveTo(i * (1024 / 32), 0);
        ctx.lineTo(i * (1024 / 32), 1024);
        ctx.moveTo(0, i * (1024 / 32));
        ctx.lineTo(1024, i * (1024 / 32));
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
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, 1024);
    ctx.moveTo(0, w / 2);
    ctx.lineTo(1024, w / 2);
    ctx.moveTo(1024, 1024 - w / 2);
    ctx.lineTo(w / 2, 1024 - w / 2);
    ctx.moveTo(1024 - w / 2, 1024);
    ctx.lineTo(1024 - w / 2, w / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgb(' + Math.round(75 + 35 * Math.sin(CLOCK / 15)) + ',0,0)';
    var p = 200;
    w = 10;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(p, p);
    ctx.lineTo(1024 - p, p);
    ctx.lineTo(p, 1024 - p);
    ctx.lineTo(1024 - p, 1024 - p);
    //ctx.closePath();
    ctx.stroke();

    ctx.restore();
}

function drawFlag(x, y) {
    var fi = images['flag1'];
    var size = 50;
    var xpos = x - size / 2;
    var ypos = y - size / 2;
    ctx.save();
    ctx.drawImage(fi, xpos, ypos, size, size);
    ctx.restore();
}

function drawGoal(x, y) {
    var fi = images['goal'];
    var size = 100;
    var xpos = x - size;
    var ypos = y - size / 2;
    ctx.save();
    ctx.drawImage(fi, xpos, ypos, size * 2, size);
    ctx.restore();
}

function drawDieMask() {
    if (died) {
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.restore();
    }
}

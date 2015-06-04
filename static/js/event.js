//重新获取窗口大小并调整canvas的位置、大小
function optimize() {
    SCREEN_WIDTH = document.documentElement.clientWidth;
    SCREEN_HEIGHT = document.documentElement.clientHeight;
    var long_short = 4 / 3;
    GAME_HEIGHT = SCREEN_HEIGHT / SCREEN_WIDTH > 1 / long_short ? SCREEN_WIDTH * 1 / long_short : SCREEN_HEIGHT;
    GAME_WIDTH = GAME_HEIGHT * long_short;
    BLOCK1_WIDTH = 300;
    BLOCK1_HEIGHT = 302;
    //$('#canv').remove();
    //$('body').prepend('<canvas id="canv" tabindex="0" style="width:'+GAME_HEIGHT+'px;height:'+GAME_HEIGHT+'px;margin-top:'+(SCREEN_HEIGHT-GAME_HEIGHT)/2+'px;margin-left:'+(SCREEN_WIDTH-GAME_HEIGHT)/2++'px;"></canvas>');
    $('#canv').css('background', 'white');
    $('#canv').css('width', GAME_HEIGHT + 'px');
    $('#canv').css('height', GAME_HEIGHT + 'px');
    $('#canv').css('margin-top', (SCREEN_HEIGHT - GAME_HEIGHT) / 2 + 'px');
    $('#canv').css('margin-left', (SCREEN_WIDTH  - GAME_HEIGHT/3- GAME_HEIGHT) / 2+ 'px');
    $('#block1').css('width', BLOCK1_WIDTH + 'px');
    $('#block1').css('margin-top', (SCREEN_HEIGHT - BLOCK1_HEIGHT) / 2+ 'px');
    $('#block1').css('margin-left', ((SCREEN_WIDTH  - GAME_HEIGHT/3- GAME_HEIGHT) / 2 + GAME_HEIGHT)+ 10+'px');
    ctx = $('#canv')[0].getContext('2d');
    $("#hp").html("Life:   5");
    $("#mp").html("Bullets:     5");
    $("#score").html("Score:    0");
    $("#game_title").html("I wanna be a shit");
    $("#help").html("<br/>Tutorial:<br/>↑/W:    Up<br/>↓/S:     Down<br/>←/A:   Left<br/>→/D:   Right<br/>Mouse move:   Aim<br/>Mouse click:    Shoot<br/><br/>Capture the flag to the goal with your teammates!"
        +"<br><br>Credits:<br><a href='http://paddywhq.github.io/'>Wang Huaqing</a><br><a href='http://zbww.github.io/'>Zhou Bowei</a><br><a href='http://chongluyao.github.io/Homework1/'>Chong Luyao</a>"
        +"<br><br>And...how about<br><a href='https://github.com/zbww/tanktank'>give a star on GitHub</a>?"
    );
    $('#gameoverContainer_dark').css('z-index', -100);

//     $('#rect1').css('position', 'absolute');
//     $('#rect2').css('position', 'absolute');
//
//     $('#rect1').css('width', (GAME_WIDTH-GAME_HEIGHT)/2-1+'px');
//     $('#rect1').css('left', (SCREEN_WIDTH - GAME_WIDTH) / 2+'px');
//     $('#rect1').css('top', (SCREEN_HEIGHT - GAME_HEIGHT) / 2+'px');
//
//     $('#rect2').css('width', (GAME_WIDTH-GAME_HEIGHT)/2-1+'px');
//     $('#rect2').css('left', (SCREEN_WIDTH + GAME_HEIGHT) / 2+'px');
//     $('#rect2').css('top', (SCREEN_HEIGHT - GAME_HEIGHT) / 2+'px');
//     $('#rect1').css('height', GAME_HEIGHT+'px');
//     $('#rect2').css('height', GAME_HEIGHT+'px');
}

function enter_name() {
    SCREEN_WIDTH = document.documentElement.clientWidth;
    SCREEN_HEIGHT = document.documentElement.clientHeight;
    BLOCK1_HEIGHT = 20;
    BLOCK1_WIDTH = 350;
    $('#canv').css('z-index', 0);
    $('#gameover').css('width', BLOCK1_WIDTH + 'px');
    $('#gameover').css('height', BLOCK1_HEIGHT + 'px');
    $('#gameover').css('margin-top', (SCREEN_HEIGHT - BLOCK1_HEIGHT) / 2 + 'px');
    $('#gameover').css('margin-left', (SCREEN_WIDTH - BLOCK1_WIDTH) / 2 + 'px');
    $('#gameover').css('opacity', 1);
    $('#gameover').css('z-index', 3);
    $('#gameoverContainer_dark').css('width', SCREEN_WIDTH + 'px');
    $('#gameoverContainer_dark').css('height', SCREEN_HEIGHT + 'px');
    $('#gameoverContainer_dark').css('opacity', 0.7);
    $('#gameoverContainer_dark').css('z-index', 1);
}

function addEvent() {
    document.addEventListener('mousemove', function(e) {
        //  console.log(e.x+' '+e.y);
        MOUSEX = e.x - (SCREEN_WIDTH - GAME_HEIGHT - GAME_HEIGHT/3) / 2;
        MOUSEY = e.y - (SCREEN_HEIGHT - GAME_HEIGHT) / 2;
        MOUSEX *= 1024 / GAME_HEIGHT;
        MOUSEY *= 1024 / GAME_HEIGHT;
    });
    document.addEventListener('mousedown', function(e) {
        firing = true;
    });
    document.addEventListener('mouseup', function(e) {
        firing = false;
    });
    document.addEventListener('keydown', function(e) {
        switch (e.which) {
            case 87:
            case 38:
                key.u = true;
                if (key.u)
                    keyNow |= 1;
                else
                    keyNow &= 14;
                break;
            case 83:
            case 40:
                key.d = true;
                if (key.d)
                    keyNow |= 4;
                else
                    keyNow &= 11;
                break;
            case 65:
            case 37:
                key.l = true;
                if (key.l)
                    keyNow |= 2;
                else
                    keyNow &= 13;
                break;
            case 68:
            case 39:
                key.r = true;
                if (key.r)
                    keyNow |= 8;
                else
                    keyNow &= 7;
                break;
        }
    });
    document.addEventListener('keyup', function(e) {
        switch (e.which) {
            case 87:
            case 38:
                key.u = false;
                checkKey();
                break;
            case 83:
            case 40:
                key.d = false;
                checkKey();
                break;
            case 65:
            case 37:
                key.l = false;
                checkKey();
                break;
            case 68:
            case 39:
                key.r = false;
                checkKey();
                break;
        }
    });
}

function checkKey() {
    keyNow = 0;
    if (key.u)
        keyNow |= 1;
    else
        keyNow &= 14;
    if (key.d)
        keyNow |= 4;
    else
        keyNow &= 11;
    if (key.l)
        keyNow |= 2;
    else
        keyNow &= 13;
    if (key.r)
        keyNow |= 8;
    else
        keyNow &= 7;
}

function addTimer() {
    TIMER = setInterval(function() {
        CLOCK++;
        tankMove();

        //tankTestMove();
        tankMoveToShadow();
        drawOneFrame();
        //console.log(
        fireBullet();
        bulletMove();
        checkHit();
        checkGetFlag();
        //);
    }, 1000 / FPS);
}

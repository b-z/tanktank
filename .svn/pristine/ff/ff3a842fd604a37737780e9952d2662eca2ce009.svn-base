
//重新获取窗口大小并调整canvas的位置、大小
function optimize() {
    SCREEN_WIDTH = document.documentElement.clientWidth;
    SCREEN_HEIGHT = document.documentElement.clientHeight;
    var long_short = 5 / 3;
    GAME_HEIGHT = SCREEN_HEIGHT / SCREEN_WIDTH > 1 / long_short ? SCREEN_WIDTH * 1 / long_short : SCREEN_HEIGHT;
    GAME_WIDTH = GAME_HEIGHT * long_short;
    //$('#canv').remove();
    //$('body').prepend('<canvas id="canv" tabindex="0" style="width:'+GAME_HEIGHT+'px;height:'+GAME_HEIGHT+'px;margin-top:'+(SCREEN_HEIGHT-GAME_HEIGHT)/2+'px;margin-left:'+(SCREEN_WIDTH-GAME_HEIGHT)/2++'px;"></canvas>');
    $('#canv').css('background', 'white');
    $('#canv').css('width', GAME_HEIGHT + 'px');
    $('#canv').css('height', GAME_HEIGHT + 'px');
    $('#canv').css('margin-top', (SCREEN_HEIGHT - GAME_HEIGHT) / 2 + 'px');
    $('#canv').css('margin-left', (SCREEN_WIDTH - GAME_HEIGHT) / 2 + 'px');
    ctx = $('#canv')[0].getContext('2d');
}


function addEvent() {
    document.addEventListener('mousemove', function(e) {
        //  console.log(e.x+' '+e.y);
        MOUSEX = e.x - (SCREEN_WIDTH - GAME_HEIGHT) / 2;
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
        tankMove();
        tankTestMove();
        tankMoveToShadow();
        drawOneFrame();
        //console.log(
            fireBullet()
        //);
    }, 1000 / FPS);
}

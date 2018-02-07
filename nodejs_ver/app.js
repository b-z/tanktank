var express = require('express');
var http = require('http');
var io = require('socket.io');
var request = require('request');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();


app.all('*', function(req, res, next) {
    // console.log(req.headers['host'], req.url);
    next();
});

app.use(bodyParser.urlencoded({
    extended: false //,
    // limit: '50mb'
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var port = 2333;
var server = http.createServer(app).listen(port, function() {
    console.log('Http server listening on port ' + port);
});

io = io.listen(server);

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    // var user = req.cookies.u;
    // if (!user) {
    //     res.cookie('u', _uuid());
    // }
    var u_id = _uuid();
    var url = createChannel(u_id);

    var team = joinTeam(u_id); //Tank().joinTeam(u_id);
    var pos = getData('pos');

    res.render('index', {
        url: url,
        me: u_id,
        team: team,
        pos: JSON.stringify(pos)
    });
    GAME.u_id_now = u_id;
});

io.on('connection', function(socket) {
    console.log('a user connected', socket.id);
    GAME.sockets[socket.id] = GAME.u_id_now;
    socket.on('disconnect', function(msg) {
        console.log('user disconnected', socket.id);
        removePlayer(socket.id);
    });
    socket.on('update tank', function(msg) {
        // console.log(msg);
        msg = JSON.parse(msg.d);
        var u_id = msg.i;
        delete msg.i;
        updatePosition(u_id, msg);
    });
    socket.on('revival', function(msg) {
        // msg = JSON.parse(msg.d);
        // console.log(msg.i);
        var data = getData('UserData');
        data[msg.i].hp = 5;
        // console.log(data[msg.i]);
        setData('UserData', data);
        sendData(msg.i, data);
    });
});

app.use('/', routes);

var GAME = {
    sockets: {}
};

function removePlayer(sid) {
    var uid = GAME.sockets[sid];
    delete GAME.UserData[uid];
    delete GAME.sockets[sid];
}

function setData(key, value) {
    GAME[key] = value;
}

function getData(key) {
    if (GAME[key] == undefined) {
        if (key == 'UserData') {
            setData(key, {});
        } else if (key == 'pos') {
            setData(key, randomPos());
        } else {
            setData(key, {});
        }
    }
    return GAME[key];
}

function sendData(u_id, data) {
    // TODO
    // tanks[u_id] = data;
    io.emit('client update', data);
}

function updatePosition(u_id, msg) {
    // console.log(msg);
    var b, h, g;
    if (msg.b) {
        b = msg.b;
        delete msg.b;
    }
    if (msg.h) {
        h = msg.h;
        delete msg.h;
    } else {
        h = [];
    }
    if (msg.g) {
        g = msg.g;
        delete msg.g;
    } else {
        g = false;
    }

    var t = msg;

    var data = getData('UserData');
    var pos = getData('pos');

    if (!data[u_id]) {
        data[u_id] = {
            hp: 5
        }
    }

    data[u_id]['tanks'] = t;
    data[u_id]['bullets'] = b;

    // hit
    for (var i = 0; i < h.length; i++) {
        if (data[h[i]].hp > 0) {
            data[h[i]].hp--;
        }
    }

    // goal
    if (g) {
        pos = randomPos();
        for (var p in data) {
            if (p == u_id) {
                data[u_id].tanks.s = parseInt(data[p].tanks.s) + 20;
            } else if (data[p].tanks.c == t.c) {
                data[p].tanks.s = parseInt(data[p].tanks.s) + 10;
            } else {
                data[p].tanks.s = parseInt(data[p].tanks.s) - 10;
            }
        }
    }

    // ???
    setData('pos', pos);
    setData('UserData', data);
    // console.log(data);
    sendData(u_id, {'data': data, 'pos': pos});
}

function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function createChannel(id) {
    return '';//'ws://localhost:8080/';
}

function joinTeam(u_id) {
    var data = getData('UserData');
    var t1 = 0;
    var t2 = 0;
    for (var p in data) {
        if (data[p].tanks.c == '1') {
            t1++;
        } else {
            t2++;
        }
    }
    console.log(t1, t2);
    if (t1 > t2) {
        return '2';
    } else if (t1 < t2) {
        return '1';
    } else {
        return Math.random()>0.5?'1':'2';
    }
}

function randomPos() {
    pos = [{
        'x': 512,
        'y': 100
    }, {
        'x': 512,
        'y': 924
    }, {
        'x': 100,
        'y': 512
    }, {
        'x': 924,
        'y': 512
    }, {
        'x': 512,
        'y': 300
    }, {
        'x': 512,
        'y': 724
    }, {
        'x': 300,
        'y': 512
    }, {
        'x': 724,
        'y': 512
    }];
    tmp = Math.floor(Math.random() * 8);
    fpos = pos[tmp];
    dpos = {
        'x': 1024 - fpos['x'],
        'y': 1024 - fpos['y']
    };
    return {
        'fp': fpos,
        'dp': dpos
    };
}

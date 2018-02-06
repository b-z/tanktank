// setInterval(function() {
// 	//sendMessage('/TankPosition', {x: Math.round(data.tank.x),y: Math.round(data.tank.y)});
// 	if (typeof(data)!='undefined'&&typeof(my_team)!='undefined') {
// 		var msg = {
// 			// t:'TankPosition',
// 			x: Math.round(data.tank.x),
// 			y: Math.round(data.tank.y),
// 			d: Math.round(100*data.tank.deg2)/100,
// 			c: my_team,
// 			b: data.tank.bullets,
// 			n: my_name,
// 			i: data.tank.i
// 		};
// 		if (data.tank.hit.length) {
// 			msg.h = data.tank.hit;
// 		}
// 		data.tank.hit = [];
// 		if (msg.h!=undefined)console.log(msg.h);
// 		sendMessage(msg);
// 	}
// }, 100);
setInterval(function() {
    //sendMessage('/TankPosition', {x: Math.round(data.tank.x),y: Math.round(data.tank.y)});
    if (typeof(data) != 'undefined' && typeof(my_team) != 'undefined') {
        var msg = {
            // t:'TankPosition',
            x: Math.round(data.tank.x),
            y: Math.round(data.tank.y),
            d: Math.round(100 * data.tank.deg2) / 100,
            c: my_team,
            b: data.tank.bullets,
            f: data.tank.flag,
            n: my_name,
            i: data.tank.i,
            s: data.tank.score
        };
        if (data.tank.hit.length) {
            msg.h = data.tank.hit;
        }
        if (data.g == 1) {
            msg.g = 1;
            data.g = 0;
            data.tank.flag = 0;
        }
        data.tank.hit = [];
        //if (msg.h!=undefined)console.log(msg.h);
        // $.ajax({
        // 	type:'POST',
        // });
        socket.emit("update tank", {
            d: JSON.stringify(msg)
        });
        //console.log(msg.i);
    }
}, 100);

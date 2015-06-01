setInterval(function() {
	//sendMessage('/TankPosition', {x: Math.round(data.tank.x),y: Math.round(data.tank.y)});
	if (typeof(data)!='undefined'&&typeof(my_team)!='undefined')
		sendMessage({
			t:'TankPosition',
			x: Math.round(data.tank.x),
			y: Math.round(data.tank.y),
			d: Math.round(100*data.tank.deg2)/100,
			c: my_team,
			b: data.tank.bullets
		});
		//console.log(data.tank.bullets[0]);
		// console.log({
		// 	t:'TankPosition',
		// 	x: Math.round(data.tank.x),
		// 	y: Math.round(data.tank.y),
		// 	d: Math.round(100*data.tank.deg2)/100
		// });
}, 50);

/* Please add 
		window.channelUrl = {{channel_url}};
	at the top of each page. */
	
window.channelClient = {
		send: function() {}
}

!window.channelUrl || (function () {
	var channelIp = '220.181.136.224';
	function init() {
		window.channelClient = new window.sae.Channel(channelUrl);
		channelClient.bind = channelClient.bind||function (e, callback) {
			this['_'+e]?this['_'+e].push(callback):(this['_'+e]=[callback]);
		}
		function execCallback(e) {
			return function () {
				var callbacks = this['_'+e]||[];
				for (var i=0,l=callbacks.length;i<l;i++)
					callbacks[i].apply(null, arguments);
			};
		}
		channelClient.onmessage = execCallback('onmessage');
		channelClient.onopen = execCallback('onopen');
		channelClient.onclose = execCallback('onclose');
		channelClient.onerror = execCallback('onerror');
		return !!window.channelClient._options.info;
	}
	function replaceUrl() {
		channelUrl = channelUrl.replace('channel.sinaapp.com', channelIp);
	}
	if (window.sae) {
		if (!init()) {
			replaceUrl();
			init();
		}
	} else {
		replaceUrl();
		var iScript = document.createElement("script");
		iScript.type="text/javascript";
		iScript.src='http://'+channelIp+'/api.js';
		document.getElementsByTagName("head")[0].appendChild(iScript);
		var timeId = setTimeout(function () {
			if (!window.sae) return;
			clearTimeout(timeId);
			init();
		}, 1000);
	}
})();
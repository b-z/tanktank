(function () {
function JsonToStr(o) {
	if (o == undefined) {
		return "";
	}
	var r = [];
	if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	if (typeof o == "object") {
		if (!o.sort) {
			for (var i in o)
				r.push("\"" + i + "\":" + JsonToStr(o[i]));
			if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}"
		} else {
			for (var i = 0; i < o.length; i++)
				r.push(JsonToStr(o[i]))
			r = "[" + r.join() + "]";
		}
		return r;
	}
	return o.toString().replace(/\"\:/g, '":""');
}
var encodeJSON = JSON.stringify||JsonToStr,
decodeJSON = JSON.parse||function(json){eval('('+json+')')};

window.chat = {
	'User': ChatUser,
	'Discussion': ChatDiscussion
};

channelClient.bind('onmessage', function (data) {
	var obj = decodeJSON(data);
	if (typeof obj != 'object'||obj['attr']!=2&&obj['attr']!=3) return;
	switch (obj['attr']) {
		case 2: !window.chat.onchatmessage||window.chat.onchatmessage(ChatUser(obj['from']), message);
				break;
		case 3: !window.chat.ondiscussmessage||window.chat.ondiscussmessage(ChatUser(obj['from']), ChatDiscussion(obj['discussion']), message);
				break;
	};
});

function ChatUser(info) {
	this.info = info;
}
ChatUser.prototype.sendMessage(message) {
	var obj = {attr: 2, message: message, to: this.info.id};
	channelClient.send(encodeJSON(obj));
}

function ChatDiscussion(info) {
	this.info = info;
}
ChatDiscussion.prototype.sendMessage(message) {
	var obj = {attr: 3, message: message, to: this.info.id};
	channelClient.send(encodeJSON(obj));
}
})();

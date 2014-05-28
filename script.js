/* Defined in: "Textual.app -> Contents -> Resources -> JavaScript -> API -> core.js" */

Textual.viewFinishedLoading = function() {
	Textual.fadeInLoadingScreen(1.00, 0.95);

	setTimeout(function() {
		Textual.scrollToBottomOfView();
	}, 500);
}

Textual.viewFinishedReload = function() {
	Textual.viewFinishedLoading();
}

Textual.newMessagePostedToView = function(lineNumber) {
	if (!replaceEmoji(lineNumber)) {
		setTimeout(function() {
			replaceEmoji(lineNumber);
		}, 500);
	}
}

function replaceEmoji(lineNumber) {
	var emoji = {
			":)": "😊",
			":D": "😃",
			";D": "😄",
			";)": "😉",
			";P": "😜",
			":P": "😝",
			"o_o": "😳",
			"O_O": "😳",
			"o_O": "😳",
			"0_o": "😳",
			"o_0": "😳",
			"0_0": "😳",
			"O_o": "😳",
			":@": "😡",
			">.<": "😣",
			">_<": "😫",
			":(": "😞",
			"n_n": "😄",
			"u_u": "😔",
			"^_^'": "😅",
			"^_^": "😄",
			"^.^": "😊",
			"x.x": "😵",
			"x.X": "😵",
			"X.x": "😵",
			"X.X": "😵",
			"x_x": "😲",
			"x_X": "😲",
			"X_x": "😲",
			"X_X": "😲",
			"DD:": "😫",
			"D:": "😧",
			":s": "😖",
			":S": "😖",
			"._.'": "😰",
			"._.": "😞",
			";_;": "😢",
			";__;": "😢",
			"D;": "😰",
			"^.^": "😅",
			"T_T": "😭",
			"T.T": "😭",
			":|": "😐",
			":o": "😯",
			":O": "😱",
			":0": "😱",
			"-_-": "😑",
			":***": "😘",
			":**": "😘",
			":*": "😚",
			"*_*": "😍",
			":/": "😕",
			"😕/": "://"
		},

	line = document.querySelector("#line" + lineNumber + "[type=privmsg] .message");

	if (line == undefined) {
		line = document.querySelector("#line-" + lineNumber + "[type=privmsg] .message");
	}
	
	if (line) {
		[].forEach.call(line.childNodes, function(element) {
			if (element.nodeName == "#text" || element.className == "effect") {
				for (var i in emoji) {
					while (element.textContent.indexOf(i) != -1) {
						element.textContent = element.textContent.replace(i, emoji[i]);
					}
				}
			}
		});

		return true;
	}

	return false;
}

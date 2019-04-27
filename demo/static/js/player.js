var ap;
function loadPlayer(wav_file, url) {
	ap = new APlayer({
	  container: document.getElementById('aplayer'),
	  audio: [{
		  name: wav_file,
		  url: url,
	  }]
	});
}

var oldOnload = window.onload
if (typeof window.onload != 'function') {
	window.onload = loadPlayer('Click a node to generate music', '');
} else {
	window.onload = function() {
		if (oldOnload) {
			oldOnload();
		}
		loadPlayer('Click a node to generate music', '');
	}
}

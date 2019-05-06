var ap;
function loadPlayer(wav_file, url) {
	ap = new APlayer({
	  container: document.getElementById('aplayer'),
	  audio: [{
		  name: wav_file,
          artist: ' ',
		  url: url,
	  }]
	});
}

var oldOnload = window.onload
if (typeof window.onload != 'function') {
	window.onload = loadPlayer('Waiting for a click', wavUrl + '/loading.wav');
} else {
	window.onload = function() {
		if (oldOnload) {
			oldOnload();
		}
		loadPlayer('Waiting for a click', wavUrl + '/loading.wav');
	}
}

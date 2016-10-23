// fartscroll.js v0.1
"use strict";

var fartscroll = (function () {
  var mp3 = {
    prefix: "audio/",
    sound: [
    	'03. U With Me.mp3',
    	'19. Views.mp3',
        '07. Redemption.mp3',
        '01. Keep the Family Close.mp3',
        '19. Views.mp3',
        '03. U With Me.mp3',
        '09. Faithful (Ft. Pimp C & dvsn).mp3',
        '20. Hotline Bling.mp3',
        '16. Too Good (Ft. Rihanna).mp3',
        '02. 9.mp3',
        '06. Weston Road Flows.mp3',
        '11. Controlla.mp3',
        '14. Childs Play.mp3',
        '04. Feel No Ways.mp3',
        '18. Fire & Desire.mp3',
        '13. Grammys (Ft. Future).mp3',
        '15. Pop Style.mp3',
        '05. Hype.mp3',
        '08. With You (Ft. PARTYNEXTDOOR).mp3',
        '10. Still Here.mp3',
        '12. One Dance (Ft. Wizkid & Kyla).mp3',
        '17. Summers Over Interlude.mp3',
		]
  };

  var ogg = {
    prefix: "data:audio/ogg;base64,",
    sound: [
      ]
  };

  return function (trigger_distance) {
    trigger_distance = trigger_distance || 400;
    var lastOffset;

    var scrollFart = function() {
      var scrollOffset = Math.floor(window.scrollY / trigger_distance);
      if (lastOffset !== scrollOffset) {
        playAudio();
        lastOffset = scrollOffset;
      }
    };

    var timer;
    function resizeFart() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function(){ playAudio(); }, 200);
    };

    window.addEventListener('scroll', scrollFart, false);
    window.addEventListener('resize', resizeFart, false);
  };

  var last_rand = -1;
  function playAudio(position){
    var player = getPlayer()
      , audio = getAudioFor(player);
    var rand;
    do { rand = Math.floor(Math.random() * audio.sound.length); }
    while (rand == last_rand)

    player.src = audio.prefix + audio.sound[position || rand];
    player.play();
  };

  function getAudioFor(player){
    if (player.canPlayType("audio/mp3")) {
      return mp3;
    }
  }

  function getPlayer() {
    var container = getContainer(), player
      , players = container.getElementsByTagName("audio");

    for (player in  players) {
      if (player.currentTime === 0 || player.ended) {
        return player;
      }
    }

    player = document.createElement("audio");
    container.appendChild(player);
    return player;
  };

  function getContainer() {
    var container = document.getElementById("fartscroll");

    if (container === null) {
      container = document.createElement("div");
      container.id = "fartscroll";
      document.getElementsByTagName('body')[0].appendChild(container);
    }

    return container;
  }
})();

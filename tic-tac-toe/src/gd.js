window["GD_OPTIONS"] = {
    "gameId": "e8d7245eb12c49798c5abbd2816bccb8",
    "onEvent": function (event) {
      switch (event.name) {
        case "SDK_GAME_START":
          console.log("log SDK_GAME_START");
          // advertisement done, resume game logic and unmute audio
          break;
        case "SDK_GAME_PAUSE":
          console.log("log SDK_GAME_PAUSE");
          // pause game logic / mute audio
          break;
        case "SDK_GDPR_TRACKING":
          console.log("log SDK_GDPR_TRACKING");
          // this event is triggered when your user doesn't want to be tracked
          break;
        case "SDK_GDPR_TARGETING":
          console.log("log SDK_GDPR_TARGETING");
          // this event is triggered when your user doesn't want personalised targeting of ads and such
          break;
        case "SDK_REWARDED_WATCH_COMPLETE":
          console.log("log SDK_REWARDED_WATCH_COMPLETE");
          // this event is triggered when your user completely watched rewarded ad
          break;
      }
    },
  };
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://html5.api.gamedistribution.com/main.min.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'gamedistribution-jssdk'));
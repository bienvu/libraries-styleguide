function onYouTubePlayerAPIReady () {
  var players = document.querySelectorAll('.js-yt-player');

  if (players.length) {
    for (var i = 0; i < players.length; i++) {
      player = new YT.Player(players[i], {
        width: 1280,          // Player width (in px)
        height: 720,          // Player height (in px)
        playerVars: {
          autoplay: 1,        // Auto-play the video on load
          controls: 0,        // Show pause/play buttons in player
          showinfo: 0,        // Hide the video title
          modestbranding: 1,  // Hide the Youtube Logo
          loop: 1,            // Run the video in a loop
          fs: 0,              // Hide the full screen button
          cc_load_policty: 0, // Hide closed captions
          iv_load_policy: 3,  // Hide the Video Annotations
          autohide: 0,        // Hide video controls when playing
          playlist: players[i].dataset.id
        },
        videoId: players[i].dataset.id,
        events: {
          'onReady': function(event) {
            event.target.mute();
          }
        }
      });
    }
  }
};

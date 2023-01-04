jQuery(function () {
  let isActive = false;

  $('#start-button').on('click', () => {
    isActive = !isActive;
    if(isActive){
      getCurrentSong();
      $('#start-button').text('Stop');
    } else {
      $('#start-button').text('Start');
    }
  });

  function getCurrentSong(){
    console.log('gettingCurrentSong');
    $.ajax({
      url: 'https://syne.herokuapp.com/api/v1/songs/current',
      type: 'GET',
      dataType: 'json',
      data: { songId: $('#spotify-track-id').text() },
    })
    .done(function (data) {
      // window.location.replace(data.spotify_auth_url)
      document.getElementById("spotify-data").innerHTML = JSON.stringify(data, null, 4);
      console.log('success')
      setTrackInfoGUI(data);
      setTimeout(() => {
        if(isActive){
          getCurrentSong();
        }
      }, 3000);
    })
    .fail(function (err) {
      console.log(err)
      console.log('error')
      $('#no-song').show();
      $('#track-name').text('Something went wrong. Try again.');
      $('#start-button').trigger('click');
    })
    .always(function () {
      console.log('complete')
    })
  }

  function setTrackInfoGUI(data){
    if(!data){
      $('#no-song').show();
      $('#album-image').attr('src', '');
      $('#track-name').text('');
      $('#artist-name').text('');
      $('#album-name').text('');
      $('#spotify-track-id').text('');
    }

    $('#no-song').hide();
    // result.currently_playing_type: ["track", "?podcast?"]
    // result.item.[id,name]: song info
    // result.item.artists[].[id,name]: array of artist info
    // result.item.album.images[].url
    $('#album-image').attr('src', data.result.item.album.images[0].url);
    $('#track-name').text(data.result.item.name);
    $('#artist-name').text(data.result.item.artists[0].name);
    $('#album-name').text(data.result.item.album.name);
    $('#spotify-track-id').text(data.result.item.id);
  }
});
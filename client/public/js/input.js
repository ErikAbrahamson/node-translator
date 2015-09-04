$(window).on('load', function() {
  $('#userModal').modal('show');
});

$('#generateRandom').on('click', function(event) {
  event.preventDefault();
  randomWord(
    function(error, data){
      if (!error) {
        $('#randomWord').text(data);
        return data;
      } else {
        return error;
      }
    });
});

$('#submit').on('click', function(event) {
  event.preventDefault();
  $('#translatedWord').empty();
  $('#userWord').empty();
  var translated = translate($('#randomWord').text(),$('.lang-list').val(), function(error, data) {
      if (!error) {
        $('#translatedWord').append(data);
        $('#userWord').append($('#translation').val());
        console.log(validate(data, $('#translation').val().toLowerCase()));
        return data;
      } else {
        return error;
      }
    });
});

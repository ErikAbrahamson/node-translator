var currentQuestion = 0;
var questArray = [];
var correct = 0;
var incorrect = 0;

function startChallenge(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (currentQuestion === i) {
        $('#randomChallenge').append($('<div>').text(arr[i]+" <-- ").attr('id', i));
    } else {
        $('#randomChallenge').append($('<div>').text(arr[i]).attr('id', i));
    }
  }
  $('#showPractice').hide();
  $('#showChallenge').hide();
  questArray = arr;
}

function getCurrentWord() {
  console.log(questArray[currentQuestion]);
  return questArray[currentQuestion];
}

function nextChallenge(bool) {
  //true means they got it correct, false means incorrect
  if (bool) {
    correct++;
  } else {
    incorrect++;
  }
  if (currentQuestion >= 19) {
    //Challenge is over, call an end function
    endChallenge();
  } else {
    currentQuestion++;
    $('#'+currentQuestion).append(" <-- ");
  }
}

function endChallenge() {
  // Record results in database,
  // Reset all variables,
  // Hide/show appropriate forms/buttons
  console.log(name, $('.lang-list').val(), correct, incorrect);
  $.ajax({
    url: '/api/records/add',
    method: 'POST',
    data: {
      name: name,
      langFrom: 'en',
      langTo: $('.lang-list').val(),
      correct: Number(correct),
      incorrect: Number(incorrect)
    }
  }).done(function(data){
    console.log(data);
  }).fail(function(error) {
    console.log(error);
  });
  $('#showPractice').show();
  $('#showChallenge').show();
  $('#randomChallenge').empty();
  $('#generateChallenge').show();
  $('.lang-list').show();
  $('#challengeForm').hide();
  currentQuestion = 0;
  questArray = [];
  correct = 0;
  incorrect = 0;
}

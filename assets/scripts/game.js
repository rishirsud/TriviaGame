let time = 30;
let correct = 0;
let incorrect = 0;
let timerInterval;
$correct = $("#correct");
$incorrect = $("#incorrect");

let questions = [{
    question: 'Who lives in a pineapple under the sea?',
    answer: 'Spongebob',
    choices: ["Mr. Krabs", "Spongebob", "Patrick"],
    userAnswer: ""
  },
  {
    question: 'What does Mr. Krabs smell?',
    answer: 'Something smelly',
    choices: ["Bubblebass", "Garbage", "Something smelly"],
    userAnswer: ""
  },
  {
    question: 'What is Patrick\'s last name?',
    answer: 'Star',
    choices: ["Star", "Starfish", "Square"],
    userAnswer: ""
  },
  {
    question: 'Who is Spongebob\'s best friend?',
    answer: 'Patrick',
    choices: ["Gary", "Patrick", "Squidward"],
    userAnswer: ""
  }
];

// let correct = 0;


function renderQuestions() {
  $("#quiz").empty();

  questions.forEach(function (question, index) {

    let $question = $("<div>").addClass("form-group cm-form-group-fix");
    let $label = $("<h4>")
      .text(question.question)
      .appendTo($question);

    for (let i = 0; i < question.choices.length; i++) {
      let $choice = $('<div>');
      $choice.addClass('form-check form-check-inline');

      let $radio = $('<input>');

      $radio
        .attr({
          type: "radio",
          value: question.choices[i],
          name: index,
          class: "form-check-input"
        })
        .appendTo($choice);

      let $choiceLabel = $('<label>');
      $choiceLabel
        .text(question.choices[i])
        .addClass('form-check-label')
        .appendTo($choice);

      $choice.appendTo($question);
    }
    $("#quiz").append($question);
  });
}

$("#quiz").on("change", ".form-check-input", function () {
  console.log(this);
  let questionIndex = $(this).attr("name");
  console.log(questions[questionIndex]);
  let answer = $(this).val();
  questions[questionIndex].userAnswer = answer;
});

renderQuestions();


function countDown() {
  if (!timerInterval) {
    timerInterval = setInterval(decrement, 1000);
  }
}

function checkAnswers() {
  for (i = 0; i < questions.length; i++) {
    if (questions[i].answer === questions[i].userAnswer) {
      correct++
      $correct.text(correct);
    } else {
      incorrect++
      $incorrect.text(incorrect);
    }
  }
}

function decrement() {
  if (time > 0) {
    time--;
  }
  $('#timer').text(time);
  if (time === 0) {
    console.log("time is up");
    clearInterval(timerInterval);
    checkAnswers();
    $('#myModal').modal('show');
  };
}

countDown();

$("#submit").on("click", function () {
checkAnswers();
  console.log(correct);
  console.log(incorrect);
  $('#myModal').modal('show');
  clearInterval(timerInterval);

});
const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const examCount = document.querySelector(".count");
const sound = document.querySelector("#sound");
const sound2 = document.querySelector("#sound-sad");
const animation = document.querySelector(".icon");

let examLength = quizData.length;

let currentQuiz = 0;
let score = 0;

//random data
quizData = quizData.sort(() => Math.random() - 0.5);

//reset answer
const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

//get selected value
const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
};

//load quize data
const loadQuiz = () => {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  examCount.innerHTML = currentQuiz + 1 + " of " + examLength;
};

loadQuiz();

submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score += 2;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      let name = localStorage.getItem("name");

      quiz.innerHTML = `  
         <div class="winner">
         <h3>${name}</h3>
         </div>
         <h3>Your Score is ${score}/${quizData.length * 2}</h3>  
          <button onclick="history.go(0)" class="none">Play Again</button>  
         <a href="../index.html" class="none">Home</a>`;

      //easy
      if (examLength == 5) {
        if (score >= 7) {
          sound.play();
          animation.classList.add("active");
        } else {
          sound2.play();
          setTimeout(() => {
            sound2.pause();
          }, 2000);
        }
      }
      //mid
      if (examLength == 10) {
        if (score >= 7) {
          sound.pause();
          animation.classList.add("active");
        } else {
          sound2.play();
          setTimeout(() => {
            sound2.pause();
          }, 2000);
        }
      }
      //hard
      if (examLength == 30) {
        if (score >= 45) {
          sound.play();
          animation.classList.add("active");
        } else {
          sound2.play();
          setTimeout(() => {
            sound2.stop();
          }, 2000);
        }
      }
    }
  }
});

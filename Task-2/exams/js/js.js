const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

quizData = quizData.sort(() => Math.random() - 0.5);
 
const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
};

const loadQuiz = () => {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
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
      let level;
      if (score >= 0 && score <= 5) {
        level = "easy";
      } else if (score > 5 && score <= 7) {
        level = "intermediate";
      } else if (score > 7 && score <= 10) {
        level = "hard";
      }
      quiz.innerHTML = `  
         <div class="winner">
         <h3>${name}, Your Level is ${level}</h3>
         </div>
         <h3>Your Score is ${score}/${quizData.length * 2}</h3>  
         <a href="./${level}.html">Go to Level ${level}</a>  
         <button onclick="history.go(0)" class="none">Play Again</button>  
         <a href="../index.html" class="none">Home</a>  
       
       `; // location.reload() won't work in CodePen for security reasons;
    }
  }
});

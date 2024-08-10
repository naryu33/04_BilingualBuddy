// 問題と正解を定義
const questions  = [
    {
        question: "How do you say ”Good morning” in Japanese?（Don't write in abbreviations.）",
        answer: "おはようございます",
        correctAnswer: "おはようございます"
    },
    {
        question: "How do you say “Good evening” in Japanese?",
        answer: "こんばんは",
        correctAnswer: "こんばんは"
    },
    {
        question: "How about a greeting around noon?",
        answer: "こんにちは",
        correctAnswer: "こんにちは"
    },,
    {
        question: "How do you write good morning in 4 letters?",
        answer: "おはよう",
        correctAnswer: "おはよう"
    }
    
];

// グローバル変数
let score = 0;
let answeredQuestions = [];

// DOM要素の取得
const quizQuestionElement = document.querySelector('.quiz-question');
const userAnswerInput = document.querySelector('.quiz-answer');
const scoreElement = document.querySelector('.score');
const submitButton = document.querySelector('.submit-button');

// ランダムな問題を取得する関数
function getRandomQuestion() {
    // 回答済みの問題を除外して、ランダムな問題を取得
    const unansweredQuestions = questions.filter(question => !answeredQuestions.includes(question));
    if (unansweredQuestions.length === 0) {
        //全ての問題が出題された場合
        return null;
    }
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    const randomQuestion = unansweredQuestions[randomIndex];
    answeredQuestions.push(randomQuestion);
    return randomQuestion;
}

// クイズを表示する関数
function loadQuiz() {
    const question = getRandomQuestion();
    if (question === null) {
      // 全ての問題が出題された場合
      document.querySelector('.quiz-question').style.display = 'none';
      document.querySelector('.quiz-answer').style.display = 'none';
      document.querySelector('.submit-button').style.display = 'none';
      document.querySelector('.finish').style.display = 'block';
      return;
    }
    quizQuestionElement.textContent = question.question;
    userAnswerInput.value = '';
}

// 回答を確認する関数
function checkAnswer() {
    const userAnswer = userAnswerInput.value.trim().toLowerCase();
    const currentQuestion = answeredQuestions[answeredQuestions.length - 1];
  
    if (!currentQuestion || !currentQuestion.answer) {
      console.error('Error: Invalid question data:', currentQuestion);
      return;
    }
  
    if (userAnswer === currentQuestion.answer.toLowerCase()) {
      score += 10;
    }
    scoreElement.textContent = score;
    loadQuiz();
  }

// イベントリスナーの設定
submitButton.addEventListener('click', checkAnswer);

// 初期化
loadQuiz();
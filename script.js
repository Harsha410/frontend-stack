// Sample JSON data for quiz questions
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0
    }
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const resultSection = document.getElementById("review-section");
const errorContainer = document.getElementById("error");
const submitButton = document.getElementById("submitQuiz");

let userAnswers = [];

// Load quiz questions
function loadQuiz() {
    quizContainer.innerHTML = "";
    for (let i = 0; i < quizData.length; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `<span class="inline-block">${i+1}. </span><p class="inline-block">${quizData[i].question}</p>`;
        
        const optionsDiv = document.createElement("div");
        optionsDiv.className = "options";
        for (let j = 0; j < quizData[i].options.length; j++) {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option";
            const option = document.createElement("input");
            option.type = "radio";
            option.name = `question_${i}`;
            option.value = j;
            option.addEventListener("change", () => {
                resultSection.classList.remove('show');  
                resultSection.classList.add('hide');    
                
                errorContainer.classList.remove('show');  
                errorContainer.classList.add('hide'); 
                userAnswers[i] = parseInt(option.value);
            });

            const optionLabel = document.createElement("label");
            optionLabel.textContent = quizData[i].options[j];
            
            optionDiv.appendChild(option);
            optionDiv.appendChild(optionLabel);
            optionsDiv.appendChild(optionDiv);
        }
        
        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    }
}

// Evaluate and display results
function displayResult() {
    let correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correctAnswer) {
            correctAnswers++;
        }
    }
    
    const resultPercentage = (correctAnswers / quizData.length) * 100;
    resultContainer.innerHTML = `You scored ${resultPercentage.toFixed(2)}%`;
    resultSection.classList.remove('hide');
    resultSection.classList.add('show');
}

loadQuiz();

submitButton.addEventListener("click", () => {
    allAnswered = true;
    errorContainer.classList.remove('show');
    errorContainer.classList.add('hide');
    for (let i = 0; i < quizData.length; i++){
        if(userAnswers[i] === undefined){
            errorContainer.innerHTML = "Provide answers to all the questions to validate";
            allAnswered = false;
            errorContainer.classList.remove('hide');
            errorContainer.classList.add('show');
            return;
        }
    }
    displayResult()
});

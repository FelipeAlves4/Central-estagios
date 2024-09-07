const questions = [
    "Fale sobre você.",
    "Por que você quer trabalhar nesta empresa?",
    "Quais são seus pontos fortes e fracos?",
    "Como você lida com prazos apertados?",
    "Conte-me sobre uma vez que você liderou um projeto.",
];

let currentQuestion = 0;

function startInterview() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("answer-input").style.display = "block";
    document.getElementById("next-button").style.display = "inline-block";
    showQuestion();
}

function showQuestion() {
    document.getElementById("question-text").textContent = questions[currentQuestion];
}

function nextQuestion() {
    const answer = document.getElementById("answer-input").value;
    if (answer.trim() === "") {
        alert("Por favor, responda à pergunta.");
        return;
    }

    // Aqui você pode adicionar lógica para salvar as respostas ou dar feedback
    document.getElementById("answer-input").value = "";

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question-text").textContent = "Obrigado por completar a simulação!";
        document.getElementById("answer-input").style.display = "none";
        document.getElementById("next-button").style.display = "none";
    }
}

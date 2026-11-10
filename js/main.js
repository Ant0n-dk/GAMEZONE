
const questions = [
    {
        question: "Hvilket år udkom Minecraft officielt?",
        answers: ["2011", "2009", "2013", "2015"],
        correct: "2011"
    },
    {
        question: "Hvilket firma udviklede Roblox?",
        answers: ["Mojang", "Roblox Corporation", "Epic Games", "Valve"],
        correct: "Roblox Corporation"
    },
    {
        question: "Hvilken genre tilhører Subnautica primært?",
        answers: ["Racing", "Survival", "Sports", "Fighting"],
        correct: "Survival"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("quiz-question");
const optionsElement = document.getElementById("quiz-options");
const feedbackElement = document.getElementById("quiz-feedback");
const progressElement = document.getElementById("quiz-progress");
const nextButton = document.getElementById("next-question");

function loadQuestion() {
    const question = questions[currentQuestion];

    answered = false;
    questionElement.textContent = question.question;
    progressElement.textContent =
        `Spørgsmål ${currentQuestion + 1} / ${questions.length}`;

    feedbackElement.textContent = "";
    nextButton.hidden = true;

    optionsElement.innerHTML = "";

    question.answers.forEach(answer => {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            if (answered) return;

            answered = true;

            if (answer === question.correct) {
                score++;
                feedbackElement.textContent = "✓ Korrekt! Godt klaret!";
            } else {
                feedbackElement.textContent =
                    `✗ Forkert! Det rigtige svar var ${question.correct}.`;
            }

            document.querySelectorAll(".quiz-option").forEach(option => {
                option.disabled = true;
            });

            nextButton.hidden = false;
        });

        optionsElement.appendChild(button);
    });
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Quiz gennemført!";
        optionsElement.innerHTML = "";
        progressElement.textContent = "FÆRDIG";
        feedbackElement.textContent =
            `Du fik ${score} ud af ${questions.length} point!`;
        nextButton.hidden = true;

        const restart = document.createElement("button");
        restart.className = "btn";
        restart.textContent = "Prøv igen";

        restart.addEventListener("click", () => {
            currentQuestion = 0;
            score = 0;
            loadQuestion();
        });

        optionsElement.appendChild(restart);
    }
});

loadQuestion();

// GÆT SPILLET

const guesses = [
    {
        emoji: "🧱⛏️💎",
        clue: "Et spil med blokke, minedrift og overlevelse.",
        answer: "minecraft"
    },
    {
        emoji: "🚗⚽🚀",
        clue: "Et spil hvor biler spiller fodbold.",
        answer: "rocket league"
    },
    {
        emoji: "🌊🐠🛸",
        clue: "Et survival-spil, hvor du udforsker en fremmed oceanplanet.",
        answer: "subnautica"
    }
];

let currentGuess = 0;

const guessEmoji = document.getElementById("guess-emoji");
const guessClue = document.getElementById("guess-clue");
const guessInput = document.getElementById("guess-input");
const guessFeedback = document.getElementById("guess-feedback");

document.getElementById("guess-submit").addEventListener("click", () => {
    const answer = guessInput.value.trim().toLowerCase();

    if (!answer) {
        guessFeedback.textContent = "Skriv et svar først!";
        return;
    }

    if (answer === guesses[currentGuess].answer) {
        currentGuess++;

        if (currentGuess >= guesses.length) {
            guessFeedback.textContent = "🏆 Du klarede alle udfordringer!";
            currentGuess = 0;
        } else {
            guessFeedback.textContent = "✓ Korrekt! Næste udfordring!";
        }

        guessEmoji.textContent = guesses[currentGuess].emoji;
        guessClue.textContent = guesses[currentGuess].clue;
        guessInput.value = "";
    } else {
        guessFeedback.textContent = "Ikke helt! Prøv igen.";
    }
});

guessInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.getElementById("guess-submit").click();
    }
});

// AFSTEMNING

const pollFeedback = document.getElementById("poll-feedback");
const pollButtons = document.querySelectorAll(".poll-option");

const previousVote = localStorage.getItem("gamezone-vote");

if (previousVote) {
    pollFeedback.textContent =
        `Du har allerede stemt på ${previousVote}.`;
    pollButtons.forEach(button => button.disabled = true);
}

pollButtons.forEach(button => {
    button.addEventListener("click", () => {
        const choice = button.dataset.poll;

        localStorage.setItem("gamezone-vote", choice);

        pollFeedback.textContent =
            `✓ Din stemme på ${choice} er registreret lokalt!`;

        pollButtons.forEach(option => option.disabled = true);
    });
});
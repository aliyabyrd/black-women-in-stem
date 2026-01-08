let speechSynthesisInstance = window.speechSynthesis;
let currentUtterance = null;

function readText(text) {
    if (currentUtterance) {
        speechSynthesisInstance.cancel();
    }

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = "en-US";
    currentUtterance.rate = 1.0;
    currentUtterance.volume = 1;

    speechSynthesisInstance.speak(currentUtterance);
}

function stopSpeech() {
    speechSynthesisInstance.cancel();
    currentUtterance = null;
}

// applying read aloud to all sections of the site
function enableReadAloud() {
    console.log("Applying Read Aloud to all sections...");

    document.querySelectorAll(".read-btn").forEach(button => {
        button.removeEventListener("click", handleReadAloud);
        button.addEventListener("click", handleReadAloud);
    });

    document.querySelectorAll(".stop-btn").forEach(button => {
        button.removeEventListener("click", stopSpeech);
        button.addEventListener("click", stopSpeech);
    });
}

// handling read aloud button clicks
function handleReadAloud(event) {
    let section = event.target.closest(".profile-card, .quiz-question, .opportunity-card, .intro, main");
    if (section) {
        let text = section.innerText;
        readText(text);
    }
}

// applying read aloud to all sections of the site
document.addEventListener("DOMContentLoaded", function () {
    enableReadAloud();
});

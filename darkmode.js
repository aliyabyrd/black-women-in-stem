document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    function updateButtonText() {
        toggleButton.innerText = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        applyDarkModeToDynamicContent();
        updateButtonText();
    }

    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "");
        applyDarkModeToDynamicContent();
        updateButtonText();
    });
});

function applyDarkModeToDynamicContent() {
    document.querySelectorAll(".profile-card, .quiz-question, .opportunity-card").forEach(element => {
        element.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));
    });
}

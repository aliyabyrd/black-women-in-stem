document.addEventListener("DOMContentLoaded", function () {
    loadTrailblazers();
    loadOpportunities();
    loadQuiz();
    enableReadAloud();
});

/**
  My function to Load Trailblazers 
 */
function loadTrailblazers() {
    if (!document.getElementById("profiles-container")) return;

    fetch("data/profiles.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("profiles-container");
            container.innerHTML = "";

            data.forEach(profile => {
                let card = document.createElement("div");
                card.classList.add("profile-card");

                card.innerHTML = `
                    <img src="${profile.image}" alt="${profile.altText}">
                    <h3>${profile.name}</h3>
                    <p>${profile.bio}</p>
                    <h4>Accomplishments:</h4>
                    <ul>${profile.accomplishments.map(acc => `<li>${acc}</li>`).join("")}</ul>
                    <h4>Why They're Important:</h4>
                    <p>${profile.importance}</p>
                    <button class="read-btn">🔊 Read Aloud</button>
                    <button class="stop-btn">🛑 Stop</button>
                `;
                container.appendChild(card);
            });

            console.log("Profiles loaded successfully."); // Debugging

            if (document.body.classList.contains("dark-mode")) {
                applyDarkModeToDynamicContent();
            }

            enableReadAloud();
        })
        .catch(error => console.error("Error loading profiles:", error));
}

/**
 * function to Load Opportunities 
 */
function loadOpportunities() {
    if (!document.getElementById("opportunities-container")) return;

    fetch("data/mentorship.json") // ✅ Ensure the correct JSON file name
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("opportunities-container");
            container.innerHTML = "";

            if (data.length === 0) {
                container.innerHTML = "<p>No opportunities available at this time.</p>";
                return;
            }

            data.forEach(program => {
                let div = document.createElement("div");
                div.classList.add("opportunity-card");
                div.innerHTML = `
                    <h3>${program.name}</h3>
                    <p>${program.description}</p>
                    <a href="${program.link}" target="_blank">Learn More</a>
                `;
                container.appendChild(div);
            });

            console.log("Opportunities loaded successfully."); // more debugging

            if (document.body.classList.contains("dark-mode")) {
                applyDarkModeToDynamicContent();
            }
        })
        .catch(error => console.error("Error loading opportunities:", error));
}

/**
 Loading quiz questions
 */
function loadQuiz() {
    if (!document.getElementById("quiz-container")) return;

    fetch("data/quiz.json")
        .then(response => response.json())
        .then(quizData => {
            const container = document.getElementById("quiz-container");
            container.innerHTML = "";

            quizData.forEach((q, index) => {
                let questionBlock = document.createElement("div");
                questionBlock.classList.add("quiz-question");

                let questionText = document.createElement("h3");
                questionText.innerText = q.question;
                questionBlock.appendChild(questionText);

                q.options.forEach(option => {
                    let label = document.createElement("label");
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = `question-${index}`;
                    input.value = option;
                    label.appendChild(input);
                    label.append(option);
                    questionBlock.appendChild(label);
                });

                let feedback = document.createElement("p");
                feedback.classList.add("feedback");
                feedback.style.display = "none";
                questionBlock.appendChild(feedback);

                let readButton = document.createElement("button");
                readButton.classList.add("read-btn");
                readButton.innerHTML = "🔊 Read Aloud";

                let stopButton = document.createElement("button");
                stopButton.classList.add("stop-btn");
                stopButton.innerHTML = "🛑 Stop";

                questionBlock.appendChild(readButton);
                questionBlock.appendChild(stopButton);

                container.appendChild(questionBlock);
            });

            enableReadAloud(); // making sire read aloud works after loading quiz
        })
        .catch(error => console.error("Error loading quiz:", error));
}

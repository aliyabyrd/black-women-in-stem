document.addEventListener("DOMContentLoaded", function () {
    fetch("data/quiz.json")
        .then(response => response.json())
        .then(quizData => {
            const container = document.getElementById("quiz-container");
            container.innerHTML = ""; // Clear previous 

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
                feedback.style.display = "none"; // Hide feedback initially
                questionBlock.appendChild(feedback);

                container.appendChild(questionBlock);
            });

            document.getElementById("submit-quiz").addEventListener("click", function () {
                let score = 0;
                quizData.forEach((q, index) => {
                    let selected = document.querySelector(`input[name="question-${index}"]:checked`);
                    let feedbackElement = document.querySelectorAll(".feedback")[index];

                    if (selected) {
                        if (selected.value === q.answer) {
                            score++;
                            feedbackElement.innerHTML = `✅ Correct!`;
                            feedbackElement.style.color = "#28a745";
                        } else {
                            feedbackElement.innerHTML = `❌ Incorrect. The correct answer is: <strong>${q.answer}</strong>`;
                            feedbackElement.style.color = "#dc3545";
                        }
                        feedbackElement.style.display = "block"; // Show feedback
                    }
                });

                document.getElementById("quiz-result").innerText = `You scored ${score}/${quizData.length}!`;
            });
        });
});

document.addEventListener("DOMContentLoaded", function() {

    const timerDisplay = document.getElementById("timer");
    const forms = document.querySelectorAll("form[asp-action='SubmitAnswer']")
    let timeLeft = parseInt(timerDisplay.dataset.initialTime);
    let hasSubmitted = timerDisplay.dataset.answerSubmitted === "true";
    let timerExpired = false;
    let countdown;

    function submitEmptyAnswer() {
        if (hasSubmitted) {
            return;
        }
        hasSubmitted = true;

        const form = document.createElement("form");
        form.method = "post";
        form.action = "/Game/SubmitAnswer";

        const answerInput = document.createElement("input");
        answerInput.type = "hidden";
        answerInput.name = "selectedAnswer";
        answerInput.value = "";
        form.appendChild(answerInput);

        const timeInput = document.createElement("input");
        timeInput.type = "hidden";
        timeInput.name = "remainingTime";
        timeInput.value = timeLeft;
        form.appendChild(timeInput);

        document.body.appendChild(form);
        form.submit();
    }

    if (!hasSubmitted) {
        countdown = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerExpired = true;
                submitEmptyAnswer();
            } else {
                timeLeft -= 1;
                timerDisplay.textContent = timeLeft;
                console.log(timerDisplay.textContent);
            }
        }, 1000);

        console.log("DOM fully loaded. Starting Question.js");

        const buttons = document.querySelectorAll("form[asp-action='SubmitAnswer'] button");
        console.log("Number of buttons found:", buttons.length);

        buttons.forEach(button => {
            console.log("Attaching click listener to:", button);
        });


        document.querySelectorAll("form[action='/Game/SubmitAnswer'] button").forEach(button => {
            button.addEventListener("click", function (e) {
                if (hasSubmitted) {
                    e.preventDefault();
                    return;
                }

                hasSubmitted = true;
                clearInterval(countdown);

                const form = this.closest("form");
                const hiddenInput = form.querySelector("input[name='remainingTime']");
                if (hiddenInput) {
                    hiddenInput.value = timeLeft;
                }

                console.log("Setting remainingTime to: ", timeLeft);
                console.log("Hidden input value before submit: ", hiddenInput.value);
                form.submit();
            });
        });
    } else {
        timerDisplay.textContent = timeLeft;
    }
});
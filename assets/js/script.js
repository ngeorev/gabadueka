// JavaScript to handle the password protected quiz on the homepage.
// The quiz is hidden by default. Clicking the "izzaza" button shows a
// password prompt. If the correct password is entered, the quiz becomes
// visible. A simple alert thanks the user upon submission.

document.addEventListener('DOMContentLoaded', function () {
    const izzazaBtn = document.getElementById('izzaza-button');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('quiz-password');
    const passwordSubmit = document.getElementById('password-submit');
    const quizContainer = document.getElementById('quiz-container');
    const completionEl = document.getElementById('quiz-complete');

    // Quiz configuration
    const TOTAL_QUESTIONS = 3;
    const TIMER_DURATION = 300; // seconds (5 minutes)
    let currentTimerInterval = null;
    let currentTimerTimeout = null;

    /**
     * Utility to format seconds into MM:SS
     * @param {number} seconds
     */
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    /**
     * Start the countdown timer for a given question. When the timer runs
     * out, the next question (or completion) will be triggered automatically.
     * @param {number} questionNumber
     */
    function startTimer(questionNumber) {
        clearInterval(currentTimerInterval);
        clearTimeout(currentTimerTimeout);

        let remaining = TIMER_DURATION;
        const timerEl = document.getElementById('timer' + questionNumber);
        if (!timerEl) return;

        timerEl.textContent = formatTime(remaining);

        currentTimerInterval = setInterval(() => {
            remaining--;
            timerEl.textContent = formatTime(Math.max(remaining, 0));
            if (remaining <= 0) {
                clearInterval(currentTimerInterval);
            }
        }, 1000);

        currentTimerTimeout = setTimeout(() => {
            if (questionNumber < TOTAL_QUESTIONS) {
                showQuestion(questionNumber + 1);
            } else {
                finishQuiz();
            }
        }, TIMER_DURATION * 1000);
    }

    /**
     * Hide all questions and then show the specified one. Also resets the timer.
     * @param {number} num
     */
    function showQuestion(num) {
        document.querySelectorAll('.question-block').forEach(block => {
            block.classList.remove('active');
        });

        if (completionEl) completionEl.style.display = 'none';

        const target = document.getElementById('question' + num);
        if (target) {
            target.classList.add('active');
            startTimer(num);
        }
    }

    /**
     * Finalize the quiz: stop timers, hide questions, and show completion.
     */
    function finishQuiz() {
        clearInterval(currentTimerInterval);
        clearTimeout(currentTimerTimeout);

        document.querySelectorAll('.question-block').forEach(block => {
            block.classList.remove('active');
        });

        saveResults();

        if (completionEl) {
            completionEl.style.display = 'block';
        }
    }

    // Show the password modal when the user clicks the izzaza button
    if (izzazaBtn) {
        izzazaBtn.addEventListener('click', () => {
            passwordModal.style.display = 'flex';
            passwordInput.value = '';
            passwordInput.focus();
        });
    }

    // Validate password and start quiz
    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', () => {
            const pass = passwordInput.value.trim();
            if (pass === '135') {
                passwordModal.style.display = 'none';
                quizContainer.style.display = 'block';
                showQuestion(1);
            } else {
                alert('Incorrect password. Please try again.');
            }
        });
    }

    // Next buttons
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const next = parseInt(btn.getAttribute('data-next'), 10);
            if (next && next <= TOTAL_QUESTIONS) {
                showQuestion(next);
            }
        });
    });

    // Finish button
    const finishBtn = document.querySelector('.finish-btn');
    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            finishQuiz();
        });
    }

    /**
     * Save quiz results to backend PHP script
     */
    function saveResults() {
        const q1El = document.querySelector('input[name="q1"]:checked');
        const q2El = document.querySelector('input[name="q2"]:checked');
        const q3El = document.querySelector('input[name="q3"]');

        const results = {
            q1: q1El ? q1El.value : null,
            q2: q2El ? q2El.value : null,
            q3: q3El ? q3El.value.trim() : ''
        };

        fetch('save_quiz.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(results)
        }).catch(err => {
            console.warn('Could not save quiz results:', err);
        });
    }
});
/**
 * Java Mastery Hub - Interactive MCQ System
 * Handles quiz functionality for static HTML structure
 */

const quizManager = {
    score: 0,
    totalQuestions: 0,
    answeredQuestions: 0,

    init: function () {
        this.questions = document.querySelectorAll('.question');
        this.totalQuestions = this.questions.length;
        this.updateScoreBoard();

        // Attach event listeners to all option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOptionClick(e));
        });

        // Hide all explanations initially
        document.querySelectorAll('.explanation').forEach(exp => {
            exp.style.display = 'none';
        });
    },

    handleOptionClick: function (e) {
        const selectedBtn = e.target;
        const questionDiv = selectedBtn.closest('.question');

        // Prevent multiple answers for the same question
        if (questionDiv.classList.contains('answered')) return;

        const selectedAnswer = selectedBtn.getAttribute('data-answer');
        const correctAnswer = questionDiv.getAttribute('data-correct-answer');
        const explanation = questionDiv.querySelector('.explanation');
        const allOptions = questionDiv.querySelectorAll('.option-btn');

        // Mark question as answered
        questionDiv.classList.add('answered');
        this.answeredQuestions++;

        // Check answer
        if (selectedAnswer === correctAnswer) {
            selectedBtn.classList.add('correct');
            this.score++;
        } else {
            selectedBtn.classList.add('incorrect');
            // Highlight the correct answer
            allOptions.forEach(btn => {
                if (btn.getAttribute('data-answer') === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }

        // Disable all buttons in this question
        allOptions.forEach(btn => btn.disabled = true);

        // Show explanation
        if (explanation) {
            explanation.style.display = 'block';
            explanation.classList.add('fade-in');
        }

        this.updateScoreBoard();
    },

    updateScoreBoard: function () {
        const progressEl = document.querySelector('.quiz-progress');
        const scoreEl = document.querySelector('.quiz-score');

        if (progressEl) {
            progressEl.textContent = `Question ${this.answeredQuestions}/${this.totalQuestions}`;
        }

        if (scoreEl) {
            const percentage = this.totalQuestions === 0 ? 0 : Math.round((this.score / this.totalQuestions) * 100);
            scoreEl.textContent = `Score: ${this.score}/${this.totalQuestions} (${percentage}%)`;
        }
    },

    reset: function () {
        this.score = 0;
        this.answeredQuestions = 0;

        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('answered');
        });

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });

        document.querySelectorAll('.explanation').forEach(exp => {
            exp.style.display = 'none';
        });

        this.updateScoreBoard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    quizManager.init();
});

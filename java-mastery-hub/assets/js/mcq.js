/**
 * Java Mastery Hub - Interactive MCQ System
 * Handles quiz functionality with scoring and feedback
 */

class QuizManager {
    constructor(quizContainerId, resultsContainerId, questions) {
        this.quizContainerId = quizContainerId;
        this.resultsContainerId = resultsContainerId;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
    }

    /**
     * Start the quiz by rendering all questions
     */
    startQuiz() {
        this.renderQuiz();
        this.updateProgress();
    }

    /**
     * Render all quiz questions
     */
    renderQuiz() {
        const container = document.getElementById(this.quizContainerId);
        if (!container) {
            console.error(`Quiz container with id "${this.quizContainerId}" not found`);
            return;
        }

        let html = '';

        this.questions.forEach((q, index) => {
            html += `
                <div class="question-card" data-question-index="${index}">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1} of ${this.questions.length}</span>
                    </div>
                    <div class="question-text">${q.question}</div>
                    <div class="options-container">
                        ${q.options.map((option, optIndex) => `
                            <button class="option-btn" 
                                    data-question-index="${index}" 
                                    data-option-index="${optIndex}"
                                    onclick="handleOptionClick(${index}, ${optIndex})">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                    <div class="explanation-container" id="explanation-${index}" style="display: none;">
                        <div class="explanation-title">📖 Explanation</div>
                        <div class="explanation-text">${q.explanation}</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * Handle answer selection
     */
    selectAnswer(questionIndex, optionIndex) {
        const question = this.questions[questionIndex];
        const isCorrect = optionIndex === question.answerIndex;

        // Store user answer
        this.userAnswers[questionIndex] = {
            selected: optionIndex,
            correct: question.answerIndex,
            isCorrect: isCorrect
        };

        // Update score
        if (isCorrect) {
            this.score++;
        }

        // Update UI
        this.highlightAnswer(questionIndex, optionIndex, isCorrect);
        this.showExplanation(questionIndex);
        this.disableQuestion(questionIndex);
        this.updateProgress();

        // Check if quiz is complete
        if (this.userAnswers.filter(a => a !== undefined).length === this.questions.length) {
            setTimeout(() => this.showResults(), 1000);
        }
    }

    /**
     * Highlight the selected answer
     */
    highlightAnswer(questionIndex, selectedIndex, isCorrect) {
        const questionCard = document.querySelector(`[data-question-index="${questionIndex}"]`);
        const buttons = questionCard.querySelectorAll('.option-btn');
        const correctIndex = this.questions[questionIndex].answerIndex;

        buttons.forEach((btn, index) => {
            if (index === selectedIndex) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            if (index === correctIndex && !isCorrect) {
                btn.classList.add('correct');
            }
        });
    }

    /**
     * Show explanation for a question
     */
    showExplanation(questionIndex) {
        const explanation = document.getElementById(`explanation-${questionIndex}`);
        if (explanation) {
            explanation.style.display = 'block';
        }
    }

    /**
     * Disable all options for a question
     */
    disableQuestion(questionIndex) {
        const questionCard = document.querySelector(`[data-question-index="${questionIndex}"]`);
        const buttons = questionCard.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);
    }

    /**
     * Update progress bar and counters
     */
    updateProgress() {
        const answeredCount = this.userAnswers.filter(a => a !== undefined).length;
        const totalQuestions = this.questions.length;
        const percentage = (answeredCount / totalQuestions) * 100;

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }

        // Update question counter
        const currentQuestionEl = document.getElementById('currentQuestion');
        if (currentQuestionEl) {
            currentQuestionEl.textContent = answeredCount;
        }

        const totalQuestionsEl = document.getElementById('totalQuestions');
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = totalQuestions;
        }
    }

    /**
     * Show quiz results
     */
    showResults() {
        const quizContainer = document.getElementById(this.quizContainerId);
        const resultsContainer = document.getElementById(this.resultsContainerId);

        if (quizContainer) quizContainer.style.display = 'none';
        if (resultsContainer) resultsContainer.style.display = 'block';

        const percentage = Math.round((this.score / this.questions.length) * 100);

        // Update score display
        const scorePercentage = document.getElementById('scorePercentage');
        if (scorePercentage) {
            scorePercentage.textContent = percentage + '%';
        }

        const scoreText = document.getElementById('scoreText');
        if (scoreText) {
            scoreText.textContent = `${this.score}/${this.questions.length}`;
        }

        // Show performance message
        const performanceMessage = document.getElementById('performanceMessage');
        if (performanceMessage) {
            let message = '';
            let messageClass = '';

            if (percentage >= 90) {
                message = '🎉 Outstanding! You have mastered this topic!';
                messageClass = 'excellent';
            } else if (percentage >= 80) {
                message = '👏 Great job! You have a strong understanding!';
                messageClass = 'good';
            } else if (percentage >= 70) {
                message = '👍 Good work! Review the missed topics to improve.';
                messageClass = 'fair';
            } else if (percentage >= 60) {
                message = '📚 Keep practicing! Review the theory and try again.';
                messageClass = 'needs-improvement';
            } else {
                message = '💪 Don\'t give up! Review the material and retake the quiz.';
                messageClass = 'needs-work';
            }

            performanceMessage.innerHTML = `<p class="${messageClass}">${message}</p>`;
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Retake the quiz
     */
    retakeQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];

        const quizContainer = document.getElementById(this.quizContainerId);
        const resultsContainer = document.getElementById(this.resultsContainerId);

        if (resultsContainer) resultsContainer.style.display = 'none';
        if (quizContainer) quizContainer.style.display = 'block';

        this.renderQuiz();
        this.updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Global function to handle option clicks
function handleOptionClick(questionIndex, optionIndex) {
    if (window.quizManager) {
        window.quizManager.selectAnswer(questionIndex, optionIndex);
    }
}

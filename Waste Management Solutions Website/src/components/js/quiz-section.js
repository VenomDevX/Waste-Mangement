// Quiz Section JavaScript
class WasteQuiz {
  constructor() {
    this.currentCategory = 'waste-segregation';
    this.currentQuestion = 0;
    this.selectedAnswer = null;
    this.userAnswers = [];
    this.quizStarted = false;
    this.timeSpent = 0;
    this.timer = null;
    
    this.quizData = {
      'waste-segregation': {
        title: 'Waste Segregation Quiz',
        description: 'Learn the fundamentals of proper waste separation for effective waste management.',
        questions: [
          {
            id: 1,
            question: "Which type of waste should banana peels be classified as?",
            options: ["Dry Waste", "Wet Waste", "Hazardous Waste", "E-Waste"],
            correctAnswer: 1,
            explanation: "Banana peels are organic waste that decomposes naturally, making them wet waste suitable for composting.",
            difficulty: 'easy'
          },
          {
            id: 2,
            question: "What color bin is typically used for dry waste in India?",
            options: ["Green", "Blue", "Red", "Yellow"],
            correctAnswer: 1,
            explanation: "Blue bins are designated for dry waste like paper, plastic, metal, and glass that can be recycled.",
            difficulty: 'easy'
          },
          {
            id: 3,
            question: "Which of these items should NOT go in a composting bin?",
            options: ["Fruit peels", "Vegetable scraps", "Plastic bags", "Tea leaves"],
            correctAnswer: 2,
            explanation: "Plastic bags are non-biodegradable and will not decompose in composting. They should go to dry waste.",
            difficulty: 'medium'
          },
          {
            id: 4,
            question: "What is the correct way to dispose of expired medicines?",
            options: ["Regular dustbin", "Flush down toilet", "Return to pharmacy", "Burn them"],
            correctAnswer: 2,
            explanation: "Expired medicines should be returned to pharmacies or designated collection points to prevent environmental contamination.",
            difficulty: 'medium'
          },
          {
            id: 5,
            question: "How long does it take for a plastic bottle to decompose naturally?",
            options: ["1 year", "10 years", "100 years", "450+ years"],
            correctAnswer: 3,
            explanation: "Plastic bottles can take 450+ years to decompose, highlighting the importance of recycling and reducing plastic use.",
            difficulty: 'hard'
          }
        ]
      },
      'composting': {
        title: 'Composting Quiz',
        description: 'Master home composting techniques and organic waste management.',
        questions: [
          {
            id: 6,
            question: "What is the ideal carbon to nitrogen ratio for effective composting?",
            options: ["10:1", "20:1", "30:1", "40:1"],
            correctAnswer: 2,
            explanation: "A 30:1 carbon to nitrogen ratio provides optimal conditions for microbial activity in composting.",
            difficulty: 'hard'
          },
          {
            id: 7,
            question: "Which method speeds up the composting process?",
            options: ["Adding water daily", "Turning the pile regularly", "Keeping it sealed", "Adding salt"],
            correctAnswer: 1,
            explanation: "Regular turning provides oxygen to microorganisms, significantly speeding up decomposition.",
            difficulty: 'medium'
          },
          {
            id: 8,
            question: "What should you do if your compost pile smells bad?",
            options: ["Add more water", "Add brown materials", "Cover with soil", "Stop adding waste"],
            correctAnswer: 1,
            explanation: "Bad smell usually indicates too much nitrogen. Adding brown materials (carbon) helps balance the pile.",
            difficulty: 'medium'
          }
        ]
      },
      'recycling': {
        title: 'Recycling Quiz',
        description: 'Understand recycling processes and circular economy principles.',
        questions: [
          {
            id: 9,
            question: "Which plastic recycling code is commonly accepted in most recycling programs?",
            options: ["Code 1 (PET)", "Code 3 (PVC)", "Code 6 (PS)", "Code 7 (Other)"],
            correctAnswer: 0,
            explanation: "Code 1 (PET) plastics like water bottles are widely recyclable and commonly accepted by recycling programs.",
            difficulty: 'medium'
          },
          {
            id: 10,
            question: "What percentage of aluminum cans can be recycled indefinitely?",
            options: ["50%", "75%", "90%", "100%"],
            correctAnswer: 3,
            explanation: "Aluminum can be recycled 100% indefinitely without losing quality, making it highly valuable for recycling.",
            difficulty: 'easy'
          }
        ]
      }
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCategoryContent();
  }

  bindEvents() {
    // Category tab switching
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchCategory(e.target.dataset.category);
      });
    });

    // Start quiz button
    document.getElementById('start-quiz-btn').addEventListener('click', () => {
      this.startQuiz();
    });

    // Quiz navigation
    document.getElementById('prev-btn').addEventListener('click', () => {
      this.previousQuestion();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      this.nextQuestion();
    });

    // Results actions
    document.getElementById('retake-btn').addEventListener('click', () => {
      this.resetQuiz();
    });

    document.getElementById('certificate-btn').addEventListener('click', () => {
      this.getCertificate();
    });
  }

  switchCategory(category) {
    this.currentCategory = category;
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    this.updateCategoryContent();
  }

  updateCategoryContent() {
    const categoryData = this.quizData[this.currentCategory];
    document.getElementById('category-title').textContent = categoryData.title;
    document.getElementById('category-description').textContent = categoryData.description;
    document.getElementById('question-count').textContent = `${categoryData.questions.length} Questions`;
    
    const difficulties = [...new Set(categoryData.questions.map(q => q.difficulty))];
    const difficultyText = difficulties.length > 1 ? 
      `${difficulties[0]} to ${difficulties[difficulties.length - 1]}` : 
      difficulties[0];
    document.getElementById('difficulty-level').textContent = difficultyText.charAt(0).toUpperCase() + difficultyText.slice(1);
  }

  startQuiz() {
    this.quizStarted = true;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.timeSpent = 0;
    this.selectedAnswer = null;
    
    // Hide selection screen, show question screen
    document.getElementById('quiz-selection').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
    
    // Start timer
    this.startTimer();
    
    // Load first question
    this.loadQuestion();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeSpent++;
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const minutes = Math.floor(this.timeSpent / 60);
    const seconds = this.timeSpent % 60;
    document.getElementById('quiz-timer').textContent = 
      `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  loadQuestion() {
    const questions = this.quizData[this.currentCategory].questions;
    const question = questions[this.currentQuestion];
    
    // Update progress
    const progress = ((this.currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('question-number').textContent = 
      `Question ${this.currentQuestion + 1} of ${questions.length}`;
    
    // Update question content
    document.getElementById('question-text').textContent = question.question;
    
    // Update difficulty badge
    const difficultyBadge = document.getElementById('difficulty-badge');
    difficultyBadge.textContent = question.difficulty;
    difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
    
    // Create answer options
    this.createAnswerOptions(question.options);
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = this.currentQuestion === 0;
    document.getElementById('next-btn').disabled = this.selectedAnswer === null;
    document.getElementById('next-btn').textContent = 
      this.currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question';
  }

  createAnswerOptions(options) {
    const container = document.getElementById('answer-options');
    container.innerHTML = '';
    
    options.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'answer-option';
      optionDiv.dataset.index = index;
      
      optionDiv.innerHTML = `
        <div class="answer-radio"></div>
        <div class="answer-text">${option}</div>
      `;
      
      optionDiv.addEventListener('click', () => {
        this.selectAnswer(index);
      });
      
      container.appendChild(optionDiv);
    });
  }

  selectAnswer(index) {
    this.selectedAnswer = index;
    
    // Update visual selection
    document.querySelectorAll('.answer-option').forEach(option => {
      option.classList.remove('selected');
    });
    document.querySelector(`[data-index="${index}"]`).classList.add('selected');
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.selectedAnswer = this.userAnswers[this.currentQuestion] !== undefined ? 
        this.userAnswers[this.currentQuestion] : null;
      this.loadQuestion();
    }
  }

  nextQuestion() {
    if (this.selectedAnswer !== null) {
      // Save answer
      this.userAnswers[this.currentQuestion] = this.selectedAnswer;
      
      const questions = this.quizData[this.currentCategory].questions;
      if (this.currentQuestion < questions.length - 1) {
        this.currentQuestion++;
        this.selectedAnswer = this.userAnswers[this.currentQuestion] !== undefined ? 
          this.userAnswers[this.currentQuestion] : null;
        this.loadQuestion();
      } else {
        this.finishQuiz();
      }
    }
  }

  finishQuiz() {
    clearInterval(this.timer);
    
    // Hide question screen, show results screen
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    this.displayResults();
  }

  displayResults() {
    const questions = this.quizData[this.currentCategory].questions;
    const correctAnswers = this.userAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Update score display
    const scoreElement = document.getElementById('score-percentage');
    scoreElement.textContent = `${score}%`;
    
    // Set score color and performance badge
    let performanceClass, performanceText;
    if (score >= 90) {
      performanceClass = 'excellent';
      performanceText = 'Excellent';
    } else if (score >= 80) {
      performanceClass = 'good';
      performanceText = 'Good';
    } else if (score >= 70) {
      performanceClass = 'average';
      performanceText = 'Average';
    } else {
      performanceClass = 'poor';
      performanceText = 'Needs Improvement';
    }
    
    scoreElement.className = `score-percentage ${performanceClass}`;
    
    const badgeElement = document.getElementById('performance-badge');
    badgeElement.textContent = performanceText;
    badgeElement.className = `performance-badge ${performanceClass}`;
    
    // Update stats
    document.getElementById('correct-answers').textContent = correctAnswers;
    const minutes = Math.floor(this.timeSpent / 60);
    const seconds = this.timeSpent % 60;
    document.getElementById('time-taken').textContent = 
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Show certificate button if score is high enough
    if (score >= 70) {
      document.getElementById('certificate-btn').style.display = 'flex';
    }
    
    // Create question review
    this.createQuestionReview(questions);
  }

  createQuestionReview(questions) {
    const container = document.getElementById('review-list');
    container.innerHTML = '';
    
    questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review-item';
      
      reviewDiv.innerHTML = `
        <div class="review-header">
          <div class="review-icon ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? 
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>' :
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
            }
          </div>
          <div class="review-content">
            <div class="review-question">${question.question}</div>
            <div class="review-answer">Your answer: ${question.options[userAnswer]}</div>
            ${!isCorrect ? `<div class="review-correct">Correct answer: ${question.options[question.correctAnswer]}</div>` : ''}
            <div class="review-explanation">${question.explanation}</div>
          </div>
        </div>
      `;
      
      container.appendChild(reviewDiv);
    });
  }

  resetQuiz() {
    // Reset state
    this.quizStarted = false;
    this.currentQuestion = 0;
    this.selectedAnswer = null;
    this.userAnswers = [];
    this.timeSpent = 0;
    
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    // Show selection screen, hide others
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    
    // Hide certificate button
    document.getElementById('certificate-btn').style.display = 'none';
  }

  getCertificate() {
    alert('🎉 Congratulations! Your certificate has been generated. In a real application, this would download or display your certificate.');
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if quiz container exists before initializing
  if (document.getElementById('quiz-container')) {
    new WasteQuiz();
  }
});
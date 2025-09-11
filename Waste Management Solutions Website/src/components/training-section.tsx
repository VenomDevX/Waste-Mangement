import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookOpen, Award, Video, CheckCircle, Clock, Users, Brain, Target, Zap } from "lucide-react";

export function TrainingSection() {
  const trainingModules = [
    {
      title: "Waste Segregation Basics",
      description: "Learn to separate dry, wet, and hazardous waste at source",
      duration: "30 mins",
      participants: "2.3M+",
      progress: 85,
      status: "In Progress",
      icon: BookOpen
    },
    {
      title: "Home Composting Techniques",
      description: "Master the art of converting kitchen waste into valuable compost",
      duration: "45 mins", 
      participants: "1.8M+",
      progress: 100,
      status: "Completed",
      icon: Award
    },
    {
      title: "Plastic Reuse & Recycling",
      description: "Innovative ways to reuse plastic waste and support circular economy",
      duration: "25 mins",
      participants: "1.5M+", 
      progress: 0,
      status: "Not Started",
      icon: Video
    }
  ];

  const greenChampionStats = [
    { label: "Trained Citizens", value: "15.2M", icon: Users },
    { label: "Green Champions", value: "45,000", icon: Award },
    { label: "Completion Rate", value: "78%", icon: CheckCircle },
    { label: "Avg. Score", value: "87/100", icon: BookOpen }
  ];

  return (
    <section id="training" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Mandatory Waste Management Training
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Just like military training builds national defense, waste management training builds environmental defense. 
            Every citizen is a Green Champion in the making.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {greenChampionStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Training Content with Tabs */}
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="quiz">Awareness Quiz</TabsTrigger>
            <TabsTrigger value="assessment">Skills Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Your Training Modules</h3>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Interactive Learning
              </Badge>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {trainingModules.map((module, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <module.icon className="h-6 w-6 text-green-600" />
                      <Badge 
                        variant={module.status === "Completed" ? "default" : module.status === "In Progress" ? "secondary" : "outline"}
                      >
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {module.participants}
                      </div>
                    </div>

                    {module.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      variant={module.status === "Completed" ? "outline" : "default"}
                    >
                      {module.status === "Completed" ? "Review" : 
                       module.status === "In Progress" ? "Continue" : "Start Training"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2">
                <Brain className="h-8 w-8 text-green-600" />
                <h3 className="text-2xl font-semibold">Citizen Awareness Quiz</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Test your knowledge on waste management practices and earn points towards your Green Champion certification.
                Complete quizzes to unlock advanced training modules.
              </p>
            </div>

            {/* Quiz Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm text-muted-foreground">Quiz Attempts Today</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">73%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12.5K</div>
                  <div className="text-sm text-muted-foreground">Certificates Issued</div>
                </CardContent>
              </Card>
            </div>

            {/* HTML/CSS/JS Quiz Component */}
            <div dangerouslySetInnerHTML={{
              __html: `
                <link rel="stylesheet" href="/components/css/quiz-section.css">
                <div class="quiz-container" id="quiz-container">
                  <!-- Quiz Selection Screen -->
                  <div class="quiz-selection" id="quiz-selection">
                    <div class="quiz-header">
                      <div class="quiz-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="brain-icon">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                          <path d="M9 9h.01"/>
                          <path d="M15 9h.01"/>
                        </svg>
                      </div>
                      <h2>Waste Management Awareness Quiz</h2>
                      <p>Test your knowledge and become a certified Green Champion!</p>
                    </div>

                    <div class="quiz-categories">
                      <div class="category-tabs">
                        <button class="category-tab active" data-category="waste-segregation">
                          Waste Segregation
                        </button>
                        <button class="category-tab" data-category="composting">
                          Composting
                        </button>
                        <button class="category-tab" data-category="recycling">
                          Recycling
                        </button>
                      </div>

                      <div class="category-content" id="category-content">
                        <div class="category-info">
                          <h3 id="category-title">Waste Segregation Quiz</h3>
                          <p id="category-description">Learn the fundamentals of proper waste separation for effective waste management.</p>
                          
                          <div class="category-stats">
                            <div class="stat-item">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                              </svg>
                              <span id="question-count">5 Questions</span>
                            </div>
                            <div class="stat-item">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                              </svg>
                              <span id="difficulty-level">Easy to Hard</span>
                            </div>
                            <div class="stat-item">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="8" r="7"/>
                                <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                              </svg>
                              <span>Certificate Available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="quiz-actions">
                      <button class="start-quiz-btn" id="start-quiz-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        Start Quiz
                      </button>
                    </div>
                  </div>

                  <!-- Quiz Question Screen -->
                  <div class="quiz-question" id="quiz-question" style="display: none;">
                    <div class="quiz-progress">
                      <div class="progress-info">
                        <span class="question-number" id="question-number">Question 1 of 5</span>
                        <span class="quiz-timer" id="quiz-timer">Time: 0:00</span>
                      </div>
                      <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                      </div>
                    </div>

                    <div class="question-content">
                      <h3 class="question-text" id="question-text"></h3>
                      <div class="difficulty-badge" id="difficulty-badge"></div>
                    </div>

                    <div class="answer-options" id="answer-options">
                      <!-- Answer options will be populated by JavaScript -->
                    </div>

                    <div class="quiz-navigation">
                      <button class="nav-btn" id="prev-btn" disabled>Previous</button>
                      <button class="nav-btn primary" id="next-btn" disabled>Next Question</button>
                    </div>
                  </div>

                  <!-- Quiz Results Screen -->
                  <div class="quiz-results" id="quiz-results" style="display: none;">
                    <div class="results-header">
                      <div class="trophy-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                          <path d="M4 22h16"/>
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                      </div>
                      <h2>Quiz Complete!</h2>
                      <p>Here are your results</p>
                    </div>

                    <div class="score-display">
                      <div class="score-percentage" id="score-percentage">0%</div>
                      <div class="performance-badge" id="performance-badge">Good</div>
                    </div>

                    <div class="score-stats">
                      <div class="stat-box">
                        <div class="stat-number" id="correct-answers">0</div>
                        <div class="stat-label">Correct Answers</div>
                      </div>
                      <div class="stat-box">
                        <div class="stat-number" id="time-taken">0:00</div>
                        <div class="stat-label">Time Taken</div>
                      </div>
                    </div>

                    <div class="question-review" id="question-review">
                      <h3>Question Review:</h3>
                      <div class="review-list" id="review-list">
                        <!-- Review items will be populated by JavaScript -->
                      </div>
                    </div>

                    <div class="results-actions">
                      <button class="action-btn secondary" id="retake-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                          <path d="M21 3v5h-5"/>
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                          <path d="M3 21v-5h5"/>
                        </svg>
                        Retake Quiz
                      </button>
                      <button class="action-btn primary" id="certificate-btn" style="display: none;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="8" r="7"/>
                          <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                        </svg>
                        Get Certificate
                      </button>
                    </div>
                  </div>
                </div>
                <script src="/components/js/quiz-section.js"></script>
              `
            }} />
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h3 className="text-2xl font-semibold">Skills Assessment Center</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive evaluation of your waste management knowledge and practical skills.
                Achieve 80% to become a certified Green Champion.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Basic Assessment
                  </CardTitle>
                  <CardDescription>
                    Fundamental waste management principles and segregation knowledge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span>15 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Questions</span>
                    <span>20 multiple choice</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing Score</span>
                    <span>70%</span>
                  </div>
                  <Button className="w-full">Start Basic Assessment</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Advanced Assessment
                  </CardTitle>
                  <CardDescription>
                    Advanced topics including policy, technology, and community engagement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span>30 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Questions</span>
                    <span>35 mixed format</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing Score</span>
                    <span>80%</span>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Basic First
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Incentive Section */}
        <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <Award className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-2xl font-semibold">Green Champion Rewards</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete all training modules and become a certified Green Champion. 
                Earn points, badges, and qualify for incentives in your community.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                View Rewards Program
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
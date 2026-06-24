import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CheckCircle, XCircle, Brain, Trophy, RefreshCw, Play, Award, Star, Target } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  difficulty: string;
}

export function WasteQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('waste-segregation');

  const quizData: Record<string, QuizQuestion[]> = {
    'waste-segregation': [
      {
        id: 1,
        question: "Which type of waste should banana peels be classified as?",
        options: ["Dry Waste", "Wet Waste", "Hazardous Waste", "E-Waste"],
        correctAnswer: 1,
        explanation: "Banana peels are organic waste that decomposes naturally, making them wet waste suitable for composting.",
        difficulty: 'easy',
        category: 'Waste Segregation'
      },
      {
        id: 2,
        question: "What color bin is typically used for dry waste in India?",
        options: ["Green", "Blue", "Red", "Yellow"],
        correctAnswer: 1,
        explanation: "Blue bins are designated for dry waste like paper, plastic, metal, and glass that can be recycled.",
        difficulty: 'easy',
        category: 'Waste Segregation'
      },
      {
        id: 3,
        question: "Which of these items should NOT go in a composting bin?",
        options: ["Fruit peels", "Vegetable scraps", "Plastic bags", "Tea leaves"],
        correctAnswer: 2,
        explanation: "Plastic bags are non-biodegradable and will not decompose in composting. They should go to dry waste.",
        difficulty: 'medium',
        category: 'Waste Segregation'
      },
      {
        id: 4,
        question: "What is the correct way to dispose of expired medicines?",
        options: ["Regular dustbin", "Flush down toilet", "Return to pharmacy", "Burn them"],
        correctAnswer: 2,
        explanation: "Expired medicines should be returned to pharmacies or designated collection points to prevent environmental contamination.",
        difficulty: 'medium',
        category: 'Waste Segregation'
      },
      {
        id: 5,
        question: "How long does it take for a plastic bottle to decompose naturally?",
        options: ["1 year", "10 years", "100 years", "450+ years"],
        correctAnswer: 3,
        explanation: "Plastic bottles can take 450+ years to decompose, highlighting the importance of recycling and reducing plastic use.",
        difficulty: 'hard',
        category: 'Waste Segregation'
      }
    ],
    'composting': [
      {
        id: 6,
        question: "What is the ideal carbon to nitrogen ratio for effective composting?",
        options: ["10:1", "20:1", "30:1", "40:1"],
        correctAnswer: 2,
        explanation: "A 30:1 carbon to nitrogen ratio provides optimal conditions for microbial activity in composting.",
        difficulty: 'hard',
        category: 'Composting'
      },
      {
        id: 7,
        question: "Which method speeds up the composting process?",
        options: ["Adding water daily", "Turning the pile regularly", "Keeping it sealed", "Adding salt"],
        correctAnswer: 1,
        explanation: "Regular turning provides oxygen to microorganisms, significantly speeding up decomposition.",
        difficulty: 'medium',
        category: 'Composting'
      },
      {
        id: 8,
        question: "What should you do if your compost pile smells bad?",
        options: ["Add more water", "Add brown materials", "Cover with soil", "Stop adding waste"],
        correctAnswer: 1,
        explanation: "Bad smell usually indicates too much nitrogen. Adding brown materials (carbon) helps balance the pile.",
        difficulty: 'medium',
        category: 'Composting'
      }
    ],
    'recycling': [
      {
        id: 9,
        question: "Which plastic recycling code is commonly accepted in most recycling programs?",
        options: ["Code 1 (PET)", "Code 3 (PVC)", "Code 6 (PS)", "Code 7 (Other)"],
        correctAnswer: 0,
        explanation: "Code 1 (PET) plastics like water bottles are widely recyclable and commonly accepted by recycling programs.",
        difficulty: 'medium',
        category: 'Recycling'
      },
      {
        id: 10,
        question: "What percentage of aluminum cans can be recycled indefinitely?",
        options: ["50%", "75%", "90%", "100%"],
        correctAnswer: 3,
        explanation: "Aluminum can be recycled 100% indefinitely without losing quality, making it highly valuable for recycling.",
        difficulty: 'easy',
        category: 'Recycling'
      }
    ]
  };

  const currentQuestions = quizData[currentCategory] || [];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !showResult) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, showResult]);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = parseInt(selectedAnswer);
      setUserAnswers(newAnswers);

      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        setShowResult(true);
      }
    }
  };

  const calculateScore = (): QuizResult => {
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      return answer === currentQuestions[index].correctAnswer ? count + 1 : count;
    }, 0);

    const score = Math.round((correctAnswers / currentQuestions.length) * 100);
    
    return {
      score,
      totalQuestions: currentQuestions.length,
      correctAnswers,
      timeSpent,
      difficulty: currentCategory
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setUserAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
    setTimeSpent(0);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { text: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 70) return { text: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  if (!quizStarted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Waste Management Awareness Quiz</CardTitle>
          <CardDescription className="text-lg">
            Test your knowledge and become a certified Green Champion!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentCategory} onValueChange={setCurrentCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="waste-segregation">Waste Segregation</TabsTrigger>
              <TabsTrigger value="composting">Composting</TabsTrigger>
              <TabsTrigger value="recycling">Recycling</TabsTrigger>
            </TabsList>

            <TabsContent value="waste-segregation" className="space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Waste Segregation Quiz</h3>
                <p className="text-muted-foreground mb-4">
                  Learn the fundamentals of proper waste separation for effective waste management.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-medium">5 Questions</div>
                  </div>
                  <div>
                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                    <div className="text-sm font-medium">Easy to Hard</div>
                  </div>
                  <div>
                    <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-medium">Certificate Available</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="composting" className="space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Composting Quiz</h3>
                <p className="text-muted-foreground mb-4">
                  Master home composting techniques and organic waste management.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-medium">3 Questions</div>
                  </div>
                  <div>
                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                    <div className="text-sm font-medium">Medium Level</div>
                  </div>
                  <div>
                    <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-medium">Points Awarded</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recycling" className="space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Recycling Quiz</h3>
                <p className="text-muted-foreground mb-4">
                  Understand recycling processes and circular economy principles.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-medium">2 Questions</div>
                  </div>
                  <div>
                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                    <div className="text-sm font-medium">Easy to Medium</div>
                  </div>
                  <div>
                    <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-medium">Bonus Points</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button onClick={startQuiz} size="lg" className="bg-green-600 hover:bg-green-700">
              <Play className="h-5 w-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const result = calculateScore();
    const badge = getPerformanceBadge(result.score);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}%
            </div>
            <Badge className={badge.color}>{badge.text}</Badge>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{result.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatTime(result.timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Question Review:</h3>
            {currentQuestions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-muted-foreground">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={resetQuiz} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            {result.score >= 70 && (
              <Button className="bg-green-600 hover:bg-green-700">
                <Award className="h-4 w-4 mr-2" />
                Get Certificate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = currentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="secondary">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Time: {formatTime(timeSpent)}
          </div>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        <Badge 
          variant={currentQ.difficulty === 'easy' ? 'secondary' : currentQ.difficulty === 'medium' ? 'default' : 'destructive'}
        >
          {currentQ.difficulty}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
          {currentQ.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="bg-green-600 hover:bg-green-700"
          >
            {currentQuestion === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

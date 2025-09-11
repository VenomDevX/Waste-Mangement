import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, CheckCircle, XCircle, Trophy } from "lucide-react";

interface QuickQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuickQuizModalProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  questions: QuickQuizQuestion[];
}

export function QuickQuizModal({ trigger, title, description, questions }: QuickQuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setUserAnswers([]);
    setShowResults(false);
  };

  const handleNext = () => {
    if (selectedAnswer !== '') {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = parseInt(selectedAnswer);
      setUserAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    const correct = userAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    return Math.round((correct / questions.length) * 100);
  };

  const currentQ = questions[currentQuestion];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) handleReset();
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <div className="w-32 bg-muted rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
                
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value={index.toString()} id={`quick-option-${index}`} />
                      <Label htmlFor={`quick-option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === ''}
                className="bg-green-600 hover:bg-green-700"
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {calculateScore()}%
              </div>
              <Badge 
                className={calculateScore() >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              >
                {calculateScore() >= 70 ? 'Passed!' : 'Keep Learning!'}
              </Badge>
            </div>

            <div className="space-y-3">
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="text-left border rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="text-sm">
                        <p className="font-medium">{question.question}</p>
                        {!isCorrect && (
                          <p className="text-muted-foreground mt-1">{question.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={handleReset}>
                Try Again
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Continue Training
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, Recycle, Users, MapPin, Brain, Truck } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { QuickQuizModal } from './quick-quiz-modal';

export function HeroSection() {
  const quickQuizQuestions = [
    {
      question: "What type of waste are fruit peels classified as?",
      options: ["Dry Waste", "Wet Waste", "Hazardous Waste", "E-Waste"],
      correctAnswer: 1,
      explanation: "Fruit peels are organic waste that decomposes naturally, making them wet waste."
    },
    {
      question: "Which color bin is used for dry waste?",
      options: ["Green", "Blue", "Red", "Yellow"],
      correctAnswer: 1,
      explanation: "Blue bins are designated for dry waste like paper, plastic, and metal."
    },
    {
      question: "How often should you turn compost for best results?",
      options: ["Daily", "Weekly", "Monthly", "Never"],
      correctAnswer: 1,
      explanation: "Weekly turning provides optimal oxygen flow for decomposition."
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform India's{" "}
                <span className="text-green-600">Waste Management</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Join the nationwide initiative to achieve 100% scientific waste treatment. 
                Get trained, track waste, and build a cleaner, greener India together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const trainingSection = document.getElementById('training');
                  if (trainingSection) {
                    trainingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Training Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  window.open('/pickup-schedule.html', '_blank');
                }}
              >
                <Truck className="mr-2 h-4 w-4" />
                Schedule Pickup
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <QuickQuizModal
                trigger={
                  <Button size="lg" variant="outline">
                    <Brain className="mr-2 h-4 w-4" />
                    Quick Quiz
                  </Button>
                }
                title="Waste Management Quick Quiz"
                description="Test your basic knowledge in just 3 questions!"
                questions={quickQuizQuestions}
              />
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const facilitiesSection = document.getElementById('facilities');
                  if (facilitiesSection) {
                    facilitiesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Find Facilities Near You
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <Card className="p-4 text-center">
                <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">54%</div>
                <div className="text-sm text-muted-foreground">Waste Treated</div>
              </Card>
              <Card className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">1.7L</div>
                <div className="text-sm text-muted-foreground">Tonnes/Day</div>
              </Card>
              <Card className="p-4 text-center">
                <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">249</div>
                <div className="text-sm text-muted-foreground">WTE Plants</div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1635605007233-f89705544846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMG1hbmFnZW1lbnQlMjByZWN5Y2xpbmclMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTczNDk2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Waste Management and Recycling"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
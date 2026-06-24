import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, Recycle, Users, MapPin, Truck, Brain, Navigation } from "lucide-react";
import { ImageWithFallback } from './ui-elements/ImageWithFallback';
import { QuickQuizModal } from './quick-quiz-modal';
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

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
    <section className="landing-section">
      <div className="hero-section">
        {/* Left Column: Text & Actions */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 max-w-2xl mx-auto lg:mx-0">
              Transform India's{" "}
              <span className="text-green-600 block sm:inline">Waste Management</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join the nationwide initiative to achieve 100% scientific waste treatment. 
              Get trained, track waste, and build a cleaner, greener India together.
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto lg:mx-0">
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/schedule-pickup')}
              >
                <Truck className="mr-2 h-4 w-4" />
                Schedule Pickup
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex justify-center lg:justify-start gap-4">
              <QuickQuizModal
                trigger={
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-gray-900">
                    <Brain className="mr-2 h-4 w-4 text-gray-500" />
                    Quick Quiz
                  </Button>
                }
                title="Waste Management Quick Quiz"
                description="Test your basic knowledge in just 3 questions!"
                questions={quickQuizQuestions}
              />
              <Button 
                size="sm" 
                variant="ghost"
                className="text-muted-foreground hover:text-gray-900"
                onClick={() => {
                  const facilitiesSection = document.getElementById('facilities');
                  if (facilitiesSection) {
                    facilitiesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Navigation className="mr-2 h-4 w-4 text-gray-500" />
                Find Facilities
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1635605007233-f89705544846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMG1hbmFnZW1lbnQlMjByZWN5Y2xpbmclMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTczNDk2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=web&utm_medium=referral"
              alt="Waste Management and Recycling"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4 shrink-0">
            <Recycle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 mb-1">54%</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Waste Treated</div>
        </div>
        <div className="stat-card">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 shrink-0">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 mb-1">1.7L</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tonnes/Day</div>
        </div>
        <div className="stat-card">
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 shrink-0">
            <MapPin className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 mb-1">249</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">WTE Plants</div>
        </div>
      </div>

    </section>
  );
}

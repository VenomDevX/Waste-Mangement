import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookOpen, Award, Video, CheckCircle, Clock, Users, Brain, Target, Zap } from "lucide-react";
import { WasteQuiz } from "./waste-quiz";

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

            {/* React Quiz Component */}
            <WasteQuiz />
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

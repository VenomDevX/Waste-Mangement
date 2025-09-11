import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Recycle, Factory, Truck, Users, Target, Award } from "lucide-react";

export function DashboardSection() {
  const nationalStats = [
    {
      title: "Daily Waste Generation",
      value: "1.7L",
      unit: "tonnes/day",
      change: "+2.3%",
      trend: "up",
      icon: Recycle,
      color: "text-blue-600"
    },
    {
      title: "Scientific Treatment",
      value: "54%",
      unit: "of total waste",
      change: "+5.2%", 
      trend: "up",
      icon: Factory,
      color: "text-green-600"
    },
    {
      title: "Waste Collection",
      value: "91.8%",
      unit: "efficiency",
      change: "+1.8%",
      trend: "up", 
      icon: Truck,
      color: "text-purple-600"
    },
    {
      title: "Trained Citizens",
      value: "15.2M",
      unit: "certified",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const stateProgress = [
    { state: "Karnataka", progress: 78, target: 85, status: "On Track" },
    { state: "Maharashtra", progress: 72, target: 80, status: "On Track" },
    { state: "Delhi", progress: 85, target: 90, status: "Ahead" },
    { state: "Tamil Nadu", progress: 68, target: 75, status: "On Track" },
    { state: "Gujarat", progress: 65, target: 80, status: "Behind" }
  ];

  const recentAchievements = [
    {
      title: "Zero Waste ULB",
      description: "50 ULBs achieved zero waste to landfill status",
      date: "This week",
      type: "milestone"
    },
    {
      title: "Training Milestone", 
      description: "15 million citizens completed waste management training",
      date: "Yesterday",
      type: "training"
    },
    {
      title: "Technology Upgrade",
      description: "New GPS tracking deployed in 200+ collection vehicles",
      date: "3 days ago", 
      type: "tech"
    }
  ];

  const wasteBreakdown = [
    { type: "Organic Waste", percentage: 45, color: "bg-green-500" },
    { type: "Recyclable", percentage: 25, color: "bg-blue-500" },
    { type: "Plastic", percentage: 15, color: "bg-red-500" },
    { type: "Paper", percentage: 10, color: "bg-yellow-500" },
    { type: "Others", percentage: 5, color: "bg-gray-500" }
  ];

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            National Waste Management Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights into India's waste management progress. 
            Track our journey towards 100% scientific waste treatment.
          </p>
        </div>

        {/* National Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {nationalStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.unit}</div>
                  <div className="text-sm font-medium">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* State Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  State-wise Progress
                </CardTitle>
                <CardDescription>
                  Waste management efficiency across major states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stateProgress.map((state, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{state.state}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {state.progress}% / {state.target}%
                          </span>
                          <Badge 
                            variant={state.status === "Ahead" ? "default" : state.status === "Behind" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {state.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={state.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Waste Composition */}
            <Card>
              <CardHeader>
                <CardTitle>National Waste Composition</CardTitle>
                <CardDescription>
                  Breakdown of waste types across India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wasteBreakdown.map((waste, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{waste.type}</span>
                        <span className="text-sm text-muted-foreground">{waste.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${waste.color}`}
                          style={{ width: `${waste.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">91,511</div>
                  <div className="text-sm text-green-800">TPD Treated Today</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,200+</div>
                  <div className="text-sm text-blue-800">New Green Champions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">350</div>
                  <div className="text-sm text-purple-800">Issues Resolved</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {achievement.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Targets 2025 */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle>Targets 2025</CardTitle>
                <CardDescription>Our ambitious goals for a cleaner India</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Waste Treatment</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Zero Waste ULBs</span>
                  <span className="font-bold">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Trained Citizens</span>
                  <span className="font-bold">50M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Green Champions</span>
                  <span className="font-bold">1M</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
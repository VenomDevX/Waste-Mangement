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
    <section id="dashboard" className="dashboard-section">
      <div className="dashboard-inner">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            National Waste Management Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into India's waste management progress. 
            Track our journey towards 100% scientific waste treatment.
          </p>
        </div>

        {/* National Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {nationalStats.map((stat, index) => (
            <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('600', '50')}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500">{stat.title} <span className="font-normal text-gray-400">({stat.unit})</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* State Progress */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="h-5 w-5 text-gray-400" />
                  State-wise Progress
                </CardTitle>
                <CardDescription>
                  Waste management efficiency across major states
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {stateProgress.map((state, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{state.state}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 font-medium">
                            {state.progress}% <span className="text-gray-300">/</span> {state.target}%
                          </span>
                          <Badge 
                            variant={state.status === "Ahead" ? "default" : state.status === "Behind" ? "destructive" : "secondary"}
                            className="text-xs font-semibold"
                          >
                            {state.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={state.progress} className="h-2 bg-gray-100" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Waste Composition */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl">National Waste Composition</CardTitle>
                <CardDescription>
                  Breakdown of waste types across India
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  {wasteBreakdown.map((waste, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">{waste.type}</span>
                        <span className="text-sm font-bold text-gray-900">{waste.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
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
          <div className="space-y-8">
            {/* Quick Facts */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl">Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="text-center p-4 border border-gray-100 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900">91,511</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">TPD Treated Today</div>
                </div>
                <div className="text-center p-4 border border-gray-100 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900">1,200+</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">New Green Champions</div>
                </div>
                <div className="text-center p-4 border border-gray-100 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900">350</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">Issues Resolved</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Award className="h-5 w-5 text-gray-400" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                      <h4 className="font-bold text-sm text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400">{achievement.date}</span>
                        <Badge variant="outline" className="text-xs border-gray-200 bg-white text-gray-600">
                          {achievement.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Targets 2025 */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl text-gray-900">Targets 2025</CardTitle>
                <CardDescription>Our ambitious goals for a cleaner India</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-600">Waste Treatment</span>
                  <span className="font-bold text-gray-900">100%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-600">Zero Waste ULBs</span>
                  <span className="font-bold text-gray-900">500+</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-600">Trained Citizens</span>
                  <span className="font-bold text-gray-900">50M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Green Champions</span>
                  <span className="font-bold text-gray-900">1M</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

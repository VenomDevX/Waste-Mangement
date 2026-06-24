import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Camera, MapPin, Send, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function ReportSection() {
  const recentReports = [
    {
      id: "RPT-2025-001",
      title: "Illegal dumping near bus stop",
      location: "MG Road, Sector 15",
      status: "Resolved",
      priority: "High",
      date: "Sep 5, 2025",
      reporter: "Anonymous"
    },
    {
      id: "RPT-2025-002", 
      title: "Overflowing waste bins",
      location: "Central Market, Block C",
      status: "In Progress",
      priority: "Medium",
      date: "Sep 7, 2025",
      reporter: "Amit K."
    },
    {
      id: "RPT-2025-003",
      title: "Burning plastic waste",
      location: "Industrial Area, Phase 2", 
      status: "Under Review",
      priority: "High",
      date: "Sep 8, 2025",
      reporter: "Sunita M."
    }
  ];

  const reportCategories = [
    "Illegal Dumping",
    "Overflowing Bins",
    "Burning Waste",
    "Blocked Drains",
    "Missed Collection",
    "Other"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "text-green-600 bg-green-100";
      case "In Progress": return "text-yellow-600 bg-yellow-100";
      case "Under Review": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <section id="report" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Report Waste Issues
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            "If you see waste, send photo" - Help us maintain cleanliness by reporting waste management issues 
            in your area. Every report helps build a cleaner India.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Submit New Report
                </CardTitle>
                <CardDescription>
                  Upload geo-tagged photos and describe the waste management issue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Issue Category</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {reportCategories.map((category) => (
                        <Button key={category} variant="outline" size="sm" className="justify-start">
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter address or landmark" className="flex-1" />
                      <Button variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Use GPS
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea 
                      placeholder="Describe the waste management issue in detail..."
                      className="min-h-24"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Upload Photos</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Click to upload photos or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                      <Button variant="outline" className="mt-4">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      Reports with clear photos and accurate locations get faster response times
                    </p>
                  </div>

                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports & Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Track your submitted reports and community updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{report.id}</span>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold text-sm">{report.title}</h4>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{report.date}</span>
                        <Badge variant="outline" className={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-muted-foreground">Reports Submitted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-muted-foreground">Issues Resolved</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Top Reporter Badge Earned</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>Average response: 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Waste Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-4">
                  For urgent issues like hazardous waste spills or health threats, contact immediately:
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  Emergency Hotline: 1800-XXX-XXXX
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Stories */}
        <Card className="mt-12 bg-green-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-2xl font-semibold">Community Success Story</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                "Thanks to citizen reports, we've resolved 15,000+ waste management issues this month across 
                500+ ULBs. Your vigilance is making India cleaner every day!"
              </p>
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">15K+</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-muted-foreground">ULBs Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24hrs</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

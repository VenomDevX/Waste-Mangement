import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Users, Award, Calendar, Camera, Heart, MessageCircle, Share } from "lucide-react";
import { ImageWithFallback } from './ui-elements/ImageWithFallback';

export function CommunitySection() {
  const communityPosts = [
    {
      author: "Priya Sharma",
      role: "Green Champion",
      avatar: "PS",
      time: "2 hours ago",
      content: "Great community cleanup drive in our locality! 🌱 Collected 200kg of waste and segregated it properly. Thanks to everyone who participated!",
      image: "https://images.unsplash.com/photo-1643213410761-879689e61a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXIlMjBjbGVhbmluZ3xlbnwxfHx8fDE3NTczNDk2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=web&utm_medium=referral",
      likes: 45,
      comments: 12,
      category: "Community Drive"
    },
    {
      author: "Rajesh Kumar",
      role: "Waste Worker",
      avatar: "RK", 
      time: "5 hours ago",
      content: "Completed safety training module today. The new protective gear distribution program is really helpful for our team. #SafetyFirst",
      image: null,
      likes: 23,
      comments: 8,
      category: "Training"
    },
    {
      author: "Mumbai Green Team",
      role: "Organization",
      avatar: "MGT",
      time: "1 day ago", 
      content: "This week's cleanup results: 15 areas covered, 2.5 tonnes of waste processed, 85% source segregation achieved! 🎉",
      image: null,
      likes: 89,
      comments: 24,
      category: "Achievement"
    }
  ];

  const upcomingEvents = [
    {
      title: "Community Cleaning Day",
      date: "Sep 15, 2025",
      time: "6:00 AM - 9:00 AM",
      location: "Central Park, Sector 21",
      participants: 156,
      type: "Cleanup Drive"
    },
    {
      title: "Composting Workshop",
      date: "Sep 18, 2025", 
      time: "10:00 AM - 12:00 PM",
      location: "Community Center, Block A",
      participants: 45,
      type: "Training"
    },
    {
      title: "Green Champion Awards",
      date: "Sep 25, 2025",
      time: "5:00 PM - 7:00 PM", 
      location: "City Hall Auditorium",
      participants: 200,
      type: "Award Ceremony"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Eco Warriors Delhi", points: 2840, badge: "🏆" },
    { rank: 2, name: "Green Mumbai Initiative", points: 2720, badge: "🥈" }, 
    { rank: 3, name: "Clean Bangalore Mission", points: 2650, badge: "🥉" },
    { rank: 4, name: "Chennai Green Force", points: 2580, badge: "⭐" },
    { rank: 5, name: "Kolkata Clean Coalition", points: 2420, badge: "⭐" }
  ];

  return (
    <section id="community" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Community & Participation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join millions of citizens in the national waste management movement. 
            Share your efforts, learn from others, and build a cleaner India together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Community Feed</h3>
              <Button>
                <Camera className="h-4 w-4 mr-2" />
                Share Update
              </Button>
            </div>

            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{post.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{post.time}</span>
                            <span>•</span>
                            <span>{post.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p>{post.content}</p>

                      {/* Post Image */}
                      {post.image && (
                        <ImageWithFallback
                          src={post.image}
                          alt="Community post"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-6 pt-2 border-t">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Share className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Community Events
                </CardTitle>
                <CardDescription>
                  Join local events and make a difference in your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-center min-w-16">
                        <div className="text-lg font-bold text-green-600">
                          {event.date.split(' ')[1].replace(',', '')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.date.split(' ')[0]}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">{event.participants}</div>
                        <div className="text-xs text-muted-foreground">participating</div>
                        <Button size="sm" className="mt-2">Join</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Community Leaderboard
                </CardTitle>
                <CardDescription>Top performing communities this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((team) => (
                    <div key={team.rank} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                        {team.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{team.name}</div>
                        <div className="text-xs text-muted-foreground">{team.points} points</div>
                      </div>
                      <span className="text-lg">{team.badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1,250</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-bold">15</div>
                    <div className="text-xs text-muted-foreground">Events Joined</div>
                  </div>
                  <div>
                    <div className="font-bold">8</div>
                    <div className="text-xs text-muted-foreground">Posts Shared</div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View Full Profile
                </Button>
              </CardContent>
            </Card>

            {/* Penalty Warning */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ Penalty System</h4>
                <p className="text-sm text-red-700">
                  Buildings not segregating waste at source face collection suspension and fines. 
                  Ensure proper segregation to avoid penalties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

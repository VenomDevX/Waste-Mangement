import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { MapPin, Search, Factory, Recycle, Truck, ShoppingBag, Phone, Clock } from "lucide-react";

export function FacilitiesSection() {
  const facilities = [
    {
      name: "Delhi Bio-methanization Plant",
      type: "Bio-methanization",
      address: "Sector 12, Dwarka, New Delhi",
      distance: "2.3 km",
      capacity: "500 TPD",
      status: "Operational",
      contact: "+91-11-2345-6789",
      icon: Factory
    },
    {
      name: "Mumbai Waste-to-Energy Plant",
      type: "Waste-to-Energy",
      address: "Deonar, Mumbai, Maharashtra", 
      distance: "4.7 km",
      capacity: "600 TPD",
      status: "Operational",
      contact: "+91-22-3456-7890",
      icon: Factory
    },
    {
      name: "Bangalore Recycling Center",
      type: "Recycling",
      address: "Electronic City, Bangalore",
      distance: "6.1 km", 
      capacity: "300 TPD",
      status: "Operational",
      contact: "+91-80-4567-8901",
      icon: Recycle
    },
    {
      name: "Chennai Scrap Collection Hub",
      type: "Scrap Collection",
      address: "Tambaram, Chennai, Tamil Nadu",
      distance: "3.8 km",
      capacity: "200 TPD", 
      status: "Operational",
      contact: "+91-44-5678-9012",
      icon: ShoppingBag
    }
  ];

  const utilityShop = [
    {
      name: "3-Bin Segregation Set",
      price: "₹299",
      description: "Color-coded bins for dry, wet, and hazardous waste",
      rating: 4.8,
      orders: "15K+"
    },
    {
      name: "Home Composting Kit",
      price: "₹599", 
      description: "Complete kit with container, activator, and guide",
      rating: 4.6,
      orders: "8K+"
    },
    {
      name: "Reusable Waste Bags",
      price: "₹149",
      description: "Set of 5 biodegradable waste collection bags", 
      rating: 4.7,
      orders: "22K+"
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Waste Management Facilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find nearby waste treatment facilities, recycling centers, and shop for waste management utilities. 
            Every ULB is equipped with modern waste processing infrastructure.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by location, facility type, or name..." 
                  className="pl-10"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <MapPin className="h-4 w-4 mr-2" />
                Find Near Me
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Facilities List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold">Nearby Facilities</h3>
            
            <div className="space-y-4">
              {facilities.map((facility, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <facility.icon className="h-6 w-6 text-green-600" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{facility.name}</h4>
                            <p className="text-sm text-muted-foreground">{facility.address}</p>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {facility.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {facility.distance}
                          </div>
                          <div className="flex items-center gap-1">
                            <Factory className="h-4 w-4" />
                            {facility.capacity}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {facility.contact}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            Get Directions
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Utility Shop */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Waste Utility Shop</h3>
            
            <div className="space-y-4">
              {utilityShop.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-semibold text-green-600">{item.price}</div>
                          <div className="text-xs text-muted-foreground">
                            ⭐ {item.rating} • {item.orders} orders
                          </div>
                        </div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <ShoppingBag className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Free Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  On orders above ₹500 in your ULB area
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Schedule Pickup Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Truck className="h-6 w-6 text-blue-600" />
              Schedule Waste Pickup
            </CardTitle>
            <CardDescription className="text-lg">
              Book doorstep waste collection at your convenience. Professional waste management partners ensure proper handling and disposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <div className="text-3xl">🏠</div>
                <h4 className="font-semibold">Doorstep Service</h4>
                <p className="text-sm text-muted-foreground">Convenient pickup from your location</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">⏰</div>
                <h4 className="font-semibold">Flexible Timing</h4>
                <p className="text-sm text-muted-foreground">Choose your preferred time slot</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">♻️</div>
                <h4 className="font-semibold">Proper Disposal</h4>
                <p className="text-sm text-muted-foreground">Certified waste treatment process</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  window.open('/pickup-schedule.html', '_blank');
                }}
              >
                <Truck className="mr-2 h-5 w-5" />
                Schedule Pickup Now
              </Button>
              <Button size="lg" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                View My Bookings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Tracking */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Waste Collection Vehicle Tracking
            </CardTitle>
            <CardDescription>
              Track waste collection vehicles in real-time and get pickup schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">DL-1234</span>
                </div>
                <p className="text-sm text-muted-foreground">Next pickup: Today 2:30 PM</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">DL-5678</span>
                </div>
                <p className="text-sm text-muted-foreground">En route: 15 mins away</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">DL-9012</span>
                </div>
                <p className="text-sm text-muted-foreground">Delayed: Traffic jam</p>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
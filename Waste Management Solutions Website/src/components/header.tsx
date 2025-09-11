import { Button } from "./ui/button";
import { Leaf, Menu, User, Truck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold">WasteWise India</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="hover:text-green-600 transition-colors">Dashboard</a>
          <a href="#training" className="hover:text-green-600 transition-colors">Training</a>
          <a href="#facilities" className="hover:text-green-600 transition-colors">Facilities</a>
          <a href="#community" className="hover:text-green-600 transition-colors">Community</a>
          <a href="#report" className="hover:text-green-600 transition-colors">Report</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            size="sm" 
            className="hidden md:flex bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              window.open('/pickup-schedule.html', '_blank');
            }}
          >
            <Truck className="h-4 w-4 mr-2" />
            Schedule Pickup
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
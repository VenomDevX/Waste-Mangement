import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-semibold">WasteWise India</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming India's waste management through technology, training, and community participation. 
              Building a cleaner, greener future for all.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-green-600 cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-green-600 cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-green-600 cursor-pointer" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-green-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Training Modules</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Find Facilities</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Report Issues</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Community Forum</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Green Champion Program</div>
            </div>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Government Portals</h3>
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Ministry of Environment</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Central Pollution Control Board</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Swachh Bharat Mission</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Digital India</div>
              <div className="text-muted-foreground hover:text-green-600 cursor-pointer">Smart Cities Mission</div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">1800-XXX-WASTE</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">support@wastewise.gov.in</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-muted-foreground">
                  Ministry of Social Justice & Empowerment<br />
                  New Delhi, India
                </span>
              </div>
            </div>
            
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-xs text-red-800 font-medium">Emergency Waste Hotline</div>
              <div className="text-sm text-red-700">1800-EMERGENCY</div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 WasteWise India. A Government of India Initiative under Smart India Hackathon.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-green-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-green-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-green-600 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

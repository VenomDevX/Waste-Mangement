import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, User, Truck, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="site-navbar">
      <div className="navbar-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Leaf className="h-6 w-6 text-[#0aa844]" />
          <span>WasteWise India</span>
        </Link>

        <div className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/training">Training</NavLink>
          <NavLink to="/facilities">Facilities</NavLink>
          <NavLink to="/community">Community</NavLink>
        </div>

        <div className="navbar-actions">
          <Link to="/schedule-pickup" className="schedule-button" onClick={closeMenu}>
            <Truck className="h-4 w-4" />
            Schedule Pickup
          </Link>

          <Link to="/profile" className="profile-button" onClick={closeMenu}>
            <User className="h-4 w-4" />
            Profile
          </Link>

          <button 
            className="mobile-menu-button" 
            aria-label="Open navigation menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 shadow-sm flex flex-col p-4 gap-4 z-50 md:hidden">
          <NavLink to="/" className="text-gray-700 font-medium hover:text-[#00a63e]" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/dashboard" className="text-gray-700 font-medium hover:text-[#00a63e]" onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/training" className="text-gray-700 font-medium hover:text-[#00a63e]" onClick={closeMenu}>Training</NavLink>
          <NavLink to="/facilities" className="text-gray-700 font-medium hover:text-[#00a63e]" onClick={closeMenu}>Facilities</NavLink>
          <NavLink to="/community" className="text-gray-700 font-medium hover:text-[#00a63e]" onClick={closeMenu}>Community</NavLink>
          <hr className="border-gray-100" />
          <Link to="/profile" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#00a63e]" onClick={closeMenu}>
            <User className="h-4 w-4" /> Profile
          </Link>
          <Link to="/schedule-pickup" className="flex items-center gap-2 text-[#00a63e] font-semibold" onClick={closeMenu}>
            <Truck className="h-4 w-4" /> Schedule Pickup
          </Link>
        </div>
      )}
    </nav>
  );
}

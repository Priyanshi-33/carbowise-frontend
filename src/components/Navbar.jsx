import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        
        {/* Left Section */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium">
            About
          </Link>
        </div>

        {/* Center Section (Beautified CarboWise) */}
        <div>
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent drop-shadow-md hover:scale-110 transition-transform duration-300"
          >
            CarboWise
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex space-x-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
            Dashboard
          </Link>
          <Link to="/tracker" className="text-gray-700 hover:text-green-600 font-medium">
            Tracker
          </Link>
          <Link to="/settings" className="text-gray-700 hover:text-green-600 font-medium">
            Settings
          </Link>
          <Link to="/reduce-footprint" className="text-gray-700 hover:text-green-600 font-medium">
            Reduce Footprint
          </Link>
        </div>
      </div>
    </nav>
  );
}






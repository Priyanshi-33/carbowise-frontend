// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import api from "../services/api.js"; // centralized Axios
import { motion, AnimatePresence } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // keep your shadcn/ui import style
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Home,
  Info,
  LayoutDashboard,
  Activity,
  Settings,
  Leaf,
  LogOut,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Menu items for logged-in user
  const userMenu = [
    { label: "Dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, path: "/dashboard" },
    { label: "Tracker", icon: <Activity className="mr-2 h-4 w-4" />, path: "/tracker" },
    { label: "Settings", icon: <Settings className="mr-2 h-4 w-4" />, path: "/settings" },
    { label: "Reduce Footprint", icon: <Leaf className="mr-2 h-4 w-4" />, path: "/reduce-footprint" },
    { label: "Logout", icon: <LogOut className="mr-2 h-4 w-4" />, action: handleLogout, danger: true },
  ];

  // Menu items for guest
  const guestMenu = [
    { label: "Login", icon: <LogIn className="mr-2 h-4 w-4" />, path: "/login" },
    { label: "About", icon: <Info className="mr-2 h-4 w-4" />, path: "/about" },
  ];

  // Framer Motion item animation (stagger via delays)
  const parentAnim = { initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.16, ease: "easeOut" } };

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Section - Home, About, (Login if guest) */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition">
            <Home className="mr-1 h-4 w-4" /> Home
          </Link>

          <Link to="/about" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition">
            <Info className="mr-1 h-4 w-4" /> About
          </Link>

          {!user && (
            <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition flex items-center">
              <LogIn className="mr-1 h-4 w-4" /> Login
            </Link>
          )}
        </div>

        {/* Center Section - CarboWise Brand Dropdown (always visible) */}
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent drop-shadow-md flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <span>CarboWise</span>
                <ChevronDown className="w-5 h-5 text-green-600" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-white/95 shadow-xl rounded-xl p-2">
              <AnimatePresence>
                <motion.div
                  key={user ? "user-menu" : "guest-menu"}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: { opacity: 0, y: -6 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -6 },
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {(user ? userMenu : guestMenu).map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.18 }}
                    >
                      {item.path ? (
                        <DropdownMenuItem asChild>
                          <Link to={item.path} className={`flex items-center w-full px-3 py-2 rounded-md transition ${item.danger ? "text-red-600 hover:bg-red-100" : "text-gray-700 hover:bg-green-100"}`}>
                            {item.icon}
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={item.action}
                          className={`flex items-center w-full px-3 py-2 rounded-md transition ${item.danger ? "text-red-600 hover:bg-red-100" : "text-gray-700 hover:bg-green-100"}`}
                        >
                          {item.icon}
                          {item.label}
                        </DropdownMenuItem>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Section - Bubble Style Greeting (only if logged in) */}
        <div className="flex items-center">
          {user && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-green-600 text-white rounded-full shadow-lg text-lg font-semibold flex items-center space-x-2"
            >
              <span className="animate-bounce">🌱</span>
              <span>Hello, {user.username || user.email}!</span>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}
















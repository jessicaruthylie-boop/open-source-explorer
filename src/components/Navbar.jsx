import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoriteContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Home,
  Compass,
  BarChart2,
  Heart,
  Info,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const { favorites } = useFavorites();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "HOME", icon: <Home size={16} /> },
    { path: "/explore", label: "EXPLORE", icon: <Compass size={16} /> },
    { path: "/insights", label: "INSIGHTS", icon: <BarChart2 size={16} /> },
    {
      path: "/favorites",
      label: "VAULT",
      icon: <Heart size={16} />,
      badge: favorites.length,
    },
    { path: "/about", label: "STORY", icon: <Info size={16} /> },
    { path: "/contact", label: "CONCIERGE", icon: <Mail size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-electric-cyan to-soft-violet rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Github className="text-white" size={22} />
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-electric-cyan via-white to-soft-violet bg-clip-text text-transparent italic">
            GITVISTA
          </span>
        </Link>

        {/* DESKTOP MENU (6 Halaman) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? "text-electric-cyan"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.icon}
                <span className="hidden xl:inline">{link.label}</span>

                {/* Badge untuk Vault */}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-electric-cyan text-dark-bg text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {link.badge}
                  </span>
                )}

                {active && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-electric-cyan/5 rounded-lg border-b-2 border-electric-cyan"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ACTIONS (Theme & Mobile Menu) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full glass-card border border-white/10 text-slate-400 hover:text-electric-cyan transition-all"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <div className="lg:hidden text-slate-500 text-[10px] font-mono">
            MENU
          </div>
        </div>
      </div>
    </nav>
  );
}

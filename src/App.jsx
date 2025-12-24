import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { FavoriteProvider } from "./context/FavoriteContext";

// Import Global Components
import Navbar from "./components/Navbar";

// Import Pages (Pastikan file ini sudah Anda buat di folder src/pages/)
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Insights from "./pages/Insights";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";

/**
 * AnimatedRoutes: Komponen internal untuk menangani logika animasi perpindahan halaman.
 * useLocation() memerlukan konteks <Router>, sehingga harus dipisah dari komponen App utama.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    // 1. ThemeProvider: Mengelola Mode Gelap/Terang
    <ThemeProvider>
      {/* 2. FavoriteProvider: Mengelola Data Local Storage & Favorit */}
      <FavoriteProvider>
        <Router>
          {/* Main Layout Container */}
          <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-500">
            {/* BACKGROUND AURORA BLOBS (Task 3: Modern UI) */}
            {/* Gumpalan cahaya dekoratif yang melayang di latar belakang */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-electric-cyan/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-soft-violet/20 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>

            {/* NAVBAR (Sticky di atas semua halaman) */}
            <Navbar />

            {/* KONTEN UTAMA (Task 1: SPA Routing) */}
            <main className="flex-grow container mx-auto px-4 md:px-8 py-10 relative z-10">
              <AnimatedRoutes />
            </main>

            {/* FOOTER PREMIUM */}
            <footer className="relative z-10 py-12 border-t border-slate-200 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-md">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  {/* Branding Footer */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-black tracking-tighter bg-gradient-to-r from-electric-cyan to-soft-violet bg-clip-text text-transparent italic mb-2">
                      GITVISTA
                    </h3>
                    <p className="text-[10px] font-mono tracking-[0.2em] opacity-50 uppercase">
                      Universal Developer Intelligence Hub
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      "React 18",
                      "Tailwind v4",
                      "Framer Motion",
                      "GitHub API",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[9px] font-bold opacity-60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Copyright */}
                  <div className="text-center md:text-right">
                    <p className="text-[10px] opacity-40 font-mono mb-1">
                      &copy; {new Date().getFullYear()} ALL SYSTEMS OPERATIONAL
                    </p>
                    <p className="text-[9px] text-electric-cyan font-bold tracking-widest">
                      V1.0.0-AURORA_EDITION
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </FavoriteProvider>
    </ThemeProvider>
  );
}

export default App;

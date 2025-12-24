import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoriteContext";
import {
  Search,
  MapPin,
  Users,
  Book,
  Star,
  GitBranch,
  Github,
  Heart,
  ExternalLink,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

// --- Custom Hook Debounce ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();
  const debouncedSearch = useDebounce(query, 800);

  // Daftar saran pencarian untuk user
  const suggested = ["vercel", "gaearon", "yyx990803", "torvalds"];

  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchData(debouncedSearch);
    } else {
      setUser(null);
      setRepos([]);
    }
  }, [debouncedSearch]);

  const fetchData = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const [uRes, rRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        ),
      ]);
      setUser(uRes.data);
      setRepos(rRes.data);
    } catch (err) {
      setError(
        err.response?.status === 404 ? "Explorer Not Found" : "Connection Lost"
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pb-20">
      {/* --- HERO SECTION (Muncul saat belum ada pencarian) --- */}
      <AnimatePresence>
        {!user && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center pt-10 md:pt-20 mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="inline-block mb-6 p-4 rounded-3xl bg-white/5 border border-white/10"
            >
              <Sparkles className="text-electric-cyan" size={40} />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
              DECODE THE <br />
              <span className="bg-gradient-to-r from-electric-cyan via-white to-soft-violet bg-clip-text text-transparent">
                OPEN SOURCE
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              Visualisasikan perjalanan teknis para pengembang kelas dunia
              melalui sistem ekstraksi data{" "}
              <span className="text-white font-mono uppercase text-sm tracking-widest">
                GitVista Intelligence
              </span>
              .
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SEARCH BOX SECTION --- */}
      <div className="relative max-w-3xl mx-auto mb-12">
        {/* Glow effect dinamis */}
        <div className="absolute -inset-4 bg-gradient-to-r from-electric-cyan/20 to-soft-violet/20 blur-3xl opacity-50"></div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan to-soft-violet rounded-2xl blur opacity-25 group-focus-within:opacity-75 transition duration-500"></div>
          <div className="relative flex items-center">
            <Search
              className="absolute left-6 text-slate-500 group-focus-within:text-electric-cyan transition-colors"
              size={24}
            />
            <input
              type="text"
              placeholder="Search GitHub Explorer (e.g. facebook)..."
              className="w-full pl-16 pr-6 py-6 rounded-2xl glass-card bg-black/40 border-white/10 focus:border-electric-cyan/50 outline-none text-xl transition-all shadow-2xl placeholder:text-slate-600"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            {loading && (
              <div className="absolute right-6">
                <div className="w-6 h-6 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Quick Chips */}
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-2 mr-2">
              <TrendingUp size={12} /> Popular:
            </span>
            {suggested.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-4 py-1.5 rounded-full glass-card border-white/5 text-[10px] font-mono text-slate-400 hover:text-electric-cyan hover:border-electric-cyan/30 transition-all"
              >
                @{s}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* --- ERROR STATE --- */}
      {error && !loading && (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center p-12 glass-card rounded-[3rem] border-red-500/20 max-w-md mx-auto"
        >
          <ShieldCheck
            size={48}
            className="mx-auto text-red-400 mb-4 opacity-50"
          />
          <h3 className="text-xl font-bold mb-2">ACCESS DENIED</h3>
          <p className="text-xs opacity-50 uppercase tracking-widest">
            {error}
          </p>
        </motion.div>
      )}

      {/* --- MAIN RESULTS (DIPERHALUS) --- */}
      <AnimatePresence mode="wait">
        {user && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-10"
          >
            {/* Sidebar Profil */}
            <aside className="lg:col-span-1">
              <div className="glass-card p-10 rounded-[3rem] border-white/10 text-center sticky top-32 shadow-2xl group">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-tr from-electric-cyan to-soft-violet rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <img
                    src={user.avatar_url}
                    className="relative w-40 h-40 rounded-[2.5rem] border-2 border-white/20 object-cover shadow-2xl"
                    alt="avatar"
                  />
                  <div className="absolute -bottom-3 -right-3 p-3 bg-dark-bg border border-white/10 rounded-2xl shadow-xl">
                    <Zap className="text-electric-cyan" size={16} />
                  </div>
                </div>

                <h2 className="text-3xl font-black italic dark:text-white mb-1 tracking-tighter">
                  {user.name || user.login}
                </h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  className="text-electric-cyan font-mono text-xs hover:underline inline-flex items-center gap-2 mb-6"
                >
                  @{user.login} <ExternalLink size={12} />
                </a>

                <p className="text-sm opacity-60 italic mb-10 leading-relaxed px-2">
                  "
                  {user.bio || "No mission protocol defined for this explorer."}
                  "
                </p>

                <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5">
                  <div className="space-y-1">
                    <p className="text-2xl font-black tracking-tighter text-white">
                      {user.followers}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest opacity-40 font-mono">
                      Followers
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-black tracking-tighter text-white">
                      {user.public_repos}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest opacity-40 font-mono">
                      Repositories
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(user)}
                  className={`w-full py-5 mt-10 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                    isFavorite(user.id)
                      ? "bg-red-500/10 text-red-400 border border-red-500/30"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={isFavorite(user.id) ? "currentColor" : "none"}
                    className={isFavorite(user.id) ? "animate-pulse" : ""}
                  />
                  {isFavorite(user.id)
                    ? "SECURED IN VAULT"
                    : "AUTHORIZE TO VAULT"}
                </button>
              </div>
            </aside>

            {/* Grid Repositori */}
            <section className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4 px-2">
                <div className="h-[1px] flex-grow bg-white/5"></div>
                <h3 className="text-[10px] font-mono tracking-[0.4em] opacity-40 uppercase">
                  Operation Logs
                </h3>
                <div className="h-[1px] flex-grow bg-white/5"></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {repos.map((repo, i) => (
                  <motion.a
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{
                      y: -8,
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between h-56 transition-all group"
                  >
                    <div>
                      <h4 className="font-bold text-lg text-slate-200 group-hover:text-electric-cyan transition-colors mb-3 truncate">
                        {repo.name}
                      </h4>
                      <p className="text-xs opacity-50 line-clamp-3 leading-relaxed font-light">
                        {repo.description ||
                          "The mission objective for this repository remains classified."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex gap-4 text-[10px] font-mono opacity-50">
                        <span className="flex items-center gap-1.5">
                          <Star size={14} className="text-yellow-500" />{" "}
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <GitBranch size={14} className="text-soft-violet" />{" "}
                          {repo.forks_count}
                        </span>
                      </div>
                      <span className="text-[8px] font-black px-3 py-1.5 rounded-lg bg-electric-cyan/5 text-electric-cyan border border-electric-cyan/20 uppercase">
                        {repo.language || "Data"}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- INITIAL EMPTY STATE (The Octocat) --- */}
      {!user && !loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="text-center mt-10"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Github size={150} className="mx-auto mb-10 text-slate-600" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-[0.6em] uppercase text-slate-500">
              GITVISTA HUB
            </h2>
            <p className="font-mono text-[10px] tracking-[0.4em] text-slate-600">
              AWAITING INPUT COMMAND FOR DATA EXTRACTION
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

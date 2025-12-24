import { useFavorites } from "../context/FavoriteContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  HeartOff,
  Github,
  ShieldCheck,
  Users,
  Book,
  ExternalLink,
  Search,
  Lock,
  Unlock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-soft-violet/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- HEADER SECTION --- */}
      <header className="mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-electric-cyan/10 rounded-lg text-electric-cyan">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase">
                Secure Data Storage
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter">
              PERSONAL{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-soft-violet bg-clip-text text-transparent uppercase">
                Vault
              </span>
            </h1>
          </div>

          {/* Quick Stats Bar */}
          <div className="glass-card px-8 py-4 rounded-2xl border-white/5 flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-black text-white">
                {favorites.length}
              </p>
              <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest">
                Profiles Secured
              </p>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="text-center">
              <p className="text-sm font-bold text-electric-cyan flex items-center gap-2">
                <Unlock size={14} /> ACTIVE
              </p>
              <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest">
                Vault Status
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <AnimatePresence mode="wait">
        {favorites.length === 0 ? (
          /* EMPTY STATE (Premium Version) */
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div className="glass-card py-24 rounded-[4rem] border-white/5 text-center relative overflow-hidden group">
              {/* Subtle background animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full border-dashed"
              ></motion.div>

              <div className="relative z-10">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-electric-cyan/20 blur-3xl rounded-full"></div>
                  <div className="relative p-8 bg-white/5 border border-white/10 rounded-full text-slate-600">
                    <HeartOff size={60} strokeWidth={1} />
                  </div>
                </div>

                <h2 className="text-3xl font-black italic mb-4 tracking-tight">
                  VAULT IS EMPTY
                </h2>
                <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed italic px-6">
                  Belum ada profil yang diamankan. Jelajahi ekosistem GitHub dan
                  simpan pengembang favorit Anda di sini.
                </p>

                <Link
                  to="/"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-electric-cyan to-soft-violet rounded-2xl font-black text-[10px] tracking-[0.3em] text-white shadow-2xl hover:shadow-electric-cyan/20 transition-all"
                >
                  <Search size={16} /> INITIATE DISCOVERY
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* FAVORITES GRID */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((user, i) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-8 rounded-[2.5rem] border-white/5 group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Lock size={40} />
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-electric-cyan/20 blur-lg rounded-2xl"></div>
                    <img
                      src={user.avatar_url}
                      className="relative w-20 h-20 rounded-2xl border border-white/10 object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tighter truncate max-w-[150px]">
                      {user.name || user.login}
                    </h3>
                    <p className="text-electric-cyan font-mono text-[10px] tracking-widest mt-1">
                      @{user.login}
                    </p>
                    <div className="flex items-center gap-3 mt-3 opacity-40">
                      <span className="flex items-center gap-1 text-[10px]">
                        <Users size={12} /> {user.followers}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Book size={12} /> {user.public_repos}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Snippet */}
                <p className="text-[11px] opacity-50 italic mb-8 h-8 line-clamp-2 leading-relaxed">
                  "{user.bio || "No mission brief found."}"
                </p>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-white/5">
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow py-3 bg-white/5 rounded-xl text-[9px] font-black tracking-widest text-center hover:bg-electric-cyan hover:text-dark-bg transition-all flex items-center justify-center gap-2"
                  >
                    VIEW_LOGS <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => toggleFavorite(user)}
                    className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                    title="Remove from Vault"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER BANNER --- */}
      {favorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center opacity-30 font-mono text-[9px] tracking-[0.5em] uppercase"
        >
          All Data is Encrypted & Stored Locally in Your Browser Persistence
        </motion.div>
      )}
    </div>
  );
}

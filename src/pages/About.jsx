import { motion } from "framer-motion";
import {
  Cpu,
  Layout,
  Globe,
  Zap,
  Sparkles,
  Code2,
  Palette,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function About() {
  const techs = [
    {
      icon: <Cpu size={24} />,
      title: "React 18 Engine",
      desc: "Arsitektur berbasis komponen untuk performa Single Page Application yang cair.",
      color: "text-blue-400",
    },
    {
      icon: <Layout size={24} />,
      title: "Tailwind CSS v4",
      desc: "Sistem desain Artisan dengan utilitas CSS modern untuk estetika presisi.",
      color: "text-cyan-400",
    },
    {
      icon: <Globe size={24} />,
      title: "REST Cloud Sync",
      desc: "Integrasi real-time dengan GitHub API untuk ekstraksi data pengembang global.",
      color: "text-emerald-400",
    },
    {
      icon: <Zap size={24} />,
      title: "Framer Motion",
      desc: "Animasi interface tingkat lanjut yang memberikan pengalaman pengguna premium.",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-slate-400 uppercase">
            Artisan Philosophy
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
          THE{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent uppercase font-black">
            Artisan Story
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-slate-500 text-lg font-light leading-relaxed italic">
          "GitVista bukan sekadar alat pencarian data. Ini adalah kanvas digital
          di mana kode bertemu dengan estetika."
        </p>
      </motion.section>

      {/* --- TECH GRID SECTION --- */}
      <section className="mb-24 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 group transition-all hover:border-cyan-400/30"
            >
              <div
                className={`${t.color} mb-6 p-4 bg-white/5 rounded-2xl inline-block`}
              >
                {t.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{t.title}</h3>
              <p className="text-sm opacity-50 leading-relaxed font-light">
                {t.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DESIGN PHILOSOPHY --- */}
      <section className="grid lg:grid-cols-2 gap-12 items-center mb-24 relative z-10">
        <div className="glass-card p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Palette size={200} />
          </div>
          <h2 className="text-3xl font-black italic mb-6 tracking-tight">
            MIDNIGHT <br />
            <span className="text-cyan-400 uppercase">Aurora</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8 font-light italic">
            Visual GitVista terinspirasi dari ketenangan langit tengah malam
            yang dihiasi cahaya Aurora. Mata Anda akan tetap nyaman meskipun
            menjelajah dalam waktu lama.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 shadow-xl"></div>
            <div className="w-10 h-10 rounded-xl bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
            <div className="w-10 h-10 rounded-xl bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
              <Code2 className="text-cyan-400" /> Clean Architecture
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Kode ditulis dengan standar industri, memastikan skalabilitas dan
              kemudahan pemeliharaan.
            </p>
          </div>
          <div className="h-[1px] w-full bg-white/5"></div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
              <ShieldCheck className="text-purple-400" /> Data Integrity
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Keamanan data lokal pengguna (Vault) dijamin melalui enkripsi
              sederhana dalam persistence browser.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="text-center py-20 glass-card rounded-[4rem] border-white/5 relative overflow-hidden">
        <h2 className="text-2xl font-black italic tracking-widest mb-6 uppercase">
          Ready to Explore?
        </h2>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-black tracking-[0.3em] text-cyan-400 hover:text-white transition-colors group"
        >
          INITIATE SYSTEM{" "}
          <ChevronRight
            size={16}
            className="group-hover:translate-x-2 transition-transform"
          />
        </a>
      </section>
    </div>
  );
}

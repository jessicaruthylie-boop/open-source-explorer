import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Zap,
  Star,
  Globe,
  Award,
  Rocket,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("Organizations");

  const categories = [
    { id: "Organizations", icon: <Globe size={14} /> },
    { id: "Frameworks", icon: <Cpu size={14} /> },
    { id: "Rising Stars", icon: <Rocket size={14} /> },
  ];

  const content = {
    Organizations: [
      {
        name: "Vercel",
        desc: "The frontend cloud. Build, scale, and secure a faster web.",
        stars: "12.4k",
        tags: ["Cloud", "Next.js"],
        color: "from-blue-500",
      },
      {
        name: "TailwindLabs",
        desc: "Makers of Tailwind CSS, Headless UI, and Heroicons.",
        stars: "82.1k",
        tags: ["Design", "CSS"],
        color: "from-cyan-400",
      },
      {
        name: "Framer",
        desc: "The site builder for designers and creative pros.",
        stars: "6.2k",
        tags: ["UI/UX", "Tools"],
        color: "from-purple-500",
      },
    ],
    Frameworks: [
      {
        name: "React",
        desc: "The library for web and native user interfaces.",
        stars: "215k",
        tags: ["UI", "JS"],
        color: "from-blue-400",
      },
      {
        name: "Vue.js",
        desc: "The progressive JavaScript framework.",
        stars: "205k",
        tags: ["Frontend", "Framework"],
        color: "from-green-400",
      },
      {
        name: "Rust",
        desc: "Empowering everyone to build reliable and efficient software.",
        stars: "90k",
        tags: ["Systems", "Fast"],
        color: "from-orange-500",
      },
    ],
    "Rising Stars": [
      {
        name: "Bun",
        desc: "Incredibly fast JavaScript runtime, bundler, and test runner.",
        stars: "65k",
        tags: ["Runtime", "Fast"],
        color: "from-pink-400",
      },
      {
        name: "Supabase",
        desc: "The open source Firebase alternative.",
        stars: "58k",
        tags: ["Database", "Backend"],
        color: "from-emerald-400",
      },
      {
        name: "Shadcn/UI",
        desc: "Beautifully designed components built with Radix UI.",
        stars: "42k",
        tags: ["UI", "Tailwind"],
        color: "from-slate-400",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <Zap size={14} className="text-electric-cyan animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400">
            GLOBAL DISCOVERY LIVE
          </span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter mb-4 italic">
          EXPLORE <br className="hidden lg:block" />
          <span className="bg-gradient-to-r from-electric-cyan via-white to-soft-violet bg-clip-text text-transparent uppercase">
            The Trenches
          </span>
        </h1>
        <p className="text-slate-500 max-w-xl font-light text-lg">
          Menelusuri ekosistem open source paling berpengaruh. <br />
          Data real-time dari pusat inovasi digital global.
        </p>
      </motion.div>

      {/* --- CATEGORY SELECTOR --- */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-mono text-xs tracking-widest transition-all duration-300 border ${
              activeTab === cat.id
                ? "bg-electric-cyan/10 border-electric-cyan/50 text-electric-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"
            }`}
          >
            {cat.icon} {cat.id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- GRID CONTENT --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {content[activeTab].map((item, i) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} to-dark-bg p-[1px]`}
                >
                  <div className="w-full h-full bg-dark-bg rounded-2xl flex items-center justify-center">
                    <Award className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-yellow-500 text-xs font-bold">
                    <Star size={14} fill="currentColor" /> {item.stars}
                  </div>
                  <span className="text-[9px] opacity-30 font-mono mt-1 italic">
                    STARS_COUNT
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="mb-8">
                <h3 className="text-2xl font-black italic mb-3 flex items-center gap-2 group-hover:text-electric-cyan transition-colors">
                  {item.name}{" "}
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-all text-slate-500"
                  />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed h-12 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-mono tracking-widest text-slate-500"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
                <div className="ml-auto flex items-center gap-1.5 text-[10px] text-electric-cyan font-bold">
                  <ShieldCheck size={12} /> VERIFIED
                </div>
              </div>

              {/* Interactive Background Glow */}
              <div
                className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* --- FOOTER BANNER --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-10 glass-card rounded-[3rem] border-white/5 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic mb-4">
            MENCARI DATA LEBIH SPESIFIK?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto italic">
            Gunakan mesin pencari utama kami di halaman Home untuk menganalisis
            data repositori secara mendalam.
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-1 bg-electric-cyan rounded-full"></div>
            <div className="w-4 h-1 bg-soft-violet rounded-full"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/5 via-transparent to-soft-violet/5"></div>
      </motion.div>
    </div>
  );
}

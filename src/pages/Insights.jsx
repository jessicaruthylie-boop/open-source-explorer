import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  Activity,
  Globe,
  Zap,
  Code,
  Cpu,
  Users,
  BarChart3,
} from "lucide-react";

// --- DATA DUMMY UNTUK VISUALISASI ---
const languageData = [
  { name: "JavaScript", value: 45, color: "#F7DF1E" },
  { name: "Python", value: 25, color: "#3776AB" },
  { name: "TypeScript", value: 15, color: "#3178C6" },
  { name: "Rust", value: 10, color: "#DEA584" },
  { name: "Go", value: 5, color: "#00ADD8" },
];

const activityData = [
  { month: "Jan", commits: 400 },
  { month: "Feb", commits: 600 },
  { month: "Mar", commits: 500 },
  { month: "Apr", commits: 900 },
  { month: "May", commits: 700 },
  { month: "Jun", commits: 1100 },
];

export default function Insights() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      {/* --- HEADER SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-electric-cyan"></div>
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            System Analytics
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4">
          THE{" "}
          <span className="bg-gradient-to-r from-electric-cyan via-white to-soft-violet bg-clip-text text-transparent uppercase">
            Observatory
          </span>
        </h1>
        <p className="text-slate-500 max-w-2xl font-light leading-relaxed">
          Menganalisis pergerakan ekosistem open-source secara global.
          Visualisasi distribusi teknologi dan intensitas kontribusi pengembang.
        </p>
      </motion.div>

      {/* --- TOP STATS GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Active Repos",
            val: "240M+",
            icon: <BarChart3 size={14} />,
            col: "text-electric-cyan",
          },
          {
            label: "Global Devs",
            val: "100M+",
            icon: <Users size={14} />,
            col: "text-soft-violet",
          },
          {
            label: "Daily Commits",
            val: "12M+",
            icon: <Activity size={14} />,
            col: "text-emerald-400",
          },
          {
            label: "Open Issues",
            val: "45M+",
            icon: <Zap size={14} />,
            col: "text-amber-400",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-all"
          >
            <div
              className={`${stat.col} opacity-50 mb-2 group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-black tracking-tighter">
              {stat.val}
            </div>
            <div className="text-[9px] font-mono opacity-40 uppercase tracking-widest mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MAIN CHARTS GRID --- */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* LEFT: LANGUAGE DISTRIBUTION */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-[3rem] border-white/5 relative overflow-hidden group"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-mono tracking-widest opacity-60 flex items-center gap-2 italic">
              <Code size={16} className="text-electric-cyan" /> GLOBAL LANGUAGE
              DISTRIBUTION
            </h3>
            <div className="p-2 rounded-lg bg-white/5 text-[10px] font-mono text-electric-cyan">
              LIVE_FEED
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#030712",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "15px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {languageData.slice(0, 3).map((l, i) => (
              <div key={i} className="text-center">
                <div className="text-xs font-bold">{l.value}%</div>
                <div className="text-[9px] opacity-40 uppercase font-mono">
                  {l.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: CONTRIBUTION TRENDS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-[3rem] border-white/5 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-mono tracking-widest opacity-60 flex items-center gap-2 italic">
              <TrendingUp size={16} className="text-soft-violet" /> CONTRIBUTION
              TRENDS
            </h3>
            <Globe size={16} className="opacity-20 animate-spin-slow" />
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#030712",
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="commits"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCommits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-8 text-[11px] opacity-40 italic leading-relaxed text-center">
            "Analisis data menunjukkan lonjakan aktivitas sebesar 15% pada
            kuartal terakhir tahun ini."
          </p>
        </motion.div>
      </div>

      {/* --- BOTTOM GRID: DETAILED RANKING --- */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border-white/5">
          <h3 className="text-[10px] font-mono tracking-[0.3em] opacity-40 uppercase mb-8">
            System Status Matrix
          </h3>
          <div className="space-y-6">
            {[
              { name: "Core Processing", status: "Optimal", val: 98 },
              { name: "Data Extraction", status: "Normal", val: 85 },
              { name: "Satellite Sync", status: "Active", val: 92 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-mono mb-2 uppercase tracking-widest">
                  <span>{item.name}</span>
                  <span className="text-electric-cyan">
                    {item.status} // {item.val}%
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.val}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-gradient-to-r from-electric-cyan to-soft-violet"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-soft-violet/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Cpu
            size={40}
            className="text-soft-violet mb-6 opacity-30 animate-pulse"
          />
          <h4 className="text-xl font-black italic mb-2 tracking-tighter uppercase">
            Cloud Refinery
          </h4>
          <p className="text-[10px] opacity-40 font-mono tracking-wide leading-relaxed">
            GITVISTA IS PROCESSING 100M+ DATA POINTS ACROSS THE GITHUB ECOSYSTEM
            IN REAL-TIME.
          </p>
        </div>
      </div>
    </div>
  );
}

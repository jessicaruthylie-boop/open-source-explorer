import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success

  // Validasi Sederhana (Task 3: Real-time Validation)
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNameValid = formData.name.length > 2;
  const isMessageValid = formData.message.length > 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulasi pengiriman data
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-electric-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- HERO HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <Sparkles size={14} className="text-electric-cyan" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-slate-400 uppercase">
            Premium Support
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4">
          THE{" "}
          <span className="bg-gradient-to-r from-electric-cyan via-white to-soft-violet bg-clip-text text-transparent uppercase">
            Concierge
          </span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto font-light leading-relaxed italic">
          Apakah Anda memerlukan bantuan teknis atau ingin menjalin kolaborasi
          strategis? Layanan Concierge kami siap melayani navigasi Anda.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* --- LEFT SIDE: INFO & SOCIAL --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-8"
        >
          <div className="glass-card p-8 rounded-[2.5rem] border-white/5 space-y-8">
            <h3 className="text-xs font-mono tracking-[0.3em] opacity-40 uppercase">
              Contact Information
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail />,
                  text: "concierge@gitvista.io",
                  sub: "Official Inquiry",
                },
                {
                  icon: <MapPin />,
                  text: "Digital Nomad Hub",
                  sub: "Cloud Intelligence",
                },
                {
                  icon: <Phone />,
                  text: "+62 800 1234 567",
                  sub: "Voice Protocol",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl text-electric-cyan group-hover:bg-electric-cyan group-hover:text-dark-bg transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.text}</p>
                    <p className="text-[10px] opacity-40 uppercase font-mono">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] font-mono opacity-40 uppercase mb-6 tracking-widest text-center">
                Social Connection
              </p>
              <div className="flex justify-center gap-4">
                {[
                  { icon: <Github />, color: "hover:text-white" },
                  { icon: <Linkedin />, color: "hover:text-blue-400" },
                  { icon: <Twitter />, color: "hover:text-cyan-400" },
                ].map((social, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -5 }}
                    className={`p-4 glass-card rounded-2xl transition-colors ${social.color}`}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: INTERACTIVE FORM --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8"
        >
          <div className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
            {/* Success Overlay */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-dark-bg/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-emerald-400 mb-6"
                  >
                    <CheckCircle2 size={80} />
                  </motion.div>
                  <h2 className="text-3xl font-black italic mb-4">
                    MESSAGE TRANSMITTED
                  </h2>
                  <p className="text-slate-400 mb-8 max-w-xs font-light">
                    Protokol komunikasi berhasil dikirim. Kami akan segera
                    menghubungi Anda kembali.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono tracking-widest uppercase hover:bg-white/10 transition"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono opacity-40 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      className={`w-full bg-white/5 border rounded-2xl p-5 outline-none transition-all ${
                        formData.name
                          ? isNameValid
                            ? "border-electric-cyan"
                            : "border-rose-400"
                          : "border-white/10 focus:border-white/30"
                      }`}
                      placeholder="Enter explorer name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      {formData.name &&
                        (isNameValid ? (
                          <CheckCircle2
                            className="text-electric-cyan"
                            size={18}
                          />
                        ) : (
                          <AlertCircle className="text-rose-400" size={18} />
                        ))}
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono opacity-40 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      className={`w-full bg-white/5 border rounded-2xl p-5 outline-none transition-all ${
                        formData.email
                          ? isEmailValid(formData.email)
                            ? "border-electric-cyan"
                            : "border-rose-400"
                          : "border-white/10 focus:border-white/30"
                      }`}
                      placeholder="explorer@galaxy.io"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      {formData.email &&
                        (isEmailValid(formData.email) ? (
                          <CheckCircle2
                            className="text-electric-cyan"
                            size={18}
                          />
                        ) : (
                          <AlertCircle className="text-rose-400" size={18} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono opacity-40 uppercase tracking-widest ml-1">
                  Message Body
                </label>
                <div className="relative">
                  <textarea
                    required
                    className={`w-full bg-white/5 border rounded-2xl p-5 outline-none h-40 transition-all ${
                      formData.message
                        ? isMessageValid
                          ? "border-electric-cyan"
                          : "border-rose-400"
                        : "border-white/10 focus:border-white/30"
                    }`}
                    placeholder="Tuliskan pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                  <div className="absolute right-5 top-5">
                    <MessageSquare className="text-slate-700" size={20} />
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <p className="text-[9px] font-mono opacity-30 uppercase italic">
                    Min. 10 characters
                  </p>
                  <p
                    className={`text-[9px] font-mono font-bold ${
                      isMessageValid ? "text-electric-cyan" : "text-rose-400"
                    }`}
                  >
                    {formData.message.length} CHARS
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={
                  status === "sending" ||
                  !isNameValid ||
                  !isEmailValid(formData.email) ||
                  !isMessageValid
                }
                className="w-full py-5 bg-gradient-to-r from-electric-cyan to-soft-violet rounded-2xl font-black text-[10px] tracking-[0.4em] text-white shadow-xl hover:shadow-electric-cyan/20 disabled:opacity-20 disabled:grayscale transition-all flex items-center justify-center gap-3 group"
              >
                {status === "sending" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                    TRANSMIT MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

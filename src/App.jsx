import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { AppContext } from "./context/AppContext";
import {
  Search,
  Star,
  GitFork,
  Github,
  Info,
  Mail,
  ExternalLink,
  LayoutGrid,
  Code2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// --- COMPONENTS: NAVBAR ---
const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="border-b border-gray-800 p-4 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-white group"
        >
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Github size={24} className="text-white" />
          </div>
          <span className="tracking-tight">
            OS<span className="text-blue-500">Explorer</span>
          </span>
        </Link>

        <div className="flex gap-1 sm:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

// --- PAGE: HOME (Pusat Task 2 & 3) ---
const Home = () => {
  // Mengambil state global dari Context (Agar data tidak hilang saat pindah page)
  const { savedQuery, setSavedQuery, savedRepos, setSavedRepos } =
    useContext(AppContext);

  const [query, setQuery] = useState(savedQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Task 2: Debounce (Hanya panggil API 800ms setelah user selesai mengetik)
  const [debouncedQuery] = useDebounce(query, 800);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!debouncedQuery) {
        setSavedRepos([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.github.com/search/repositories?q=${debouncedQuery}&sort=stars&order=desc`
        );
        setSavedRepos(res.data.items);
        setSavedQuery(debouncedQuery); // Simpan ke context
      } catch (err) {
        setError("Gagal mengambil data dari GitHub. Coba beberapa saat lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [debouncedQuery, setSavedRepos, setSavedQuery]);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Header Section */}
      <div className="text-center my-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white">
          Find Your Next <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            Open Source Project.
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Cari repository GitHub populer secara dinamis menggunakan API resmi.
          Dibangun untuk performa dan kenyamanan visual.
        </p>

        {/* Search Input (Task 3: Custom Styling) */}
        <div className="relative max-w-2xl mx-auto group">
          <input
            type="text"
            value={query}
            placeholder="Ketik bahasa atau framework (ex: react, tailwind, rust)..."
            className="w-full bg-[#161b22] border-2 border-gray-800 p-5 pl-14 rounded-2xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-2xl"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-5 top-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
          {loading && (
            <div className="absolute right-5 top-5">
              <Loader2 className="animate-spin text-blue-500" />
            </div>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 justify-center bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400 max-w-md mx-auto mb-10">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Result Grid (Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {savedRepos.map((repo, index) => (
          <div
            key={repo.id}
            className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl hover:bg-[#1c2128] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                  <Code2 size={20} className="text-blue-400" />
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-white p-1"
                  title="Open in GitHub"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              <h2 className="text-white font-bold text-xl truncate mb-2 group-hover:text-blue-400 transition-colors">
                {repo.name}
              </h2>
              <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                {repo.description ||
                  "No description provided for this repository."}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-1.5 text-yellow-500 font-semibold text-xs">
                <Star size={14} fill="currentColor" />
                {repo.stargazers_count >= 1000
                  ? `${(repo.stargazers_count / 1000).toFixed(1)}k`
                  : repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 font-semibold text-xs">
                <GitFork size={14} />
                {repo.forks_count}
              </div>
              <div className="ml-auto text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                {repo.language || "Misc"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && savedRepos.length === 0 && debouncedQuery && (
        <div className="text-center py-20 bg-gray-900/50 rounded-3xl border border-dashed border-gray-800">
          <LayoutGrid className="mx-auto text-gray-700 mb-4" size={48} />
          <p className="text-gray-500 text-lg">
            Tidak ada hasil untuk "
            <span className="text-white font-bold">{debouncedQuery}</span>"
          </p>
        </div>
      )}
    </div>
  );
};

// --- PAGE: ABOUT ---
const About = () => (
  <div className="container mx-auto p-10 flex flex-col items-center justify-center min-h-[80vh]">
    <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-2xl">
      <Info className="text-blue-500" size={40} />
    </div>
    <h1 className="text-4xl font-black text-white mb-6 tracking-tight">
      Level 2: Intermediate Task
    </h1>
    <div className="max-w-2xl bg-[#161b22] border border-gray-800 p-8 rounded-3xl shadow-2xl">
      <p className="text-gray-400 text-lg leading-relaxed mb-6">
        Projek{" "}
        <span className="text-white font-bold">Open Source Explorer</span> ini
        dirancang untuk mendemonstrasikan kemampuan penggunaan modern web stack.
        Fokus utama meliputi:
      </p>
      <ul className="space-y-4 text-gray-300">
        <li className="flex gap-3 items-center">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <span>
            <b className="text-white">SPA Routing:</b> Navigasi antar halaman
            tanpa reload via React Router.
          </span>
        </li>
        <li className="flex gap-3 items-center">
          <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
          <span>
            <b className="text-white">API Integration:</b> Fetching data
            asinkron dari GitHub REST API.
          </span>
        </li>
        <li className="flex gap-3 items-center">
          <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
          <span>
            <b className="text-white">State Management:</b> Data persistensi
            menggunakan React Context API.
          </span>
        </li>
        <li className="flex gap-3 items-center">
          <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
          <span>
            <b className="text-white">Optimization:</b> Implementasi Debounce
            untuk efisiensi limit API.
          </span>
        </li>
      </ul>
    </div>
  </div>
);

// --- PAGE: CONTACT ---
const Contact = () => (
  <div className="container mx-auto p-10 flex flex-col items-center justify-center min-h-[80vh]">
    <div className="w-20 h-20 bg-emerald-600/20 rounded-3xl flex items-center justify-center mb-8 -rotate-3 shadow-2xl">
      <Mail className="text-emerald-500" size={40} />
    </div>
    <h1 className="text-4xl font-black text-white mb-4">Let's Connect</h1>
    <p className="text-gray-400 text-center max-w-md mb-8 text-lg">
      Punya pertanyaan mengenai implementasi projek ini atau ingin berdiskusi
      lebih lanjut?
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href="mailto:contact@yourname.com"
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20 flex items-center gap-2"
      >
        <Mail size={18} /> Send an Email
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="bg-[#161b22] border border-gray-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
      >
        <Github size={18} /> Follow GitHub
      </a>
    </div>
  </div>
);

// --- MAIN APPLICATION ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0d1117] text-gray-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
        <Navbar />

        <main className="animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="border-t border-gray-800 py-12 mt-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-gray-400">
              <Github size={20} /> OS Explorer
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Build with React & Tailwind •
              Intermediate Project
            </p>
            <div className="flex gap-6 text-gray-500 text-sm underline decoration-gray-700 underline-offset-4">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

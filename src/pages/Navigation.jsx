import { PieChart, Shield, Users, Zap } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Структура", icon: <Shield size={18} /> },
    { path: "/employees", label: "Працівники", icon: <Users size={18} /> },
    { path: "/analytics", label: "Аналітика", icon: <PieChart size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="bg-[#0054a6] p-2 rounded-lg text-white">
            <Zap size={22} fill="currentColor" />
          </div>
          <div className="text-left text-slate-800">
            <h1 className="text-lg font-black uppercase leading-none">
              EnergyCorp
            </h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              HR & Operations
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-[#0054a6]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            API Connected
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

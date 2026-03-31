// Використовуємо BrowserRouter для локальної розробки (VS Code)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StructurePage from "./pages/StructurePage";
import EmployeesPage from "./pages/EmployeesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Navigation from "./pages/Navigation";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-[#0054a6]">
        <Navigation />

        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<StructurePage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            {/* Повернення на головну, якщо маршрут не знайдено */}
            <Route path="*" element={<StructurePage />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-slate-100 mt-20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">
            © 2024 EnergyCorp Systems. Розробка для VS Code.
          </p>
        </footer>
      </div>
    </Router>
  );
}

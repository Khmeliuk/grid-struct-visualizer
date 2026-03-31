const EmployeesPage = () => (
  <div className="p-10 animate-in fade-in duration-500 text-left">
    <h2 className="text-3xl font-black text-slate-800 uppercase italic mb-10">
      Реєстр персоналу
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm font-bold uppercase text-xs text-slate-400 italic">
        Список працівників завантажується з бекенду...
      </div>
    </div>
  </div>
);

export default EmployeesPage;

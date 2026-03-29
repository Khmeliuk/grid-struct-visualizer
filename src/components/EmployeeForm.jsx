import { useState } from "react";
import { UserPlus, Phone, Car, Briefcase } from "lucide-react";

// --- COMPONENT: EmployeeForm (Вбудований для уникнення помилок імпорту) ---
const EmployeeForm = ({ onCreate, initialData }) => {
  const [employee, setEmployee] = useState({
    firstName: initialData?.name?.split(" ")[0] || "",
    lastName: initialData?.name?.split(" ")[1] || "",
    position: initialData?.position || "",
    phone: initialData?.phone || "",
    hasCompanyCar: initialData?.hasCar || false,
    carModel: initialData?.carInfo?.split(" (")[0] || "",
    carNumber: initialData?.carInfo?.split("(")[1]?.replace(")", "") || "",
    notes: initialData?.notes || [],
  });

  const [currentNote, setCurrentNote] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addNote = () => {
    if (currentNote.trim()) {
      setEmployee((prev) => ({
        ...prev,
        notes: [...prev.notes, currentNote.trim()],
      }));
      setCurrentNote("");
    }
  };

  const removeNote = (index) => {
    setEmployee((prev) => ({
      ...prev,
      notes: prev.notes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreate) onCreate(employee);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border-t-4 border-[#0054a6] rounded-xl shadow-lg overflow-hidden text-left">
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-[#0054a6] p-2 rounded-lg text-white">
          <UserPlus size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Реєстрація співробітника
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            АТ "Хмельницькобленерго"
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6 max-h-[70vh] overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-[#0054a6] uppercase tracking-wider block">
              Ім'я
            </label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-[#0054a6] uppercase tracking-wider block">
              Прізвище
            </label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-[#0054a6] uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={14} /> Посада
            </label>
            <input
              type="text"
              name="position"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.position}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-[#0054a6] uppercase tracking-wider flex items-center gap-2">
              <Phone size={14} /> Телефон
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+380..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none transition-all"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Секція нотаток */}
        <div className="space-y-3">
          <label className="text-xs font-black text-[#0054a6] uppercase tracking-wider flex items-center gap-2">
            <FileText size={14} /> Нотатки про працівника
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#0054a6]"
              placeholder="Додати примітку (напр. стаж, категорія...)"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addNote())
              }
            />
            <button
              type="button"
              onClick={addNote}
              className="bg-slate-100 hover:bg-slate-200 p-3 rounded-lg text-[#0054a6] transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {employee.notes.map((note, idx) => (
              <div
                key={idx}
                className="bg-blue-50 text-[#0054a6] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2 border border-blue-100 uppercase tracking-tight"
              >
                {note}
                <button type="button" onClick={() => removeNote(idx)}>
                  <X size={12} className="text-blue-300 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="hasCompanyCar"
                className="sr-only"
                checked={employee.hasCompanyCar}
                onChange={handleChange}
              />
              <div
                className={`w-12 h-6 rounded-full transition-colors ${employee.hasCompanyCar ? "bg-[#0054a6]" : "bg-slate-300"}`}
              ></div>
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${employee.hasCompanyCar ? "translate-x-6" : ""}`}
              ></div>
            </div>
            <span className="text-sm font-bold text-slate-700 uppercase flex items-center gap-2">
              <Car
                size={18}
                className={
                  employee.hasCompanyCar ? "text-[#0054a6]" : "text-slate-400"
                }
              />
              Службовий автомобіль
            </span>
          </label>
          {employee.hasCompanyCar && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
              <input
                type="text"
                name="carModel"
                placeholder="Марка"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#0054a6]"
                value={employee.carModel}
                onChange={handleChange}
              />
              <input
                type="text"
                name="carNumber"
                placeholder="Держ. номер"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#0054a6]"
                value={employee.carNumber}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#0054a6] hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-sm"
        >
          Зберегти дані працівника
        </button>
      </form>
    </div>
  );
};
export default EmployeeForm;

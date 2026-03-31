import { useState } from "react";
import {
  X,
  Plus,
  UserPlus,
  Phone,
  Car,
  Briefcase,
  FileText,
} from "lucide-react";

const EmployeeForm = ({ onSave, initialData, onCancel }) => {
  const [employee, setEmployee] = useState({
    id: initialData?.id || `emp-${Date.now()}`,
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
    onSave({
      ...employee,
      name: `${employee.firstName} ${employee.lastName}`,
      hasCar: employee.hasCompanyCar,
      carInfo: employee.hasCompanyCar
        ? `${employee.carModel} (${employee.carNumber})`
        : null,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.firstName)}+${encodeURIComponent(employee.lastName)}&background=${initialData ? "0054a6" : "64748b"}&color=fff`,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-left border-t-4 border-[#0054a6]">
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#0054a6] p-2 rounded-lg text-white">
            <UserPlus size={20} />
          </div>
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            Картка працівника
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-red-500"
        >
          <X size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-5 max-h-[75vh] overflow-y-auto"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-wider">
              Ім'я
            </label>
            <input
              name="firstName"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none"
              value={employee.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-wider">
              Прізвище
            </label>
            <input
              name="lastName"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-wider flex items-center gap-1">
              <Briefcase size={12} /> Посада
            </label>
            <input
              name="position"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none"
              value={employee.position}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-wider flex items-center gap-1">
              <Phone size={12} /> Телефон
            </label>
            <input
              name="phone"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#ffed00] outline-none"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#0054a6] uppercase tracking-wider flex items-center gap-1">
            <FileText size={12} /> Примітки
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-[#0054a6]"
              placeholder="Додати..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addNote())
              }
            />
            <button
              type="button"
              onClick={addNote}
              className="bg-slate-100 p-2 rounded-lg text-[#0054a6]"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {employee.notes.map((note, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-[#0054a6] text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-blue-100"
              >
                {note}{" "}
                <X
                  size={10}
                  className="cursor-pointer"
                  onClick={() => removeNote(idx)}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="hasCompanyCar"
              className="w-4 h-4 rounded text-[#0054a6]"
              checked={employee.hasCompanyCar}
              onChange={handleChange}
            />
            <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
              <Car size={16} /> Службове авто
            </span>
          </label>
          {employee.hasCompanyCar && (
            <div className="grid grid-cols-2 gap-3">
              <input
                name="carModel"
                placeholder="Марка"
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none"
                value={employee.carModel}
                onChange={handleChange}
              />
              <input
                name="carNumber"
                placeholder="Номер"
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none"
                value={employee.carNumber}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#0054a6] text-white font-black py-3 rounded-lg uppercase tracking-widest text-xs"
          >
            Зберегти
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-slate-200 text-slate-500 font-bold rounded-lg uppercase text-xs"
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
};
export default EmployeeForm;

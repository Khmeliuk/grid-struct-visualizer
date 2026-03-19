import {
  ChevronRight,
  ChevronDown,
  Edit2,
  Save,
  X,
  Users,
  Briefcase,
  Plus,
  UserCircle,
  Building2,
  Trash2,
} from "lucide-react";

const DepartmentCard = ({ dept, onAddSub, onEdit, onDelete }) => {
  return (
    <div
      id={`card-${dept.id}`}
      className="relative bg-white border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 w-[280px] z-10 overflow-hidden group"
    >
      {/* Шапка відділу */}
      <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-blue-600" />
          <h3 className="font-bold text-slate-800 text-sm truncate">
            {dept.name}
          </h3>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(dept)}
            className="p-1 hover:bg-blue-100 text-blue-600 rounded"
          >
            <Edit2 size={14} />
          </button>
          {dept.id !== "dept-root" && (
            <button
              onClick={() => onDelete(dept.id)}
              className="p-1 hover:bg-red-100 text-red-500 rounded"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Керівник */}
      <div className="p-3 border-b border-slate-50 bg-blue-50/30">
        <p className="text-[10px] uppercase font-black text-blue-400 tracking-widest mb-2">
          Керівник
        </p>
        <div className="flex items-center gap-3">
          <img
            src={dept.manager.photo}
            alt=""
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="min-w-0">
            <p className="font-bold text-slate-900 text-xs truncate">
              {dept.manager.name}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {dept.manager.position}
            </p>
          </div>
        </div>
      </div>

      {/* Співробітники */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
            Команда ({dept.staff.length})
          </p>
          <Users size={12} className="text-slate-300" />
        </div>
        <div className="space-y-1">
          {dept.staff.length > 0 ? (
            dept.staff.map((name, i) => (
              <div
                key={i}
                className="text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded flex items-center gap-1"
              >
                <div className="w-1 h-1 rounded-full bg-slate-300" /> {name}
              </div>
            ))
          ) : (
            <p className="text-[10px] italic text-slate-400">
              Співробітників не додано
            </p>
          )}
        </div>
      </div>

      {/* Дія: Додати підвідділ */}
      <button
        onClick={() => onAddSub(dept.id)}
        className="w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-500 text-[11px] font-bold border-t border-slate-100 transition-colors flex items-center justify-center gap-1"
      >
        <Plus size={14} /> Додати підрозділ
      </button>
    </div>
  );
};
export default DepartmentCard;

import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import {
  Shield,
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  Edit2,
  Users,
} from "lucide-react";

const DepartmentCard = ({ dept, onUpdateDept, onDeleteDept, onAddSubDept }) => {
  const [modalType, setModalType] = useState(null); // 'manager', 'staff_add', 'staff_edit'
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const openEdit = (emp, type) => {
    setEditingEmployee(emp);
    setModalType(type);
  };

  const handleSaveEmployee = (data) => {
    if (modalType === "manager") {
      onUpdateDept(dept.id, { manager: data });
    } else if (modalType === "staff_add") {
      onUpdateDept(dept.id, { staff: [...(dept.staff || []), data] });
    } else if (modalType === "staff_edit") {
      onUpdateDept(dept.id, {
        staff: dept.staff.map((s) => (s.id === data.id ? data : s)),
      });
    }
    setModalType(null);
    setEditingEmployee(null);
  };

  const removeStaff = (id) => {
    onUpdateDept(dept.id, { staff: dept.staff.filter((s) => s.id !== id) });
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[340px] bg-white border-t-4 border-[#0054a6] rounded-xl shadow-lg hover:shadow-2xl transition-all z-10 text-left">
        {/* Шапка відділу */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            <Shield size={16} className="text-[#0054a6] shrink-0" />
            <input
              type="text"
              className="bg-transparent font-black text-slate-800 text-sm uppercase outline-none focus:border-b border-[#ffed00] w-full"
              value={dept.name}
              onChange={(e) => onUpdateDept(dept.id, { name: e.target.value })}
            />
          </div>
          <button
            onClick={() => onDeleteDept(dept.id)}
            className="p-1.5 text-slate-300 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Секція Керівника */}
        <div className="p-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Керівник
            </span>
            <button
              onClick={() => openEdit(dept.manager, "manager")}
              className="text-[#0054a6] hover:underline text-[9px] font-bold uppercase"
            >
              Змінити
            </button>
          </div>
          {dept.manager ? (
            <div
              onClick={() => openEdit(dept.manager, "manager")}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
            >
              <img
                src={dept.manager.photo}
                className="w-12 h-12 rounded-full border-2 border-[#ffed00]"
                alt="Manager"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 text-sm truncate">
                  {dept.manager.name}
                </p>
                <p className="text-[9px] text-[#0054a6] font-black uppercase truncate">
                  {dept.manager.position}
                </p>
              </div>
              <Edit2
                size={12}
                className="text-slate-300 opacity-0 group-hover:opacity-100"
              />
            </div>
          ) : (
            <button
              onClick={() => setModalType("manager")}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-[10px] font-black uppercase hover:border-[#ffed00] transition-all"
            >
              Призначити голову
            </button>
          )}
        </div>

        {/* Секція Працівників */}
        <div className="p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Users size={10} /> Персонал ({dept.staff?.length || 0})
            </span>
            <button
              onClick={() => setModalType("staff_add")}
              className="bg-slate-100 hover:bg-slate-200 p-1 rounded text-[#0054a6]"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
            {dept.staff && dept.staff.length > 0 ? (
              dept.staff.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 group"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    onClick={() => openEdit(emp, "staff_edit")}
                  >
                    <img
                      src={emp.photo}
                      className="w-8 h-8 rounded-full border border-white shadow-sm"
                      alt="Staff"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-[11px] truncate leading-none mb-1">
                        {emp.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-medium truncate">
                        {emp.position}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeStaff(emp.id)}
                    className="p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-[10px] text-slate-300 italic text-center py-2">
                Працівників не додано
              </p>
            )}
          </div>
        </div>

        {/* Нижні кнопки */}
        <div className="grid grid-cols-2 border-t border-slate-50">
          <button
            onClick={() => onAddSubDept(dept.id)}
            className="py-3 text-[9px] font-black uppercase text-[#0054a6] hover:bg-blue-50 border-r border-slate-50 flex items-center justify-center gap-1"
          >
            <Plus size={12} /> Підрозділ
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="py-3 text-[9px] font-black uppercase text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-1"
          >
            {isExpanded ? (
              <ChevronDown size={12} />
            ) : (
              <ChevronRight size={12} />
            )}{" "}
            Схема
          </button>
        </div>
      </div>

      {/* Модальне вікно (Картка працівника) */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <EmployeeForm
              onSave={handleSaveEmployee}
              initialData={editingEmployee}
              onCancel={() => {
                setModalType(null);
                setEditingEmployee(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Рекурсія підрозділів */}
      {isExpanded && dept.subDepartments && dept.subDepartments.length > 0 && (
        <div className="relative pt-20 flex gap-16">
          <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-[#0054a6]"></div>
          {dept.subDepartments.map((subDept, index) => (
            <div key={subDept.id} className="relative">
              {dept.subDepartments.length > 1 && (
                <div
                  className={`absolute top-[-40px] h-0.5 bg-[#0054a6] 
                  ${
                    index === 0
                      ? "left-1/2 right-0"
                      : index === dept.subDepartments.length - 1
                        ? "left-0 right-1/2"
                        : "left-0 right-0"
                  }`}
                ></div>
              )}
              <div className="absolute top-[-40px] left-1/2 w-0.5 h-10 bg-[#0054a6]"></div>
              <DepartmentCard
                dept={subDept}
                onUpdateDept={onUpdateDept}
                onDeleteDept={onDeleteDept}
                onAddSubDept={onAddSubDept}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentCard;

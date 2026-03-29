import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import {
  UserPlus,
  Shield,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Phone,
  Car,
} from "lucide-react";

const DepartmentCard = ({ dept, onUpdateDept, onDeleteDept, onAddSubDept }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleEmployeeCreated = (employeeData) => {
    const updatedManager = {
      name: `${employeeData.firstName} ${employeeData.lastName}`,
      position: employeeData.position,
      phone: employeeData.phone,
      hasCar: employeeData.hasCompanyCar,
      carInfo: employeeData.hasCompanyCar
        ? `${employeeData.carModel} (${employeeData.carNumber})`
        : null,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeData.firstName)}&background=0054a6&color=fff`,
    };
    onUpdateDept(dept.id, { manager: updatedManager });
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[320px] bg-white border-t-4 border-[#0054a6] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden z-10">
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
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="p-5 text-left">
          {dept.manager ? (
            <div className="flex items-center gap-4 animate-in fade-in duration-500">
              <img
                src={dept.manager.photo}
                className="w-14 h-14 rounded-full border-2 border-[#ffed00] object-cover"
                alt="Manager"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 text-sm truncate">
                  {dept.manager.name}
                </p>
                <p className="text-[11px] text-[#0054a6] font-bold uppercase tracking-tighter mb-1 truncate">
                  {dept.manager.position}
                </p>
                <div className="flex gap-2">
                  {dept.manager.phone && (
                    <Phone size={12} className="text-slate-400" />
                  )}
                  {dept.manager.hasCar && (
                    <Car
                      size={12}
                      className="text-amber-500"
                      title={dept.manager.carInfo}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 text-slate-300 hover:text-[#0054a6]"
              >
                <Edit2 size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-6 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#ffed00] hover:text-[#0054a6] transition-all group"
            >
              <UserPlus
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Призначити керівника
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 border-t border-slate-50">
          <button
            onClick={() => onAddSubDept(dept.id)}
            className="py-3 text-[10px] font-black uppercase text-[#0054a6] hover:bg-blue-50 border-r border-slate-50 flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Додати підрозділ
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="py-3 text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}{" "}
            Схема
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white flex items-center gap-2 font-bold uppercase text-xs"
            >
              Закрити <Plus size={24} className="rotate-45" />
            </button>
            <EmployeeForm onCreate={handleEmployeeCreated} />
          </div>
        </div>
      )}

      {isExpanded && dept.subDepartments && dept.subDepartments.length > 0 && (
        <div className="relative pt-20 flex gap-12">
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

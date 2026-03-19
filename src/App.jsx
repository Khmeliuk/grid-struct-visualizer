import { useEffect, useState } from "react";
import initialData from "./data/initialData";
import DepartmentCard from "./components/DepartmentCard";
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
import { useRef } from "react";

import "./App.css";

const App = () => {
  const [data, setData] = useState(initialData);
  const [editingDept, setEditingDept] = useState(null);
  const [addingToId, setAddingToId] = useState(null);
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  // Форма для нового відділу / редагування
  const [form, setForm] = useState({
    name: "",
    mName: "",
    mPos: "",
    staff: "",
  });

  // Малювання ліній
  const updateLines = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines = [];

    const traverse = (node) => {
      const parentCard = document.getElementById(`card-${node.id}`);
      if (parentCard && node.subDepartments) {
        const pRect = parentCard.getBoundingClientRect();
        const startX = pRect.left + pRect.width / 2 - containerRect.left;
        const startY = pRect.bottom - containerRect.top;

        node.subDepartments.forEach((sub) => {
          const subCard = document.getElementById(`card-${sub.id}`);
          if (subCard) {
            const sRect = subCard.getBoundingClientRect();
            const endX = sRect.left + sRect.width / 2 - containerRect.left;
            const endY = sRect.top - containerRect.top;

            const midY = startY + (endY - startY) / 2;
            newLines.push({
              path: `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`,
              id: `${node.id}-${sub.id}`,
            });
            traverse(sub);
          }
        });
      }
    };

    traverse(data);
    setLines(newLines);
  };

  useEffect(() => {
    const timer = setTimeout(updateLines, 300);
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [data, addingToId, editingDept]);

  // Функції управління деревом
  const handleAdd = () => {
    const newDept = {
      id: `dept-${Date.now()}`,
      name: form.name || "Новий відділ",
      manager: {
        name: form.mName || "ПІБ Керівника",
        position: form.mPos || "Посада",
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.mName)}&background=random`,
      },
      staff: form.staff ? form.staff.split(",").map((s) => s.trim()) : [],
      subDepartments: [],
    };

    const addToTree = (node) => {
      if (node.id === addingToId) {
        return { ...node, subDepartments: [...node.subDepartments, newDept] };
      }
      return { ...node, subDepartments: node.subDepartments.map(addToTree) };
    };

    setData(addToTree(data));
    setAddingToId(null);
    resetForm();
  };

  const handleEdit = () => {
    const editInTree = (node) => {
      if (node.id === editingDept.id) {
        return {
          ...node,
          name: form.name,
          manager: { ...node.manager, name: form.mName, position: form.mPos },
          staff: form.staff.split(",").map((s) => s.trim()),
        };
      }
      return { ...node, subDepartments: node.subDepartments.map(editInTree) };
    };
    setData(editInTree(data));
    setEditingDept(null);
    resetForm();
  };

  const handleDelete = (id) => {
    const delFromTree = (node) => {
      return {
        ...node,
        subDepartments: node.subDepartments
          .filter((sub) => sub.id !== id)
          .map(delFromTree),
      };
    };
    setData(delFromTree(data));
  };

  const resetForm = () => setForm({ name: "", mName: "", mPos: "", staff: "" });

  // Рендер ієрархічного дерева (рекурсивно)
  const renderTree = (node) => (
    <div key={node.id} className="flex flex-col items-center">
      <DepartmentCard
        dept={node}
        onAddSub={(id) => {
          setAddingToId(id);
          resetForm();
        }}
        onEdit={(d) => {
          setEditingDept(d);
          setForm({
            name: d.name,
            mName: d.manager.name,
            mPos: d.manager.position,
            staff: d.staff.join(", "),
          });
        }}
        onDelete={handleDelete}
      />
      {node.subDepartments && node.subDepartments.length > 0 && (
        <div className="flex gap-8 mt-16 items-start">
          {node.subDepartments.map(renderTree)}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-12 overflow-auto font-sans">
      <div className="max-w-fit mx-auto relative" ref={containerRef}>
        {/* Шапка сторінки */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
            <Briefcase className="text-blue-600" />
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">
                Корпоративна Структура
              </h1>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">
                Мапа департаментів компанії
              </p>
            </div>
          </div>
        </div>

        {/* Шар стрілок */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#CBD5E1" />
            </marker>
          </defs>
          {lines.map((line) => (
            <path
              key={line.id}
              d={line.path}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          ))}
        </svg>

        {/* Рендер дерева */}
        <div className="relative">{renderTree(data)}</div>
      </div>

      {/* Модальне вікно (Додати/Редагувати) */}
      {(addingToId || editingDept) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800">
                {editingDept ? "Редагувати підрозділ" : "Новий підрозділ"}
              </h2>
              <button
                onClick={() => {
                  setAddingToId(null);
                  setEditingDept(null);
                }}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Назва відділу
                </label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Напр: Відділ продажу"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                    Керівник (ПІБ)
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.mName}
                    onChange={(e) =>
                      setForm({ ...form, mName: e.target.value })
                    }
                    placeholder="Ім'я Прізвище"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                    Посада керівника
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.mPos}
                    onChange={(e) => setForm({ ...form, mPos: e.target.value })}
                    placeholder="Напр: Head of Sales"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Співробітники (через кому)
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24"
                  value={form.staff}
                  onChange={(e) => setForm({ ...form, staff: e.target.value })}
                  placeholder="Іван Іванов, Петро Петров..."
                />
              </div>
              <button
                onClick={editingDept ? handleEdit : handleAdd}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} />{" "}
                {editingDept ? "Зберегти зміни" : "Створити підрозділ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

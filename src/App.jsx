import { useState, useRef } from "react";
import { Shield } from "lucide-react";
import DepartmentCard from "./components/DepartmentCard";

import "./App.css";
import initialDepartments from "./data/initialDepartments";

const App = () => {
  const [data, setData] = useState(initialDepartments[0]);
  const containerRef = useRef(null);

  const updateTree = (node, targetId, callback) => {
    if (node.id === targetId) return callback(node);
    if (node.subDepartments) {
      return {
        ...node,
        subDepartments: node.subDepartments.map((sub) =>
          updateTree(sub, targetId, callback),
        ),
      };
    }
    return node;
  };

  const handleAddSubDept = (parentId) => {
    const newDept = {
      id: `dept-${Date.now()}`,
      name: "Новий підрозділ",
      manager: null,
      subDepartments: [],
    };
    setData((prev) =>
      updateTree(prev, parentId, (node) => ({
        ...node,
        subDepartments: [...(node.subDepartments || []), newDept],
      })),
    );
  };

  const handleUpdateDept = (deptId, updatedFields) => {
    setData((prev) =>
      updateTree(prev, deptId, (node) => ({ ...node, ...updatedFields })),
    );
  };

  const handleDeleteDept = (deptId) => {
    const removeFromTree = (node) => {
      if (!node.subDepartments) return node;
      return {
        ...node,
        subDepartments: node.subDepartments
          .filter((sub) => sub.id !== deptId)
          .map(removeFromTree),
      };
    };
    if (data.id === deptId) return;
    setData((prev) => removeFromTree(prev));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 overflow-auto text-center">
      <div className="max-w-fit mx-auto relative pt-10" ref={containerRef}>
        <div className="mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-6 bg-white px-10 py-6 rounded-3xl shadow-xl border border-blue-100 mb-6">
            <div className="bg-[#0054a6] p-4 rounded-2xl text-white">
              <Shield size={32} />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                АТ "Хмельницькобленерго"
              </h1>
              <p className="text-[11px] text-[#0054a6] uppercase font-black tracking-[0.4em]">
                Цифрова організаційна структура
              </p>
            </div>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-[#0054a6] to-transparent opacity-20" />
        </div>

        <div className="relative pb-60">
          <DepartmentCard
            dept={data}
            onUpdateDept={handleUpdateDept}
            onDeleteDept={handleDeleteDept}
            onAddSubDept={handleAddSubDept}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

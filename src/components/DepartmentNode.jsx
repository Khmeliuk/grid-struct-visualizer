const DepartmentNode = ({ dept }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white border-t-4 border-[#0054a6] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all w-64 text-left group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-black text-slate-800 uppercase text-xs tracking-tight">
          {dept.name}
        </h4>
        <div className="bg-blue-50 text-[#0054a6] p-1 rounded-md">
          <Server size={14} />
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
        Керівник:
      </p>
      <p className="text-xs font-bold text-slate-700">{dept.manager.name}</p>
      <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-1">
        {dept.staff.slice(0, 2).map((s, i) => (
          <span
            key={i}
            className="text-[8px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase"
          >
            {s}
          </span>
        ))}
        {dept.staff.length > 2 && (
          <span className="text-[8px] text-slate-300 font-bold">
            +{dept.staff.length - 2}
          </span>
        )}
      </div>
    </div>

    {dept.subDepartments && dept.subDepartments.length > 0 && (
      <div className="flex flex-col items-center">
        <div className="h-8 w-0.5 bg-[#0054a6]/20"></div>
        <div className="flex gap-8 relative">
          {dept.subDepartments.map((sub, idx) => (
            <DepartmentNode key={sub.id} dept={sub} />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default DepartmentNode;

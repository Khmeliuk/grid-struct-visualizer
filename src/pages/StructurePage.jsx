import { Server } from "lucide-react";

const StructurePage = () => (
  <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-black text-slate-800 uppercase italic mb-10 text-left">
      Організаційна структура
    </h2>
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 flex flex-col items-center justify-center text-slate-400">
      <Server size={48} className="mb-4 opacity-20" />
      <p className="font-bold uppercase tracking-widest text-xs text-center">
        Карта департаментів АТ "Хмельницькобленерго"
      </p>
    </div>
  </div>
);

export default StructurePage;

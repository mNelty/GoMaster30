import React from 'react';
import { DayTask } from '../types';
import { CheckCircle, ExternalLink, Code2, Target, BookMarked, Dumbbell } from 'lucide-react';

interface DayViewProps {
  day: DayTask;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const DayView: React.FC<DayViewProps> = ({ day, isCompleted, onToggleComplete }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-3 text-cyan-500 font-mono text-sm tracking-wider uppercase">
          <span className="bg-cyan-950/30 px-2 py-1 rounded">Gün {day.dayNumber}</span>
          <span>•</span>
          <span>30 Dakika</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{day.title}</h1>
        
        <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <Target className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
          <div>
            <span className="text-sm font-semibold text-slate-300 block mb-1">HEDEF</span>
            <p className="text-slate-100">{day.goal}</p>
          </div>
        </div>
      </header>

      {/* Activities */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          Aktiviteler
        </h2>
        <ul className="space-y-3">
          {day.activities.map((activity, idx) => (
            <li key={idx} className="flex gap-3 text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
              <span>{activity}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Code Snippet */}
      {day.codeSnippet && (
        <section className="space-y-4">
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest">Örnek Kod</h2>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <pre className="relative bg-slate-950 p-6 rounded-lg overflow-x-auto border border-slate-800 font-mono text-sm leading-relaxed text-slate-300 shadow-2xl">
              <code>{day.codeSnippet}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Resources */}
      {day.resources.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-400" />
            Kaynaklar
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {day.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300"
              >
                <span className="text-cyan-400 font-medium group-hover:text-cyan-300">{res.title}</span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Practice/Homework */}
      <section className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Dumbbell className="w-24 h-24 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
          <Dumbbell className="w-5 h-5 text-rose-400" />
          Pratik & Ödev
        </h2>
        <p className="text-slate-300 relative z-10 leading-relaxed">
          {day.practice}
        </p>
      </section>

      {/* Completion Toggle */}
      <div className="pt-8 flex justify-center pb-20 md:pb-0">
        <button
          onClick={onToggleComplete}
          className={`
            group relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95
            ${isCompleted 
              ? 'bg-emerald-500/10 text-emerald-400 border-2 border-emerald-500 hover:bg-emerald-500/20 shadow-emerald-900/20' 
              : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-900/50'
            }
          `}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-6 h-6 fill-current" />
              Tamamlandı
            </>
          ) : (
            <>
              <span className="w-6 h-6 border-2 border-white/30 rounded-full group-hover:border-white transition-colors" />
              Tamamla
            </>
          )}
        </button>
      </div>
    </div>
  );
};
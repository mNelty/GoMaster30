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
      <header className="space-y-4 border-b border-border pb-8">
        <div className="flex items-center gap-3 text-accent font-mono text-sm tracking-wider uppercase">
          <span className="bg-accent-subtle-bg text-accent-subtle-text px-2 py-1 rounded">Gün {day.dayNumber}</span>
          <span>•</span>
          <span>30 Dakika</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">{day.title}</h1>
        
        <div className="flex items-start gap-3 bg-bg-secondary p-4 rounded-xl border border-border">
          <Target className="w-5 h-5 text-green-500 mt-1 shrink-0" />
          <div>
            <span className="text-sm font-semibold text-text-secondary block mb-1">HEDEF</span>
            <p className="text-text-primary">{day.goal}</p>
          </div>
        </div>
      </header>

      {/* Activities */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          Aktiviteler
        </h2>
        <ul className="space-y-3">
          {day.activities.map((activity, idx) => (
            <li key={idx} className="flex gap-3 text-text-secondary bg-bg-inset p-3 rounded-lg border border-border hover:border-border-hover transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
              <span>{activity}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Code Snippet */}
      {day.codeSnippet && (
        <section className="space-y-4">
          <h2 className="text-sm font-mono text-text-muted uppercase tracking-widest">Örnek Kod</h2>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-go-blue rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <pre className="relative bg-bg-primary p-6 rounded-lg overflow-x-auto border border-border font-mono text-sm leading-relaxed text-text-secondary shadow-2xl">
              <code>{day.codeSnippet}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Resources */}
      {day.resources.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
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
                className="group flex items-center justify-between p-4 bg-bg-tertiary border border-border rounded-xl hover:bg-bg-hover hover:border-accent-border transition-all duration-300"
              >
                <span className="text-accent-subtle-text font-medium group-hover:text-accent">{res.title}</span>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Practice/Homework */}
      <section className="bg-bg-secondary border border-border p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Dumbbell className="w-24 h-24 text-text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2 relative z-10">
          <Dumbbell className="w-5 h-5 text-rose-400" />
          Pratik & Ödev
        </h2>
        <p className="text-text-secondary relative z-10 leading-relaxed">
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
              ? 'bg-success-bg text-success-text border-2 border-success-border hover:bg-success-bg/80 shadow-lg shadow-success-border/10' 
              : 'bg-accent text-accent-text hover:bg-accent-hover shadow-lg shadow-accent/30'
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
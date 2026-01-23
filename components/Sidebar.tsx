import React from 'react';
import { CourseData } from '../types';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface SidebarProps {
  courseData: CourseData;
  completedDays: Set<number>;
  currentDayId: number;
  onDaySelect: (dayId: number) => void;
  expandedWeeks: Set<number>;
  toggleWeek: (weekId: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  courseData,
  completedDays,
  currentDayId,
  onDaySelect,
  expandedWeeks,
  toggleWeek,
}) => {
  // Calculate total progress
  const totalDays = courseData.weeks.reduce((acc, week) => acc + week.days.length, 0);
  const progress = Math.round((completedDays.size / totalDays) * 100);

  return (
    <div className="w-full md:w-80 bg-slate-800/50 border-r border-slate-700/50 flex flex-col h-screen sticky top-0 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-500/20 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="font-bold text-xl text-slate-100 tracking-tight">GoMaster 30</h1>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>İLERLEME</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            {completedDays.size} / {totalDays} gün tamamlandı
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {courseData.weeks.map((week) => {
          const isExpanded = expandedWeeks.has(week.id);
          const weekCompletedCount = week.days.filter(d => completedDays.has(d.id)).length;
          const isWeekComplete = weekCompletedCount === week.days.length;

          return (
            <div key={week.id} className="rounded-xl overflow-hidden bg-slate-900/30 border border-slate-800/50 transition-colors hover:border-slate-700">
              <button
                onClick={() => toggleWeek(week.id)}
                className={`w-full flex items-center justify-between p-3 text-sm font-medium transition-colors ${
                  isWeekComplete ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="flex-1 text-left truncate">{week.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-mono">{weekCompletedCount}/{week.days.length}</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="bg-slate-950/30 border-t border-slate-800/50">
                  {week.days.map((day) => {
                    const isCompleted = completedDays.has(day.id);
                    const isActive = currentDayId === day.id;

                    return (
                      <button
                        key={day.id}
                        onClick={() => onDaySelect(day.id)}
                        className={`w-full flex items-center gap-3 p-3 pl-4 text-sm transition-all border-l-2 ${
                          isActive 
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-transparent'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span className="truncate text-left">
                          <span className="font-mono text-xs opacity-50 mr-2">Gün {day.dayNumber}:</span>
                          {day.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-600">
        <a href="https://go.dev" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Go Programming Language</a>
      </div>
    </div>
  );
};
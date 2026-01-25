import React from 'react';
import { CourseData } from '../types';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

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
  const progress = totalDays > 0 ? Math.round((completedDays.size / totalDays) * 100) : 0;

  return (
    <div className="w-full md:w-80 bg-bg-secondary border-r border-border flex flex-col h-screen sticky top-0 overflow-hidden">
      <div className="p-6 border-b border-border bg-bg-secondary backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent-subtle-bg p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-accent-subtle-text" />
          </div>
          <h1 className="font-bold text-xl text-text-primary tracking-tight">GoMaster 30</h1>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-text-secondary">
            <span>İLERLEME</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out shadow-[0_0_10px_var(--color-accent)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-2 text-center">
            {completedDays.size} / {totalDays} gün tamamlandı
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {courseData.weeks.map((week) => {
          const isExpanded = expandedWeeks.has(week.id);
          const weekCompletedCount = week.days.filter(d => completedDays.has(d.id)).length;
          const isWeekComplete = weekCompletedCount === week.days.length;

          return (
            <div key={week.id} className="rounded-xl overflow-hidden bg-bg-inset border border-border transition-colors hover:border-border-hover">
              <button
                onClick={() => toggleWeek(week.id)}
                className={`w-full flex items-center justify-between p-3 text-sm font-medium transition-colors ${
                  isWeekComplete ? 'text-accent-subtle-text' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="flex-1 text-left truncate">{week.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-faint font-mono">{weekCompletedCount}/{week.days.length}</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="bg-bg-primary border-t border-border">
                  {week.days.map((day) => {
                    const isCompleted = completedDays.has(day.id);
                    const isActive = currentDayId === day.id;

                    return (
                      <button
                        key={day.id}
                        onClick={() => onDaySelect(day.id)}
                        className={`w-full flex items-center gap-3 p-3 pl-4 text-sm transition-all border-l-2 ${
                          isActive 
                            ? 'bg-accent-subtle-bg text-accent-subtle-text border-accent' 
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover border-transparent'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-text-faint shrink-0" />
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
      
      <ThemeSwitcher />
      
      <div className="p-4 border-t border-border text-center text-xs text-text-muted">
        <a href="https://go.dev" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Go Programming Language</a>
      </div>
    </div>
  );
};
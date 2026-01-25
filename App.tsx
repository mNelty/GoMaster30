import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DayView } from './components/DayView';
import { COURSE_CONTENT } from './constants';
import { DayTask } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // Persistence state
  const [completedDays, setCompletedDays] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('goMasterCompleted');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [currentDayId, setCurrentDayId] = useState<number>(() => {
    const saved = localStorage.getItem('goMasterCurrentDay');
    return saved ? parseInt(saved) : 1;
  });

  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('goMasterCompleted', JSON.stringify(Array.from(completedDays)));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('goMasterCurrentDay', currentDayId.toString());
  }, [currentDayId]);

  // Handlers
  const handleToggleComplete = () => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(currentDayId)) {
      newCompleted.delete(currentDayId);
    } else {
      newCompleted.add(currentDayId);
      // Optional: Auto-advance could go here logic-wise
    }
    setCompletedDays(newCompleted);
  };

  const handleDaySelect = (dayId: number) => {
    setCurrentDayId(dayId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWeek = (weekId: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekId)) {
      newExpanded.delete(weekId);
    } else {
      newExpanded.add(weekId);
    }
    setExpandedWeeks(newExpanded);
  };

  // Find current day object
  let activeDay: DayTask | undefined;
  let activeWeekId = 0;
  
  for (const week of COURSE_CONTENT.weeks) {
    const day = week.days.find(d => d.id === currentDayId);
    if (day) {
      activeDay = day;
      activeWeekId = week.id;
      break;
    }
  }

  // Auto-expand the week of the active day on initial load or change
  useEffect(() => {
    if (activeWeekId && !expandedWeeks.has(activeWeekId)) {
      setExpandedWeeks(prev => new Set(prev).add(activeWeekId));
    }
  }, [activeWeekId]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-primary text-text-primary font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-bg-secondary/90 backdrop-blur border-b border-border p-4 flex justify-between items-center">
        <span className="font-bold text-lg text-text-primary">GoMaster 30</span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-text-secondary hover:text-text-primary"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile) */}
      <div className={`
        fixed inset-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 md:inset-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          courseData={COURSE_CONTENT}
          completedDays={completedDays}
          currentDayId={currentDayId}
          onDaySelect={handleDaySelect}
          expandedWeeks={expandedWeeks}
          toggleWeek={handleToggleWeek}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full pt-16 md:pt-0 overflow-x-hidden">
        {activeDay ? (
          <DayView 
            day={activeDay} 
            isCompleted={completedDays.has(currentDayId)} 
            onToggleComplete={handleToggleComplete} 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-text-muted">
            Lütfen bir gün seçin.
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
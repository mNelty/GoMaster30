export interface Resource {
  title: string;
  url: string;
}

export interface DayTask {
  id: number;
  dayNumber: number;
  title: string;
  goal: string;
  activities: string[];
  codeSnippet?: string;
  resources: Resource[];
  practice: string;
}

export interface Week {
  id: number;
  title: string;
  description?: string;
  days: DayTask[];
}

export interface CourseData {
  title: string;
  weeks: Week[];
}
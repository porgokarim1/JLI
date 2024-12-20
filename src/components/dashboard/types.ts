export interface LessonProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  time_spent?: number;
  last_position?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
}

export interface LessonWithProgress extends Lesson {
  progress?: LessonProgress;
}
export interface LessonProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  time_spent?: number;
  last_position?: number;
}

export interface LessonMedia {
  id: string;
  lesson_id: string;
  url: string;
  type: 'image' | 'video';
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  media?: LessonMedia[];
}

export interface LessonWithProgress extends Lesson {
  progress?: LessonProgress;
}
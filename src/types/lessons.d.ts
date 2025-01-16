export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface LessonProgress {
  status: LessonStatus;
  time_spent: number;
  last_position: number;
}

export interface LessonMedia {
  id: string;
  url: string;
  type: string;
}

export interface LessonWithProgress {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  lesson_order: string;
  progress: LessonProgress;
  media: LessonMedia[];
  university_name?: string | null;
}

export interface ScheduledLesson {
  id: string;
  lesson: {
    title: string;
    description: string;
  };
  lesson_date: string;
  start_time: string;
  end_time: string;
  location: string;
  attendance_code: string;
}
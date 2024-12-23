export interface LessonMedia {
  id: string;
  lesson_id: string;
  url: string;
  type: "image" | "video";
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  status: "not_started" | "in_progress" | "completed";
  time_spent: number;
  last_position: number;
}

export interface LessonWithProgress {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  created_at: string;
  media: LessonMedia[];
  progress?: LessonProgress;
}
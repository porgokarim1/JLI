export type LessonMedia = {
  id: string;
  lesson_id: string;
  url: string;
  type: "image" | "video";
  created_at: string;
  updated_at: string;
};

export type LessonProgress = {
  status: "not_started" | "in_progress" | "completed";
  time_spent: number;
  last_position: number;
  completed_at?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  created_at: string;
  location?: string;
  lesson_date?: string;
  lesson_time?: string;
  lesson_media: LessonMedia[];
};

export type LessonWithProgress = Lesson & {
  progress: LessonProgress;
  media: LessonMedia[];
};

export type Profile = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  phone: string | null;
  campus: string | null;
  organization: string | null;
  reward_tier: string | null;
  created_at: string;
  updated_at: string;
};
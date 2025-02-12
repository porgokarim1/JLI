export interface NextLesson {
  id: string;
  title?: string;
  lesson_date: string;
  start_time: string;
  end_time?: string;
  location?: string;
  instructor?: {
    first_name?: string;
    last_name?: string;
  };
}
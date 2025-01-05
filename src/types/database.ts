export type StudentProgressOverview = {
  student_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  campus: string | null;
  total_conversations: number;
  completed_lessons: number;
  last_conversation_date: string | null;
  last_lesson_completed: string | null;
};
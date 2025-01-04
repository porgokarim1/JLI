export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          comfort_level:
            | Database["public"]["Enums"]["comfort_level_type"]
            | null
          comments: string | null
          conversation_date: string
          created_at: string
          id: string
          participant_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comfort_level?:
            | Database["public"]["Enums"]["comfort_level_type"]
            | null
          comments?: string | null
          conversation_date: string
          created_at?: string
          id?: string
          participant_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comfort_level?:
            | Database["public"]["Enums"]["comfort_level_type"]
            | null
          comments?: string | null
          conversation_date?: string
          created_at?: string
          id?: string
          participant_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_attendance: {
        Row: {
          attendance_time: string | null
          created_at: string
          id: string
          schedule_id: string | null
          student_id: string | null
        }
        Insert: {
          attendance_time?: string | null
          created_at?: string
          id?: string
          schedule_id?: string | null
          student_id?: string | null
        }
        Update: {
          attendance_time?: string | null
          created_at?: string
          id?: string
          schedule_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_attendance_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "lessons_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_media: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          type: Database["public"]["Enums"]["media_type"]
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          type: Database["public"]["Enums"]["media_type"]
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id: string
          type?: Database["public"]["Enums"]["media_type"]
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_media_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          completion_code: string | null
          created_at: string
          description: string
          duration: number
          id: string
          image_url: string
          instructor_name: string | null
          lesson_date: string | null
          lesson_time: string | null
          location: string | null
          title: string
        }
        Insert: {
          completion_code?: string | null
          created_at?: string
          description: string
          duration: number
          id?: string
          image_url: string
          instructor_name?: string | null
          lesson_date?: string | null
          lesson_time?: string | null
          location?: string | null
          title: string
        }
        Update: {
          completion_code?: string | null
          created_at?: string
          description?: string
          duration?: number
          id?: string
          image_url?: string
          instructor_name?: string | null
          lesson_date?: string
          lesson_time?: string | null
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      lessons_schedule: {
        Row: {
          attendance_code: string | null
          campus: string | null
          created_at: string
          end_time: string
          id: string
          instructor_id: string | null
          lesson_date: string
          lesson_id: string | null
          location: string | null
          start_time: string
          updated_at: string
        }
        Insert: {
          attendance_code?: string | null
          campus?: string | null
          created_at?: string
          end_time: string
          id?: string
          instructor_id?: string | null
          lesson_date: string
          lesson_id?: string | null
          location?: string
          start_time: string
          updated_at?: string
        }
        Update: {
          attendance_code?: string | null
          campus?: string | null
          created_at?: string
          end_time?: string
          id?: string
          instructor_id?: string | null
          lesson_date?: string
          lesson_id?: string | null
          location?: string | null
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_schedule_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_schedule_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          campus: string | null
          created_at: string
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          organization: string | null
          phone: string | null
          reward_claimed: boolean | null
          reward_tier: string | null
          reward_tier_form_submitted: boolean | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          campus?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          reward_claimed?: boolean | null
          reward_tier?: string | null
          reward_tier_form_submitted?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          campus?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          reward_claimed?: boolean | null
          reward_tier?: string | null
          reward_tier_form_submitted?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_lesson_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          last_position: number | null
          lesson_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["lesson_status"]
          time_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_position?: number | null
          lesson_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["lesson_status"]
          time_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_position?: number | null
          lesson_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["lesson_status"]
          time_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_attendance_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      campus_region:
        | "North America"
        | "South America"
        | "Europe"
        | "Asia"
        | "Africa"
        | "Oceania"
      comfort_level_type:
        | "very_comfortable"
        | "comfortable"
        | "uncomfortable"
        | "very_uncomfortable"
      conversation_status: "pending" | "completed" | "follow_up"
      lesson_status: "not_started" | "in_progress" | "completed"
      media_type: "image" | "video"
      user_role: "student" | "instructor" | "administrator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type ComfortLevel = 'very_comfortable' | 'comfortable' | 'uncomfortable' | 'very_uncomfortable';

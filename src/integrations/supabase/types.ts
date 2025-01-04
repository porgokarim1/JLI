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
          lesson_id?: string
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
          lesson_date?: string | null
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
          location?: string | null
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
          id?: string
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
          lesson_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["lesson_status"]
          time_spent?: number | null
          updated_at?: string
          user_id?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

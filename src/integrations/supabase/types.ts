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
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "student_progress_overview"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles_cache"
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
          {
            foreignKeyName: "lesson_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_progress_overview"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "lesson_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user_roles_cache"
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
          {
            foreignKeyName: "lesson_media_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons_view"
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
          lesson_order: string | null
          lesson_time: string | null
          location: string | null
          title: string
          university_id: string
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
          lesson_order?: string | null
          lesson_time?: string | null
          location?: string | null
          title: string
          university_id: string
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
          lesson_order?: string | null
          lesson_time?: string | null
          location?: string | null
          title?: string
          university_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "lessons_schedule_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "student_progress_overview"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "lessons_schedule_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "user_roles_cache"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_schedule_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_schedule_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons_view"
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
          middle_name: string | null
          organization: string | null
          phone: string | null
          referal_code: string | null
          reward_claimed: boolean | null
          reward_tier: string | null
          reward_tier_form_submitted: boolean | null
          role: Database["public"]["Enums"]["user_role"] | null
          terms_agreed: boolean | null
          terms_agreed_at: string | null
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
          middle_name?: string | null
          organization?: string | null
          phone?: string | null
          referal_code?: string | null
          reward_claimed?: boolean | null
          reward_tier?: string | null
          reward_tier_form_submitted?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          terms_agreed?: boolean | null
          terms_agreed_at?: string | null
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
          middle_name?: string | null
          organization?: string | null
          phone?: string | null
          referal_code?: string | null
          reward_claimed?: boolean | null
          reward_tier?: string | null
          reward_tier_form_submitted?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          terms_agreed?: boolean | null
          terms_agreed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      SYSVR_System_Variables: {
        Row: {
          Var_Code: string | null
          Var_Description: string | null
          Var_ID: number
          Var_Type: string
          Var_UserID: number
          Var_Value: string | null
        }
        Insert: {
          Var_Code?: string | null
          Var_Description?: string | null
          Var_ID?: never
          Var_Type: string
          Var_UserID?: number
          Var_Value?: string | null
        }
        Update: {
          Var_Code?: string | null
          Var_Description?: string | null
          Var_ID?: never
          Var_Type?: string
          Var_UserID?: number
          Var_Value?: string | null
        }
        Relationships: []
      }
      universities: {
        Row: {
          confirmed: boolean | null
          created_at: string
          id: string
          name: string
          phone1: string | null
          updated_at: string
        }
        Insert: {
          confirmed?: boolean | null
          created_at?: string
          id?: string
          name: string
          phone1?: string | null
          updated_at?: string
        }
        Update: {
          confirmed?: boolean | null
          created_at?: string
          id?: string
          name?: string
          phone1?: string | null
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
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "student_progress_overview"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "user_lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles_cache"
            referencedColumns: ["id"]
          },
        ]
      }
      USER_Users: {
        Row: {
          USER_AccountID: number
          USER_Active: boolean
          USER_Address1: string | null
          USER_CanChangeHub: boolean
          USER_CanReviewOrders: boolean
          USER_CitizenshipStatus: string
          USER_City: string | null
          USER_CompanyID: number
          USER_CurrentSession: number
          USER_DateCreate: string
          USER_DateModify: string
          USER_DateofBirth: string | null
          USER_DateofHire: string
          USER_DefEmailAccID: number
          USER_Department: string | null
          USER_Dependants: number
          USER_Email: string | null
          USER_EmergencyContactPerson: string | null
          USER_EmergencyPhone: string | null
          USER_EmployeeGrade: number
          USER_EmploymentType: string
          USER_External: boolean
          USER_Fax: string | null
          USER_FilingStatus: string
          USER_FirstName: string | null
          USER_FullName: string | null
          USER_HubID: number
          USER_LastName: string | null
          USER_Level: string
          USER_NUserID: number
          USER_OfficeID: number
          USER_Password: string
          USER_PersonType: string
          USER_Phone1: string | null
          USER_PositionTitle: string
          USER_ReportsToManagerID: number
          USER_RoleID: number
          USER_SalaryOrHourlyRate: number
          USER_SecurityLevel: number
          USER_SocialSecurity: string | null
          USER_State: string | null
          USER_TaxNumber: string
          USER_TimeModify: string
          USER_TotalSessions: number
          USER_UserCreate: string
          USER_UserID: number
          USER_UserModify: string
          USER_UserName: string
          USER_UserType: string
          USER_VacationDays: number
          USER_VacationDaysAccrued: number
          USER_VacationHours: number
          USER_VacationHoursAccrued: number
          USER_YearsOfService: number
          USER_Zip: string | null
        }
        Insert: {
          USER_AccountID?: number
          USER_Active?: boolean
          USER_Address1?: string | null
          USER_CanChangeHub?: boolean
          USER_CanReviewOrders?: boolean
          USER_CitizenshipStatus?: string
          USER_City?: string | null
          USER_CompanyID?: number
          USER_CurrentSession?: number
          USER_DateCreate?: string
          USER_DateModify?: string
          USER_DateofBirth?: string | null
          USER_DateofHire?: string
          USER_DefEmailAccID?: number
          USER_Department?: string | null
          USER_Dependants?: number
          USER_Email?: string | null
          USER_EmergencyContactPerson?: string | null
          USER_EmergencyPhone?: string | null
          USER_EmployeeGrade?: number
          USER_EmploymentType?: string
          USER_External?: boolean
          USER_Fax?: string | null
          USER_FilingStatus?: string
          USER_FirstName?: string | null
          USER_FullName?: string | null
          USER_HubID?: number
          USER_LastName?: string | null
          USER_Level?: string
          USER_NUserID?: number
          USER_OfficeID?: number
          USER_Password?: string
          USER_PersonType?: string
          USER_Phone1?: string | null
          USER_PositionTitle?: string
          USER_ReportsToManagerID?: number
          USER_RoleID?: number
          USER_SalaryOrHourlyRate?: number
          USER_SecurityLevel?: number
          USER_SocialSecurity?: string | null
          USER_State?: string | null
          USER_TaxNumber?: string
          USER_TimeModify?: string
          USER_TotalSessions?: number
          USER_UserCreate?: string
          USER_UserID?: number
          USER_UserModify?: string
          USER_UserName?: string
          USER_UserType?: string
          USER_VacationDays?: number
          USER_VacationDaysAccrued?: number
          USER_VacationHours?: number
          USER_VacationHoursAccrued?: number
          USER_YearsOfService?: number
          USER_Zip?: string | null
        }
        Update: {
          USER_AccountID?: number
          USER_Active?: boolean
          USER_Address1?: string | null
          USER_CanChangeHub?: boolean
          USER_CanReviewOrders?: boolean
          USER_CitizenshipStatus?: string
          USER_City?: string | null
          USER_CompanyID?: number
          USER_CurrentSession?: number
          USER_DateCreate?: string
          USER_DateModify?: string
          USER_DateofBirth?: string | null
          USER_DateofHire?: string
          USER_DefEmailAccID?: number
          USER_Department?: string | null
          USER_Dependants?: number
          USER_Email?: string | null
          USER_EmergencyContactPerson?: string | null
          USER_EmergencyPhone?: string | null
          USER_EmployeeGrade?: number
          USER_EmploymentType?: string
          USER_External?: boolean
          USER_Fax?: string | null
          USER_FilingStatus?: string
          USER_FirstName?: string | null
          USER_FullName?: string | null
          USER_HubID?: number
          USER_LastName?: string | null
          USER_Level?: string
          USER_NUserID?: number
          USER_OfficeID?: number
          USER_Password?: string
          USER_PersonType?: string
          USER_Phone1?: string | null
          USER_PositionTitle?: string
          USER_ReportsToManagerID?: number
          USER_RoleID?: number
          USER_SalaryOrHourlyRate?: number
          USER_SecurityLevel?: number
          USER_SocialSecurity?: string | null
          USER_State?: string | null
          USER_TaxNumber?: string
          USER_TimeModify?: string
          USER_TotalSessions?: number
          USER_UserCreate?: string
          USER_UserID?: number
          USER_UserModify?: string
          USER_UserName?: string
          USER_UserType?: string
          USER_VacationDays?: number
          USER_VacationDaysAccrued?: number
          USER_VacationHours?: number
          USER_VacationHoursAccrued?: number
          USER_YearsOfService?: number
          USER_Zip?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      lessons_view: {
        Row: {
          attendance_code: string | null
          completion_code: string | null
          description: string | null
          duration: number | null
          end_time: string | null
          id: string | null
          image_url: string | null
          instructor_id: string | null
          instructor_name: string | null
          lesson_date: string | null
          lesson_order: string | null
          lesson_time: string | null
          location: string | null
          start_time: string | null
          title: string | null
          university_id: string | null
          university_name: string | null
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
            foreignKeyName: "lessons_schedule_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "student_progress_overview"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "lessons_schedule_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "user_roles_cache"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress_overview: {
        Row: {
          campus: string | null
          completed_lessons: number | null
          email: string | null
          first_name: string | null
          last_conversation_date: string | null
          last_lesson_completed: string | null
          last_name: string | null
          student_id: string | null
          total_conversations: number | null
        }
        Relationships: []
      }
      user_roles_cache: {
        Row: {
          id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      generate_attendance_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
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
        | "neutral"
      conversation_status: "pending" | "completed" | "follow_up"
      lesson_status: "not_started" | "in_progress" | "completed"
      media_type: "image" | "video"
      user_role: "student" | "instructor" | "administrator"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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

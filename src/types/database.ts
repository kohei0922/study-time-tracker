// 注: この型定義は仮のものです。後でSupabase CLIで自動生成できます
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          grade: string | null
          target_school: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          grade?: string | null
          target_school?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          grade?: string | null
          target_school?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          color: string
          is_preset: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          color: string
          is_preset?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
          is_preset?: boolean
          created_at?: string
        }
      }
      study_sessions: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          user_subject_id: string | null
          started_at: string
          ended_at: string | null
          duration_minutes: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          user_subject_id?: string | null
          started_at: string
          ended_at?: string | null
          duration_minutes?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          user_subject_id?: string | null
          started_at?: string
          ended_at?: string | null
          duration_minutes?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_subjects: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          type: 'daily' | 'weekly' | 'monthly'
          target_minutes: number
          subject_id: string | null
          user_subject_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'daily' | 'weekly' | 'monthly'
          target_minutes: number
          subject_id?: string | null
          user_subject_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'daily' | 'weekly' | 'monthly'
          target_minutes?: number
          subject_id?: string | null
          user_subject_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
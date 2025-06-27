export interface SessionWithSubject {
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
  subject?: {
    id: string
    name: string
    color: string
  } | null
  user_subject?: {
    id: string
    name: string
    color: string
  } | null
}

export interface Subject {
  id: string
  name: string
  color: string
  is_preset?: boolean
}
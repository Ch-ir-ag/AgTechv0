import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jrjpklfrwcabtuvxihbe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyanBrbGZyd2NhYnR1dnhpaGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzI3ODIsImV4cCI6MjA2NTA0ODc4Mn0.DMDNFYUkH7wMIh-kIBYJRs3vFwPdep6fzFFuOKvVGiM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for the demo_requests table
export interface DemoRequest {
  id?: number
  name: string
  email: string
  company: string
  created_at?: string
  updated_at?: string
} 
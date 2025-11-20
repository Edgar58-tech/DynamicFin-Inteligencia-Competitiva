import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hgsvoveuhuealtyqjkcw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnc3ZvdmV1aHVlYWx0eXFqa2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTk4MzUsImV4cCI6MjA3ODc5NTgzNX0.BxOg-rX4zQGWoQbcTsAXmb2BCvuvGfRJqvz0CgOP_G8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
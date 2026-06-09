import { createClient } from '@/lib/supabase/server'

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return false
  return user.email.toLowerCase() === adminEmail.toLowerCase()
}

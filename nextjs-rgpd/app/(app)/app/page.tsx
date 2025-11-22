import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import GeneratorApp from '@/components/GeneratorApp'

export default async function AppPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Récupérer le profil utilisateur
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return <GeneratorApp user={user} profile={profile} />
}

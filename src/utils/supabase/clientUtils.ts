import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createBrowserClient(supabaseUrl!, supabaseAnonKey!);

// ── Types ────────────────────────────────
export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export interface ProjectView {
  id?: number;
  project_id: string;
  viewed_at?: string;
}

// ── Helpers ────────────────────────────────
export async function sendContactMessage(
  data: Omit<ContactMessage, 'id' | 'created_at'>,
) {
  const { error } = await supabase
    .from('contact_messages')
    .insert([{ ...data, created_at: new Date().toISOString() }]);

  if (error) throw error;
  return true;
}

export async function trackProjectView(projectId: string) {
  try {
    await supabase.from('project_views').insert([
      { project_id: projectId, viewed_at: new Date().toISOString() },
    ]);
  } catch {
    // Non-critical, fail silently
  }
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}


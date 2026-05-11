// ── Supabase configuration ──────────────────────────────────────────
// 🔴 Replace with YOUR Supabase project URL and anon key
// Get them at: https://supabase.com → Project Settings → API

export const SUPABASE_URL  = 'https://oldvgciksrwujujimepg.supabase.co';
export const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

// ── Asset CDN base ──────────────────────────────────────────────────
export const CDN = `${SUPABASE_URL}/storage/v1/object/public/assets-rpg`;

// ── Model URLs ──────────────────────────────────────────────────────
export const MODELS = {
  // Buildings (OBJ)
  cinema:   `${CDN}/models/buildings/2Story_Sign.obj`,
  parking:  `${CDN}/models/buildings/4Story_Wide_2Doors_Base.obj`,
  office:   `${CDN}/models/buildings/2Story_Columns.obj`,
  texture:  `${CDN}/models/buildings/Texture_Light.png`,

  // Animals (OBJ)
  cow:      `${CDN}/models/props/Animals/Cow.obj`,
  horse:    `${CDN}/models/props/Animals/Horse.obj`,

  // Tech props (OBJ)
  drone:    `${CDN}/models/props/Drone.obj`,
  turret:   `${CDN}/models/props/Turret_Gun.obj`,

  // Characters
  avatar:   `${CDN}/models/characters/Formal.gltf`,
  robot:    `${CDN}/models/characters/Robot/Robot.fbx`,
} as const;

// ── Simple Supabase fetch helper (no SDK needed) ────────────────────
export async function supabaseFetch<T = unknown>(
  table: string,
  query = '',
): Promise<T[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?${query}`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch {
    return [];
  }
}

// ── Types matching Supabase tables ──────────────────────────────────
export interface DBProject {
  id: number;
  name: string;
  description: string;
  techs: string[];
  github_url: string;
  demo_url: string | null;
  status: string;
  image_url: string | null;
}

export interface DBDialogue {
  id: number;
  character: string;
  message: string;
  trigger_zone: string;
}

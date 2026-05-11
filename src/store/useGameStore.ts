import { create } from 'zustand';

export type Zone =
  | 'hero' | 'about' | 'skills' | 'services'
  | 'glowcode' | 'parknidus' | 'cineversa' | 'happyfarm'
  | 'terrasoft' | 'techlab'
  | 'landing' | 'projects'
  | 'contact' | 'testimonials' | 'footer' | null;

export interface ZoneConfig {
  id: Zone;
  label: string;
  emoji: string;
  color: string;
  position: [number, number, number];
  radius: number;
  buildingType: 'mansion'|'farm'|'cinema'|'parking'|'market'|'mailbox'|'totem'|'origin'|'office'|'techlab';
}

export const ZONES: ZoneConfig[] = [
  { id:'hero',         label:'✨ Inicio',       emoji:'✨', color:'#7c3aed', position:[0,0,0],       radius:6,  buildingType:'origin'  },
  { id:'about',        label:'🌳 Sobre Mí',     emoji:'🌳', color:'#16a34a', position:[-22,0,-8],    radius:5,  buildingType:'mansion' },
  { id:'landing',      label:'🏢 Dev HQ',       emoji:'🏢', color:'#a855f7', position:[-14,0,0],     radius:6,  buildingType:'office'  },
  { id:'skills',       label:'🐍 Habilidades',  emoji:'🐍', color:'#0ea5e9', position:[-8,0,15],     radius:5,  buildingType:'totem'   },
  { id:'services',     label:'🏪 Servicios',    emoji:'🏪', color:'#f59e0b', position:[0,0,22],      radius:5,  buildingType:'market'  },
  { id:'projects',     label:'🧩 Proyectos',   emoji:'🧩', color:'#f59e0b', position:[10,0,0],      radius:5,  buildingType:'origin'  },
  { id:'happyfarm',    label:'🌾 Happy-Farm',   emoji:'🌾', color:'#65a30d', position:[-8,0,-22],    radius:6,  buildingType:'farm'    },
  { id:'cineversa',    label:'🎬 Cine-Verse',   emoji:'🎬', color:'#dc2626', position:[22,0,-12],    radius:6,  buildingType:'cinema'  },
  { id:'parknidus',    label:'🚗 ParkNidus',    emoji:'🚗', color:'#6366f1', position:[20,0,10],     radius:6,  buildingType:'parking' },
  { id:'glowcode',     label:'✨ GlowCode',     emoji:'✨', color:'#be185d', position:[10,0,-20],    radius:5,  buildingType:'mansion' },
  { id:'terrasoft',    label:'🏠 Terrasoft',    emoji:'🏠', color:'#0891b2', position:[-20,0,-20],   radius:6,  buildingType:'office'  },
  { id:'techlab',      label:'🤖 Tech-IA Lab',  emoji:'🤖', color:'#22c55e', position:[14,0,18],     radius:6,  buildingType:'techlab' },
  { id:'contact',      label:'📬 Contacto',     emoji:'📬', color:'#0891b2', position:[0,0,-30],     radius:5,  buildingType:'mailbox' },
  { id:'testimonials', label:'💬 Testimonios',  emoji:'💬', color:'#b45309', position:[-20,0,18],    radius:5,  buildingType:'mansion' },
  { id:'footer',       label:'🌟 Créditos',     emoji:'🌟', color:'#7c3aed', position:[0,0,34],      radius:5,  buildingType:'origin'  },
];

export interface DialogueLine { speaker:string; text:string; color:string; }

interface GameState {
  currentZone: Zone; isUIOpen: boolean;
  playerPosition: [number,number,number]; isMusicPlaying: boolean;
  nearbyZoneHint: string|null; hasStarted: boolean;
  introComplete: boolean; activeDialogue: DialogueLine|null; showFooter: boolean;
  isNight: boolean;
  toggleDayNight: () => void;
  setZone:(z:Zone)=>void; closeUI:()=>void;
  setPlayerPosition:(p:[number,number,number])=>void; toggleMusic:()=>void;
  setNearbyHint:(h:string|null)=>void; setStarted:()=>void;
  setIntroComplete:()=>void; setDialogue:(d:DialogueLine|null)=>void;
}

export const useGameStore = create<GameState>((set) => ({
  currentZone:null, isUIOpen:false, playerPosition:[0,0.5,0],
  isMusicPlaying:false, nearbyZoneHint:null, hasStarted:false,
  introComplete:false, activeDialogue:null, showFooter:true,
  isNight:false,
  toggleDayNight: () => set((state) => ({ isNight: !state.isNight })),
  setZone:(zone)=>set({currentZone:zone,isUIOpen:zone!==null}),
  closeUI:()=>set({currentZone:null,isUIOpen:false}),
  setPlayerPosition:(pos)=>set({playerPosition:pos}),
  toggleMusic:()=>set(s=>({isMusicPlaying:!s.isMusicPlaying})),
  setNearbyHint:(hint)=>set({nearbyZoneHint:hint}),
  setStarted:()=>set({hasStarted:true}),
  setIntroComplete:()=>set({introComplete:true}),
  setDialogue:(d)=>set({activeDialogue:d}),
}));


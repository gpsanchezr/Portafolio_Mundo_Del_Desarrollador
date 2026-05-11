import { create } from 'zustand';

export type Section = 'hero' | 'about' | 'skills' | 'services' | 'projects' | 'testimonials' | 'contact';
export type Weather = 'sunny' | 'rain' | 'sakura' | 'night';
export type GameMode = 'explore' | 'cinematic' | 'photo';

interface WorldStore {
  // Scene state
  currentSection: Section | null;
  setCurrentSection: (section: Section | null) => void;

  // UI Panels
  activePanelId: string | null;
  setActivePanel: (id: string | null) => void;

  // Loading
  loadingProgress: number;
  setLoadingProgress: (n: number) => void;
  isLoaded: boolean;
  setIsLoaded: (b: boolean) => void;

  // Intro
  introComplete: boolean;
  setIntroComplete: (b: boolean) => void;

  // Audio
  audioEnabled: boolean;
  toggleAudio: () => void;

  // Weather
  weather: Weather;
  setWeather: (w: Weather) => void;

  // Game mode
  gameMode: GameMode;
  setGameMode: (m: GameMode) => void;

  // Minimap
  minimapVisible: boolean;
  toggleMinimap: () => void;

  // Player position (for minimap)
  playerPos: [number, number, number];
  setPlayerPos: (p: [number, number, number]) => void;

  // Achievements
  achievements: string[];
  unlockAchievement: (id: string) => void;

  // Mobile
  isMobile: boolean;
}

export const useWorldStore = create<WorldStore>((set, get) => ({
  currentSection: null,
  setCurrentSection: (section) => set({ currentSection: section }),

  activePanelId: null,
  setActivePanel: (id) => set({ activePanelId: id }),

  loadingProgress: 0,
  setLoadingProgress: (n) => set({ loadingProgress: n }),
  isLoaded: false,
  setIsLoaded: (b) => set({ isLoaded: b }),

  introComplete: false,
  setIntroComplete: (b) => set({ introComplete: b }),

  audioEnabled: false,
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),

  weather: 'sakura',
  setWeather: (w) => set({ weather: w }),

  gameMode: 'explore',
  setGameMode: (m) => set({ gameMode: m }),

  minimapVisible: true,
  toggleMinimap: () => set((s) => ({ minimapVisible: !s.minimapVisible })),

  playerPos: [0, 0, 0],
  setPlayerPos: (p) => set({ playerPos: p }),

  achievements: [],
  unlockAchievement: (id) => {
    const { achievements } = get();
    if (!achievements.includes(id)) {
      set({ achievements: [...achievements, id] });
    }
  },

  isMobile:
    typeof navigator !== 'undefined'
      ? /iPhone|iPad|Android/i.test(navigator.userAgent)
      : false,
}));


import { create } from 'zustand'

export const useAnimStore = create((set) => ({
  heroAnimComplete: false,
  setHeroAnimComplete: () => set({ heroAnimComplete: true }),

   floatDisabled: false,
  disableFloat: () => set({ floatDisabled: true }),

//   explodeActive: false,
// setExplodeActive: (val) => set({ explodeActive: val }),
}))
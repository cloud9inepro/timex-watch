import { create } from 'zustand'

export const useAnimStore = create((set) => ({
  heroAnimComplete: false,
  setHeroAnimComplete: () => set({ heroAnimComplete: true }),
}))
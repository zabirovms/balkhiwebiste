import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { EnhancedPoem } from '@/types/poetry';

interface PoetryState {
  selectedPoem: EnhancedPoem | null;
  isModalOpen: boolean;
  recentPoems: EnhancedPoem[];
  setSelectedPoem: (poem: EnhancedPoem | null) => void;
  openModal: () => void;
  closeModal: () => void;
  addRecentPoem: (poem: EnhancedPoem) => void;
}

export const usePoetryStore = create<PoetryState>((set: StateCreator<PoetryState>['setState']) => ({
  selectedPoem: null,
  isModalOpen: false,
  recentPoems: [],
  
  setSelectedPoem: (poem: EnhancedPoem | null) => set({ selectedPoem: poem }),
  
  openModal: () => set({ isModalOpen: true }),
  
  closeModal: () => set({ isModalOpen: false, selectedPoem: null }),
  
  addRecentPoem: (poem: EnhancedPoem) => 
    set((state: PoetryState) => ({
      recentPoems: [
        poem,
        ...state.recentPoems.filter((p: EnhancedPoem) => p.id !== poem.id)
      ].slice(0, 10) // Keep only the 10 most recent poems
    }))
})); 
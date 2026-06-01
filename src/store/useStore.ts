import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cheptelData, santeData, dashboardData, alertesData } from '../data/mockData';

export interface Animal {
  id: string;
  status: string;
  type: string;
  location: string;
  badgeColor: string;
  infoIcon?: string;
  infoText?: string;
  infoColor?: string;
  isWarning?: boolean;
  image?: string;
  name?: string;
  gender?: string;
  race?: string;
  age?: string;
  weight?: string;
}

interface AppState {
  animals: Animal[];
  santeStats: any;
  soins: any[];
  dashboard: any;
  alertes: any[];
  addAnimal: (animal: Animal) => void;
  updateAnimal: (id: string, animal: Partial<Animal>) => void;
  removeAlerte: (id: number) => void;
  importData: (data: string) => boolean;
  exportData: () => string;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      animals: cheptelData.animals,
      santeStats: santeData.stats,
      soins: santeData.soins,
      dashboard: dashboardData,
      alertes: alertesData,

      addAnimal: (animal) => set((state) => ({ animals: [...state.animals, animal] })),
      
      updateAnimal: (id, updatedAnimal) => set((state) => ({
        animals: state.animals.map((a) => a.id === id ? { ...a, ...updatedAnimal } : a)
      })),

      removeAlerte: (id) => set((state) => ({
        alertes: state.alertes.filter((a) => a.id !== id)
      })),

      importData: (jsonData) => {
        try {
          const parsed = JSON.parse(jsonData);
          if (parsed && parsed.state) {
            set(parsed.state);
            return true;
          }
          return false;
        } catch (e) {
          console.error("Failed to parse imported data", e);
          return false;
        }
      },

      exportData: () => {
        const state = get();
        // Zustand persist automatically handles saving to localStorage.
        // For export, we just dump the persisted state.
        const exportObj = {
          state: {
            animals: state.animals,
            santeStats: state.santeStats,
            soins: state.soins,
            dashboard: state.dashboard,
            alertes: state.alertes,
          },
          version: 1,
          timestamp: new Date().toISOString()
        };
        return JSON.stringify(exportObj, null, 2);
      }
    }),
    {
      name: 'gestion-lapins-storage', // key in localStorage
    }
  )
);

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
  naissance?: string;
  origine?: string;
  cage?: string;
  robe?: string;
  observations?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  description: string;
}

export interface Saillie {
  id: number;
  female: string;
  male: string;
  status: string;
  statusBadgeColor: string;
  date: string;
  expectedDate?: string;
  hasControlToday?: boolean;
  type?: string;
}

export interface Portee {
  id: string;
  status: string;
  female: string;
  age?: string;
  effectif: string;
  sevrage?: string;
  badgeColor: string;
  dateMiseBas?: string;
  totalNes?: number;
  nesVivants?: number;
  mortsNes?: number;
  cage?: string;
  observations?: string;
}

interface AppState {
  animals: Animal[];
  santeStats: any;
  soins: any[];
  dashboard: any;
  alertes: any[];
  transactions: Transaction[];
  saillies: Saillie[];
  portees: Portee[];
  theme: string;
  races: string[];
  addRace: (race: string) => void;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (id: string, animal: Partial<Animal>) => void;
  removeAlerte: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  addSaillie: (saillie: Saillie) => void;
  updateSaillie: (id: number, saillie: Partial<Saillie>) => void;
  removeSaillie: (id: number) => void;
  addPortee: (portee: Portee) => void;
  updatePortee: (id: string, portee: Partial<Portee>) => void;
  removePortee: (id: string) => void;
  setTheme: (theme: string) => void;
  importData: (data: string) => boolean;
  exportData: () => string;
  resetData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      animals: cheptelData.animals,
      santeStats: santeData.stats,
      soins: santeData.soins,
      dashboard: dashboardData,
      alertes: alertesData,
      transactions: [
        { id: '1', date: new Date().toISOString().split('T')[0], type: 'EXPENSE', category: 'Alimentation', amount: 15000, description: 'Sacs de granulés' },
        { id: '2', date: new Date().toISOString().split('T')[0], type: 'INCOME', category: 'Vente', amount: 35000, description: 'Vente de 5 lapins de chair' }
      ],
      saillies: [
        { id: 1, female: 'F-012', male: 'M-004', status: 'Gestation confirmée', statusBadgeColor: 'primary', date: '16/05/2026', expectedDate: '16/06/2026' },
        { id: 2, female: 'F-008', male: 'M-002, M-006', status: 'En attente', statusBadgeColor: 'secondary', date: '18/05/2026', hasControlToday: true, type: 'Double passage' },
        { id: 3, female: 'F-021', male: 'M-003', status: 'Échec', statusBadgeColor: 'danger', date: '05/05/2026' }
      ],
      portees: [
        { id: 'P-014', status: 'En cours', female: 'F-012', age: '21 jours', effectif: '8 vivants', sevrage: '20/06/2026', badgeColor: 'secondary' },
        { id: 'P-009', status: 'À sevrer', female: 'F-008', effectif: '5 lapereaux vivants', badgeColor: 'warning' }
      ],
      theme: 'nature',
      races: ['Néo-Zélandais', 'Californien', 'Géant des Flandres', 'Race locale', 'Croisé'],

      addRace: (race) => set((state) => {
        const cleaned = race.trim();
        if (!cleaned) return {};
        const exists = state.races.some((r) => r.toLowerCase() === cleaned.toLowerCase());
        if (exists) return {};
        return { races: [...state.races, cleaned] };
      }),

      addAnimal: (animal) => set((state) => ({ animals: [...state.animals, animal] })),
      
      updateAnimal: (id, updatedAnimal) => set((state) => ({
        animals: state.animals.map((a) => a.id === id ? { ...a, ...updatedAnimal } : a)
      })),

      removeAlerte: (id) => set((state) => ({
        alertes: state.alertes.filter((a) => a.id !== id)
      })),

      addTransaction: (transaction) => set((state) => ({
        transactions: [transaction, ...state.transactions]
      })),

      removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      addSaillie: (saillie) => set((state) => ({
        saillies: [...state.saillies, saillie]
      })),

      updateSaillie: (id, updatedSaillie) => set((state) => ({
        saillies: state.saillies.map((s) => s.id === id ? { ...s, ...updatedSaillie } : s)
      })),

      removeSaillie: (id) => set((state) => ({
        saillies: state.saillies.filter((s) => s.id !== id)
      })),

      addPortee: (portee) => set((state) => ({
        portees: [...state.portees, portee]
      })),

      updatePortee: (id, updatedPortee) => set((state) => ({
        portees: state.portees.map((p) => p.id === id ? { ...p, ...updatedPortee } : p)
      })),

      removePortee: (id) => set((state) => ({
        portees: state.portees.filter((p) => p.id !== id)
      })),

      setTheme: (theme) => set({ theme }),

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
        const exportObj = {
          state: {
            animals: state.animals,
            santeStats: state.santeStats,
            soins: state.soins,
            dashboard: state.dashboard,
            alertes: state.alertes,
            transactions: state.transactions,
            saillies: state.saillies,
            portees: state.portees,
            theme: state.theme,
            races: state.races,
          },
          version: 1,
          timestamp: new Date().toISOString()
        };
        return JSON.stringify(exportObj, null, 2);
      },

      resetData: () => set({
        animals: [],
        santeStats: { tauxMortalite: 0, traitementsEnCours: 0, alertesSanitaires: 0 },
        soins: [],
        alertes: [],
        transactions: [],
        saillies: [],
        portees: [],
        races: ['Néo-Zélandais', 'Californien', 'Géant des Flandres', 'Race locale', 'Croisé'],
      }),
    }),
    {
      name: 'gestion-lapins-storage', // key in localStorage
    }
  )
);
